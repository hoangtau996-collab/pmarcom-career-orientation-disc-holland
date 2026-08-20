// Gợi ý Ngành nghề & Lĩnh vực Chuyên môn Phù hợp cho Sinh viên/Học sinh và Người đi làm

export const CAREER_MAPPINGS = {
  'D': {
    student: {
      majors: [
        { name: 'Ngành Quản trị Kinh doanh & Vận hành', match: 95, reason: 'Phát huy tối đa tư duy lãnh đạo, quản lý tổ chức và định hướng kết quả.' },
        { name: 'Ngành Kinh doanh Quốc tế & Thương mại', match: 92, reason: 'Phù hợp với tính cách xông xáo, dám thách thức và đàm phán thương lượng.' },
        { name: 'Ngành Luật Thương mại & Pháp chế Doanh nghiệp', match: 90, reason: 'Tư duy sắc bén, lập luận quyết đoán và bảo vệ quan điểm chiến lược.' },
        { name: 'Ngành Công nghệ Thông tin & Quản lý Dự án IT', match: 88, reason: 'Lãnh đạo đội ngũ kỹ thuật và giải quyết các bài toán công nghệ lớn.' },
        { name: 'Ngành Tài chính - Ngân hàng & Đầu tư', match: 86, reason: 'Chịu được áp lực cao, quyết đoán trong các quyết định tài chính.' }
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
      recommendedCertificates: ['Chứng chỉ Quản lý Dự án PMP®', 'Chứng chỉ Quản trị Kinh doanh Quốc tế', 'Chứng chỉ Lãnh đạo Chiến lược']
    }
  },

  'I': {
    student: {
      majors: [
        { name: 'Ngành Truyền thông Mới & Sáng tạo Nội dung', match: 96, reason: 'Phát huy năng khiếu sáng tạo nội dung, giao tiếp và lan tỏa thông điệp.' },
        { name: 'Ngành Marketing & Quảng cáo (Digital Marketing)', match: 94, reason: 'Tối ưu hóa khả năng hiểu tâm lý khách hàng và bắt xu hướng thị trường.' },
        { name: 'Ngành Quan hệ Công chúng (PR) & Quản lý Sự kiện', match: 92, reason: 'Môi trường kết nối xã hội sôi nổi, sáng tạo và tự do.' },
        { name: 'Ngành Ngoại giao & Dịch vụ Du lịch - Khách sạn', match: 88, reason: 'Giao lưu văn hóa, ngoại giao và tạo sự thiện cảm tích cực.' },
        { name: 'Ngành Tâm lý học & Đào tạo Con người', match: 85, reason: 'Truyền cảm hứng, kết nối tâm hồn và thấu hiểu nhu cầu con người.' }
      ],
      clubRoles: [
        'Trưởng ban Truyền thông & Event',
        'MC / Host chương trình sự kiện',
        'Phụ trách Đối ngoại & Sáng tạo Nội dung',
        'Đại sứ hình ảnh thương hiệu'
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
        { name: 'Ngành Quản trị & Phát triển Nhân sự (HRM)', match: 96, reason: 'Tận tụy, thấu hiểu, lắng nghe và chăm sóc sự phát triển của con người.' },
        { name: 'Ngành Giáo dục & Đào tạo Kỹ năng', match: 94, reason: 'Kiên nhẫn truyền đạt tri thức và đồng hành cùng sự phát triển cá nhân.' },
        { name: 'Ngành Y tế, Dược phẩm & Chăm sóc Sức khỏe', match: 92, reason: 'Chăm sóc sức khỏe chân thành, kiên trì và chu đáo.' },
        { name: 'Ngành Tư vấn Tâm lý & Công tác Xã hội', match: 90, reason: 'Lắng nghe sâu sắc, hỗ trợ tinh thần cho cộng đồng.' },
        { name: 'Ngành Hành chính - Quản trị Công & Dịch vụ', match: 88, reason: 'Duy trì sự ổn định, cẩn thận và trách nhiệm lâu dài.' }
      ],
      clubRoles: [
        'Trưởng/Phó ban Nhân sự (HR Club)',
        'Thành viên ban Hậu cần / Chăm sóc Thành viên',
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
        { title: 'Giảng viên Chuyên ngành / Chuyên gia Đào tạo Kỹ năng', match: 89, desc: 'Truyền thụ tri thức bài bản và kiên nhẫn với người học.' }
      ],
      leadershipStyle: 'Lãnh đạo Phục vụ (Servant Leadership). Bạn luôn quan tâm, hỗ trợ và tạo môi trường an toàn để cấp dưới phát huy năng lực.',
      stressManagement: 'Học cách từ chối các yêu cầu ngoài phạm vi trách nhiệm. Chia sẻ cảm xúc với bạn bè thân thiết thay vì giữ trong lòng.',
      recommendedCertificates: ['SHRM-CP / PHR Human Resources', 'Professional Coaching (ICF)', 'Customer Experience (CX) Certification']
    }
  },

  'C': {
    student: {
      majors: [
        { name: 'Ngành Công nghệ Phần mềm & Khoa học Máy tính', match: 97, reason: 'Tư duy logic sắc bén, kỷ luật và phân tích hệ thống hoàn hảo.' },
        { name: 'Ngành Kế toán - Kiểm toán & Tài chính', match: 95, reason: 'Đòi hỏi sự chính xác tuyệt đối, cẩn trọng với các con số và pháp lý.' },
        { name: 'Ngành Khoa học Dữ liệu (Data Science) & Business Intelligence', match: 94, reason: 'Nghiên cứu số liệu, phát hiện quy luật và đưa ra báo cáo khách quan.' },
        { name: 'Ngành Kỹ thuật Cơ khí - Điện & Tự động hóa', match: 90, reason: 'Tận tụy với kỹ thuật, chuẩn mực chất lượng và tính toán chính xác.' },
        { name: 'Ngành Tài chính Định lượng & Quản trị Rủi ro', match: 89, reason: 'Xây dựng mô hình tài chính và phòng ngừa rủi ro cho doanh nghiệp.' }
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

// =========================================================================
// GỢI Ý NGÀNH NGHỀ & CHUYÊN MÔN CHI TIẾT THEO MÃ HOLLAND CODE (RIASEC)
// =========================================================================

export const HOLLAND_CAREER_MAPPINGS = {
  // --- REALISTIC (R) COMBINATIONS ---
  'R': {
    student: {
      majors: [
        { name: 'Ngành Kỹ thuật Cơ khí & Tự động hóa', match: 96, reason: 'Phát huy tối đa năng khiếu thao tác máy móc, linh kiện và thiết bị kỹ thuật thực tế.' },
        { name: 'Ngành Kỹ thuật Điện - Điện tử & Bán dẫn', match: 94, reason: 'Môi trường làm việc vật lý chuẩn xác, vận hành và sửa chữa hệ thống hiện đại.' },
        { name: 'Ngành Kiến trúc & Kỹ thuật Thi công Công trình', match: 92, reason: 'Kết hợp tư duy hình học không gian với công việc thi công thực địa ngoài trời.' },
        { name: 'Ngành Công nghệ Ô tô & Phương tiện Giao thông', match: 90, reason: 'Thích khám phá động cơ, hệ thống truyền động và phương tiện vận tải.' },
        { name: 'Ngành Nông nghiệp Công nghệ cao & Môi trường', match: 88, reason: 'Gắn liền với thiên nhiên, cây trồng, vật nuôi và kỹ thuật canh tác tiên tiến.' },
        { name: 'Ngành Kỹ thuật Phần cứng & Mạng Máy tính', match: 86, reason: 'Tháo lắp, cài đặt và bảo trì hạ tầng máy chủ, thiết bị IoT.' }
      ],
      clubRoles: [
        'Trưởng ban Kỹ thuật & Hậu cần Sự kiện',
        'Đội trưởng Đội thi Robocon / Maker Club',
        'Thành viên Đội xe đua công thức sinh viên (Formula Student)',
        'Phụ trách Âm thanh - Ánh sáng & Thiết bị sân khấu'
      ],
      softSkills: [
        'Kỹ năng đọc bản vẽ kỹ thuật & sơ đồ nguyên lý',
        'Kỹ năng an toàn lao động & bảo hộ kỹ thuật',
        'Kỹ năng giải quyết sự cố phần cứng tại chỗ',
        'Quản lý và bảo trì thiết bị vật tư'
      ],
      internships: [
        'Thực tập sinh Kỹ thuật Cơ khí / Bảo trì Nhà máy',
        'Thực tập sinh Kỹ thuật viên Mạng & Phần cứng IT',
        'Thực tập sinh Giám sát Thi công Công trình'
      ]
    },
    professional: {
      careers: [
        { title: 'Kỹ sư Cơ khí / Tự động hóa & Robotics', match: 97, desc: 'Thiết kế, chế tạo và vận hành dây chuyền sản xuất tự động.' },
        { title: 'Kỹ sư Điện - Điện tử & Vi mạch Bán dẫn', match: 95, desc: 'Nghiên cứu, lắp ráp và kiểm thử thiết bị phần cứng điện tử.' },
        { title: 'Kiến trúc sư / Kỹ sư Giám sát Thi công', match: 93, desc: 'Trực tiếp chỉ đạo thi công công trình, quản lý an toàn và tiến độ thực địa.' },
        { title: 'Chuyên gia Nông nghiệp Công nghệ cao (AgriTech)', match: 90, desc: 'Vận hành hệ thống nhà kính thông minh và trang thiết bị canh tác tự động.' },
        { title: 'Kỹ sư Năng lượng Tái tạo (Điện gió & Mặt trời)', match: 88, desc: 'Khảo sát thực địa, lắp đặt và bảo dưỡng tuabin năng lượng.' },
        { title: 'Phi công / Đội trưởng Vận tải Chuyên dụng', match: 86, desc: 'Điều khiển phương tiện chuyên dụng với độ chính xác và kỹ thuật cao.' }
      ],
      leadershipStyle: 'Lãnh đạo Thực hành & Tấm gương (Hands-on & Lead by Example). Bạn dẫn dắt bằng cách trực tiếp xắn tay áo làm việc và giải quyết sự cố kỹ thuật.',
      stressManagement: 'Dành thời gian hoạt động thể thao ngoài trời, làm đồ handmade hoặc sửa chữa đồ dùng gia đình để thư giãn tâm trí.',
      recommendedCertificates: ['Chứng chỉ Kỹ sư Cơ khí Chuyên nghiệp (PE)', 'Chứng chỉ Chuyên gia Mạng Cisco CCNA/CCNP', 'Chứng chỉ An toàn Lao động & Môi trường OSHA']
    }
  },

  'RIA': {
    student: {
      majors: [
        { name: 'Ngành Thiết kế Sản phẩm Công nghiệp (Industrial Design)', match: 98, reason: 'Giao thoa hoàn hảo giữa kỹ thuật máy móc (R), tư duy phân tích kiểu dáng (I) và thẩm mỹ sáng tạo (A).' },
        { name: 'Ngành Kiến trúc & Quy hoạch Không gian', match: 95, reason: 'Thực thi công trình thực tế kết hợp phân tích kết cấu và tư duy thẩm mỹ nghệ thuật.' },
        { name: 'Ngành Lập trình Game & Đồ họa 3D', match: 93, reason: 'Chế tạo sản phẩm số tương tác, lập trình hệ thống vật lý và dựng mô hình 3D sống động.' },
        { name: 'Ngành Thiết kế Kỹ thuật & Công nghệ Đa phương tiện', match: 90, reason: 'Vận hành thiết bị quay chụp hiện đại, phân tích kỹ thuật dựng và sáng tạo hiệu ứng.' },
        { name: 'Ngành Công nghệ Chế tạo Máy & Kiểu dáng', match: 87, reason: 'Thực hành tạo mẫu sản phẩm thực tế với trí tưởng tượng phong phú.' }
      ],
      clubRoles: ['Trưởng ban Thiết kế & Kỹ thuật Mỹ thuật', 'Modeler 3D / Animator Club', 'Trưởng nhóm Chế tạo Mô hình Đua xe / Robot'],
      softSkills: ['Kỹ năng phác thảo 3D & dựng CAD', 'Kỹ năng kết hợp thẩm mỹ với tính năng kỹ thuật', 'Tư duy thiết kế trải nghiệm thực tế (Prototyping)'],
      internships: ['Thực tập sinh Thiết kế Kiểu dáng Dụng cụ', 'Thực tập sinh Game Modeler 3D / CAD Designer', 'Thực tập sinh Hậu kỳ Kỹ thuật Video']
    },
    professional: {
      careers: [
        { title: 'Nhà thiết kế Sản phẩm Công nghiệp (Industrial Designer)', match: 98, desc: 'Sáng tạo kiểu dáng các thiết bị công nghệ, ô tô, đồ gia dụng đáp ứng chuẩn kỹ thuật.' },
        { title: 'Kiến trúc sư Sáng tạo & Thi công Nội thất', match: 95, desc: 'Thiết kế bản vẽ nghệ thuật và trực tiếp giám sát thi công thực tế.' },
        { title: 'Kỹ sư Đồ họa Game 3D & VFX (3D Generalist)', match: 93, desc: 'Dựng mô hình vật lý 3D, tối ưu hóa hiệu ứng và ánh sáng trong Game/Điện ảnh.' },
        { title: 'Kỹ sư R&D Sản phẩm Tiêu dùng Công nghệ', match: 90, desc: 'Nghiên cứu nguyên mẫu vật lý, trải nghiệm cầm nắm và kiểu dáng thẩm mỹ.' }
      ],
      leadershipStyle: 'Lãnh đạo Đổi mới Kỹ thuật (Creative-Technical Leader). Bạn kết hợp giữa tiêu chuẩn kỹ thuật khắt khe và tư duy đột phá.',
      stressManagement: 'Vẽ phác thảo tự do, làm đồ thủ công mỹ nghệ hoặc đi dã ngoại nhiếp ảnh ngoài trời.',
      recommendedCertificates: ['Autodesk Certified Professional (SolidWorks/Revit)', 'UI/UX & Product Design Certificate', 'Certified Game Developer (Unity/Unreal)']
    }
  },

  'RIC': {
    student: {
      majors: [
        { name: 'Ngành Kỹ thuật Phần cứng & Hệ thống Nhúng (Embedded Systems)', match: 97, reason: 'Lắp ráp mạch điện (R), nghiên cứu vi điều khiển (I) và tuân thủ quy trình kiểm thử (C).' },
        { name: 'Ngành Mạng Máy tính & An ninh Mạng (Cybersecurity)', match: 95, reason: 'Thao tác máy chủ thực tế, phân tích lỗ hổng bảo mật và áp dụng chuẩn tuân thủ.' },
        { name: 'Ngành Kỹ thuật Đo lường & Kiểm soát Chất lượng', match: 92, reason: 'Vận hành máy đo chính xác, phân tích sai số và lập báo cáo kỹ thuật chuẩn mực.' }
      ],
      clubRoles: ['Trưởng ban Kỹ thuật Mạng & Phần cứng', 'Chuyên viên Kiểm thử Thiết bị / Lab Manager', 'Đội tuyển An toàn Thông tin'],
      softSkills: ['Kỹ năng lập trình vi điều khiển / C++', 'Tư duy phân tích lỗi logic', 'Quy trình kiểm thử chuẩn ISO'],
      internships: ['Thực tập sinh Kỹ thuật Nhúng / IoT', 'Thực tập sinh Cybersecurity / SOC Analyst', 'Thực tập sinh QA/QC Phần cứng']
    },
    professional: {
      careers: [
        { title: 'Kỹ sư Hệ thống Nhúng & Thiết bị IoT', match: 97, desc: 'Thiết kế vi mạch, lập trình nhúng và kiểm thử độ tin cậy phần cứng.' },
        { title: 'Chuyên gia An ninh Mạng & Bảo mật Hạ tầng (Network Security Engineer)', match: 95, desc: 'Bảo vệ hệ thống mạng máy chủ, phân tích mã độc và tuân thủ tiêu chuẩn an toàn.' },
        { title: 'Kỹ sư Kiểm soát Chất lượng Kỹ thuật (QA/QC Engineer)', match: 92, desc: 'Soát lỗi thiết bị sản xuất, đảm bảo sản phẩm đạt tiêu chuẩn kỹ thuật nghiêm ngặt.' }
      ],
      leadershipStyle: 'Lãnh đạo Kỷ luật Kỹ thuật (Disciplined Engineering Leader). Bạn chú trọng sự chính xác tuyệt đối và quy trình nghiêm ngặt.',
      stressManagement: 'Giải đố tư duy logic, tháo lắp thiết bị điện tử cũ hoặc chơi cờ vua.',
      recommendedCertificates: ['CompTIA Security+ / CEH', 'Cisco CCNA/CCNP Security', 'ISO 9001 Lead Auditor']
    }
  },

  // --- INVESTIGATIVE (I) COMBINATIONS ---
  'I': {
    student: {
      majors: [
        { name: 'Ngành Khoa học Dữ liệu (Data Science) & AI', match: 97, reason: 'Phát huy tư duy phân tích toán học, đào sâu mô hình dữ liệu và nghiên cứu tri thức.' },
        { name: 'Ngành Khoa học Máy tính & Công nghệ Phần mềm', match: 95, reason: 'Giải quyết bài toán thuật toán phức tạp và xây dựng cấu trúc phần mềm tối ưu.' },
        { name: 'Ngành Y khoa, Dược học & Nghiên cứu Y sinh', match: 93, reason: 'Đam mê tìm hiểu cơ chế bệnh lý, dược chất và công nghệ chẩn đoán y học.' },
        { name: 'Ngành Phân tích Tài chính & Kinh tế Định lượng', match: 90, reason: 'Nghiên cứu thị trường, dự báo biến động và xây dựng mô hình tài chính toán.' },
        { name: 'Ngành Vật lý, Hóa học & Công nghệ Sinh học', match: 88, reason: 'Thực hiện thí nghiệm chuyên sâu, khám phá quy luật tự nhiên.' },
        { name: 'Ngành Tâm lý học Thực nghiệm & Phân tích Hành vi', match: 86, reason: 'Nghiên cứu số liệu hành vi con người và tư duy não bộ.' }
      ],
      clubRoles: [
        'Trưởng ban Nghiên cứu & Phát triển (R&D Club)',
        'Đội trưởng Đội thi AI / Data Hackathon',
        'Thành viên Đội tuyển Nghiên cứu Khoa học Sinh viên',
        'Trưởng nhóm Đọc sách & Thảo luận Hàn lâm'
      ],
      softSkills: [
        'Tư duy phản biện (Critical Thinking)',
        'Kỹ năng bóc tách & phân tích dữ liệu chuyên sâu',
        'Kỹ năng viết báo cáo nghiên cứu khoa học',
        'Giải quyết vấn đề bằng phương pháp mô hình hóa'
      ],
      internships: [
        'Thực tập sinh Phân tích Dữ liệu (Data Analyst Intern)',
        'Thực tập sinh Nghiên cứu AI / Machine Learning',
        'Thực tập sinh Nghiên cứu Thị trường & Phân tích Tài chính'
      ]
    },
    professional: {
      careers: [
        { title: 'Nhà Khoa học Dữ liệu / Data Scientist Senior', match: 98, desc: 'Khai phá Big Data, xây dựng mô hình học máy và dự báo xu hướng chiến lược.' },
        { title: 'Kỹ sư AI Research / Machine Learning Engineer', match: 96, desc: 'Nghiên cứu thuật toán trí tuệ nhân tạo tiên tiến và tối ưu hóa mô hình AI.' },
        { title: 'Chuyên gia Phân tích Tài chính Định lượng (Quant Analyst)', match: 94, desc: 'Xây dựng thuật toán giao dịch và quản trị rủi ro đầu tư.' },
        { title: 'Bác sĩ Nghiên cứu / Chuyên gia Y sinh', match: 92, desc: 'Chẩn đoán bệnh lý phức tạp và nghiên cứu liệu pháp y học mới.' },
        { title: 'Chuyên gia Phân tích An ninh Mạng (Cybersecurity Analyst)', match: 89, desc: 'Truy vết mã độc, phân tích lỗ hổng và phòng chống tấn công mạng.' },
        { title: 'Giảng viên / Nhà Nghiên cứu Khoa học', match: 87, desc: 'Thực hiện các công trình nghiên cứu hàn lâm và giảng dạy chuyên sâu.' }
      ],
      leadershipStyle: 'Lãnh đạo Chuyên môn & Tri thức (Intellectual & Expert Leader). Bạn dẫn dắt bằng tri thức chuyên sâu, luận điểm logic và dữ liệu thực chứng.',
      stressManagement: 'Thư giãn bằng cách đọc sách chuyên ngành, chơi trò chơi trí tuệ hoặc tham gia các diễn đàn khoa học.',
      recommendedCertificates: ['Google Data Analytics Professional Certificate', 'AWS Certified Machine Learning - Specialty', 'CFA (Chartered Financial Analyst)']
    }
  },

  'IAS': {
    student: {
      majors: [
        { name: 'Ngành Tâm lý học Lâm sàng & Tư vấn Con người', match: 98, reason: 'Nghiên cứu tâm lý phân tích (I), thấu hiểu cảm xúc (A) và hỗ trợ phụng sự con người (S).' },
        { name: 'Ngành Y khoa & Dược học Lâm sàng', match: 95, reason: 'Phân tích y học sắc bén kết hợp giao tiếp ấm áp và chăm sóc bệnh nhân.' },
        { name: 'Ngành Công nghệ Giáo dục (EduTech) & Đào tạo', match: 92, reason: 'Nghiên cứu phương pháp học thông minh, thiết kế bài giảng sáng tạo và giảng dạy.' },
        { name: 'Ngành Nghiên cứu Xã hội & Nhân văn', match: 89, reason: 'Khám phá văn hóa, hành vi con người và tư vấn giải pháp cộng đồng.' }
      ],
      clubRoles: ['Trưởng ban Tư vấn & Hỗ trợ Tâm lý Học sinh', 'Thành viên Dự án Nghiên cứu Giáo dục', 'Trưởng nhóm Đội hình Y tế Tình nguyện'],
      softSkills: ['Kỹ năng lắng nghe thấu cảm (Empathic Listening)', 'Tư duy phân tích hành vi con người', 'Kỹ năng truyền tải tri thức phức tạp dễ hiểu'],
      internships: ['Thực tập sinh Tư vấn Tâm lý / HR Assistant', 'Thực tập sinh Nghiên cứu Giáo dục EduTech', 'Thực tập sinh Trợ lý Nghiên cứu Y học']
    },
    professional: {
      careers: [
        { title: 'Chuyên gia Tư vấn Tâm lý / Bác sĩ Phân tâm học', match: 98, desc: 'Phân tích nguyên nhân tâm lý, khai vấn và trị liệu tinh thần cho khách hàng.' },
        { title: 'Bác sĩ Điều trị Lâm sàng / Bác sĩ Chuyên khoa', match: 95, desc: 'Chẩn đoán bệnh lý chính xác và đồng hành chăm sóc sức khỏe bệnh nhân.' },
        { title: 'Chuyên gia Nghiên cứu & Thiết kế Chương trình Đào tạo (Instructional Designer)', match: 92, desc: 'Nghiên cứu tâm lý học tập và xây dựng khóa học sáng tạo.' }
      ],
      leadershipStyle: 'Lãnh đạo Thấu hiểu & Tri thức (Empathetic Intellectual Leader). Bạn kết hợp giữa phân tích khoa học và sự tôn trọng nhân văn.',
      stressManagement: 'Thiền định, viết nhật ký cảm xúc hoặc trò chuyện cùng chuyên gia tâm lý.',
      recommendedCertificates: ['Chứng chỉ Tư vấn Tâm lý Chuyên nghiệp', 'Professional Coaching Certificate (ICF)', 'Certified Clinical Research Coordinator']
    }
  },

  'ISE': {
    student: {
      majors: [
        { name: 'Ngành Quản trị Sản phẩm Công nghệ (Product Management)', match: 97, reason: 'Nghiên cứu bài toán người dùng (I), giao tiếp thuyết phục team (S) và định hướng mục tiêu kinh doanh (E).' },
        { name: 'Ngành Phân tích Kinh doanh & Dữ liệu (Business Analyst - BA)', match: 95, reason: 'Bóc tách quy trình doanh nghiệp, thấu hiểu nhu cầu stakeholder và tư vấn giải pháp.' },
        { name: 'Ngành Quản trị Y tế & Dược phẩm Thương mại', match: 92, reason: 'Nghiên cứu chuyên môn y dược kết hợp đàm phán thương mại và phụng sự sức khỏe.' }
      ],
      clubRoles: ['Trưởng ban Product / Tech Startup Club', 'Trưởng nhóm Business Analyst', 'Đội trưởng Đội thi Giải quyết Ca kinh doanh (Case Competition)'],
      softSkills: ['Kỹ năng dịch thuật nhu cầu người dùng thành kỹ thuật', 'Tư duy phân tích dữ liệu sản phẩm', 'Kỹ năng thuyết phục đối tác & C-level'],
      internships: ['Thực tập sinh Product Manager Intern', 'Thực tập sinh Business Analyst (BA Intern)', 'Thực tập sinh Phân tích Thị trường Công nghệ']
    },
    professional: {
      careers: [
        { title: 'Quản trị Sản phẩm (Product Manager - PM)', match: 98, desc: 'Xác định tầm nhìn sản phẩm, phân tích metrics và dẫn dắt đội ngũ kỹ thuật phát triển.' },
        { title: 'Chuyên gia Phân tích Kinh doanh (Business Analyst Senior)', match: 95, desc: 'Cầu nối giữa kinh doanh và công nghệ, tối ưu hóa quy trình vận hành.' },
        { title: 'Giám đốc Tư vấn Giải pháp Công nghệ (Solution Architect Sales)', match: 92, desc: 'Tư vấn kiến trúc hệ thống công nghệ cao cho đối tác doanh nghiệp lớn.' }
      ],
      leadershipStyle: 'Lãnh đạo Tầm nhìn Sản phẩm (Product Visionary Leader). Bạn quy tụ mọi người bằng dữ liệu phân tích chuẩn xác và lộ trình sản phẩm thuyết phục.',
      stressManagement: 'Đi du lịch trải nghiệm công nghệ mới, tập gym hoặc đọc báo phân tích kinh tế thế giới.',
      recommendedCertificates: ['Chứng chỉ Agile Product Owner (PSPO/CSPO)', 'Certified Business Analysis Professional (CBAP)', 'PMP® Project Management']
    }
  },

  // --- ARTISTIC (A) COMBINATIONS ---
  'A': {
    student: {
      majors: [
        { name: 'Ngành Thiết kế Đồ họa & Truyền thông Thị giác (Graphic Design)', match: 97, reason: 'Bộc lộ tối đa tư duy thẩm mỹ, phối màu, sáng tạo nhận diện thương hiệu và hình ảnh.' },
        { name: 'Ngành Thiết kế Trải nghiệm Người dùng (UI/UX Design)', match: 95, reason: 'Sáng tạo giao diện ứng dụng đẹp mắt, hiện đại và tối ưu hóa trải nghiệm khách hàng.' },
        { name: 'Ngành Truyền thông Mới & Sáng tạo Nội dung (Content Creation)', match: 93, reason: 'Biến ý tưởng sáng tạo thành bài viết, kịch bản video, truyền cảm hứng cho công chúng.' },
        { name: 'Ngành Thiết kế Thời trang & Nghệ thuật Ứng dụng', match: 90, reason: 'Đam mê phối trang phục, phong cách cá nhân và xu hướng thời trang.' },
        { name: 'Ngành Nhiếp ảnh, Đạo diễn & Dựng phim Điện ảnh', match: 88, reason: 'Ghi lại góc nhìn nghệ thuật qua ống kính, kể chuyện bằng hình ảnh và âm thanh.' },
        { name: 'Ngành Kiến trúc Nội thất & Decor Không gian', match: 86, reason: 'Thỏa sức sáng tạo không gian sống nghệ thuật, màu sắc và ánh sáng.' }
      ],
      clubRoles: [
        'Trưởng ban Thiết kế Đồ họa (Art Director Club)',
        'Trưởng ban Sáng tạo Nội dung / Media Team',
        'Đạo diễn / Biên kịch Chương trình Nghệ thuật Sinh viên',
        'Nhiếp ảnh gia chính của Câu lạc bộ'
      ],
      softSkills: [
        'Tư duy thẩm mỹ & tư duy hình ảnh (Visual Thinking)',
        'Kỹ năng kể chuyện (Storytelling)',
        'Sử dụng thành thạo bộ công cụ Adobe / Figma / AI Generation',
        'Kỹ năng tiếp nhận & chuyển hóa Feedback sáng tạo'
      ],
      internships: [
        'Thực tập sinh Graphic / UI-UX Designer',
        'Thực tập sinh Content Creator / Copywriter',
        'Thực tập sinh Dựng phim & Media Production'
      ]
    },
    professional: {
      careers: [
        { title: 'Giám đốc Sáng tạo (Creative Director)', match: 98, desc: 'Định hình phong cách nghệ thuật, dẫn dắt các chiến dịch truyền thông sáng tạo bứt phá.' },
        { title: 'Chuyên gia Thiết kế Trải nghiệm Người dùng (Product / UI-UX Lead)', match: 96, desc: 'Kiến tạo giao diện sản phẩm số ấn tượng và luồng trải nghiệm mượt mà.' },
        { title: 'Trưởng nhóm Sáng tạo Nội dung (Content Lead / Copywriter)', match: 94, desc: 'Sáng tác kịch bản quảng cáo, thông điệp thương hiệu sắc bén và viral.' },
        { title: 'Nhà thiết kế Đồ họa Senior (Senior Graphic Designer)', match: 91, desc: 'Xây dựng bộ nhận diện thương hiệu độc đáo cho các tập đoàn lớn.' },
        { title: 'Đạo diễn Hình ảnh / Senior Video Editor', match: 89, desc: 'Chỉ đạo góc quay, chỉnh màu điện ảnh và tạo ra tác phẩm truyền hình/quảng cáo.' },
        { title: 'Nhà thiết kế Thời trang / Nội thất Độc bản', match: 87, desc: 'Sáng tạo các bộ sưu tập và không gian sống mang đậm bản sắc nghệ thuật.' }
      ],
      leadershipStyle: 'Lãnh đạo Sáng tạo & Tự do (Creative & Democratic Leader). Bạn truyền cảm hứng, khuyến khích thử nghiệm ý tưởng mới và không áp đặt khuôn mẫu.',
      stressManagement: 'Nghe nhạc nghệ thuật, vẽ tranh tự do, tham quan triển lãm hoặc đổi mới không gian làm việc.',
      recommendedCertificates: ['Adobe Certified Professional (ACP)', 'Google UX Design Professional Certificate', 'Content Marketing Strategy Certification']
    }
  },

  'AES': {
    student: {
      majors: [
        { name: 'Ngành Truyền thông Quảng cáo & Marketing Sáng tạo', match: 98, reason: 'Ý tưởng sáng tạo bay bổng (A), thuyết phục khách hàng thu hút (E) và gắn kết con người (S).' },
        { name: 'Ngành Quan hệ Công chúng (PR) & Tổ chức Sự kiện Nghệ thuật', match: 95, reason: 'Tự do sáng tạo concept sự kiện, giao tiếp ngoại giao truyền cảm hứng.' },
        { name: 'Ngành Quản trị Thương hiệu & Truyền thông Số (Brand Comms)', match: 93, reason: 'Sáng tạo câu chuyện thương hiệu (Storytelling) lan tỏa cảm xúc cộng đồng.' }
      ],
      clubRoles: ['Trưởng ban Truyền thông & Sự kiện', 'MC / Host Chương trình Truyền hình Sinh viên', 'Trưởng nhóm Creative Agency Club'],
      softSkills: ['Kỹ năng thuyết trình ý tưởng độc đáo (Pitching)', 'Kỹ năng viết thông điệp cảm xúc', 'Kỹ năng quản lý sự kiện nghệ thuật'],
      internships: ['Thực tập sinh Creative Agency / Copywriter', 'Thực tập sinh Event Planner / PR Exec', 'Thực tập sinh Social Media Specialist']
    },
    professional: {
      careers: [
        { title: 'Giám đốc Thương hiệu & Sáng tạo (Brand & Creative Director)', match: 98, desc: 'Lãnh đạo chiến lược thương hiệu, thổi hồn nghệ thuật và cảm xúc vào sản phẩm.' },
        { title: 'Trưởng phòng Quan hệ Công chúng & Sự kiện (PR & Event Manager)', match: 95, desc: 'Tổ chức các sự kiện ra mắt hoành tráng, xây dựng hình ảnh trước công chúng.' },
        { title: 'Chuyên gia Truyền thông Truyền cảm hứng (Key Opinion Leader / Chief Storyteller)', match: 92, desc: 'Truyền tải thông điệp nhân văn và dẫn dắt xu hướng cộng đồng.' }
      ],
      leadershipStyle: 'Lãnh đạo Truyền cảm hứng Sáng tạo (Inspirational Creative Leader). Bạn quy tụ mọi người bằng những ý tưởng lớn và năng lượng tích cực.',
      stressManagement: 'Xem biểu diễn kịch/ca nhạc, sáng tạo content cá nhân hoặc đi du lịch khám phá văn hóa mới.',
      recommendedCertificates: ['Digital Marketing & Brand Strategy Certificate', 'Public Relations & Event Management Mastery', 'Advanced Copywriting Certification']
    }
  },

  // --- SOCIAL (S) COMBINATIONS ---
  'S': {
    student: {
      majors: [
        { name: 'Ngành Quản trị & Phát triển Nhân sự (HRM)', match: 97, reason: 'Tận tụy, thấu hiểu, lắng nghe và chăm sóc sự phát triển của con người trong tổ chức.' },
        { name: 'Ngành Giáo dục, Sư phạm & Đào tạo Kỹ năng', match: 95, reason: 'Kiên nhẫn truyền đạt tri thức, đồng hành cùng sự trưởng thành của học viên.' },
        { name: 'Ngành Tư vấn Tâm lý & Khai vấn Con người', match: 93, reason: 'Lắng nghe sâu sắc, chia sẻ giải pháp tinh thần cho cá nhân và cộng đồng.' },
        { name: 'Ngành Quản trị Trải nghiệm Khách hàng (Customer Success)', match: 90, reason: 'Tạo mối quan hệ chân thành, hỗ trợ và mang lại niềm vui cho khách hàng.' },
        { name: 'Ngành Y tế Công cộng, Điều dưỡng & Dinh dưỡng', match: 88, reason: 'Tận tụy cứu chữa và chăm sóc sức khỏe vật lý/tinh thần cho bệnh nhân.' },
        { name: 'Ngành Công tác Xã hội & Quản lý Tổ chức Phi lợi nhuận (NGO)', match: 86, reason: 'Phụng sự cộng đồng yếu thế và triển khai các dự án nhân văn.' }
      ],
      clubRoles: [
        'Trưởng / Phó ban Nhân sự (HR Club)',
        'Trưởng ban Tình nguyện / Chiến dịch Mùa Hè Xanh',
        'Thành viên ban Hậu cần & Chăm sóc Thành viên',
        'Chuyên viên Tư vấn & Hỗ trợ Tân sinh viên'
      ],
      softSkills: [
        'Kỹ năng lắng nghe thấu cảm (Active Listening)',
        'Kỹ năng giải quyết xung đột & hòa giải',
        'Kỹ năng thuyết trình & giảng dạy thu hút',
        'Trí tuệ cảm xúc cao (High EQ)'
      ],
      internships: [
        'Thực tập sinh Tuyển dụng & Phát triển Nhân sự (HR Intern)',
        'Thực tập sinh Chăm sóc Khách hàng chuyên sâu (Customer Success)',
        'Thực tập sinh Trợ giảng / Đào tạo Kỹ năng Mềm'
      ]
    },
    professional: {
      careers: [
        { title: 'Giám đốc / Trưởng phòng Nhân sự (HR Director / HRM)', match: 98, desc: 'Xây dựng chính sách nhân sự, gắn kết người lao động và phát triển văn hóa doanh nghiệp.' },
        { title: 'Chuyên gia Khai vấn Sự nghiệp & Life Coach (Professional Coach)', match: 95, desc: 'Đồng hành, khai phá tiềm năng cá nhân và định hướng lộ trình phát triển.' },
        { title: 'Giám đốc Trải nghiệm Khách hàng (Customer Experience Manager)', match: 93, desc: 'Xây dựng quy trình chăm sóc tận tụy, gia tăng sự hài lòng bền vững.' },
        { title: 'Giảng viên Chuyên nghiệp / Chuyên gia Đào tạo Doanh nghiệp', match: 90, desc: 'Đào tạo kỹ năng thực chiến và truyền năng lượng tích cực cho học viên.' },
        { title: 'Chuyên gia Tư vấn Tâm lý / Thư ký Hòa giải', match: 88, desc: 'Hỗ trợ giải tỏa căng thẳng tâm lý và giải quyết mâu thuẫn nội bộ.' },
        { title: 'Quản lý Dự án Phát triển Cộng đồng (NGO Project Manager)', match: 86, desc: 'Điều phối các chương trình tài trợ xã hội và phát triển cộng đồng.' }
      ],
      leadershipStyle: 'Lãnh đạo Phục vụ (Servant Leadership). Bạn tôn trọng, chăm sóc và tạo điều kiện tối đa để đồng đội tỏa sáng.',
      stressManagement: 'Trò chuyện chia sẻ với người thân, tham gia các buổi từ thiện hoặc chăm sóc cây cảnh/thú cưng.',
      recommendedCertificates: ['SHRM-CP / PHR Human Resources Certificate', 'Associate Certified Coach (ACC - ICF)', 'Customer Experience (CX) Certification']
    }
  },

  'SEC': {
    student: {
      majors: [
        { name: 'Ngành Quản trị Hành chính & Nhân sự Doanh nghiệp', match: 98, reason: 'Chăm sóc nhân sự chân thành (S), thực thi chính sách thuyết phục (E) và chuẩn xác chứng từ quy trình (C).' },
        { name: 'Ngành Quản trị Dịch vụ Bệnh viện & Y tế Công cộng', match: 95, reason: 'Vận hành quy trình y tế an toàn, giao tiếp ân cần với bệnh nhân.' },
        { name: 'Ngành Công tác Văn phòng & Pháp chế Lao động', match: 92, reason: 'Soạn thảo hợp đồng lao động, hòa giải tranh chấp và tuân thủ luật.' }
      ],
      clubRoles: ['Trưởng ban Hành chính - Thư ký', 'Trưởng ban Nhân sự & Nội quy', 'Thủ quỹ & Chăm sóc Đời sống'],
      softSkills: ['Kỹ năng soạn thảo quy chế nhân sự', 'Kỹ năng lắng nghe kết hợp tuân thủ pháp lý', 'Kỹ năng quản lý tài liệu nội bộ ngăn nắp'],
      internships: ['Thực tập sinh HR Admin / C&B Intern', 'Thực tập sinh Hành chính Tổng hợp', 'Thực tập sinh Quản lý Hồ sơ Nhân sự']
    },
    professional: {
      careers: [
        { title: 'Trưởng phòng Lương thưởng & Thù lao (C&B Manager)', match: 98, desc: 'Tính toán lương thưởng chính xác, xây dựng phúc lợi chu đáo và tuân thủ luật lao động.' },
        { title: 'Quản lý Văn phòng & Chăm sóc Nội bộ (Office Manager)', match: 95, desc: 'Duy trì môi trường làm việc chỉn chu, ngăn nắp và hỗ trợ toàn bộ nhân sự.' },
        { title: 'Chuyên gia Tuân thủ & Văn hóa Doanh nghiệp', match: 92, desc: 'Xây dựng nội quy lao động nhân văn và duy trì sự ổn định bền vững.' }
      ],
      leadershipStyle: 'Lãnh đạo Chuẩn mực & Tận tụy (Dedicated & Structured Leader). Bạn giữ cam kết, bảo vệ quyền lợi nhân viên và đúng quy trình.',
      stressManagement: 'Sắp xếp lại nhà cửa sạch sẽ, làm bánh hoặc uống trà thư giãn cùng gia đình.',
      recommendedCertificates: ['SHRM Senior Certified Professional', 'Certified Payroll Specialist', 'ISO 45001 Safety Management']
    }
  },

  // --- ENTERPRISING (E) COMBINATIONS ---
  'E': {
    student: {
      majors: [
        { name: 'Ngành Quản trị Kinh doanh (Business Administration)', match: 97, reason: 'Phát huy tối đa tinh thần dẫn dắt, tư duy chiến lược và khát khao thành công kinh doanh.' },
        { name: 'Ngành Marketing & Quản trị Thương hiệu (Brand Management)', match: 95, reason: 'Đam mê nắm bắt thị trường, thuyết phục người tiêu dùng và bứt phá doanh số.' },
        { name: 'Ngành Kinh doanh Quốc tế & Thương mại Điện tử (E-Commerce)', match: 93, reason: 'Môi trường kinh doanh toàn cầu sôi động, đàm phán hợp đồng giá trị cao.' },
        { name: 'Ngành Tài chính - Đầu tư & Môi giới Chứng khoán', match: 90, reason: 'Tự tin, mạo hiểm có tính toán và săn tìm lợi nhuận tài chính bứt phá.' },
        { name: 'Ngành Quản lý Dự án & Khởi nghiệp Đổi mới Sáng tạo', match: 88, reason: 'Dẫn dắt dự án từ con số 0, huy động vốn và làm chủ doanh nghiệp.' },
        { name: 'Ngành Quan hệ Public Relations (PR) & Ngoại giao Thương mại', match: 86, reason: 'Kỹ năng diễn thuyết, mở rộng mạng lưới quan hệ kinh doanh nâng tầm thế lực.' }
      ],
      clubRoles: [
        'Chủ tịch / Trưởng ban Điều hành Câu lạc bộ',
        'Trưởng ban Đối ngoại & Săn Tài trợ (Fundraising)',
        'Đội trưởng Đội thi Khởi nghiệp / Hackathon',
        'Trưởng Ban Tổ chức Sự kiện Quy mô lớn'
      ],
      softSkills: [
        'Kỹ năng đàm phán & chốt hợp đồng (Closing deals)',
        'Kỹ năng truyền cảm hứng & lãnh đạo đội ngũ',
        'Tư duy cơ hội & chấp nhận rủi ro có tính toán',
        'Kỹ năng thuyết trình trước nhà đầu tư (Pitching skills)'
      ],
      internships: [
        'Thực tập sinh Phát triển Kinh doanh (Business Development Intern)',
        'Thực tập sinh Management Trainee (Tập sự Quản lý)',
        'Thực tập sinh Sales Executive / Digital Marketing'
      ]
    },
    professional: {
      careers: [
        { title: 'Giám đốc Điều hành (CEO) / Founder Khởi nghiệp', match: 98, desc: 'Vạch ra tầm nhìn chiến lược, gọi vốn đầu tư và chịu trách nhiệm toàn bộ sự phát triển.' },
        { title: 'Giám đốc Phát triển Kinh doanh (Head of Business Development)', match: 96, desc: 'Mở rộng thị trường mới, đàm phán các đối tác chiến lược lớn.' },
        { title: 'Giám đốc Marketing (CMO) / Brand Manager Senior', match: 94, desc: 'Thấu hiểu thị trường, chỉ đạo các chiến dịch tăng trưởng doanh số ấn tượng.' },
        { title: 'Giám đốc Bán hàng Toàn quốc (National Sales Manager)', match: 91, desc: 'Xây dựng chỉ tiêu KPIs, quy tụ và thúc đẩy đội ngũ sales bứt phá.' },
        { title: 'Chuyên gia Đầu tư & Quản lý Quỹ Đầu tư Mạo hiểm (VC Investor)', match: 89, desc: 'Đánh giá các mô hình khởi nghiệp tiềm năng và rót vốn đầu tư.' },
        { title: 'Quản lý Dự án Tăng trưởng (Growth Project Manager)', match: 87, desc: 'Thúc đẩy tiến độ, tối ưu hóa doanh thu và dòng tiền dự án.' }
      ],
      leadershipStyle: 'Lãnh đạo Định hướng Kết quả & Truyền lửa (Results-Oriented & Visionary Leader). Bạn thách thức giới hạn và thúc đẩy tập thể chinh phục mục tiêu cao nhất.',
      stressManagement: 'Tập luyện thể thao cường độ cao (Chạy Marathon, Tennis, Gym), giao lưu mạng lưới doanh nhân.',
      recommendedCertificates: ['Chứng chỉ Giám đốc Điều hành CEO Master', 'Professional Sales Management Certification', 'Digital Growth Marketing Certificate']
    }
  },

  'ECI': {
    student: {
      majors: [
        { name: 'Ngành Tài chính Doanh nghiệp & Đầu tư Chiến lược', match: 98, reason: 'Quyết đoán kinh doanh (E), phân tích báo cáo chính xác (C) và nghiên cứu thị trường sâu (I).' },
        { name: 'Ngành Quản trị Chuỗi Cung ứng & Logistics Quốc tế', match: 95, reason: 'Tối ưu hóa dòng chảy hàng hóa, thương lượng chi phí và kiểm soát dữ liệu.' },
        { name: 'Ngành Luật Thương mại & Pháp chế Doanh nghiệp', match: 92, reason: 'Đàm phán hợp đồng kinh tế sắc bén dựa trên cơ sở pháp lý vững chắc.' }
      ],
      clubRoles: ['Trưởng ban Tài chính & Đàm phán', 'Trưởng nhóm Phân tích Đầu tư Sinh viên', 'Thư ký Chiến lược Doanh nghiệp'],
      softSkills: ['Kỹ năng đàm phán dựa trên số liệu thực tế', 'Tư duy quản trị rủi ro tài chính', 'Soạn thảo điều khoản hợp đồng chuẩn mực'],
      internships: ['Thực tập sinh Investment Banking / Equity Analyst', 'Thực tập sinh Logistics Operations', 'Thực tập sinh Trợ lý Legal & Compliance']
    },
    professional: {
      careers: [
        { title: 'Giám đốc Tài chính (CFO) / Trưởng ban Đầu tư', match: 98, desc: 'Quản trị dòng tiền, đàm phán cấu trúc vốn và đảm bảo tuân thủ tài chính.' },
        { title: 'Giám đốc Chuỗi Cung ứng (Supply Chain Director)', match: 95, desc: 'Thương lượng chi phí vận chuyển toàn cầu và kiểm soát tồn kho tối ưu.' },
        { title: 'Luật sư Thương mại / Trưởng ban Pháp chế Doanh nghiệp', match: 92, desc: 'Đại diện đàm phán thương vụ M&A và bảo vệ lợi ích pháp lý công ty.' }
      ],
      leadershipStyle: 'Lãnh đạo Chiến lược & Thực thi Chuẩn xác (Strategic & Precise Leader). Bạn kết hợp sự nhạy bén thương mại với kỷ luật số liệu.',
      stressManagement: 'Đánh golf, đọc báo cáo tài chính kinh tế vĩ mô hoặc nghỉ dưỡng yên tĩnh.',
      recommendedCertificates: ['CFA (Chartered Financial Analyst)', 'ACCA / CPA Certificate', 'CSCP - Certified Supply Chain Professional']
    }
  },

  // --- CONVENTIONAL (C) COMBINATIONS ---
  'C': {
    student: {
      majors: [
        { name: 'Ngành Kế toán - Kiểm toán (Accounting & Auditing)', match: 97, reason: 'Tôn trọng sự chính xác tuyệt đối, cẩn trọng với số liệu và báo cáo tài chính.' },
        { name: 'Ngành Kiểm soát Chất lượng Phần mềm (QA/QC Testing)', match: 95, reason: 'Tỉ mỉ kiểm tra từng chi tiết nhỏ, đảm bảo hệ thống không còn lỗi phát sinh.' },
        { name: 'Ngành Khoa học Dữ liệu Hành chính & Quản trị Cơ sở Dữ liệu', match: 93, reason: 'Sắp xếp, phân loại, lưu trữ và bảo vệ nguồn dữ liệu lớn của tổ chức.' },
        { name: 'Ngành Luật Doanh nghiệp & Tuân thủ Pháp lý (Compliance)', match: 90, reason: 'Nghiêm túc tuân thủ các quy định pháp luật và điều khoản hợp đồng.' },
        { name: 'Ngành Quản trị Hành chính Công & Văn thư Lưu trữ', match: 88, reason: 'Duy trì trật tự làm việc ngăn nắp, quy chuẩn và ổn định.' },
        { name: 'Ngành Quản trị Rủi ro & Định phí Bảo hiểm (Actuarial)', match: 86, reason: 'Tính toán xác suất rủi ro và thiết lập lá chắn bảo vệ tài chính.' }
      ],
      clubRoles: [
        'Trưởng ban Tài chính - Thủ quỹ Câu lạc bộ',
        'Thư ký Chuyên môn & Lưu trữ Hồ sơ',
        'Chuyên viên Kiểm duyệt Nội dung & Chất lượng',
        'Trưởng ban Nội quy & Kỷ luật'
      ],
      softSkills: [
        'Tư duy tỉ mỉ & chú trọng chi tiết (Attention to detail)',
        'Thành thạo Excel nâng cao / SQL / PowerBI / Hệ thống ERP',
        'Kỹ năng lập quy trình & To-do list chuẩn mực',
        'Quản lý thời gian & giữ cam kết tiến độ tuyệt đối'
      ],
      internships: [
        'Thực tập sinh Kiểm toán / Kế toán Doanh nghiệp',
        'Thực tập sinh QA/QC Tester Phần mềm',
        'Thực tập sinh Hành chính - Pháp chế (Legal Assistant)'
      ]
    },
    professional: {
      careers: [
        { title: 'Kiểm toán viên Senior (Big 4 Auditor) / Kế toán trưởng', match: 98, desc: 'Rà soát chứng từ tài chính, đảm bảo tính minh bạch và tuân thủ chuẩn mực kế toán.' },
        { title: 'Quản lý Kiểm soát Chất lượng (QA/QC Manager)', match: 95, desc: 'Thiết lập tiêu chuẩn sản xuất/phần mềm và giám sát thực thi 100% không sai sót.' },
        { title: 'Chuyên gia Quản trị Dữ liệu Doanh nghiệp (Data Governance Lead)', match: 93, desc: 'Tổ chức cấu trúc dữ liệu, bảo mật và cấp quyền truy cập hệ thống.' },
        { title: 'Trưởng ban Tuân thủ Pháp lý (Compliance Manager)', match: 90, desc: 'Đảm bảo doanh nghiệp vận hành đúng pháp luật và tránh rủi ro thanh tra.' },
        { title: 'Chuyên gia Phân tích Định phí Rủi ro (Actuary Expert)', match: 88, desc: 'Thiết kế mô hình toán học dự báo rủi ro bảo hiểm và tài chính.' },
        { title: 'Quản trị Văn phòng & Thư ký Hội đồng Quản trị', match: 86, desc: 'Chuẩn bị văn bản họp, lưu trữ hồ sơ pháp lý và điều phối hành chính.' }
      ],
      leadershipStyle: 'Lãnh đạo Chuẩn mực & Kỷ luật (Pacesetting & Methodical Leader). Bạn làm gương bằng sự chỉn chu, đúng giờ và hoàn thành công việc không sai sót.',
      stressManagement: 'Dọn dẹp lại bàn làm việc ngăn nắp, nghe âm thanh tiếng mưa / nhạc không lời nhẹ nhàng.',
      recommendedCertificates: ['Chứng chỉ Kế toán / Kiểm toán ACCA, CPA, CMA', 'Certified Information Systems Auditor (CISA)', 'ISTQB Advanced Level Test Manager']
    }
  },

  'CIR': {
    student: {
      majors: [
        { name: 'Ngành Phân tích Dữ liệu Hệ thống (Data Analyst - BI)', match: 98, reason: 'Cẩn trọng số liệu chuẩn xác (C), tư duy nghiên cứu quy luật (I) và xử lý hạ tầng máy tính (R).' },
        { name: 'Ngành Kỹ thuật An toàn Thông tin & Quản trị Mạng', match: 95, reason: 'Thiết lập tường lửa, kiểm tra lỗ hổng phần cứng và tuân thủ chính sách an ninh.' },
        { name: 'Ngành Kiểm toán Công nghệ Thông tin (IT Auditor)', match: 92, reason: 'Đánh giá tính an toàn của hệ thống công nghệ và quy trình vận hành.' }
      ],
      clubRoles: ['Trưởng ban Quản trị Hệ thống IT', 'Chuyên viên Kiểm thử Mạng', 'Trưởng ban Dữ liệu & Báo cáo'],
      softSkills: ['Kỹ năng viết truy vấn SQL / Python Data Analysis', 'Kỹ năng quy hoạch cấu trúc hạ tầng', 'Viết báo cáo đánh giá an toàn thông tin'],
      internships: ['Thực tập sinh Data Analyst / BI Intern', 'Thực tập sinh IT Auditor Intern', 'Thực tập sinh System Admin Assistant']
    },
    professional: {
      careers: [
        { title: 'Chuyên gia Phân tích Dữ liệu Kinh doanh (BI Analyst Senior)', match: 98, desc: 'Xây dựng dashboard báo cáo trực quan, kiểm soát độ chính xác của kho dữ liệu.' },
        { title: 'Kiểm toán viên Hệ thống CNTT (IT Auditor Specialist)', match: 95, desc: 'Kiểm tra độ bảo mật và tính hợp pháp của hạ tầng công nghệ thông tin.' },
        { title: 'Quản trị Viên Hệ thống & Cơ sở Dữ liệu (Database Administrator - DBA)', match: 92, desc: 'Duy trì máy chủ cơ sở dữ liệu hoạt động ổn định 24/7 và backup an toàn.' }
      ],
      leadershipStyle: 'Lãnh đạo Kỹ thuật & Dữ liệu (Data-Driven Technical Leader). Bạn đưa ra quyết định dựa trên báo cáo số liệu thực tế đã kiểm chứng.',
      stressManagement: 'Chơi game xây dựng thành phố (Simulation), lắp ráp mô hình LEGO hoặc đọc tài liệu công nghệ mới.',
      recommendedCertificates: ['Certified Information Systems Auditor (CISA)', 'Microsoft Certified: Power BI Data Analyst', 'Oracle Certified Professional Database Administrator']
    }
  }
};

// =========================================================================
// THUẬT TOÁN TRA CỨU HOẶC TỔNG HỢP GỢI Ý NGÀNH NGHỀ CHO MỌI MÃ HOLLAND TOP 3
// =========================================================================

export function getHollandCareerMapping(top3Code = 'RIA') {
  if (!top3Code || typeof top3Code !== 'string') {
    top3Code = 'RIA';
  }

  const cleanCode = top3Code.trim().toUpperCase();
  
  // 1. Tìm chính xác Combo cụ thể trong HOLLAND_CAREER_MAPPINGS
  if (HOLLAND_CAREER_MAPPINGS[cleanCode]) {
    return HOLLAND_CAREER_MAPPINGS[cleanCode];
  }

  const letters = cleanCode.split('');
  const primaryKey = letters[0] || 'R';
  const secondaryKey = letters[1] || 'I';
  const tertiaryKey = letters[2] || 'A';

  const pData = HOLLAND_CAREER_MAPPINGS[primaryKey] || HOLLAND_CAREER_MAPPINGS['R'];
  const sData = HOLLAND_CAREER_MAPPINGS[secondaryKey] || HOLLAND_CAREER_MAPPINGS['I'];
  const tData = HOLLAND_CAREER_MAPPINGS[tertiaryKey] || HOLLAND_CAREER_MAPPINGS['A'];

  // 2. Tổng hợp danh sách Ngành học (Student Majors)
  const aggregatedStudentMajors = [];
  
  // Lấy 3 ngành từ Primary (match 94-98%)
  pData.student.majors.slice(0, 3).forEach((item, index) => {
    aggregatedStudentMajors.push({
      name: item.name,
      match: Math.max(90, 98 - index * 2),
      reason: `${item.reason} (Trùng khớp 50% với mã ưu tiên số 1: ${primaryKey})`
    });
  });

  // Lấy 2 ngành từ Secondary (match 88-92%)
  sData.student.majors.slice(0, 2).forEach((item, index) => {
    aggregatedStudentMajors.push({
      name: item.name,
      match: Math.max(86, 92 - index * 3),
      reason: `${item.reason} (Bổ trợ 30% theo mã thứ hai: ${secondaryKey})`
    });
  });

  // Lấy 1 ngành từ Tertiary (match 84-86%)
  if (tData.student.majors.length > 0) {
    const item = tData.student.majors[0];
    aggregatedStudentMajors.push({
      name: item.name,
      match: 85,
      reason: `${item.reason} (Hài hòa 20% với mã thứ ba: ${tertiaryKey})`
    });
  }

  // 3. Tổng hợp Vị trí Công việc (Professional Careers)
  const aggregatedProCareers = [];

  pData.professional.careers.slice(0, 3).forEach((item, index) => {
    aggregatedProCareers.push({
      title: item.title,
      match: Math.max(90, 98 - index * 2),
      desc: `${item.desc} (Đặc trưng vượt trội theo mã ưu tiên ${primaryKey})`
    });
  });

  sData.professional.careers.slice(0, 2).forEach((item, index) => {
    aggregatedProCareers.push({
      title: item.title,
      match: Math.max(86, 92 - index * 3),
      desc: `${item.desc} (Giao thoa bổ trợ với mã ${secondaryKey})`
    });
  });

  if (tData.professional.careers.length > 0) {
    const item = tData.professional.careers[0];
    aggregatedProCareers.push({
      title: item.title,
      match: 85,
      desc: `${item.desc} (Kết hợp tạo điểm nhấn với mã ${tertiaryKey})`
    });
  }

  // 4. Kết hợp các thuộc tính phụ
  return {
    student: {
      majors: aggregatedStudentMajors,
      clubRoles: Array.from(new Set([...pData.student.clubRoles, ...sData.student.clubRoles])).slice(0, 4),
      softSkills: Array.from(new Set([...pData.student.softSkills, ...sData.student.softSkills])).slice(0, 4),
      internships: Array.from(new Set([...pData.student.internships, ...sData.student.internships])).slice(0, 3)
    },
    professional: {
      careers: aggregatedProCareers,
      leadershipStyle: `${pData.professional.leadershipStyle} Ngoài ra, kết hợp linh hoạt yếu tố thấu hiểu và phân tích từ nhóm mã ${secondaryKey} và ${tertiaryKey}.`,
      stressManagement: `${pData.professional.stressManagement} Đổi mới phương pháp cân bằng bằng cách tham khảo gợi ý từ nhóm ${secondaryKey}.`,
      recommendedCertificates: Array.from(new Set([...pData.professional.recommendedCertificates, ...sData.professional.recommendedCertificates])).slice(0, 4)
    }
  };
}

