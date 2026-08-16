// Bộ 36 Thẻ Bài Đánh Giá Sở Thích Nghề Nghiệp Holland Code (RIASEC) chuẩn quốc tế

export const HOLLAND_CARDS = [
  // --- R: REALISTIC (Kỹ Thuật / Thực Tế) ---
  {
    id: 'r1',
    category: 'R',
    categoryName: 'Realistic - Kỹ Thuật / Thực Tế',
    title: 'Sửa chữa & Vận hành Máy móc',
    description: 'Thích thao tác với công cụ, thiết bị cơ khí, điện tử hoặc dụng cụ kỹ thuật thực tế.',
    icon: 'Wrench',
    tags: ['Máy móc', 'Công cụ', 'Khéo tay']
  },
  {
    id: 'r2',
    category: 'R',
    categoryName: 'Realistic - Kỹ Thuật / Thực Tế',
    title: 'Lắp ráp & Chế tạo Sản phẩm',
    description: 'Yêu thích các hoạt động làm việc bằng tay, lắp ráp linh kiện, mô hình hoặc sản phẩm vật lý.',
    icon: 'Hammer',
    tags: ['Lắp ráp', 'Chế tạo', 'Cơ khí']
  },
  {
    id: 'r3',
    category: 'R',
    categoryName: 'Realistic - Kỹ Thuật / Thực Tế',
    title: 'Làm việc Ngoài trời & Tự nhiên',
    description: 'Thích các công việc gắn liền với thiên nhiên, nông nghiệp, chăm sóc cây cối hoặc động vật.',
    icon: 'Trees',
    tags: ['Thiên nhiên', 'Ngoài trời', 'Môi trường']
  },
  {
    id: 'r4',
    category: 'R',
    categoryName: 'Realistic - Kỹ Thuật / Thực Tế',
    title: 'Xây dựng & Kiến trúc Công trình',
    description: 'Hứng thú với việc thi công công trình, đọc bản vẽ kỹ thuật và giải quyết các bài toán không gian.',
    icon: 'Building',
    tags: ['Thi công', 'Kiến trúc', 'Không gian']
  },
  {
    id: 'r5',
    category: 'R',
    categoryName: 'Realistic - Kỹ Thuật / Thực Tế',
    title: 'Lái xe & Vận tải Kỹ thuật',
    description: 'Thích điều khiển phương tiện giao thông, thiết bị vận tải hoặc các hệ thống điều khiển tự động.',
    icon: 'Truck',
    tags: ['Vận tải', 'Điều khiển', 'Thực hành']
  },
  {
    id: 'r6',
    category: 'R',
    categoryName: 'Realistic - Kỹ Thuật / Thực Tế',
    title: 'Giải quyết Sự cố Kỹ thuật Phần cứng',
    description: 'Thích tháo ráp thiết bị máy tính, điện thoại, hệ thống mạng cứng và các thiết bị số.',
    icon: 'Cpu',
    tags: ['Phần cứng', 'Sửa chữa', 'Thiết bị']
  },

  // --- I: INVESTIGATIVE (Nghiên Cứu / Phân Tích) ---
  {
    id: 'i1',
    category: 'I',
    categoryName: 'Investigative - Nghiên Cứu / Phân Tích',
    title: 'Nghiên cứu Khoa học & Thí nghiệm',
    description: 'Hứng thú với việc tìm hiểu nguyên lý tự nhiên, thực hiện thí nghiệm và khám phá tri thức mới.',
    icon: 'Microscope',
    tags: ['Khoa học', 'Thí nghiệm', 'Khám phá']
  },
  {
    id: 'i2',
    category: 'I',
    categoryName: 'Investigative - Nghiên Cứu / Phân Tích',
    title: 'Phân tích Dữ liệu & Toán học',
    description: 'Thích đào sâu vào các con số, biểu đồ, phát hiện quy luật ẩn đằng sau dữ liệu phức tạp.',
    icon: 'LineChart',
    tags: ['Dữ liệu', 'Toán học', 'Logic']
  },
  {
    id: 'i3',
    category: 'I',
    categoryName: 'Investigative - Nghiên Cứu / Phân Tích',
    title: 'Giải đố & Tư duy Trinh thám',
    description: 'Đam mê bóc tách các bài toán khó, truy tìm nguyên nhân cốt lõi của vấn đề.',
    icon: 'Search',
    tags: ['Giải đố', 'Tư duy', 'Bóc tách']
  },
  {
    id: 'i4',
    category: 'I',
    categoryName: 'Investigative - Nghiên Cứu / Phân Tích',
    title: 'Lập trình Algorithmic & AI',
    description: 'Thích suy nghĩ cấu trúc thuật toán, viết code giải quyết các bài toán công nghệ thông minh.',
    icon: 'Code',
    tags: ['Lập trình', 'Thuật toán', 'AI']
  },
  {
    id: 'i5',
    category: 'I',
    categoryName: 'Investigative - Nghiên Cứu / Phân Tích',
    title: 'Đọc sách Chuyên khảo & Lý thuyết',
    description: 'Dành nhiều thời gian tự học, đọc sách nghiên cứu chuyên sâu và tích lũy tri thức hàn lâm.',
    icon: 'BookOpen',
    tags: ['Tri thức', 'Đọc sách', 'Hàn lâm']
  },
  {
    id: 'i6',
    category: 'I',
    categoryName: 'Investigative - Nghiên Cứu / Phân Tích',
    title: 'Nghiên cứu Y sinh & Sức khỏe',
    description: 'Thích tìm hiểu cấu trúc cơ thể người, bệnh lý, dược phẩm và công nghệ y tế tiên tiến.',
    icon: 'Activity',
    tags: ['Y học', 'Dược phẩm', 'Sức khỏe']
  },

  // --- A: ARTISTIC (Nghệ Thuật / Sáng Tạo) ---
  {
    id: 'a1',
    category: 'A',
    categoryName: 'Artistic - Nghệ Thuật / Sáng Tạo',
    title: 'Hội họa & Thiết kế Đồ họa (Design)',
    description: 'Đam mê vẽ, phối màu, sáng tạo nhận diện thương hiệu, hình ảnh và giao diện người dùng (UI/UX).',
    icon: 'Palette',
    tags: ['Hội họa', 'Thiết kế', 'Màu sắc']
  },
  {
    id: 'a2',
    category: 'A',
    categoryName: 'Artistic - Nghệ Thuật / Sáng Tạo',
    title: 'Sáng tác Viết lách & Kịch bản',
    description: 'Thích dùng ngôn từ để sáng tác câu chuyện, bài viết cảm xúc, kịch bản phim hoặc thơ văn.',
    icon: 'PenTool',
    tags: ['Viết lách', 'Kịch bản', 'Ngôn từ']
  },
  {
    id: 'a3',
    category: 'A',
    categoryName: 'Artistic - Nghệ Thuật / Sáng Tạo',
    title: 'Âm nhạc & Trình diễn Sân khấu',
    description: 'Thích chơi nhạc cụ, ca hát, sáng tác nhạc hoặc tham gia các hoạt động biểu diễn kịch nghệ.',
    icon: 'Music',
    tags: ['Âm nhạc', 'Trình diễn', 'Sân khấu']
  },
  {
    id: 'a4',
    category: 'A',
    categoryName: 'Artistic - Nghệ Thuật / Sáng Tạo',
    title: 'Nhiếp ảnh & Quay phim Sáng tạo',
    description: 'Hứng thú với việc ghi lại góc nhìn nghệ thuật qua ống kính camera, dựng phim và màu sắc điện ảnh.',
    icon: 'Camera',
    tags: ['Nhiếp ảnh', 'Quay phim', 'Điện ảnh']
  },
  {
    id: 'a5',
    category: 'A',
    categoryName: 'Artistic - Nghệ Thuật / Sáng Tạo',
    title: 'Thời trang & Lối sống Sáng tạo',
    description: 'Đam mê phối đồ thời trang, làm mới không gian sống, phong cách cá nhân đầy khác biệt.',
    icon: 'Sparkles',
    tags: ['Thời trang', 'Phong cách', 'Thẩm mỹ']
  },
  {
    id: 'a6',
    category: 'A',
    categoryName: 'Artistic - Nghệ Thuật / Sáng Tạo',
    title: 'Tự do Sáng tạo Không Khuôn mẫu',
    description: 'Ghét sự lặp đi lặp lại cứng nhắc, thích thể hiện cái tôi cá nhân độc đáo trong mọi sản phẩm.',
    icon: 'Feather',
    tags: ['Tự do', 'Độc đáo', 'Cái tôi']
  },

  // --- S: SOCIAL (Xã Hội / Giúp Đỡ) ---
  {
    id: 's1',
    category: 'S',
    categoryName: 'Social - Xã Hội / Giúp Đỡ',
    title: 'Giảng dạy & Truyền đạt Tri thức',
    description: 'Yêu thích việc hướng dẫn, giảng dạy và giúp đỡ học sinh / đồng nghiệp nâng cao kỹ năng.',
    icon: 'GraduationCap',
    tags: ['Giảng dạy', 'Đào tạo', 'Hướng dẫn']
  },
  {
    id: 's2',
    category: 'S',
    categoryName: 'Social - Xã Hội / Giúp Đỡ',
    title: 'Tư vấn Tâm lý & Chia sẻ Cảm xúc',
    description: 'Lắng nghe chân thành, thấu hiểu khó khăn và đưa ra lời khuyên động viên tinh thần cho người khác.',
    icon: 'HeartHandshake',
    tags: ['Tâm lý', 'Lắng nghe', 'Tư vấn']
  },
  {
    id: 's3',
    category: 'S',
    categoryName: 'Social - Xã Hội / Giúp Đỡ',
    title: 'Hoạt động Tình nguyện & Cộng đồng',
    description: 'Tích cực tham gia các chương trình thiện nguyện, dự án phi lợi nhuận vì sự phát triển xã hội.',
    icon: 'Users',
    tags: ['Tình nguyện', 'Cộng đồng', 'Cống hiến']
  },
  {
    id: 's4',
    category: 'S',
    categoryName: 'Social - Xã Hội / Giúp Đỡ',
    title: 'Chăm sóc Sức khỏe & Y tế',
    description: 'Tận tụy chăm sóc bệnh nhân, người già hoặc trẻ em với tấm lòng bao dung và kiên nhẫn.',
    icon: 'ShieldHeader',
    tags: ['Chăm sóc', 'Y tế', 'Tận tụy']
  },
  {
    id: 's5',
    category: 'S',
    categoryName: 'Social - Xã Hội / Giúp Đỡ',
    title: 'Hòa giải & Kết nối Nhân sự',
    description: 'Giỏi lắng nghe hai phía, hòa giải tranh chấp và xây dựng môi trường tập thể gắn kết.',
    icon: 'Smile',
    tags: ['Hòa giải', 'Gắn kết', 'Nhân văn']
  },
  {
    id: 's6',
    category: 'S',
    categoryName: 'Social - Xã Hội / Giúp Đỡ',
    title: 'Đón tiếp & Dịch vụ Khách hàng',
    description: 'Hòa nhã, chu đáo trong việc tiếp đón, mang lại sự hài lòng tối đa cho khách hàng.',
    icon: 'UserCheck',
    tags: ['Dịch vụ', 'Chu đáo', 'Tiếp đón']
  },

  // --- E: ENTERPRISING (Dẫn Dắt / Thuyết Phục) ---
  {
    id: 'e1',
    category: 'E',
    categoryName: 'Enterprising - Dẫn Dắt / Thuyết Phục',
    title: 'Khởi nghiệp & Kinh doanh (Entrepreneur)',
    description: 'Khao khát thành lập công ty, làm chủ dự án và tự tay xây dựng đế chế kinh doanh.',
    icon: 'Rocket',
    tags: ['Khởi nghiệp', 'Kinh doanh', 'Thách thức']
  },
  {
    id: 'e2',
    category: 'E',
    categoryName: 'Enterprising - Dẫn Dắt / Thuyết Phục',
    title: 'Bán hàng & Đàm phán Thương mại',
    description: 'Đam mê thuyết phục khách hàng, chốt hợp đồng và đàm phán mang lại lợi nhuận cao.',
    icon: 'DollarSign',
    tags: ['Bán hàng', 'Đàm phán', 'Chốt deal']
  },
  {
    id: 'e3',
    category: 'E',
    categoryName: 'Enterprising - Dẫn Dắt / Thuyết Phục',
    title: 'Lãnh đạo & Quản lý Đội ngũ',
    description: 'Thích đứng đầu tổ chức, phân công nhiệm vụ và chỉ đạo nhóm đạt chỉ tiêu kinh doanh.',
    icon: 'Crown',
    tags: ['Lãnh đạo', 'Quản lý', 'Dẫn dắt']
  },
  {
    id: 'e4',
    category: 'E',
    categoryName: 'Enterprising - Dẫn Dắt / Thuyết Phục',
    title: 'Diễn thuyết & Truyền thông Đối ngoại',
    description: 'Tự tin đứng trước đám đông, trình bày bài phát biểu ấn tượng và thu hút công chúng.',
    icon: 'Megaphone',
    tags: ['Diễn thuyết', 'Thu hút', 'Công chúng']
  },
  {
    id: 'e5',
    category: 'E',
    categoryName: 'Enterprising - Dẫn Dắt / Thuyết Phục',
    title: 'Đầu tư & Chinh phục Thị trường',
    description: 'Chấp nhận mạo hiểm có tính toán để đầu tư tài chính, chứng khoán hoặc bất động sản.',
    icon: 'TrendingUp',
    tags: ['Đầu tư', 'Thị trường', 'Mạo hiểm']
  },
  {
    id: 'e6',
    category: 'E',
    categoryName: 'Enterprising - Dẫn Dắt / Thuyết Phục',
    title: 'Thương lượng & Bảo vệ Dự án',
    description: 'Mạnh mẽ tranh luận, thuyết phục các đối tác và nhà đầu tư rót vốn cho ý tưởng.',
    icon: 'Target',
    tags: ['Thương lượng', 'Rót vốn', 'Đối tác']
  },

  // --- C: CONVENTIONAL (Nghiệp Vụ / Mẫu Mực) ---
  {
    id: 'c1',
    category: 'C',
    categoryName: 'Conventional - Nghiệp Vụ / Mẫu Mực',
    title: 'Kế toán & Quản lý Sổ sách Tài chính',
    description: 'Cẩn thận tính toán thu chi, lập báo cáo tài chính và lưu trữ chứng từ chính xác.',
    icon: 'Calculator',
    tags: ['Kế toán', 'Sổ sách', 'Chính xác']
  },
  {
    id: 'c2',
    category: 'C',
    categoryName: 'Conventional - Nghiệp Vụ / Mẫu Mực',
    title: 'Kiểm soát Quy trình & Soát lỗi (QA/QC)',
    description: 'Thích kiểm tra từng chi tiết nhỏ, đảm bảo công việc tuân thủ 100% đúng quy định.',
    icon: 'CheckSquare',
    tags: ['Kiểm soát', 'Soát lỗi', 'Quy trình']
  },
  {
    id: 'c3',
    category: 'C',
    categoryName: 'Conventional - Nghiệp Vụ / Mẫu Mực',
    title: 'Quản trị Văn phòng & Lưu trữ Hồ sơ',
    description: 'Thích sắp xếp tài liệu ngăn nắp, phân loại dữ liệu và duy trì trật tự làm việc khoa học.',
    icon: 'FolderArchive',
    tags: ['Văn phòng', 'Lưu trữ', 'Trật tự']
  },
  {
    id: 'c4',
    category: 'C',
    categoryName: 'Conventional - Nghiệp Vụ / Mẫu Mực',
    title: 'Nhập liệu & Quản lý Cơ sở Dữ liệu',
    description: 'Làm việc tỉ mỉ với các bảng tính Excel, hệ thống ERP và nhập liệu chính xác cao.',
    icon: 'Database',
    tags: ['Nhập liệu', 'Bảng tính', 'Dữ liệu']
  },
  {
    id: 'c5',
    category: 'C',
    categoryName: 'Conventional - Nghiệp Vụ / Mẫu Mực',
    title: 'Thực thi Pháp lý & Tuân thủ Luật pháp',
    description: 'Nghiêm túc áp dụng các điều khoản pháp lý, hợp đồng và tiêu chuẩn quy định.',
    icon: 'Scale',
    tags: ['Pháp lý', 'Quy định', 'Tuân thủ']
  },
  {
    id: 'c6',
    category: 'C',
    categoryName: 'Conventional - Nghiệp Vụ / Mẫu Mực',
    title: 'Lập Kế hoạch & Checklist Chi tiết',
    description: 'Lên thời khóa biểu chi tiết, danh sách việc cần làm (To-do list) và thực hiện kỷ luật.',
    icon: 'ListTodo',
    tags: ['Kế hoạch', 'Checklist', 'Kỷ luật']
  }
];
