import { doc, getDoc, setDoc, updateDoc, increment, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * BỘ ĐẾM LƯỢT TRUY CẬP & BÀI TEST TOÀN CẦU (ĐỒNG BỘ REALTIME TỪ FIREBASE FIRESTORE)
 * - Lượt truy cập ban đầu: 1.000 (Hiển thị 1.000 + số lượt xem cộng dồn toàn thế giới)
 * - Bài test hoàn thành ban đầu: 600 (Hiển thị 600 + số bài test cộng dồn toàn thế giới)
 * - Đồng bộ tức thì (Realtime) qua Firebase Firestore cho tất cả người dùng và thiết bị.
 */

const BASE_VISITS = 1000;
const BASE_TESTS = 600;

const STATS_DOC_REF = doc(db, 'system', 'stats');

// Local cached values
let cachedVisits = parseInt(localStorage.getItem('pmarcom_global_visits') || BASE_VISITS.toString(), 10);
let cachedTests = parseInt(localStorage.getItem('pmarcom_global_tests') || BASE_TESTS.toString(), 10);

if (cachedVisits < BASE_VISITS) cachedVisits = BASE_VISITS;
if (cachedTests < BASE_TESTS) cachedTests = BASE_TESTS;

const listeners = new Set();

function notifyListeners() {
  const statsData = getVisitorStats();
  listeners.forEach(cb => cb(statsData));
}

// Khởi tạo và đăng ký lắng nghe Firestore Realtime
let firestoreInitialized = false;

function initFirestoreSync() {
  if (firestoreInitialized) return;
  firestoreInitialized = true;

  try {
    onSnapshot(STATS_DOC_REF, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        const visits = Math.max(BASE_VISITS, data.totalVisits || BASE_VISITS);
        const tests = Math.max(BASE_TESTS, data.totalTests || BASE_TESTS);

        cachedVisits = visits;
        cachedTests = tests;

        localStorage.setItem('pmarcom_global_visits', visits.toString());
        localStorage.setItem('pmarcom_global_tests', tests.toString());

        notifyListeners();
      } else {
        // Tạo document ban đầu trên Firestore nếu chưa có
        setDoc(STATS_DOC_REF, {
          totalVisits: BASE_VISITS,
          totalTests: BASE_TESTS,
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        }).catch(err => console.warn('Firestore setDoc stats error:', err));
      }
    }, (err) => {
      console.warn('Firestore onSnapshot stats error:', err);
    });
  } catch (err) {
    console.warn('Firestore init stats error:', err);
  }
}

// Tự động bật đồng bộ khi module được nạp
initFirestoreSync();

/**
 * Lấy số liệu đếm hiện tại (Đồng bộ toàn cầu)
 */
export function getVisitorStats() {
  return {
    totalVisits: cachedVisits.toLocaleString('vi-VN'),
    totalTests: cachedTests.toLocaleString('vi-VN'),
    rawVisits: cachedVisits,
    rawTests: cachedTests
  };
}

/**
 * Đăng ký nghe biến động thời gian thực (Realtime subscriber)
 */
export function subscribeToVisitorStats(callback) {
  listeners.add(callback);
  // Trả về số liệu hiện tại ngay cho callback
  callback(getVisitorStats());
  return () => {
    listeners.delete(callback);
  };
}

/**
 * Tăng lượt truy cập hệ thống (Cộng dồn toàn cầu)
 */
export async function incrementVisitCount() {
  cachedVisits += 1;
  localStorage.setItem('pmarcom_global_visits', cachedVisits.toString());
  notifyListeners();

  try {
    await updateDoc(STATS_DOC_REF, {
      totalVisits: increment(1),
      lastUpdated: new Date().toISOString()
    });
  } catch (err) {
    // Nếu doc chưa tồn tại, khởi tạo với increment
    setDoc(STATS_DOC_REF, {
      totalVisits: cachedVisits,
      totalTests: cachedTests,
      lastUpdated: new Date().toISOString()
    }, { merge: true }).catch(() => {});
  }

  return cachedVisits.toLocaleString('vi-VN');
}

/**
 * Tăng số bài test đã hoàn thành (Cộng dồn toàn cầu)
 */
export async function incrementTestCount() {
  cachedTests += 1;
  localStorage.setItem('pmarcom_global_tests', cachedTests.toString());
  notifyListeners();

  try {
    await updateDoc(STATS_DOC_REF, {
      totalTests: increment(1),
      lastUpdated: new Date().toISOString()
    });
  } catch (err) {
    setDoc(STATS_DOC_REF, {
      totalVisits: cachedVisits,
      totalTests: cachedTests,
      lastUpdated: new Date().toISOString()
    }, { merge: true }).catch(() => {});
  }

  return cachedTests.toLocaleString('vi-VN');
}
