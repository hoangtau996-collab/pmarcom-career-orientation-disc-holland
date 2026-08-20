// Bộ 28 câu hỏi trắc nghiệm MBTI tình huống tâm lý chuyên sâu song ngữ Việt - Anh
// Phân bổ cân bằng 4 chiều đo nhân cách cốt lõi:
// - 7 câu E vs I (Extraversion vs Introversion)
// - 7 câu S vs N (Sensing vs Intuition)
// - 7 câu T vs F (Thinking vs Feeling)
// - 7 câu J vs P (Judging vs Perceiving)

export const MBTI_QUESTIONS = [
  // ==========================================
  // --- SECTION 1: E vs I (Extraversion vs Introversion) ---
  // ==========================================
  {
    id: 1,
    dimension: 'EI',
    questionVi: 'Sau một tuần làm việc / học tập căng thẳng, phương thức giúp bạn nạp lại năng lượng hiệu quả nhất là gì?',
    questionEn: 'After an exhausting work week, what is your most effective way to recharge your energy?',
    options: [
      {
        textVi: 'Gặp gỡ bạn bè, đi cà phê, tham gia các buổi tiệc hoặc hoạt động nhóm sôi nổi.',
        textEn: 'Gathering with friends, hitting cafes, attending parties or lively group activities.',
        trait: 'E'
      },
      {
        textVi: 'Dành thời gian một mình ở không gian riêng, đọc sách, xem phim hoặc làm sở thích cá nhân.',
        textEn: 'Spending quiet time alone at home, reading, watching movies or pursuing personal hobbies.',
        trait: 'I'
      }
    ]
  },
  {
    id: 2,
    dimension: 'EI',
    questionVi: 'Khi tham gia một hội thảo hoặc sự kiện kết nối với nhiều người mới, bạn thường có xu hướng:',
    questionEn: 'When attending a conference or networking event with new people, you tend to:',
    options: [
      {
        textVi: 'Chủ động đến bắt chuyện, giới thiệu bản thân và hào hứng mở rộng mạng lưới quan hệ.',
        textEn: 'Proactively approach others, introduce yourself and enthusiastically expand your network.',
        trait: 'E'
      },
      {
        textVi: 'Quan sát không gian xung quanh trước, chờ người khác tiếp cận hoặc chỉ nói chuyện với vài người quen.',
        textEn: 'Observe the setting first, wait for others to approach, or talk only with a few familiar faces.',
        trait: 'I'
      }
    ]
  },
  {
    id: 3,
    dimension: 'EI',
    questionVi: 'Khi phát sinh một ý tưởng đột phá hoặc bài toán phức tạp, bạn thích hình thành tư duy bằng cách:',
    questionEn: 'When developing a complex idea or solving a tough problem, you prefer to:',
    options: [
      {
        textVi: 'Trao đổi trực tiếp, nói ra ngay với đồng nghiệp để vừa nói vừa phát triển hoàn thiện ý tưởng.',
        textEn: 'Brainstorm aloud directly with teammates to develop and refine ideas on the fly.',
        trait: 'E'
      },
      {
        textVi: 'Suy nghĩ, phân tích kỹ lưỡng trong đầu một mình trước khi chia sẻ với người khác.',
        textEn: 'Process and reflect thoroughly in your head before presenting it to others.',
        trait: 'I'
      }
    ]
  },
  {
    id: 4,
    dimension: 'EI',
    questionVi: 'Khi mâu thuẫn đột ngột bùng nổ trong đội ngũ, phản ứng tự nhiên đầu tiên của bạn là:',
    questionEn: 'When a sudden conflict erupts in your team, your natural first instinct is to:',
    options: [
      {
        textVi: 'Tổ chức cuộc họp trao đổi trực tiếp ngay lập tức để làm rõ mọi khúc mắc.',
        textEn: 'Call an immediate face-to-face discussion to iron out all misunderstandings.',
        trait: 'E'
      },
      {
        textVi: 'Lùi lại một bước, giữ khoảng cách để quan sát và suy ngẫm lý do gốc rễ trước khi lên tiếng.',
        textEn: 'Step back, maintain distance to observe and reflect on root causes before speaking up.',
        trait: 'I'
      }
    ]
  },
  {
    id: 5,
    dimension: 'EI',
    questionVi: 'Phong cách chia sẻ suy nghĩ và cảm xúc cá nhân của bạn với môi trường xung quanh:',
    questionEn: 'How do you share your inner thoughts and feelings with the surrounding environment?',
    options: [
      {
        textVi: 'Cởi mở, bộc lộ cảm xúc tự nhiên và dễ dàng kết nối với hầu hết mọi người.',
        textEn: 'Open, expressing feelings naturally and easily connecting with almost anyone.',
        trait: 'E'
      },
      {
        textVi: 'Kín đáo, chọn lọc cẩn thận và chỉ bộc lộ sâu sắc với những người thật sự thân thiết.',
        textEn: 'Private, selective, and sharing deeply only with a trusted inner circle.',
        trait: 'I'
      }
    ]
  },
  {
    id: 6,
    dimension: 'EI',
    questionVi: 'Môi trường làm việc giúp bạn phát huy 100% năng suất làm việc:',
    questionEn: 'Which work environment enables you to unleash 100% of your productivity?',
    options: [
      {
        textVi: 'Không gian mở náo nhiệt, liên tục tương tác và trao đổi năng lượng với đồng đội.',
        textEn: 'A dynamic open space with constant interactions and collaborative energy.',
        trait: 'E'
      },
      {
        textVi: 'Góc làm việc yên tĩnh, ít tiếng ồn nhiễu giúp bạn duy trì sự tập trung chuyên sâu.',
        textEn: 'A quiet, distraction-free workspace allowing deep focused concentration.',
        trait: 'I'
      }
    ]
  },
  {
    id: 7,
    dimension: 'EI',
    questionVi: 'Khi bất ngờ trở thành tâm điểm chú ý trong một đám đông lớn, bạn cảm thấy:',
    questionEn: 'When unexpectedly becoming the center of attention in a crowd, you feel:',
    options: [
      {
        textVi: 'Hào hứng, tự nhiên và tận hưởng cảm giác năng lượng lan tỏa.',
        textEn: 'Energized, natural, and enjoying the vibrant atmosphere.',
        trait: 'E'
      },
      {
        textVi: 'Ngại ngùng, hơi căng thẳng và muốn nhanh chóng chuyển sự chú ý sang chủ đề khác.',
        textEn: 'Reserved, slightly self-conscious, preferring to shift the spotlight elsewhere.',
        trait: 'I'
      }
    ]
  },

  // ==========================================
  // --- SECTION 2: S vs N (Sensing vs Intuition) ---
  // ==========================================
  {
    id: 8,
    dimension: 'SN',
    questionVi: 'Khi bắt đầu tiếp nhận thông tin cho một dự án mới, yếu tố nào thu hút sự chú ý của bạn đầu tiên?',
    questionEn: 'When starting a new project, what captures your focus first?',
    options: [
      {
        textVi: 'Số liệu thực tế cụ thể, các sự kiện rõ ràng và nguồn lực sẵn có ngay trước mắt.',
        textEn: 'Concrete data, clear facts, and immediate tangible resources at hand.',
        trait: 'S'
      },
      {
        textVi: 'Bức tranh tổng thể, các mối liên hệ ẩn giấu và những cơ hội tiềm năng trong tương lai.',
        textEn: 'The big picture, underlying patterns, and future potential possibilities.',
        trait: 'N'
      }
    ]
  },
  {
    id: 9,
    dimension: 'SN',
    questionVi: 'Cách bạn lựa chọn phương pháp để giải quyết các bài toán thách thức trong công việc:',
    questionEn: 'How do you choose your methodology when solving tough work challenges?',
    options: [
      {
        textVi: 'Ưu tiên các phương pháp đã được kiểm chứng hiệu quả thực tế và thực hiện từng bước chuẩn chỉ.',
        textEn: 'Prefer time-tested proven methodologies and execute them step-by-step.',
        trait: 'S'
      },
      {
        textVi: 'Thích thử nghiệm các hướng đi mới lạ, sáng tạo giải pháp độc đáo chưa ai thực hiện.',
        textEn: 'Love experimenting with novel, innovative approaches and pioneering unique solutions.',
        trait: 'N'
      }
    ]
  },
  {
    id: 10,
    dimension: 'SN',
    questionVi: 'Khi truyền đạt ý tưởng cho đồng đội, phong cách ngô ngữ thể hiện của bạn nghiêng về:',
    questionEn: 'When communicating ideas to colleagues, your expression style leans towards:',
    options: [
      {
        textVi: 'Cụ thể, thực tế, đi thẳng vào chi tiết và ví dụ minh họa trực quan.',
        textEn: 'Concrete, practical, focusing on specifics and visual real-world examples.',
        trait: 'S'
      },
      {
        textVi: 'Dùng hình ảnh ẩn dụ, khái niệm chiến lược và các giả thuyết mang tính tầm nhìn.',
        textEn: 'Using metaphors, strategic concepts, and visionary hypotheses.',
        trait: 'N'
      }
    ]
  },
  {
    id: 11,
    dimension: 'SN',
    questionVi: 'Khi đọc một cuốn sách hoặc nghiên cứu báo cáo chuyên môn, bạn đánh giá cao điều gì hơn?',
    questionEn: 'When reading a book or technical report, what do you value more?',
    options: [
      {
        textVi: 'Những thông tin có giá trị thực tiễn cao, áp dụng được ngay vào công việc hàng ngày.',
        textEn: 'Practical insights with immediate real-world application.',
        trait: 'S'
      },
      {
        textVi: 'Những tư tưởng triết lý mới mẻ, mở rộng góc nhìn và truyền cảm hứng suy ngẫm.',
        textEn: 'Fresh philosophical ideas that expand perspectives and provoke deep thought.',
        trait: 'N'
      }
    ]
  },
  {
    id: 12,
    dimension: 'SN',
    questionVi: 'Trong quá trình rà soát sản phẩm hoặc tài liệu, thói quen tư duy của bạn là:',
    questionEn: 'During product or document reviews, your thinking habit is to:',
    options: [
      {
        textVi: 'Tập trung soi xét chi tiết nhỏ, phát hiện lỗi số liệu hoặc quy trình chưa đúng chuẩn.',
        textEn: 'Focus closely on small details, spotting data errors or procedural flaws.',
        trait: 'S'
      },
      {
        textVi: 'Nhìn nhận tính logic tổng thể của toàn bộ thông điệp, dễ lướt qua các lỗi chi tiết nhỏ.',
        textEn: 'Assess overall logical flow and messaging, sometimes skipping minor typos.',
        trait: 'N'
      }
    ]
  },
  {
    id: 13,
    dimension: 'SN',
    questionVi: 'Khi xây dựng kế hoạch định hướng sự nghiệp cá nhân, bạn thường tập trung vào:',
    questionEn: 'When building your career roadmap, you primarily focus on:',
    options: [
      {
        textVi: 'Các mục tiêu rõ ràng trước mắt, công việc thực tế cần hoàn thành tốt trong 6 - 12 tháng tới.',
        textEn: 'Clear short-term goals and practical tasks to master in the next 6-12 months.',
        trait: 'S'
      },
      {
        textVi: 'Tầm nhìn 3 - 5 năm tới, định hướng sứ mệnh cá nhân và các xu hướng đột phá tương lai.',
        textEn: 'A 3-5 year vision, long-term personal mission, and emerging future trends.',
        trait: 'N'
      }
    ]
  },
  {
    id: 14,
    dimension: 'SN',
    questionVi: 'Thái độ của bạn trước những quy trình làm việc truyền thống lâu đời:',
    questionEn: 'Your attitude towards long-established traditional workflows:',
    options: [
      {
        textVi: 'Tôn trọng và duy trì vì chúng đem lại sự an toàn và hiệu quả đã được lịch sử kiểm chứng.',
        textEn: 'Respect and maintain them as they provide proven safety and historical efficiency.',
        trait: 'S'
      },
      {
        textVi: 'Luôn trăn trở cải tiến, hoài nghi tính tối ưu và muốn thử nghiệm giải pháp đột phá hơn.',
        textEn: 'Constantly question them, seeking improvements and revolutionary alternatives.',
        trait: 'N'
      }
    ]
  },

  // ==========================================
  // --- SECTION 3: T vs F (Thinking vs Feeling) ---
  // ==========================================
  {
    id: 15,
    dimension: 'TF',
    questionVi: 'Khi đứng trước một quyết định quan trọng ảnh hưởng đến dự án, căn cứ tối thượng của bạn là:',
    questionEn: 'When facing a critical project decision, your ultimate deciding factor is:',
    options: [
      {
        textVi: 'Phân tích logic công bằng, số liệu thực chứng và quy luật nguyên nhân - kết quả.',
        textEn: 'Objective logical analysis, empirical evidence, and cause-effect principles.',
        trait: 'T'
      },
      {
        textVi: 'Cảm xúc, giá trị đạo đức cá nhân và mức độ tác động của quyết định đó tới con người.',
        textEn: 'Personal values, empathy, and how the decision affects people emotionally.',
        trait: 'F'
      }
    ]
  },
  {
    id: 16,
    dimension: 'TF',
    questionVi: 'Khi cần giải quyết các bất đồng trong đội ngũ, mục tiêu hàng đầu bạn hướng tới là:',
    questionEn: 'When resolving team disputes, your primary objective is:',
    options: [
      {
        textVi: 'Tìm ra sự thật khách quan, phân định đúng sai rõ ràng và đạt hiệu quả tối đa.',
        textEn: 'Establishing objective truth, clear accountability, and maximum efficiency.',
        trait: 'T'
      },
      {
        textVi: 'Giữ gìn sự hòa hợp tập thể, lắng nghe nguyện vọng và bảo vệ mối quan hệ bền vững.',
        textEn: 'Preserving group harmony, listening to feelings, and protecting relationships.',
        trait: 'F'
      }
    ]
  },
  {
    id: 17,
    dimension: 'TF',
    questionVi: 'Khi cần đưa ra lời nhận xét (Feedback) cho đồng nghiệp về một sai sót chuyên môn:',
    questionEn: 'When giving constructive feedback to a colleague about a technical error:',
    options: [
      {
        textVi: 'Nói thẳng thắn, trực diện vào lỗi sai để giúp họ khắc phục nhanh và nâng cao chất lượng.',
        textEn: 'Be direct and clear about the mistake to fix it fast and maintain high standards.',
        trait: 'T'
      },
      {
        textVi: 'Tế nhị, chọn lọc từ ngữ thấu cảm và động viên tinh thần để tránh tổn thương cảm xúc.',
        textEn: 'Be tactful, choosing empathetic words to encourage without causing hurt.',
        trait: 'F'
      }
    ]
  },
  {
    id: 18,
    dimension: 'TF',
    questionVi: 'Bạn cảm thấy tự hào hơn khi mọi người xung quanh đánh giá bạn là người:',
    questionEn: 'You feel prouder when others acknowledge you as someone who is:',
    options: [
      {
        textVi: 'Sắc bén, tư duy logic công bằng, lý trí và cực kỳ đáng tin cậy.',
        textEn: 'Sharp-minded, logically fair, rational, and highly competent.',
        trait: 'T'
      },
      {
        textVi: 'Ấm áp, biết quan tâm thấu hiểu, tốt bụng và tạo cảm hứng tích cực.',
        textEn: 'Warm, deeply understanding, kind-hearted, and positively inspiring.',
        trait: 'F'
      }
    ]
  },
  {
    id: 19,
    dimension: 'TF',
    questionVi: 'Khi một thành viên trong nhóm không hoàn thành nhiệm vụ đúng tiến độ, phản ứng của bạn là:',
    questionEn: 'When a team member fails to deliver their task on time, your response is:',
    options: [
      {
        textVi: 'Đánh giá dựa trên cam kết công việc và yêu cầu đưa ra phương án khắc phục hậu quả ngay.',
        textEn: 'Hold them accountable to the commitment and demand an immediate remedial plan.',
        trait: 'T'
      },
      {
        textVi: 'Tìm hiểu hoàn cảnh cá nhân, tâm tư khó khăn của họ trước để đưa ra sự hỗ trợ phù hợp.',
        textEn: 'Inquire about their personal difficulties first to offer empathetic support.',
        trait: 'F'
      }
    ]
  },
  {
    id: 20,
    dimension: 'TF',
    questionVi: 'Thái độ của bạn đối với khái niệm "Công bằng" trong quản lý:',
    questionEn: 'Your perspective on "Fairness" in management:',
    options: [
      {
        textVi: 'Áp dụng chung một thước đo nguyên tắc bình đẳng cho tất cả mọi người không ngoại lệ.',
        textEn: 'Applying one equal standard and set of rules to everyone without exception.',
        trait: 'T'
      },
      {
        textVi: 'Linh hoạt xem xét từng trường hợp cụ thể để đối xử nhân văn với từng cá nhân.',
        textEn: 'Flexibly considering individual circumstances to treat each person humanely.',
        trait: 'F'
      }
    ]
  },
  {
    id: 21,
    dimension: 'TF',
    questionVi: 'Trong một cuộc tranh luận chuyên môn gay gắt, xu hướng của bạn là:',
    questionEn: 'In a heated professional debate, your tendency is to:',
    options: [
      {
        textVi: 'Bảo vệ lập luận dựa trên lý lẽ và sự thật khách quan, sẵn sàng tranh luận đến cùng.',
        textEn: 'Defend arguments with logic and objective facts, willing to debate till truth wins.',
        trait: 'T'
      },
      {
        textVi: 'Tìm kiếm sự đồng thuận, sẵn sàng nhượng bộ góc nhìn để duy trì không khí tích cực.',
        textEn: 'Seek common ground, willing to compromise to preserve team harmony.',
        trait: 'F'
      }
    ]
  },

  // ==========================================
  // --- SECTION 4: J vs P (Judging vs Perceiving) ---
  // ==========================================
  {
    id: 22,
    dimension: 'JP',
    questionVi: 'Phương thức tổ chức công việc và thời gian hiệu quả nhất của bạn:',
    questionEn: 'Your most effective method for organizing work and time:',
    options: [
      {
        textVi: 'Lập danh sách To-Do List chi tiết, có lịch trình rõ ràng và tuân thủ kỷ luật.',
        textEn: 'Creating detailed To-Do lists, clear schedules, and strictly adhering to them.',
        trait: 'J'
      },
      {
        textVi: 'Làm việc linh hoạt theo cảm hứng, dễ dàng ứng biến và thích sự tự do không rập khuôn.',
        textEn: 'Working flexibly based on inspiration, adapting spontaneously without rigid structures.',
        trait: 'P'
      }
    ]
  },
  {
    id: 23,
    dimension: 'JP',
    questionVi: 'Khi chuẩn bị cho một chuyến đi công tác hoặc kỳ nghỉ du lịch:',
    questionEn: 'When preparing for a business trip or vacation:',
    options: [
      {
        textVi: 'Lên lịch trình cụ thể từng ngày, đặt vé và phòng trước nhiều tuần để an tâm.',
        textEn: 'Designing detailed daily itineraries and booking weeks in advance for peace of mind.',
        trait: 'J'
      },
      {
        textVi: 'Chỉ quyết định điểm đến chung, để ngỏ lịch trình và sẵn sàng khám phá bất ngờ.',
        textEn: 'Deciding on a general destination, leaving options open for spontaneous exploration.',
        trait: 'P'
      }
    ]
  },
  {
    id: 24,
    dimension: 'JP',
    questionVi: 'Môi trường bàn làm việc và không gian sống lý tưởng của bạn:',
    questionEn: 'Your ideal workspace and living environment:',
    options: [
      {
        textVi: 'Gọn gàng, mọi thứ được sắp xếp có hệ thống ngăn nắp và quy chuẩn rõ ràng.',
        textEn: 'Neat, orderly, with everything systematically arranged and structured.',
        trait: 'J'
      },
      {
        textVi: 'Thoải mái, chấp nhận sự bừa bộn sáng tạo và dễ dàng thay đổi vị trí đồ đạc.',
        textEn: 'Casual, accepting creative clutter, and easily re-arranging things on the fly.',
        trait: 'P'
      }
    ]
  },
  {
    id: 25,
    dimension: 'JP',
    questionVi: 'Thái độ của bạn đối với việc hoàn thành các hạn chót (Deadline):',
    questionEn: 'Your attitude towards meeting deadlines:',
    options: [
      {
        textVi: 'Luôn hoàn thành sớm trước hạn để có thời gian kiểm tra lại và giải tỏa áp lực.',
        textEn: 'Always finishing well before deadline to review calmly and eliminate stress.',
        trait: 'J'
      },
      {
        textVi: 'Thường hoàn thành sát giờ hạn chót vì áp lực thời gian tạo ra sự tập trung bứt phá nhất.',
        textEn: 'Often finishing right near the deadline as time pressure fuels peak creative focus.',
        trait: 'P'
      }
    ]
  },
  {
    id: 26,
    dimension: 'JP',
    questionVi: 'Khi một kế hoạch công việc bất ngờ bị thay đổi vào phút chót, phản ứng của bạn:',
    questionEn: 'When a work plan is suddenly altered at the last minute, your reaction is:',
    options: [
      {
        textVi: 'Bối rối và khó chịu vì sự xáo trộn làm đứt gãy tiến độ đã tính toán.',
        textEn: 'Uncomfortable and annoyed as unexpected changes disrupt calculated progress.',
        trait: 'J'
      },
      {
        textVi: 'Hào hứng đón nhận, coi đó là cơ hội trải nghiệm mới và linh hoạt thích nghi.',
        textEn: 'Welcoming it as an exciting new opportunity and flexibly adapting.',
        trait: 'P'
      }
    ]
  },
  {
    id: 27,
    dimension: 'JP',
    questionVi: 'Khi xử lý một vấn đề quan trọng, thói quen chốt quyết định của bạn là:',
    questionEn: 'When tackling an important issue, your decision-making habit is to:',
    options: [
      {
        textVi: 'Thích đưa ra quyết định dứt điểm nhanh chóng để đóng lại vấn đề và chuyển sang việc khác.',
        textEn: 'Make firm, decisive choices quickly to close the issue and move on.',
        trait: 'J'
      },
      {
        textVi: 'Thích trì hoãn chốt hạ để tiếp tục thu thập thêm thông tin và giữ nhiều phương án mở.',
        textEn: 'Keep options open as long as possible to gather more data before finalizing.',
        trait: 'P'
      }
    ]
  },
  {
    id: 28,
    dimension: 'JP',
    questionVi: 'Nhịp sống và phong cách làm việc khiến bạn thấy thoải mái nhất:',
    questionEn: 'The lifestyle and workflow pace that makes you feel most comfortable:',
    options: [
      {
        textVi: 'Nếp sống có tính chu kỳ, ổn định, biết trước việc cần làm của tuần tới.',
        textEn: 'A structured, predictable routine knowing what needs to be done next week.',
        trait: 'J'
      },
      {
        textVi: 'Nếp sống tự do, ngẫu hứng, liên tục đổi mới và chào đón những bất ngờ thú vị.',
        textEn: 'A free-flowing, spontaneous pace embracing constant novelty and surprises.',
        trait: 'P'
      }
    ]
  }
];
