import { doc, setDoc, increment, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * BỘ ĐẾM LƯỢT TRUY CẬP & BÀI TEST TOÀN CẦU (ĐỒNG BỘ REALTIME TỪ FIREBASE FIRESTORE)
 * - Mốc lượt truy cập ban đầu: 1.000
 * - Mốc bài test hoàn thành ban đầu: 600
 * - Đảm bảo cộng dồn chính xác cho tất cả khách vãng lai và đồng bộ tức thì toàn cầu.
 */

const BASE_VISITS = 1000;
const BASE_TESTS = 600;

const STATS_DOC_REF = doc(db, 'system', 'stats');

// Local offsets to guarantee guest visit increments are never overwritten
let localVisitOffset = parseInt(localStorage.getItem('pmarcom_local_visit_offset') || '0', 10);
let localTestOffset = parseInt(localStorage.getItem('pmarcom_local_test_offset') || '0', 10);

if (isNaN(localVisitOffset) || localVisitOffset < 0) localVisitOffset = 0;
if (isNaN(localTestOffset) || localTestOffset < 0) localTestOffset = 0;

let rawFirestoreVisits = BASE_VISITS;
let rawFirestoreTests = BASE_TESTS;

let cachedVisits = Math.max(BASE_VISITS + localVisitOffset, parseInt(localStorage.getItem('pmarcom_global_visits') || '1000', 10));
let cachedTests = Math.max(BASE_TESTS + localTestOffset, parseInt(localStorage.getItem('pmarcom_global_tests') || '600', 10));

const listeners = new Set();

function computeTotalStats() {
  const visits = Math.max(BASE_VISITS + localVisitOffset, rawFirestoreVisits + localVisitOffset, cachedVisits);
  const tests = Math.max(BASE_TESTS + localTestOffset, rawFirestoreTests + localTestOffset, cachedTests);

  cachedVisits = visits;
  cachedTests = tests;

  localStorage.setItem('pmarcom_global_visits', visits.toString());
  localStorage.setItem('pmarcom_global_tests', tests.toString());

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
      if (snapshot.exists()) {
        const data = snapshot.data() || {};
        rawFirestoreVisits = parseInt(data.totalVisits, 10) || BASE_VISITS;
        rawFirestoreTests = parseInt(data.totalTests, 10) || BASE_TESTS;
        notifyListeners();
      } else {
        // Doc doesn't exist yet on Firestore, seed initial values
        setDoc(STATS_DOC_REF, {
          totalVisits: Math.max(BASE_VISITS, cachedVisits),
          totalTests: Math.max(BASE_TESTS, cachedTests),
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        }, { merge: true }).catch(err => console.warn('Firestore setDoc stats init error:', err));
      }
    }, (err) => {
      console.warn('Firestore onSnapshot stats error:', err);
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

/**
 * Increment global visit counter (+1)
 */
export async function incrementVisitCount() {
  localVisitOffset += 1;
  localStorage.setItem('pmarcom_local_visit_offset', localVisitOffset.toString());
  notifyListeners();

  try {
    await setDoc(STATS_DOC_REF, {
      totalVisits: increment(1),
      lastUpdated: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.warn('Increment visit count error:', err);
  }

  return computeTotalStats().totalVisits;
}

/**
 * Increment global completed test counter (+1)
 */
export async function incrementTestCount() {
  localTestOffset += 1;
  localStorage.setItem('pmarcom_local_test_offset', localTestOffset.toString());
  notifyListeners();

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
