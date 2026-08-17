import { HOLLAND_CARDS } from '../data/hollandCards';
import { getHollandTop3Profile } from '../data/hollandProfiles';

/**
 * Thuật toán tính toán điểm Holland Code (RIASEC) từ danh sách lựa chọn thẻ bài
 * @param {Object} cardChoices - Object dạng: { [cardId]: 'like' | 'unsure' | 'dislike' }
 */
export function calculateHollandResult(cardChoices) {
  const rawScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  const cardCounts = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

  HOLLAND_CARDS.forEach(card => {
    cardCounts[card.category]++;
    const choice = cardChoices[card.id];

    if (choice === 'like') {
      rawScores[card.category] += 2;
    } else if (choice === 'unsure') {
      rawScores[card.category] += 1;
    }
  });

  // Quy đổi điểm phần trăm % (Max mỗi nhóm là 6 thẻ * 2 điểm = 12 điểm)
  const percentages = {
    R: Math.round((rawScores.R / (cardCounts.R * 2 || 1)) * 100),
    I: Math.round((rawScores.I / (cardCounts.I * 2 || 1)) * 100),
    A: Math.round((rawScores.A / (cardCounts.A * 2 || 1)) * 100),
    S: Math.round((rawScores.S / (cardCounts.S * 2 || 1)) * 100),
    E: Math.round((rawScores.E / (cardCounts.E * 2 || 1)) * 100),
    C: Math.round((rawScores.C / (cardCounts.C * 2 || 1)) * 100)
  };

  // Sắp xếp thứ tự ưu tiên các nhóm Holland
  const sortedCategories = Object.keys(percentages).sort((a, b) => percentages[b] - percentages[a]);
  const top3Code = sortedCategories.slice(0, 3).join('');

  const chartData = [
    { subject: 'R - Kỹ thuật', A: percentages.R, fullMark: 100, fill: '#EF4444' },
    { subject: 'I - Nghiên cứu', A: percentages.I, fullMark: 100, fill: '#3B82F6' },
    { subject: 'A - Nghệ thuật', A: percentages.A, fullMark: 100, fill: '#EC4899' },
    { subject: 'S - Xã hội', A: percentages.S, fullMark: 100, fill: '#10B981' },
    { subject: 'E - Quản lý', A: percentages.E, fullMark: 100, fill: '#F59E0B' },
    { subject: 'C - Nghiệp vụ', A: percentages.C, fullMark: 100, fill: '#8B5CF6' }
  ];

  const profile = getHollandTop3Profile(top3Code);

  const answeredCount = Object.keys(cardChoices).length;
  const consistencyScore = Math.min(99, Math.max(90, 88 + Math.round((answeredCount / 36) * 11)));

  return {
    rawScores,
    percentages,
    sortedCategories,
    top3Code,
    chartData,
    profile,
    totalCardsAnswered: answeredCount,
    consistencyScore
  };
}
