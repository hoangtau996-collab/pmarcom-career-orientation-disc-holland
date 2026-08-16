import { getDiscProfile } from '../data/discProfiles';

/**
 * Thuật toán tính toán kết quả bài test DISC dựa trên chuẩn Hoa Kỳ
 * @param {Object} answers - Map chứa các câu trả lời: { [questionId]: { most: 'D'|'I'|'S'|'C', least: 'D'|'I'|'S'|'C' } }
 * @returns {Object} Результат bao gồm điểm số, tỉ lệ %, nhóm tính cách chính/phụ và Profile chi tiết
 */
export function calculateDiscResult(answers) {
  const counts = {
    most: { D: 0, I: 0, S: 0, C: 0 },
    least: { D: 0, I: 0, S: 0, C: 0 }
  };

  let totalQuestionsAnswered = 0;

  Object.values(answers).forEach(ans => {
    if (ans.most) {
      counts.most[ans.most] = (counts.most[ans.most] || 0) + 1;
      totalQuestionsAnswered++;
    }
    if (ans.least) {
      counts.least[ans.least] = (counts.least[ans.least] || 0) + 1;
    }
  });

  // Điểm ròng (Net Score) = Most - Least + offset chuẩn hóa
  // Hoặc tính Tỉ lệ phần trăm xuất hiện của Most
  const netScores = {
    D: counts.most.D - counts.least.D,
    I: counts.most.I - counts.least.I,
    S: counts.most.S - counts.least.S,
    C: counts.most.C - counts.least.C
  };

  // Tính phần trăm điểm Most (Natural Behavior)
  const totalMost = (counts.most.D + counts.most.I + counts.most.S + counts.most.C) || 1;
  const percentages = {
    D: Math.round((counts.most.D / totalMost) * 100),
    I: Math.round((counts.most.I / totalMost) * 100),
    S: Math.round((counts.most.S / totalMost) * 100),
    C: Math.round((counts.most.C / totalMost) * 100)
  };

  // Tính điểm Radar Chart (thang 0 - 100)
  const chartData = [
    { subject: 'D - Quyết đoán', A: percentages.D, fullMark: 100, fill: '#EF4444' },
    { subject: 'I - Ảnh hưởng', A: percentages.I, fullMark: 100, fill: '#F59E0B' },
    { subject: 'S - Kiên định', A: percentages.S, fullMark: 100, fill: '#10B981' },
    { subject: 'C - Tuân thủ', A: percentages.C, fullMark: 100, fill: '#3B82F6' }
  ];

  // Xác định Yếu tố Thống trị (Primary & Secondary Traits)
  const sortedTraits = Object.keys(percentages).sort((a, b) => percentages[b] - percentages[a]);
  const primaryTrait = sortedTraits[0];
  const secondaryTrait = sortedTraits[1];

  const profile = getDiscProfile(primaryTrait, secondaryTrait);

  return {
    counts,
    netScores,
    percentages,
    chartData,
    primaryTrait,
    secondaryTrait,
    sortedTraits,
    profile,
    totalQuestionsAnswered
  };
}
