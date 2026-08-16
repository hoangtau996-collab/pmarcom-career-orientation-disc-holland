// Thông tin Chi tiết 6 Nhóm Mã Holland Code (RIASEC) & Mã Kết Hợp Top 3

export const HOLLAND_TYPES = {
  'R': {
    code: 'R',
    name: 'Realistic - Nhóm Kỹ Thuật & Thực Tế',
    english: 'The Doers',
    color: '#EF4444',
    bg: 'bg-red-50 dark:bg-red-950/40',
    border: 'border-red-500',
    text: 'text-red-600 dark:text-red-400',
    summary: 'Bạn là người thực tế, thích thao tác với máy móc, công cụ, vật thể thực hoặc môi trường ngoài trời. Bạn giải quyết vấn đề bằng hành động cụ thể hơn là tranh luận lý thuyết.',
    characteristics: ['Khéo tay, vận động tốt', 'Thực tế, coi trọng hiệu quả', 'Thích làm việc với vật thể/thiết bị', 'Độc lập, kiên trì'],
    suitableCareers: ['Kỹ sư Cơ khí / Điện', 'Kỹ thuật viên IT Phần cứng', 'Kiến trúc sư / Thi công', 'Nông nghiệp Công nghệ cao', 'Phi công / Đội trưởng Vận tải']
  },
  'I': {
    code: 'I',
    name: 'Investigative - Nhóm Nghiên Cứu & Phân Tích',
    english: 'The Thinkers',
    color: '#3B82F6',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    border: 'border-blue-500',
    text: 'text-blue-600 dark:text-blue-400',
    summary: 'Bạn là nhà tư duy, thích quan sát, học hỏi, phân tích dữ liệu và giải quyết các bài toán khoa học phức tạp. Bạn tò mò và khao khát khám phá tri thức mới.',
    characteristics: ['Tư duy phân tích sắc bén', 'Tò mò tri thức', 'Logic và độc lập', 'Thích nghiên cứu chuyên sâu'],
    suitableCareers: ['Chuyên gia Phân tích Dữ liệu (Data Analyst)', 'Lập trình viên / AI Research', 'Nhà Khoa học / Nghiên cứu sinh', 'Bác sĩ / Dược sĩ', 'Chuyên gia Phân tích Tài chính']
  },
  'A': {
    code: 'A',
    name: 'Artistic - Nhóm Nghệ Thuật & Sáng Tạo',
    english: 'The Creators',
    color: '#EC4899',
    bg: 'bg-pink-50 dark:bg-pink-950/40',
    border: 'border-pink-500',
    text: 'text-pink-600 dark:text-pink-400',
    summary: 'Bạn là người giàu trí tưởng tượng, độc đáo, nhiều cảm xúc và có năng khiếu sáng tạo. Bạn ghét quy chuẩn cứng nhắc và thích tự do biểu đạt cái tôi nghệ thuật.',
    characteristics: ['Giàu trí tưởng tượng', 'Tự do, ngẫu hứng', 'Nhạy bén với cái đẹp', 'Đổi mới không khuôn mẫu'],
    suitableCareers: ['Designer Đồ họa / UI-UX', 'Creative Director / Sáng tạo nội dung', 'Nhiếp ảnh gia / Dựng phim', 'Nhà thiết kế Thời trang / Nội thất', 'Nhà văn / Kịch bản gia']
  },
  'S': {
    code: 'S',
    name: 'Social - Nhóm Xã Hội & Phụng Sự',
    english: 'The Helpers',
    color: '#10B981',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-emerald-500',
    text: 'text-emerald-600 dark:text-emerald-400',
    summary: 'Bạn là người ấm áp, chân thành, thích giúp đỡ, giảng dạy và chăm sóc người khác. Bạn tận tụy và luôn coi trọng sự kết nối nhân văn giữa con người với con người.',
    characteristics: ['Thấu hiểu, biết lắng nghe', 'Thích hỗ trợ cộng đồng', 'Hòa nhã, chu đáo', 'Kỹ năng giao tiếp tốt'],
    suitableCareers: ['Chuyên gia Nhân sự (HR)', 'Giảng viên / Giáo viên', 'Chuyên gia Tư vấn Tâm lý', 'Chăm sóc Khách hàng (Customer Success)', 'Tổ chức Sự kiện Cộng đồng / Y tế']
  },
  'E': {
    code: 'E',
    name: 'Enterprising - Nhóm Dẫn Dắt & Thuyết Phục',
    english: 'The Persuaders',
    color: '#F59E0B',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-amber-500',
    text: 'text-amber-600 dark:text-amber-400',
    summary: 'Bạn là người tự tin, giàu năng lượng, có biệt tài thuyết phục và tinh thần kinh doanh mạnh mẽ. Bạn thích đứng đầu, đàm phán và truyền năng lượng cho tập thể.',
    characteristics: ['Tự tin, hăng hái', 'Thuyết phục và đàm phán giỏi', 'Dẫn dắt, chấp nhận mạo hiểm', 'Hướng tới thành công kinh doanh'],
    suitableCareers: ['Giám đốc Điều hành (CEO) / Khởi nghiệp', 'Trưởng phòng Bán hàng (Sales Manager)', 'Chuyên gia Marketing & PR', 'Đầu tư / Thương lượng thương mại', 'Quản lý Dự án']
  },
  'C': {
    code: 'C',
    name: 'Conventional - Nhóm Nghiệp Vụ & Mẫu Mực',
    english: 'The Organizers',
    color: '#8B5CF6',
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    border: 'border-purple-500',
    text: 'text-purple-600 dark:text-purple-400',
    summary: 'Bạn là người ngăn nắp, kỷ luật, tỉ mỉ và tôn trọng quy trình chuẩn. Bạn xuất sắc trong việc tổ chức dữ liệu, quản lý sổ sách và duy trì sự ổn định.',
    characteristics: ['Cẩn thận, chỉn chu', 'Tôn trọng kỷ luật & quy trình', 'Tổ chức dữ liệu xuất sắc', 'Đáng tin cậy cao'],
    suitableCareers: ['Kiểm toán viên / Kế toán', 'Quản trị Văn phòng / Thư ký', 'Chuyên gia Quản lý Dữ liệu', 'Kiểm soát Chất lượng (QA/QC)', 'Chuyên viên Tuân thủ Pháp lý']
  }
};

// Tra cứu mã Holland Profile Top 3
export function getHollandTop3Profile(top3Code) {
  const letters = top3Code.split('');
  const primary = HOLLAND_TYPES[letters[0]] || HOLLAND_TYPES['S'];
  const secondary = HOLLAND_TYPES[letters[1]] || HOLLAND_TYPES['A'];
  const tertiary = HOLLAND_TYPES[letters[2]] || HOLLAND_TYPES['E'];

  return {
    top3Code,
    primary,
    secondary,
    tertiary,
    combinedTitle: `Mã Holland: ${top3Code} (${primary.english} - ${secondary.english} - ${tertiary.english})`,
    summary: `Bộ ba mã Holland của bạn thể hiện sự kết hợp hài hòa giữa ${primary.name.toLowerCase()}, ${secondary.name.toLowerCase()} và ${tertiary.name.toLowerCase()}. Bạn phát huy tối đa tiềm năng trong môi trường giao thoa giữa các lĩnh vực này.`
  };
}
