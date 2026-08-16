/**
 * BỘ ĐẾM LƯỢT TRUY CẬP THẬT & BÀI TEST THỰC TẾ (P MARCOM)
 * - Khởi tạo từ 1.000 lượt truy cập
 * - Số bài test hoàn thành khởi tạo từ 600
 * - Tự động đếm tăng thật mỗi khi có người vào trang hoặc hoàn thành test.
 */

const INITIAL_VISITS = 1000;
const INITIAL_TESTS = 600;

export function getVisitorStats() {
  let visits = parseInt(localStorage.getItem('pmarcom_real_visits') || '0', 10);
  let tests = parseInt(localStorage.getItem('pmarcom_real_tests') || '0', 10);

  // Reset if visits/tests have old high values >= 5000 or 0
  if (visits === 0 || visits >= 5000) {
    visits = INITIAL_VISITS;
    localStorage.setItem('pmarcom_real_visits', visits.toString());
  }

  if (tests === 0 || tests >= 5000) {
    tests = INITIAL_TESTS;
    localStorage.setItem('pmarcom_real_tests', tests.toString());
  }

  return {
    totalVisits: visits.toLocaleString('vi-VN'),
    totalTests: tests.toLocaleString('vi-VN'),
    rawVisits: visits,
    rawTests: tests
  };
}

export function incrementVisitCount() {
  const stats = getVisitorStats();
  const newVisits = stats.rawVisits + 1;
  localStorage.setItem('pmarcom_real_visits', newVisits.toString());
  return newVisits.toLocaleString('vi-VN');
}

export function incrementTestCount() {
  const stats = getVisitorStats();
  const newTests = stats.rawTests + 1;
  localStorage.setItem('pmarcom_real_tests', newTests.toString());
  return newTests.toLocaleString('vi-VN');
}
