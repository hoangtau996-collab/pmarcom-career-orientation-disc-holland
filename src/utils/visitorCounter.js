/**
 * Quản lý lượt truy cập và số bài test đã hoàn thành
 */
export function getVisitorStats() {
  const BASE_VISITS = 15420;
  const BASE_TESTS = 8930;

  let localVisits = parseInt(localStorage.getItem('pmarcom_visitor_count') || '0', 10);
  let localTests = parseInt(localStorage.getItem('pmarcom_tests_count') || '0', 10);

  if (!localStorage.getItem('pmarcom_visited_session')) {
    localVisits += 1;
    localStorage.setItem('pmarcom_visitor_count', localVisits.toString());
    localStorage.setItem('pmarcom_visited_session', 'true');
  }

  return {
    totalVisits: (BASE_VISITS + localVisits).toLocaleString('vi-VN'),
    totalTests: (BASE_TESTS + localTests).toLocaleString('vi-VN')
  };
}

export function incrementTestCount() {
  let localTests = parseInt(localStorage.getItem('pmarcom_tests_count') || '0', 10);
  localTests += 1;
  localStorage.setItem('pmarcom_tests_count', localTests.toString());
}
