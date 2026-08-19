// Bộ 20 câu hỏi trắc nghiệm MBTI tình huống thực tế song ngữ
// Phân bổ: 5 câu E/I, 5 câu S/N, 5 câu T/F, 5 câu J/P

export const MBTI_QUESTIONS = [
  // --- E vs I (Extraversion vs Introversion) ---
  {
    id: 1,
    dimension: 'EI',
    questionVi: 'Sau một tuần làm việc / học tập căng thẳng, bạn thường nạp lại năng lượng bằng cách nào?',
    questionEn: 'After a long stressful week, how do you usually recharge your energy?',
    options: [
      {
        textVi: 'Gặp gỡ bạn bè, đi cà phê, tham gia bữa tiệc hoặc các hoạt động sôi động.',
        textEn: 'Gathering with friends, going to cafes, attending parties or lively events.',
        trait: 'E'
      },
      {
        textVi: 'Dành thời gian một mình ở nhà, đọc sách, xem phim hoặc làm sở thích cá nhân.',
        textEn: 'Spending quiet time at home, reading, watching movies or pursuing private hobbies.',
        trait: 'I'
      }
    ]
  },
  {
    id: 2,
    dimension: 'EI',
    questionVi: 'Khi ở trong một sự kiện hoặc môi trường làm việc mới với nhiều người lạ, bạn sẽ:',
    questionEn: 'In a new event or workplace with unfamiliar people, you tend to:',
    options: [
      {
        textVi: 'Chủ động đến bắt chuyện, làm quen và mở rộng mạng lưới mối quan hệ.',
        textEn: 'Proactively initiate conversations, make friends and expand your network.',
        trait: 'E'
      },
      {
        textVi: 'Quan sát trước, chờ người khác tiếp cận hoặc chỉ trò chuyện với vài người quen.',
        textEn: 'Observe first, wait for others to approach, or talk only with a few familiar faces.',
        trait: 'I'
      }
    ]
  },
  {
    id: 3,
    dimension: 'EI',
    questionVi: 'Khi phát sinh một ý tưởng mới hoặc vấn đề phức tạp, bạn thích:',
    questionEn: 'When coming up with a new idea or complex problem, you prefer to:',
    options: [
      {
        textVi: 'Nói ra ngay và thảo luận trực tiếp với mọi người để vừa nói vừa phát triển ý tưởng.',
        textEn: 'Talk it out immediately and brainstorm aloud with others.',
        trait: 'E'
      },
      {
        textVi: 'Suy nghĩ kỹ trong đầu một mình trước khi chia sẻ hoặc trình bày với người khác.',
        textEn: 'Think it through quietly by yourself before sharing with others.',
        trait: 'I'
      }
    ]
  },
  {
    id: 4,
    dimension: 'EI',
    questionVi: 'Phong cách giao tiếp thường ngày của bạn nghiêng về chiều hướng nào hơn?',
    questionEn: 'Which best describes your daily communication style?',
    options: [
      {
        textVi: 'Cởi mở, bộc lộ cảm xúc dễ dàng, thích trao đổi trực tiếp hơn viết lách.',
        textEn: 'Open, easily expressing feelings, preferring spoken dialogue over writing.',
        trait: 'E'
      },
      {
        textVi: 'Kín đáo, chọn lọc từ ngữ cẩn thận, thích nhắn tin hoặc viết email hơn nói chuyện trực tiếp.',
        textEn: 'Private, carefully choosing words, preferring texting/writing over talking.',
        trait: 'I'
      }
    ]
  },
  {
    id: 5,
    dimension: 'EI',
    questionVi: 'Khi làm việc nhóm, điều gì mang lại cho bạn cảm hứng nhất?',
    questionEn: 'When working in a team, what gives you the most inspiration?',
    options: [
      {
        textVi: 'Không khí trao đổi sôi nổi, tương tác liên tục và năng lượng từ đồng đội.',
        textEn: 'Dynamic discussions, constant interaction, and energy from teammates.',
        trait: 'E'
      },
      {
        textVi: 'Phân chia nhiệm vụ độc lập rõ ràng để mỗi người tự do hoàn thành phần việc của mình.',
        textEn: 'Clear independent task division so everyone can work peacefully.',
        trait: 'I'
      }
    ]
  },

  // --- S vs N (Sensing vs Intuition) ---
  {
    id: 6,
    dimension: 'SN',
    questionVi: 'Khi tiếp nhận thông tin hoặc học một kiến thức mới, bạn thường chú ý tới điều gì trước tiên?',
    questionEn: 'When processing new information or learning something new, what do you notice first?',
    options: [
      {
        textVi: 'Chi tiết cụ thể, số liệu thực tế, các sự kiện rõ ràng và trải nghiệm thực tiễn.',
        textEn: 'Concrete details, real numbers, factual events and practical experiences.',
        trait: 'S'
      },
      {
        textVi: 'Bức tranh tổng thể, các mối liên hệ ẩn giấu, ý nghĩa đằng sau và xu hướng tương lai.',
        textEn: 'The big picture, hidden patterns, underlying meanings and future possibilities.',
        trait: 'N'
      }
    ]
  },
  {
    id: 7,
    dimension: 'SN',
    questionVi: 'Cách bạn giải quyết các công việc được giao trong thực tế:',
    questionEn: 'How do you approach tasks assigned to you in practice?',
    options: [
      {
        textVi: 'Áp dụng các phương pháp đã chứng minh hiệu quả, làm từng bước theo quy trình chuẩn.',
        textEn: 'Apply proven methods and follow step-by-step standard procedures.',
        trait: 'S'
      },
      {
        textVi: 'Thử nghiệm các cách tiếp cận mới lạ, sáng tạo và tìm giải pháp độc đáo.',
        textEn: 'Experiment with novel, creative approaches and invent unique solutions.',
        trait: 'N'
      }
    ]
  },
  {
    id: 8,
    dimension: 'SN',
    questionVi: 'Mọi người thường nhận xét bạn là người như thế nào hơn?',
    questionEn: 'People would most likely describe you as:',
    options: [
      {
        textVi: 'Thực tế, có đầu óc thực tiễn, cẩn thận và quan sát tỉ mỉ.',
        textEn: 'Realistic, practical-minded, careful and observant of details.',
        trait: 'S'
      },
      {
        textVi: 'Giàu tưởng tượng, chiến lược, tầm nhìn xa và thích khám phá ý tưởng mới.',
        textEn: 'Imaginative, strategic, visionary and fond of exploring novel concepts.',
        trait: 'N'
      }
    ]
  },
  {
    id: 9,
    dimension: 'SN',
    questionVi: 'Khi đọc một cuốn sách hoặc xem tài liệu thuyết trình, bạn thích điều gì hơn?',
    questionEn: 'When reading a book or presentation, what appeals to you more?',
    options: [
      {
        textVi: 'Thông tin có ví dụ thực tế, minh họa cụ thể và có tính ứng dụng ngay lập tức.',
        textEn: 'Information with real-world examples, clear facts and immediate utility.',
        trait: 'S'
      },
      {
        textVi: 'Các lý thuyết ẩn dụ, khái niệm sáng tạo và những góc nhìn triết lý mới mẻ.',
        textEn: 'Metaphorical theories, creative concepts and novel philosophical perspectives.',
        trait: 'N'
      }
    ]
  },
  {
    id: 10,
    dimension: 'SN',
    questionVi: 'Khi lên kế hoạch định hướng bản thân, bạn thường ưu tiên tập trung vào:',
    questionEn: 'When planning your personal roadmap, you tend to focus on:',
    options: [
      {
        textVi: 'Mục tiêu hiện tại, những việc trước mắt cần xử lý tốt ngay hôm nay.',
        textEn: 'Present goals, immediate tasks that need solid execution today.',
        trait: 'S'
      },
      {
        textVi: 'Tầm nhìn 3 - 5 năm tới, các cơ hội tiềm năng và sứ mệnh dài hạn.',
        textEn: '3-5 year vision, potential future opportunities and long-term mission.',
        trait: 'N'
      }
    ]
  },

  // --- T vs F (Thinking vs Feeling) ---
  {
    id: 11,
    dimension: 'TF',
    questionVi: 'Khi đưa ra một quyết định quan trọng trong công việc / cuộc sống, căn cứ chính của bạn là:',
    questionEn: 'When making a major decision, your primary foundation is:',
    options: [
      {
        textVi: 'Phân tích logic, đánh giá ưu/nhược điểm công bằng và nguyên tắc nguyên nhân - kết quả.',
        textEn: 'Logical analysis, objective pros/cons evaluation, and cause-effect reasoning.',
        trait: 'T'
      },
      {
        textVi: 'Cảm xúc cá nhân, giá trị đạo đức và tác động của quyết định đó đến cảm xúc mọi người.',
        textEn: 'Personal values, empathy, and how the decision affects people’s feelings.',
        trait: 'F'
      }
    ]
  },
  {
    id: 12,
    dimension: 'TF',
    questionVi: 'Khi gặt hái thành công hoặc giải quyết mâu thuẫn, điều gì quan trọng hơn với bạn?',
    questionEn: 'When achieving success or resolving conflicts, what matters more to you?',
    options: [
      {
        textVi: 'Sự chính xác, sự thật khách quan và tính hiệu quả tuyệt đối.',
        textEn: 'Truth, objective fairness, and absolute efficiency.',
        trait: 'T'
      },
      {
        textVi: 'Sự hòa hợp tập thể, sự thấu cảm và thấu hiểu mối quan hệ con người.',
        textEn: 'Group harmony, mutual empathy, and healthy interpersonal relationships.',
        trait: 'F'
      }
    ]
  },
  {
    id: 13,
    dimension: 'TF',
    questionVi: 'Khi cần đưa ra góp ý cho đồng nghiệp hoặc bạn bè về một sai sót:',
    questionEn: 'When giving feedback to a peer about a mistake:',
    options: [
      {
        textVi: 'Nói thẳng thắn, trực diện vào vấn đề để sửa nhanh và nâng cao chất lượng công việc.',
        textEn: 'Be direct and honest about the issue to fix it quickly and drive quality.',
        trait: 'T'
      },
      {
        textVi: 'Tế nhị, khéo léo chọn cách nói động viên để tránh làm tổn thương người nghe.',
        textEn: 'Be tactful, choosing encouraging words to avoid hurting their feelings.',
        trait: 'F'
      }
    ]
  },
  {
    id: 14,
    dimension: 'TF',
    questionVi: 'Bạn cảm thấy tự hào về bản thân hơn khi được khen ngợi là người:',
    questionEn: 'You feel prouder when praised for being:',
    options: [
      {
        textVi: 'Thông minh, có tư duy sắc bén, công bằng và đáng tin cậy.',
        textEn: 'Intelligent, sharp-minded, fair and dependable.',
        trait: 'T'
      },
      {
        textVi: 'Tốt bụng, biết quan tâm, chân thành và tạo cảm hứng cho người khác.',
        textEn: 'Kind, caring, genuine and inspiring to others.',
        trait: 'F'
      }
    ]
  },
  {
    id: 15,
    dimension: 'TF',
    questionVi: 'Trong một cuộc thảo luận gay gắt, thái độ của bạn là gì?',
    questionEn: 'In a heated debate, what is your stance?',
    options: [
      {
        textVi: 'Bảo vệ lập luận dựa trên lý lẽ khách quan, không ngần ngại tranh luận đến cùng.',
        textEn: 'Stand up for objective logic and reason, unafraid of firm debate.',
        trait: 'T'
      },
      {
        textVi: 'Tìm điểm chung, xoa dịu không khí căng thẳng và hướng đến sự đồng thuận.',
        textEn: 'Find common ground, soothe tensions, and seek consensus.',
        trait: 'F'
      }
    ]
  },

  // --- J vs P (Judging vs Perceiving) ---
  {
    id: 16,
    dimension: 'JP',
    questionVi: 'Cách bạn quản lý công việc và thời gian hàng ngày:',
    questionEn: 'How do you manage your daily work and schedule?',
    options: [
      {
        textVi: 'Lập danh sách To-Do List chi tiết, có lịch trình rõ ràng và hoàn thành đúng hạn.',
        textEn: 'Maintain detailed To-Do lists, strict schedules and finish before deadlines.',
        trait: 'J'
      },
      {
        textVi: 'Làm việc linh hoạt, ứng biến tùy hoàn cảnh, thích sự tự do không gò bó theo khung giờ.',
        textEn: 'Work flexibly, adapt spontaneously, preferring freedom over rigid timelines.',
        trait: 'P'
      }
    ]
  },
  {
    id: 17,
    dimension: 'JP',
    questionVi: 'Khi chuẩn bị cho một chuyến đi du lịch hoặc một sự kiện:',
    questionEn: 'When planning for a vacation or major event:',
    options: [
      {
        textVi: 'Lên lịch chi tiết từ điểm đến, thời gian, đặt phòng trước nhiều tuần.',
        textEn: 'Plan detailed itineraries, destinations and bookings weeks in advance.',
        trait: 'J'
      },
      {
        textVi: 'Chỉ quyết định điểm đến chung, sẵn sàng khám phá tự do và thay đổi kế hoạch bất cứ lúc nào.',
        textEn: 'Decide only general spots, ready to explore freely and pivot plans on the fly.',
        trait: 'P'
      }
    ]
  },
  {
    id: 18,
    dimension: 'JP',
    questionVi: 'Bạn thích môi trường làm việc có đặc điểm nào hơn?',
    questionEn: 'Which work environment do you prefer?',
    options: [
      {
        textVi: 'Gọn gàng, có hệ thống tổ chức rõ ràng, quy trình minh bạch.',
        textEn: 'Structured, highly organized, with transparent processes.',
        trait: 'J'
      },
      {
        textVi: 'Mở, tự do sáng tạo, linh hoạt thay đổi và cho phép thử sai.',
        textEn: 'Open, creative, highly adaptable with freedom to iterate.',
        trait: 'P'
      }
    ]
  },
  {
    id: 19,
    dimension: 'JP',
    questionVi: 'Thái độ của bạn đối với các hạn chót (Deadline):',
    questionEn: 'Your attitude towards deadlines:',
    options: [
      {
        textVi: 'Hoàn thành sớm trước deadline để có thời gian rà soát và cảm thấy an tâm.',
        textEn: 'Complete tasks well before deadlines to review calmly and gain peace of mind.',
        trait: 'J'
      },
      {
        textVi: 'Thường hoàn thành sát giờ deadline vì áp lực thời gian tạo ra sự bứt phá và cảm hứng tốt nhất.',
        textEn: 'Finish near deadline because time pressure sparks peak creativity and focus.',
        trait: 'P'
      }
    ]
  },
  {
    id: 20,
    dimension: 'JP',
    questionVi: 'Khi một kế hoạch đột ngột bị thay đổi vào phút chót, bạn cảm thấy:',
    questionEn: 'When plans suddenly change at the last minute, you feel:',
    options: [
      {
        textVi: 'Khá khó chịu và bối rối vì sự xáo trộn ngoài dự tính.',
        textEn: 'Somewhat uncomfortable and annoyed by unexpected disruptions.',
        trait: 'J'
      },
      {
        textVi: 'Dễ dàng chấp nhận, coi đó là cơ hội trải nghiệm mới và nhanh chóng thích nghi.',
        textEn: 'Easily accepting, treating it as an exciting new opportunity and adapting quickly.',
        trait: 'P'
      }
    ]
  }
];
