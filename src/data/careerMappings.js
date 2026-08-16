// Gợi ý Nghề nghiệp & Ngành học Chuyên biệt cho Sinh viên/Học sinh và Người đi làm

export const CAREER_MAPPINGS = {
  'D': {
    student: {
      majors: [
        { name: 'Quản trị Kinh doanh (BBA)', match: 95, reason: 'Phát huy tối đa tư duy lãnh đạo, quản lý và định hướng kết quả.' },
        { name: 'Kinh doanh Quốc tế & Thương mại', match: 92, reason: 'Phù hợp với tính cách xông xáo, dám thách thức và đàm phán.' },
        { name: 'Luật học & Luật Kinh tế', match: 90, reason: 'Tư duy sắc bén, lập luận quyết đoán và bảo vệ quan điểm.' },
        { name: 'Công nghệ Thông tin / Quản lý Dự án IT', match: 88, reason: 'Lãnh đạo đội ngũ kỹ thuật và giải quyết các bài toán công nghệ lớn.' },
        { name: 'Tài chính - Ngân hàng / Đầu tư', match: 86, reason: 'Chịu được áp lực cao, quyết đoán trong các quyết định tài chính.' }
      ],
      clubRoles: [
        'Chủ tịch / Trưởng ban Điều hành Câu lạc bộ',
        'Trưởng ban Đối ngoại / Tài trợ',
        'Đội trưởng đội thi Startup / Hackathon',
        'Trưởng BTC sự kiện quy mô lớn'
      ],
      softSkills: [
        'Kỹ năng lắng nghe tích cực và quản lý cảm xúc (EQ)',
        'Kỹ năng ủy quyền và tin tưởng đồng đội',
        'Kỹ năng đàm phán mềm mỏng',
        'Quản lý xung đột theo hướng xây dựng'
      ],
      internships: [
        'Thực tập sinh Quản trị Tập sự (Management Trainee)',
        'Trợ lý Giám đốc / Trợ lý Quản lý Dự án',
        'Thực tập sinh Phát triển Kinh doanh (Business Development Intern)'
      ]
    },
    professional: {
      careers: [
        { title: 'Giám đốc Điều hành (CEO) / Giám đốc Vận hành (COO)', match: 98, desc: 'Dẫn dắt tổ chức, đưa ra chiến lược và chịu trách nhiệm về kết quả kinh doanh.' },
        { title: 'Trưởng phòng Phát triển Kinh doanh (BDM)', match: 95, desc: 'Khai phá thị trường mới, đàm phán hợp đồng giá trị cao.' },
        { title: 'Quản lý Dự án (Project Manager)', match: 92, desc: 'Thúc đẩy tiến độ, kiểm soát nguồn lực và đảm bảo KPIs dự án.' },
        { title: 'Chuyên gia Chiến lược / Tư vấn Quản trị', match: 90, desc: 'Tái cấu trúc doanh nghiệp và giải quyết vấn đề tăng trưởng.' },
        { title: 'Luật sư Thương mại / Trưởng ban Pháp chế', match: 88, desc: 'Đại diện đàm phán và xử lý các tranh chấp pháp lý phức tạp.' }
      ],
      leadershipStyle: 'Lãnh đạo độc đoán / Định hướng mục tiêu (Autocratic & Results-driven). Bạn tạo động lực bằng thử thách và yêu cầu hiệu suất tối đa.',
      stressManagement: 'Tránh quá tải bằng cách ủy quyền công việc chi tiết cho cấp dưới. Dành thời gian tập thể thao hoặc thiền để giải tỏa năng lượng tích cực.',
      recommendedCertificates: ['Chứng chỉ Quản lý Dự án PMP®', 'Bằng MBA Quản trị Kinh doanh', 'Chứng chỉ Lãnh đạo Chiến lược']
    }
  },

  'I': {
    student: {
      majors: [
        { name: 'Truyền thông Mới & Quản trị Truyền thông', match: 96, reason: 'Phát huy năng khiếu sáng tạo nội dung, giao tiếp và lan tỏa thông điệp.' },
        { name: 'Marketing & Quảng cáo (Digital Marketing)', match: 94, reason: 'Tối ưu hóa khả năng hiểu tâm lý khách hàng và bắt xu hướng.' },
        { name: 'Quan hệ Công chúng (PR) & Event Management', match: 92, reason: 'Môi trường kết nối xã hội sôi nổi, sáng tạo và tự do.' },
        { name: 'Ngôn ngữ Anh / Du lịch - Khách sạn', match: 88, reason: 'Giao lưu văn hóa, ngoại giao và tạo sự thiện cảm.' },
        { name: 'Tâm lý học / Sư phạm', match: 85, reason: 'Truyền cảm hứng, kết nối tâm hồn và thấu hiểu con người.' }
      ],
      clubRoles: [
        'Trưởng ban Truyền thông & Event',
        'MC / Host chương trình sinh viên',
        'Phụ trách Đối ngoại & Sáng tạo Nội dung',
        'Đại sứ hình ảnh sinh viên'
      ],
      softSkills: [
        'Kỹ năng lập kế hoạch và quản lý thời gian (Time Management)',
        'Kỹ năng tập trung chi tiết và theo đuổi mục tiêu đến cùng',
        'Tư duy phân tích số liệu thực tế',
        'Quản lý cảm xúc khi gặp phản hồi tiêu cực'
      ],
      internships: [
        'Thực tập sinh Marketing / Content Creator',
        'Thực tập sinh Tổ chức Sự kiện / PR',
        'Thực tập sinh Chăm sóc Khách hàng / Sales Executive'
      ]
    },
    professional: {
      careers: [
        { title: 'Giám đốc Marketing (CMO) / Creative Director', match: 97, desc: 'Định hình thương hiệu, dẫn dắt các chiến dịch sáng tạo bứt phá.' },
        { title: 'Trưởng phòng Quan hệ Công chúng (PR Manager)', match: 95, desc: 'Xây dựng mối quan hệ với báo chí, đối tác và công chúng.' },
        { title: 'Chuyên gia Đào tạo / Diễn giả (Corporate Trainer)', match: 93, desc: 'Truyền cảm hứng, đào tạo kỹ năng mềm và phát triển nhân sự.' },
        { title: 'Giám đốc Kênh Phân phối / Quản lý Bán hàng (Sales Manager)', match: 90, desc: 'Thu hút khách hàng và xây dựng đội ngũ kinh doanh nhiệt huyết.' },
        { title: 'Chuyên gia Truyền thông Nội bộ (Internal Comms)', match: 88, desc: 'Gắn kết văn hóa doanh nghiệp và tạo năng lượng tích cực.' }
      ],
      leadershipStyle: 'Lãnh đạo Truyền cảm hứng (Transformational & Democratic). Bạn quy tụ mọi người bằng tầm nhìn tươi sáng và sự động viên tinh thần.',
      stressManagement: 'Lập checklist công việc rõ ràng mỗi sáng để tránh xao nhãng. Tìm không gian yên tĩnh để tái tạo năng lượng sáng tạo.',
      recommendedCertificates: ['Digital Marketing Professional', 'Public Speaking & Presentation Mastery', 'Content Strategy Certification']
    }
  },

  'S': {
    student: {
      majors: [
        { name: 'Quản trị Nhân sự (Human Resources Management)', match: 96, reason: 'Tận tụy, thấu hiểu, lắng nghe và chăm sóc sự phát triển của con người.' },
        { name: 'Sư phạm / Giáo dục & Đào tạo', match: 94, reason: 'Kiên nhẫn truyền đạt tri thức và đồng hành cùng thế hệ trẻ.' },
        { name: 'Y khoa / Dược khoa / Điều dưỡng / Y tế Cộng đồng', match: 92, reason: 'Chăm sóc sức khỏe chân thành, kiên trì và chu đáo.' },
        { name: 'Tâm lý học Tư vấn & Công tác Xã hội', match: 90, reason: 'Lắng nghe sâu sắc, hỗ trợ tinh thần cho cộng đồng.' },
        { name: 'Hành chính - Văn phòng / Quản trị Công', match: 88, reason: 'Duy trì sự ổn định, cẩn thận và trách nhiệm lâu dài.' }
      ],
      clubRoles: [
        'Trưởng/Phó ban Nhân sự (HR Club)',
        'Thành viên ban Hậu cần / Chăm sóc Sinh viên',
        'Tình nguyện viên nòng cốt các chiến dịch Xã hội',
        'Thủ quỹ / Ban Thư ký'
      ],
      softSkills: [
        'Kỹ năng đưa ra phản hồi dứt khoát và từ chối khéo léo (Assertiveness)',
        'Kỹ năng thích ứng với thay đổi nhanh (Agility)',
        'Kỹ năng tư duy phản biện (Critical Thinking)',
        'Bảo vệ quan điểm cá nhân trước áp lực tập thể'
      ],
      internships: [
        'Thực tập sinh Tuyển dụng & HR',
        'Thực tập sinh Hành chính - Thư ký',
        'Thực tập sinh Chăm sóc Khách hàng chuyên sâu (Customer Success)'
      ]
    },
    professional: {
      careers: [
        { title: 'Giám đốc / Trưởng phòng Nhân sự (HRD / HRM)', match: 98, desc: 'Xây dựng chính sách nhân sự, gắn kết người lao động và phát triển tổ chức.' },
        { title: 'Chuyên gia Tư vấn Tâm lý / Thợ hòa giải', match: 94, desc: 'Hỗ trợ giải tỏa căng thẳng và tư duy cho cá nhân/tập thể.' },
        { title: 'Bác sĩ / Chuyên gia Y tế / Quản lý Y tế', match: 93, desc: 'Tận tụy cứu chữa và nâng cao sức khỏe cộng đồng.' },
        { title: 'Quản lý Dịch vụ Khách hàng (Customer Support Manager)', match: 90, desc: 'Duy trì sự hài lòng bền vững và trải nghiệm khách hàng.' },
        { title: 'Giảng viên Đại học / Chuyên gia Đào tạo Kỹ năng', match: 89, desc: 'Truyền thụ tri thức bài bản và kiên nhẫn với người học.' }
      ],
      leadershipStyle: 'Lãnh đạo Phục vụ (Servant Leadership). Bạn luôn quan tâm, hỗ trợ và tạo môi trường an toàn để cấp dưới phát huy năng lực.',
      stressManagement: 'Học cách từ chối các yêu cầu ngoài phạm vi trách nhiệm. Chia sẻ cảm xúc với bạn bè thân thiết thay vì giữ trong lòng.',
      recommendedCertificates: ['SHRM-CP / PHR Human Resources', 'Professional Coaching (ICF)', 'Customer Experience (CX) Certification']
    }
  },

  'C': {
    student: {
      majors: [
        { name: 'Khoa học Máy tính & Kỹ thuật Phần mềm (Software Engineering)', match: 97, reason: 'Tư duy logic sắc bén, kỷ luật và phân tích hệ thống hoàn hảo.' },
        { name: 'Kế toán - Kiểm toán (ACCA / CPA)', match: 95, reason: 'Đòi hỏi sự chính xác tuyệt đối, cẩn trọng với các con số và pháp lý.' },
        { name: 'Khoa học Dữ liệu (Data Science) & Phân tích Kinh doanh (BI)', match: 94, reason: 'Nghiên cứu số liệu, phát hiện quy luật và đưa ra báo cáo khách quan.' },
        { name: 'Kỹ thuật Cơ khí / Điện - Điện tử / Tự động hóa', match: 90, reason: 'Tân tụy với kỹ thuật, chuẩn mực chất lượng và tính toán chính xác.' },
        { name: 'Tài chính Định lượng & Quản trị Rủi ro', match: 89, reason: 'Xây dựng mô hình tài chính và phòng ngừa rủi ro cho doanh nghiệp.' }
      ],
      clubRoles: [
        'Trưởng ban Tài chính / Thư ký Chuyên môn',
        'Chuyên gia Kiểm duyệt Nội dung / Chất lượng',
        'Trưởng nhóm Lập trình / Kỹ thuật',
        'Thành viên Đội tuyển Nghiên cứu Khoa học'
      ],
      softSkills: [
        'Kỹ năng giao tiếp và truyền đạt thông tin đơn giản cho người ngoài ngành',
        'Kỹ năng chấp nhận sai sót như một phần của quá trình học hỏi',
        'Kỹ năng làm việc nhóm linh hoạt',
        'Quản lý sự cầu toàn để đảm bảo tiến độ'
      ],
      internships: [
        'Thực tập sinh Kiểm toán / Kế toán',
        'Thực tập sinh Lập trình viên / QA Tester',
        'Thực tập sinh Phân tích Dữ liệu (Data Analyst Intern)'
      ]
    },
    professional: {
      careers: [
        { title: 'Giám đốc Tài chính (CFO) / Trưởng ban Kiểm toán', match: 98, desc: 'Quản lý dòng tiền, kiểm soát rủi ro tài chính và tuân thủ pháp luật.' },
        { title: 'Kiến trúc sư Phần mềm (Software Architect) / Principal Engineer', match: 96, desc: 'Thiết kế hệ thống công nghệ phức tạp với độ tin cậy tuyệt đối.' },
        { title: 'Chuyên gia Phân tích Dữ liệu / Data Scientist Senior', match: 94, desc: 'Khai phá dữ liệu lớn để cung cấp thông tin chiến lược cho doanh nghiệp.' },
        { title: 'Quản lý Chất lượng (QA/QC Manager)', match: 92, desc: 'Đảm bảo tiêu chuẩn sản xuất và dịch vụ đạt mức hoàn hảo.' },
        { title: 'Chuyên gia Phân tích Quản trị Rủi ro (Risk Management Expert)', match: 90, desc: 'Dự báo và thiết lập lá chắn bảo vệ doanh nghiệp.' }
      ],
      leadershipStyle: 'Lãnh đạo Chuẩn mực & Chuyên môn (Pacesetting & Technical Leader). Bạn dẫn dắt bằng tấm gương làm việc chính xác và hiểu biết sâu sắc.',
      stressManagement: 'Chấp nhận nguyên tắc "Đủ tốt để vận hành" thay vì luôn đòi hỏi 100% hoàn hảo. Thư giãn bằng các hoạt động trí tuệ hoặc âm nhạc.',
      recommendedCertificates: ['Chứng chỉ ACCA / CPA Kiểm toán', 'AWS Certified Solutions Architect', 'Certificated Data Analyst (CBAP)']
    }
  }
};
