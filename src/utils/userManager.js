/**
 * Quản lý người dùng & phân quyền — dữ liệu lưu trên Firestore (collection `users/{uid}`).
 * localStorage chỉ giữ bản cache hồ sơ đang đăng nhập để hiển thị nhanh khi tải trang.
 */

import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc, updateDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';

export const SUPER_ADMIN_EMAIL = 'pmarcomvn@gmail.com';

const ACTIVE_USER_KEY = 'disc_active_user';
const LEGACY_USERS_KEY = 'pmarcom_users_list';

export function isSuperAdminEmail(email) {
  return !!email && email.toLowerCase().trim() === SUPER_ADMIN_EMAIL;
}

// ---------- Cache hồ sơ đang đăng nhập ----------

export function getCachedActiveUser() {
  try {
    const saved = localStorage.getItem(ACTIVE_USER_KEY);
    const parsed = saved ? JSON.parse(saved) : null;
    return parsed?.uid ? parsed : null; // bản cache cũ (không có uid) không còn hợp lệ
  } catch {
    return null;
  }
}

export function cacheActiveUser(profile) {
  try {
    if (profile) localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(profile));
    else localStorage.removeItem(ACTIVE_USER_KEY);
  } catch { /* localStorage bị chặn — bỏ qua */ }
}

// Dọn danh sách thành viên lưu cục bộ của phiên bản cũ (dữ liệu nay nằm trên Firestore)
try { localStorage.removeItem(LEGACY_USERS_KEY); } catch { /* ignore */ }

// ---------- Hồ sơ thành viên (Firestore) ----------

export async function fetchUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? { ...snap.data(), uid } : null;
}

// Tạo mới hoặc cập nhật hồ sơ của chính người đang đăng nhập (không bao giờ tự nâng quyền)
export async function saveUserProfile({ fullName, phone, category, photoURL }) {
  const fbUser = auth.currentUser;
  if (!fbUser) throw new Error('not-signed-in');

  const ref = doc(db, 'users', fbUser.uid);
  const snap = await getDoc(ref);
  const now = new Date().toISOString();
  const fields = {
    fullName: fullName.trim(),
    phone: phone.trim(),
    category: category || 'student',
    updatedAt: now
  };
  if (photoURL !== undefined) fields.photoURL = photoURL || '';

  if (snap.exists()) {
    await updateDoc(ref, fields);
  } else {
    await setDoc(ref, {
      ...fields,
      email: (fbUser.email || '').toLowerCase(),
      role: isSuperAdmin({ email: fbUser.email }) ? 'super_admin' : 'user',
      createdAt: now
    });
  }

  const profile = await fetchUserProfile(fbUser.uid);
  cacheActiveUser(profile);
  return profile;
}

// ---------- Avatar ----------

// Ảnh đại diện: ảnh người dùng tự tải lên, nếu chưa có thì dùng ảnh tài khoản Google
export function getAvatarUrl(user) {
  if (!user) return '';
  if (user.photoURL) return user.photoURL;
  const fbUser = auth.currentUser;
  return fbUser && fbUser.uid === user.uid ? fbUser.photoURL || '' : '';
}

// Chữ cái viết tắt từ họ tên (vd. "Nguyễn Văn An" → "NA")
export function getInitials(name) {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

// Cắt vuông + thu nhỏ ảnh về 160px (JPEG ~10KB) để lưu gọn trong hồ sơ Firestore
export function resizeAvatarFile(file, size = 160) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('read-failed'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('invalid-image'));
      img.onload = () => {
        const side = Math.min(img.width, img.height);
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, size, size);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

// Danh sách toàn bộ thành viên (chỉ Admin — Security Rules chặn người khác)
export async function listAllUsers() {
  const snap = await getDocs(collection(db, 'users'));
  return snap.docs
    .map(d => ({ ...d.data(), uid: d.id }))
    .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
}

// Xóa hồ sơ thành viên (chỉ Super Admin). Tài khoản đăng nhập Firebase Auth vẫn còn,
// muốn xóa hẳn thì xóa thêm trong Firebase Console > Authentication.
export async function deleteUserProfile(member) {
  if (isSuperAdminEmail(member.email)) {
    alert('Không thể xóa tài khoản Super Admin chính!');
    return false;
  }
  await deleteDoc(doc(db, 'users', member.uid));
  return true;
}

export async function updateUserRole(member, newRole) {
  if (isSuperAdminEmail(member.email)) {
    alert(`Tài khoản Super Admin ${SUPER_ADMIN_EMAIL} luôn có quyền cao nhất!`);
    return false;
  }
  await updateDoc(doc(db, 'users', member.uid), { role: newRole });
  return true;
}

// ---------- Phân quyền ----------

// Super Admin: bắt buộc phiên Firebase Auth đã xác minh đúng email quản trị (đăng nhập Google)
export function isSuperAdmin(user) {
  if (!user || !isSuperAdminEmail(user.email)) return false;
  const fbUser = auth.currentUser;
  return !!fbUser && fbUser.emailVerified && isSuperAdminEmail(fbUser.email);
}

// Admin thường: quyền `admin` đọc từ hồ sơ Firestore (Security Rules cũng kiểm tra lại phía server)
export function isAdmin(user) {
  if (!user || !user.email) return false;
  return isSuperAdmin(user) || (user.role === 'admin' && user.uid === auth.currentUser?.uid);
}

// ---------- Thông báo lỗi Firebase Auth ----------

export function authErrorMessage(code) {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Email hoặc mật khẩu không đúng. Nếu bạn từng đăng ký trước khi hệ thống nâng cấp bảo mật, vui lòng chọn "Đăng Ký Mới" để tạo lại tài khoản.';
    case 'auth/email-already-in-use':
      return 'Email này đã được đăng ký. Vui lòng chuyển sang tab "Đăng Nhập", hoặc dùng "Quên mật khẩu".';
    case 'auth/invalid-email':
      return 'Địa chỉ email không hợp lệ.';
    case 'auth/weak-password':
      return 'Mật khẩu quá yếu, cần ít nhất 6 ký tự.';
    case 'auth/too-many-requests':
      return 'Bạn thử quá nhiều lần. Vui lòng đợi vài phút rồi thử lại.';
    case 'auth/network-request-failed':
      return 'Mất kết nối mạng. Vui lòng kiểm tra Internet và thử lại.';
    case 'auth/account-exists-with-different-credential':
      return 'Email này đã đăng ký bằng mật khẩu. Vui lòng đăng nhập bằng Email & Mật khẩu.';
    case 'permission-denied':
      return 'Hệ thống chưa cho phép lưu hồ sơ. Vui lòng liên hệ quản trị viên P Marcom.';
    case 'unavailable':
      return 'Không kết nối được máy chủ. Vui lòng kiểm tra Internet và thử lại.';
    default:
      return 'Đăng nhập/Đăng ký không thành công. Vui lòng thử lại!';
  }
}
