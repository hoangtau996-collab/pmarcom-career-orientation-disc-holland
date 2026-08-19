// Bộ dữ liệu chi tiết 16 Nhóm Tính Cách MBTI (Myers-Briggs Type Indicator)

export const MBTI_PROFILES = {
  // --- ANALYSTS (NT) ---
  INTJ: {
    code: 'INTJ',
    group: 'Analysts',
    groupNameVi: 'Nhóm Nhà Phân Tích',
    name: 'Nhà Chiến Lược (Architect)',
    tagline: 'Tư duy chiến lược, tầm nhìn xa và sự độc lập tuyệt đối',
    overview: 'INTJ là những nhà tưởng tượng có tư duy chiến lược cực kỳ nhạy bén, luôn có kế hoạch cho mọi tình huống. Họ độc lập, cầu toàn và khao khát tự chủ trong tư duy lẫn công việc.',
    strengths: ['Tư duy chiến lược độc lập', 'Khả năng phân tích hệ thống sâu', 'Tự tin và kiên định với mục tiêu', 'Giải quyết vấn đề phức tạp'],
    blindspots: ['Dễ kiêu ngạo hoặc quá khắt khe với người khác', 'Thiếu kiên nhẫn với sự thiếu hiệu quả', 'Khó thể hiện cảm xúc cá nhân'],
    careerSuggestions: ['Kiến trúc cơ sở dữ liệu / IT', 'Quản trị chiến lược doanh nghiệp', 'Phân tích tài chính / Đầu tư', 'Chuyên gia tư vấn quản trị'],
    academyRecommendation: 'Khóa học Data Analytics & Performance Marketing Strategy 2026 tại P Marcom Academy.'
  },
  INTP: {
    code: 'INTP',
    group: 'Analysts',
    groupNameVi: 'Nhóm Nhà Phân Tích',
    name: 'Nhà Tư Duy (Logician)',
    tagline: 'Sáng tạo tri thức, tư duy thấu đáo và đam mê khám phá sự thật',
    overview: 'INTP là những nhà phát minh sáng tạo với niềm đam mê bất tận với tri thức và sự logic. Họ luôn tìm kiếm các mô hình lý thuyết và cách thức cải tiến hệ thống.',
    strengths: ['Tư duy logic sắc bén', 'Đam mê khám phá lý thuyết mới', 'Sáng tạo và linh hoạt', 'Khách quan tuyệt đối'],
    blindspots: ['Dễ bị phân tâm bởi nhiều ý tưởng', 'Khó chia sẻ cảm xúc cá nhân', 'Thiếu kiên nhẫn với các chi tiết hành chính'],
    careerSuggestions: ['Kỹ sư phần mềm / AI Research', 'Chuyên gia nghiên cứu R&D', 'Nhà phân tích dữ liệu', 'Viết lách chuyên sâu'],
    academyRecommendation: 'Khóa học Ứng dụng AI & Automation Tools 2026 tại P Marcom Academy.'
  },
  ENTJ: {
    code: 'ENTJ',
    group: 'Analysts',
    groupNameVi: 'Nhóm Nhà Phân Tích',
    name: 'Nhà Điều Hành (Commander)',
    tagline: 'Lãnh đạo quyết đoán, định hình tầm nhìn và thúc đẩy kết quả',
    overview: 'ENTJ là những nhà lãnh đạo bẩm sinh với quyết tâm cao độ và khả năng tổ chức nhân sự hiệu quả để chinh phục các mục tiêu tham vọng.',
    strengths: ['Khả năng lãnh đạo truyền cảm hứng', 'Quyết đoán và có chiến lược', 'Tối ưu hóa quy trình làm việc', 'Tự tin vươn lên đỉnh cao'],
    blindspots: ['Có thể quá áp đặt hoặc cứng rắn', 'Dễ bỏ qua khía cạnh cảm xúc của người khác', 'Không chấp nhận sự thiếu năng lực'],
    careerSuggestions: ['Giám đốc điều hành (CEO / COO)', 'Giám đốc Marketing (CMO)', 'Chuyên gia phát triển kinh doanh', 'Quản lý dự án cao cấp'],
    academyRecommendation: 'Khóa học Executive Digital Marketing Leadership 2026 tại P Marcom Academy.'
  },
  ENTP: {
    code: 'ENTP',
    group: 'Analysts',
    groupNameVi: 'Nhóm Nhà Phân Tích',
    name: 'Nhà Phát Minh (Debater)',
    tagline: 'Tư duy bứt phá, đam mê thử thách và linh hoạt vượt trội',
    overview: 'ENTP là những người tư duy nhanh nhạy, thích tranh luận lý lẽ và không ngần ngại phá vỡ các giới hạn cũ để kiến tạo những ý tưởng đột phá.',
    strengths: ['Tư duy bứt phá ngoài chiếc hộp', 'Nhanh trí và tài giao thiệp', 'Khả năng thích ứng cực cao', 'Truyền năng lượng đổi mới'],
    blindspots: ['Dễ bỏ dở công việc khi mất cảm hứng', 'Thích tranh luận gây căng thẳng không cần thiết', 'Ghét các công việc lặp đi lặp lại'],
    careerSuggestions: ['Chuyên gia sáng tạo Content Strategy', 'Khởi nghiệp Innovation Hub', 'Giám đốc ý tưởng Quảng cáo', 'Chuyên gia tư vấn Growth Growth Marketing'],
    academyRecommendation: 'Khóa học AI Content Creation & Growth Hacking 2026 tại P Marcom Academy.'
  },

  // --- DIPLOMATS (NF) ---
  INFJ: {
    code: 'INFJ',
    group: 'Diplomats',
    groupNameVi: 'Nhóm Nhà Lý Tưởng',
    name: 'Nhà Cố Vấn (Advocate)',
    tagline: 'Sâu sắc, thấu cảm và kiên định với lý tưởng cao đẹp',
    overview: 'INFJ là những người có tâm hồn sâu sắc, giàu lòng vị tha và luôn tìm kiếm ý nghĩa chân chính để giúp đỡ người khác phát triển tối đa tiềm năng.',
    strengths: ['Thấu hiểu tâm lý con người', 'Có lý tưởng và sứ mệnh rõ ràng', 'Sáng tạo và giao tiếp sâu sắc', 'Kiên trì với giá trị đạo đức'],
    blindspots: ['Dễ bị kiệt sức vì quan tâm quá mức', 'Cực kỳ nhạy cảm với lời phê bình', 'Kín kẽ và khó mở lòng hoàn toàn'],
    careerSuggestions: ['Chuyên gia tâm lý học / Mentoring', 'Truyền thông thương hiệu nhân văn', 'Quản lý đào tạo & nhân sự', 'Tác giả & Nhà biên kịch'],
    academyRecommendation: 'Khóa học Brand Storytelling & Human-centric Communication tại P Marcom Academy.'
  },
  INFP: {
    code: 'INFP',
    group: 'Diplomats',
    groupNameVi: 'Nhóm Nhà Lý Tưởng',
    name: 'Nhà Lý Tưởng Hóa (Mediator)',
    tagline: 'Chân thành, nghệ sĩ và tận tụy với giá trị nội tâm',
    overview: 'INFP là những tâm hồn lãng mạn, vị tha và sáng tạo phong phú, luôn trung thành với các nguyên tắc cá nhân và khao khát mang lại điều tốt đẹp.',
    strengths: ['Gia tăng sự hòa hợp tập thể', 'Tư duy sáng tạo & nghệ thuật', 'Tôn trọng sự đa dạng cá nhân', 'Đam mê công việc giàu ý nghĩa'],
    blindspots: ['Quá lý tưởng hóa thực tế', 'Né tránh xung đột trực tiếp', 'Khó quản lý thời gian và chi tiết số liệu'],
    careerSuggestions: ['Biên tập viên Content Marketing', 'Thiết kế trải nghiệm người dùng UI/UX', 'Chuyên viên tổ chức sự kiện phi lợi nhuận', 'Nghệ sĩ tự do'],
    academyRecommendation: 'Khóa học Content Marketing & Creative Design 2026 tại P Marcom Academy.'
  },
  ENFJ: {
    code: 'ENFJ',
    group: 'Diplomats',
    groupNameVi: 'Nhóm Nhà Lý Tưởng',
    name: 'Nhà Truyền Cảm Hứng (Protagonist)',
    tagline: 'Lãnh đạo lôi cuốn, thấu hiểu và lôi kéo sự đồng lòng',
    overview: 'ENFJ là những nhà lãnh đạo giàu sức lôi cuốn, có khả năng lắng nghe và truyền năng lượng tích cực giúp tập thể cùng hướng tới mục tiêu chung.',
    strengths: ['Khả năng truyền cảm hứng tuyệt vời', 'Kỹ năng lắng nghe & thấu cảm', 'Kết nối con người xuất sắc', 'Tổ chức sự kiện & cộng đồng'],
    blindspots: ['Dễ ôm đồm vấn đề của người khác', 'Quá nhạy cảm trước lời từ chối', 'Bỏ qua nhu cầu cá nhân'],
    careerSuggestions: ['Giám đốc truyền thông (PR Director)', 'Quản lý cộng đồng (Community Manager)', 'Chuyên gia đào tạo doanh nghiệp', 'Quản lý thương hiệu'],
    academyRecommendation: 'Khóa học Omnichannel PR & Community Engagement 2026 tại P Marcom Academy.'
  },
  ENFP: {
    code: 'ENFP',
    group: 'Diplomats',
    groupNameVi: 'Nhóm Nhà Lý Tưởng',
    name: 'Nhà Truyền Động Lực (Campaigner)',
    tagline: 'Nhiệt huyết, sáng tạo vô tận và kết nối tự do',
    overview: 'ENFP là những tâm hồn tự do, giàu năng lượng tích cực và luôn tìm thấy niềm vui trong việc tạo ra các ý tưởng sáng tạo độc đáo.',
    strengths: ['Sáng tạo ý tưởng phong phú', 'Kỹ năng giao tiếp truyền lửa', 'Nhiệt huyết & năng động', 'Dễ dàng kết nối với mọi người'],
    blindspots: ['Khó duy trì sự tập trung dài hạn', 'Quá nhiều ý tưởng nhưng thiếu thực thi', 'Dễ suy nghĩ quá mức (Overthinking)'],
    careerSuggestions: ['Chuyên viên sáng tạo nội dung TikTok / Reels', 'Chuyên viên hoạch định chiến dịch Marketing', 'Truyền thông & PR', 'Tổ chức sự kiện sáng tạo'],
    academyRecommendation: 'Khóa học Short-form Video & Viral Content Strategy tại P Marcom Academy.'
  },

  // --- SENTINELS (SJ) ---
  ISTJ: {
    code: 'ISTJ',
    group: 'Sentinels',
    groupNameVi: 'Nhóm Nhà Quản Trị',
    name: 'Nhà Quản Trị (Inspector)',
    tagline: 'Cẩn trọng, nguyên tắc, trách nhiệm và kỷ luật sắt đá',
    overview: 'ISTJ là những người tận tụy, thực tế và coi trọng tính kỷ luật. Họ làm việc có hệ thống, luôn đảm bảo hoàn thành nhiệm vụ đúng chuẩn mực.',
    strengths: ['Tinh thần trách nhiệm và kỷ luật cao', 'Tỉ mỉ, cẩn trọng với số liệu', 'Tổ chức công việc khoa học', 'Trung thành và đáng tin cậy'],
    blindspots: ['Đôi khi quá cứng nhắc với quy trình', 'Khó chấp nhận sự thay đổi đột ngột', 'Đánh giá thấp các ý tưởng chưa kiểm chứng'],
    careerSuggestions: ['Chuyên gia SEO & Web Analytics', 'Kế toán / Kiểm toán viên', 'Chuyên viên quản trị cơ sở dữ liệu', 'Quản lý chất lượng (QA)'],
    academyRecommendation: 'Khóa học SEO Audit & Technical Web Performance 2026 tại P Marcom Academy.'
  },
  ISFJ: {
    code: 'ISFJ',
    group: 'Sentinels',
    groupNameVi: 'Nhóm Nhà Quản Trị',
    name: 'Nhà Nuôi Dưỡng (Protector)',
    tagline: 'Tận tụy, chu đáo, bảo vệ và thầm lặng cống hiến',
    overview: 'ISFJ là những người ấm áp, chu đáo và cẩn thận, luôn âm thầm cống hiến để đảm bảo môi trường xung quanh hoạt động trơn tru và an toàn.',
    strengths: ['Tận tụy và chu đáo tuyệt đối', 'Kỹ năng quan sát chi tiết con người', 'Trung thành và đáng tin cậy', 'Tổ chức công việc gọn gàng'],
    blindspots: ['Khó từ chối yêu cầu của người khác', 'Dễ bị quá tải vì âm thầm chịu đựng', 'Ngại ngùng trước sự thay đổi lớn'],
    careerSuggestions: ['Chuyên viên chăm sóc khách hàng (CRM)', 'Quản trị nhân sự & Phúc lợi', 'Quản lý nội dung thương hiệu', 'Thư ký / Trợ lý quản lý'],
    academyRecommendation: 'Khóa học Customer Experience (CX) & CRM Strategy tại P Marcom Academy.'
  },
  ESTJ: {
    code: 'ESTJ',
    group: 'Sentinels',
    groupNameVi: 'Nhóm Nhà Quản Trị',
    name: 'Nhà Quản Lý (Executive)',
    tagline: 'Quyết đoán, quy chuẩn, điều hành và thực thi nguyên tắc',
    overview: 'ESTJ là những đại diện của trật tự và kỷ luật. Họ giỏi quản lý con người và dự án dựa trên các quy chuẩn rõ ràng và tính thiết thực.',
    strengths: ['Khả năng tổ chức & điều hành xuất sắc', 'Quyết đoán, rõ ràng trong chỉ đạo', 'Tận tụy và tuân thủ cam kết', 'Tối ưu hóa hiệu suất làm việc'],
    blindspots: ['Có thể bị coi là độc đoán hoặc thô bạo', 'Khó chấp nhận tính ngẫu hứng', 'Quá chú trọng vào quy tắc cũ'],
    careerSuggestions: ['Giám đốc vận hành (COO)', 'Quản lý chiến dịch Performance Ads', 'Giám đốc chuỗi cung ứng', 'Quản lý dự án doanh nghiệp'],
    academyRecommendation: 'Khóa học Performance Digital Marketing & Ad Budget Optimization tại P Marcom Academy.'
  },
  ESFJ: {
    code: 'ESFJ',
    group: 'Sentinels',
    groupNameVi: 'Nhóm Nhà Quản Trị',
    name: 'Nhà Quan Tâm (Consul)',
    tagline: 'Hòa nhã, chu đáo, gắn kết cộng đồng và tận tâm',
    overview: 'ESFJ là những người cởi mở, chu đáo và tràn đầy năng lượng tích cực, luôn nỗ lực xây dựng một cộng đồng đoàn kết và hỗ trợ lẫn nhau.',
    strengths: ['Giao tiếp và xây dựng mối quan hệ giỏi', 'Tận tâm chăm sóc tập thể', 'Tổ chức sự kiện & hậu cần tốt', 'Tạo không khí làm việc vui vẻ'],
    blindspots: ['Quá bận tâm đến đánh giá của người khác', 'Dễ bị tổn thương khi bị phớt lờ', 'Khó đưa ra quyết định gây mất lòng'],
    careerSuggestions: ['Chuyên viên quan hệ công chúng (PR)', 'Quản lý quan hệ khách hàng', 'Tổ chức sự kiện doanh nghiệp', 'Truyền thông nội bộ (Internal Comms)'],
    academyRecommendation: 'Khóa học Corporate Communication & PR Event Planning tại P Marcom Academy.'
  },

  // --- EXPLORERS (SP) ---
  ISTP: {
    code: 'ISTP',
    group: 'Explorers',
    groupNameVi: 'Nhóm Nhà Khám Phá',
    name: 'Nhà Kỹ Thuật (Craftsman)',
    tagline: 'Thực tế, khéo léo, linh hoạt ứng biến và giỏi giải quyết vấn đề',
    overview: 'ISTP là những người có đôi tay khéo léo và trí óc thực tế. Họ thích khám phá cách thức hoạt động của công cụ và giải quyết rắc rối kỹ thuật.',
    strengths: ['Giải quyết sự cố kỹ thuật cực nhanh', 'Linh hoạt ứng biến trong khủng hoảng', 'Thực tế và có tư duy logic tốt', 'Giữ bình tĩnh dưới áp lực'],
    blindspots: ['Khó cam kết lâu dài với kế hoạch cứng', 'Dễ bị coi là lạnh lùng, thiếu quan tâm', 'Mau chán với công việc lý thuyết'],
    careerSuggestions: ['Kỹ sư công nghệ / Web Developer', 'Chuyên gia tối ưu hóa quảng cáo (Ads Tracking)', 'Nhà thiết kế sản phẩm', 'Chuyên gia phân tích hệ thống'],
    academyRecommendation: 'Khóa học Web Tracking & Conversion Rate Optimization (CRO) tại P Marcom Academy.'
  },
  ISFP: {
    code: 'ISFP',
    group: 'Explorers',
    groupNameVi: 'Nhóm Nhà Khám Phá',
    name: 'Nhà Nghệ Sĩ (Composer)',
    tagline: 'Tâm hồn nghệ sĩ, tinh tế, tự do và giàu cảm xúc',
    overview: 'ISFP là những người sống tình cảm, có thẩm mỹ cao và đam mê sáng tạo nghệ thuật. Họ thích trải nghiệm cuộc sống một cách tự nhiên và ngẫu hứng.',
    strengths: ['Góc nhìn thẩm mỹ & thị giác tinh tế', 'Chân thành và giàu lòng trắc ẩn', 'Linh hoạt thích ứng với cái mới', 'Tự do sáng tạo không giới hạn'],
    blindspots: ['Dễ bị quá tải bởi áp lực và chỉ tiêu cứng', 'Tránh né sự cạnh tranh thù hằn', 'Thiếu kế hoạch dài hạn rõ ràng'],
    careerSuggestions: ['Thiết kế đồ họa (Graphic Designer)', 'Sáng tạo hình ảnh thương hiệu (Visual Branding)', 'Nhiếp ảnh & Video Creator', 'Stylist / Fashion Marketing'],
    academyRecommendation: 'Khóa học Visual Branding & Graphic Design 2026 tại P Marcom Academy.'
  },
  ESTP: {
    code: 'ESTP',
    group: 'Explorers',
    groupNameVi: 'Nhóm Nhà Khám Phá',
    name: 'Nhà Thực Tế (Entrepreneur)',
    tagline: 'Năng động, mạo hiểm, nắm bắt cơ hội và chốt deal xuất sắc',
    overview: 'ESTP là những người tràn đầy năng lượng, thích hành động và chớp thời cơ ngay lập tức. Họ phát huy tối đa năng lực trong môi trường biến động nhanh.',
    strengths: ['Chớp thời cơ & chốt Sales xuất sắc', 'Dũng cảm, không sợ rủi ro', 'Kỹ năng thuyết phục thực tế', 'Tạo ra kết quả nhanh chóng'],
    blindspots: ['Dễ bỏ qua rủi ro dài hạn', 'Thiếu kiên nhẫn với lý thuyết suông', 'Có thể đưa ra quyết định bồng bột'],
    careerSuggestions: ['Chuyên viên chốt Sales Digital', 'Giám đốc kinh doanh vùng', 'Livestreamer & Affiliate Marketer', 'Quản lý dự án truyền thông nhanh'],
    academyRecommendation: 'Khóa học Affiliate Marketing & High-Converting Sales Funnels tại P Marcom Academy.'
  },
  ESFP: {
    code: 'ESFP',
    group: 'Explorers',
    groupNameVi: 'Nhóm Nhà Khám Phá',
    name: 'Nhà Trình Diễn (Entertainer)',
    tagline: 'Vui vẻ, lôi cuốn, lan tỏa năng lượng và làm chủ sân khấu',
    overview: 'ESFP là những người làm chủ sân khấu bẩm sinh. Họ đem lại niềm vui, sự hài hước và bầu không khí sôi động cho bất kỳ môi trường nào họ xuất hiện.',
    strengths: ['Lôi cuốn và thu hút đám đông', 'Nhiệt huyết, lạc quan tuyệt đối', 'Kỹ năng biểu diễn & tự tin', 'Dễ dàng kết bạn và tạo xu hướng'],
    blindspots: ['Khó tập trung vào mục tiêu dài hạn', 'Ngại các nhiệm vụ phân tích số liệu', 'Tránh né những chủ đề nghiêm trọng'],
    careerSuggestions: ['KOL / KOC / Content Creator', 'Chuyên viên tổ chức sự kiện giải trí', 'Đại sứ thương hiệu (Brand Ambassador)', 'MC / Người dẫn chương trình'],
    academyRecommendation: 'Khóa học Personal Branding & Influencer Marketing 2026 tại P Marcom Academy.'
  }
};
