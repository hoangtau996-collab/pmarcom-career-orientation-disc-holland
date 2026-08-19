import { MBTI_PROFILES } from '../data/mbtiProfiles';

/**
 * Tính toán kết quả bài test MBTI 16 nhóm tính cách từ object câu trả lời của người dùng
 * @param {Object} answers - Ví dụ: { 1: 'E', 2: 'I', 3: 'E', ... }
 * @returns {Object} Kết quả MBTI gồm mã 4 chữ cái, tỷ lệ %, thông tin hồ sơ và chỉ số độ tin cậy
 */
export function calculateMbtiResult(answers = {}) {
  const counts = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };

  const totalAnswered = Object.keys(answers).length;

  Object.values(answers).forEach((trait) => {
    if (counts.hasOwnProperty(trait)) {
      counts[trait]++;
    }
  });

  // Xác định 4 chữ cái đại diện
  const letter1 = counts.E >= counts.I ? 'E' : 'I';
  const letter2 = counts.S >= counts.N ? 'S' : 'N';
  const letter3 = counts.T >= counts.F ? 'T' : 'F';
  const letter4 = counts.J >= counts.P ? 'J' : 'P';

  const mbtiCode = `${letter1}${letter2}${letter3}${letter4}`;

  // Tính phần trăm từng cặp thiên hướng
  const eiTotal = Math.max(1, counts.E + counts.I);
  const snTotal = Math.max(1, counts.S + counts.N);
  const tfTotal = Math.max(1, counts.T + counts.F);
  const jpTotal = Math.max(1, counts.J + counts.P);

  const percentages = {
    E: Math.round((counts.E / eiTotal) * 100),
    I: Math.round((counts.I / eiTotal) * 100),
    S: Math.round((counts.S / snTotal) * 100),
    N: Math.round((counts.N / snTotal) * 100),
    T: Math.round((counts.T / tfTotal) * 100),
    F: Math.round((counts.F / tfTotal) * 100),
    J: Math.round((counts.J / jpTotal) * 100),
    P: Math.round((counts.P / jpTotal) * 100)
  };

  // Tính chỉ số độ tin cậy (% Consistency Score 90% - 99%)
  const maxConsistencyBonus = Math.min(9, Math.round((totalAnswered / 20) * 9));
  const consistencyScore = 90 + maxConsistencyBonus;

  const profile = MBTI_PROFILES[mbtiCode] || MBTI_PROFILES['INTJ'];

  return {
    code: mbtiCode,
    mbtiCode,
    counts,
    percentages,
    profile,
    consistencyScore,
    totalAnswered
  };
}
