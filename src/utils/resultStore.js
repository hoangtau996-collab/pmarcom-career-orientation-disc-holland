/**
 * Lưu & đọc kết quả bài test trên Firestore (collection `test_results`).
 * Mỗi bản ghi giữ nguyên cấu trúc lịch sử cũ: { id, date, user, discResult, hollandResult, mbtiResult } + uid.
 * localStorage giữ bản dự phòng trên thiết bị khi mất mạng hoặc Firestore lỗi.
 */

import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const LOCAL_HISTORY_KEY = 'disc_test_history';

// Loại bỏ giá trị Firestore không nhận (undefined, hàm)
const toPlain = (obj) => JSON.parse(JSON.stringify(obj));

const byDateDesc = (a, b) => (b.date || '').localeCompare(a.date || '');

export function getLocalHistory() {
  try {
    const saved = localStorage.getItem(LOCAL_HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveLocalHistory(list) {
  try {
    localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(list));
  } catch { /* bộ nhớ đầy hoặc bị chặn — bỏ qua */ }
}

export function clearLocalHistory() {
  try { localStorage.removeItem(LOCAL_HISTORY_KEY); } catch { /* ignore */ }
}

// Ghép danh sách từ server và trên máy, bỏ trùng theo id
function mergeHistory(remote, local) {
  const seen = new Set(remote.map(i => i.id));
  return [...remote, ...local.filter(i => !seen.has(i.id))].sort(byDateDesc);
}

// Lưu kết quả: luôn ghi bản dự phòng trên máy, rồi đẩy lên Firestore
export async function saveTestResult(item) {
  const uid = auth.currentUser?.uid || null;
  const record = toPlain({ ...item, uid });

  saveLocalHistory([record, ...getLocalHistory()]);

  if (!uid) return { synced: false };
  try {
    await addDoc(collection(db, 'test_results'), record);
    return { synced: true };
  } catch (err) {
    console.warn('Lưu kết quả lên Firestore thất bại (đã giữ bản trên máy):', err);
    return { synced: false };
  }
}

// Bài test chỉ nằm trên máy (làm trước khi chuyển sang Firestore hoặc lúc mất mạng):
// đẩy lên tài khoản để Admin cũng xem được. Chạy nền, lỗi thì lần đăng nhập sau thử lại.
const uploadingIds = new Set(); // tránh đẩy trùng khi lịch sử được tải 2 lần liên tiếp

function uploadLocalOnly(remote, local, uid) {
  const remoteIds = new Set(remote.map(i => i.id));
  local
    .filter(i => i.id && !remoteIds.has(i.id) && !uploadingIds.has(i.id))
    .forEach(i => {
      uploadingIds.add(i.id);
      addDoc(collection(db, 'test_results'), toPlain({ ...i, uid }))
        .catch(err => {
          uploadingIds.delete(i.id);
          console.warn('Đồng bộ bài test cũ lên Firestore thất bại:', err);
        });
    });
}

// Lịch sử của người đang đăng nhập (server + bản trên máy cùng tài khoản)
export async function fetchMyHistory(profile) {
  const uid = auth.currentUser?.uid;
  const email = (profile?.email || '').toLowerCase();
  const local = getLocalHistory().filter(i =>
    (uid && i.uid === uid) || (email && i.user?.email?.toLowerCase() === email)
  );
  if (!uid) return local.sort(byDateDesc);

  try {
    const snap = await getDocs(query(collection(db, 'test_results'), where('uid', '==', uid)));
    const remote = snap.docs.map(d => d.data());
    uploadLocalOnly(remote, local, uid);
    return mergeHistory(remote, local);
  } catch (err) {
    console.warn('Không tải được lịch sử từ Firestore, dùng bản trên máy:', err);
    return local.sort(byDateDesc);
  }
}

// Toàn bộ kết quả của mọi thành viên (chỉ Admin)
export async function fetchAllResults() {
  const snap = await getDocs(collection(db, 'test_results'));
  return snap.docs.map(d => d.data()).sort(byDateDesc);
}
