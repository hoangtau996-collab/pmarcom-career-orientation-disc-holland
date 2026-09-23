import { doc, setDoc, increment, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * BỘ ĐẾM LƯỢT TRUY CẬP & BÀI TEST TOÀN CẦU (ĐỒNG BỘ REALTIME TỪ FIREBASE FIRESTORE)
 * - Lượt truy cập hiển thị = 1.000 + số lượt truy cập thực tế (field `realVisits`, bắt đầu từ 0)
 * - Bài test hoàn thành hiển thị = max(600, field `totalTests`)
 * - Nguồn số liệu duy nhất là Firestore; localStorage chỉ lưu giá trị gần nhất để hiển thị tạm khi đang tải.
 * - Một lượt truy cập = một phiên: chỉ tính lại khi trình duyệt không hoạt động trên trang quá 30 phút.
 */

const BASE_VISITS = 1000;
const BASE_TESTS = 600;
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

const STATS_DOC_REF = doc(db, 'system', 'stats');

const LS_LAST_VISITS = 'pmarcom_last_real_visits';
const LS_LAST_TESTS = 'pmarcom_last_total_tests';
const LS_LAST_ACTIVITY = 'pmarcom_last_activity';

function readInt(key) {
  try {
    const n = parseInt(localStorage.getItem(key) || '0', 10);
    return isNaN(n) || n < 0 ? 0 : n;
  } catch {
    return 0;
  }
}

function writeLS(key, value) {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    // localStorage bị chặn (chế độ ẩn danh...) — bỏ qua
  }
}

// Dọn các key cũ của phiên bản đếm lỗi (cộng dồn local)
try {
  ['pmarcom_local_visit_offset', 'pmarcom_local_test_offset', 'pmarcom_global_visits', 'pmarcom_global_tests']
    .forEach(k => localStorage.removeItem(k));
} catch { /* ignore */ }

let realVisits = readInt(LS_LAST_VISITS);
let firestoreTests = readInt(LS_LAST_TESTS);

const listeners = new Set();

function computeTotalStats() {
  const visits = BASE_VISITS + realVisits;
  const tests = Math.max(BASE_TESTS, firestoreTests);
  return {
    totalVisits: visits.toLocaleString('vi-VN'),
    totalTests: tests.toLocaleString('vi-VN'),
    rawVisits: visits,
    rawTests: tests
  };
}

function notifyListeners() {
  const statsData = computeTotalStats();
  listeners.forEach(cb => cb(statsData));
}

let firestoreInitialized = false;

function initFirestoreSync() {
  if (firestoreInitialized) return;
  firestoreInitialized = true;

  try {
    onSnapshot(STATS_DOC_REF, (snapshot) => {
      const data = snapshot.exists() ? (snapshot.data() || {}) : {};
      realVisits = parseInt(data.realVisits, 10) || 0;
      firestoreTests = parseInt(data.totalTests, 10) || 0;
      writeLS(LS_LAST_VISITS, realVisits);
      writeLS(LS_LAST_TESTS, firestoreTests);
      notifyListeners();
    }, (err) => {
      console.warn('Firestore onSnapshot stats error (kiểm tra Security Rules cho system/stats):', err);
    });
  } catch (err) {
    console.warn('Firestore init stats error:', err);
  }
}

// Automatically start Firestore realtime sync
initFirestoreSync();

/**
 * Get current visitor statistics (formatted for locale)
 */
export function getVisitorStats() {
  return computeTotalStats();
}

/**
 * Subscribe to realtime visitor counter changes
 */
export function subscribeToVisitorStats(callback) {
  listeners.add(callback);
  callback(computeTotalStats());
  return () => {
    listeners.delete(callback);
  };
}

function shouldCountVisit() {
  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0') return false; // không đếm lúc dev
  if (navigator.webdriver) return false; // bỏ qua bot tự động
  return true;
}

/**
 * Ghi nhận lượt truy cập: +1 nếu là phiên mới (không hoạt động > 30 phút).
 * Gọi mỗi lần app mở; tự làm mới mốc hoạt động khi người dùng thao tác.
 */
let visitTracked = false;

export function trackVisit() {
  if (visitTracked) return; // tránh chạy 2 lần (React StrictMode)
  visitTracked = true;

  const now = Date.now();
  const last = readInt(LS_LAST_ACTIVITY);
  writeLS(LS_LAST_ACTIVITY, now);

  const refresh = () => writeLS(LS_LAST_ACTIVITY, Date.now());
  ['click', 'keydown', 'scroll', 'touchstart'].forEach(evt =>
    window.addEventListener(evt, refresh, { passive: true })
  );
  document.addEventListener('visibilitychange', refresh);

  if (last && now - last < SESSION_TIMEOUT_MS) return; // vẫn trong phiên cũ
  if (!shouldCountVisit()) return;

  incrementVisitCount();
}

/**
 * Increment global visit counter (+1) trên Firestore
 */
export async function incrementVisitCount() {
  try {
    await setDoc(STATS_DOC_REF, {
      realVisits: increment(1),
      lastUpdated: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Increment visit count error (kiểm tra Security Rules cho system/stats):', err);
  }
  return computeTotalStats().totalVisits;
}

/**
 * Increment global completed test counter (+1) trên Firestore
 */
export async function incrementTestCount() {
  try {
    await setDoc(STATS_DOC_REF, {
      totalTests: increment(1),
      lastUpdated: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Increment test count error:', err);
  }
  return computeTotalStats().totalTests;
}
