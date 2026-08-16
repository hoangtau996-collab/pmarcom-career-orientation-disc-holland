// 16 Kiểu mẫu Tính cách DISC Chi Tiết (Dựa trên Chuẩn Nghiên Cứu DISC Marston - Hoa Kỳ)

export const DISC_PROFILES = {
  'D': {
    code: 'D',
    name: 'Dominance - Người Quyết Đoán & Thống Trị',
    tagline: 'Mục tiêu là trên hết - Quyết đoán - Tiên phong - Thích thử thách',
    color: '#EF4444',
    bgLight: 'bg-red-50 dark:bg-red-950/40',
    border: 'border-red-500',
    text: 'text-red-600 dark:text-red-400',
    badgeBg: 'bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300',
    
    overview: `Bạn thuộc nhóm tính cách D (Dominance - Thống trị). Bạn là người có mục tiêu cực kỳ rõ ràng, năng nổ, dũng cảm và luôn sẵn sàng giải quyết các vấn đề khó khăn. Bạn không ngại đối mặt với thách thức hay rủi ro mà coi đó là cơ hội để khẳng định bản thân. Khi làm việc hoặc học tập, bạn chú trọng vào kết quả thực tế, tốc độ hoàn thành và hiệu suất đỉnh cao.`,

    characteristics: [
      'Quyết đoán, mạnh mẽ, không ngần ngại đưa ra quyết định khó khăn',
      'Định hướng mục tiêu cao, tập trung vào kết quả đầu ra (Results-oriented)',
      'Thích nắm quyền chủ động và dẫn dắt người khác',
      'Thẳng thắn, đi trực diện vào vấn đề, không vòng vo',
      'Khả năng chịu áp lực vượt trội và giải quyết khủng hoảng nhanh chóng'
    ],

    strengths: [
      'Tốc độ ra quyết định nhanh chóng trong tình huống khẩn cấp',
      'Dũng cảm tiên phong khai phá cơ hội và thị trường mới',
      'Tập trung tối đa vào hiệu suất và kết quả thực tế',
      'Không bị xao nhãng bởi các yếu tố cảm xúc lặt vặt',
      'Có sức ảnh hưởng và uy quyền tự nhiên trong tập thể'
    ],

    weaknesses: [
      'Đôi khi quá bộc trực khiến người khác cảm thấy bị lấn lướt hoặc tổn thương',
      'Thiếu sự nhẫn nại với những người làm việc chậm rãi hoặc quá tỉ mỉ',
      'Có xu hướng áp đặt ý kiến cá nhân lên tập thể',
      'Dễ bỏ qua các chi tiết nhỏ hoặc thủ tục quy trình bắt buộc',
      'Khó lắng nghe và dễ nổi nóng khi tiến độ bị trì trệ'
    ],

    motivations: [
      'Sự tự chủ, quyền quyết định và không bị kiểm soát quá đà',
      'Các thử thách lớn, mục tiêu tham vọng và cơ hội thăng tiến',
      'Sự công nhận về thành quả đạt được và vị thế dẫn đầu'
    ],

    fears: [
      'Bị người khác kiểm soát, mất quyền tự chủ',
      'Thất bại, không hoàn thành mục tiêu hoặc bị xem là yếu đuối',
      'Môi trường trì trệ, rườm rà và chậm tiến độ'
    ],

    communicationStyle: {
      howTheyTalk: 'Nói nhanh, dứt khoát, đi thẳng vào trọng tâm, tập trung vào "CÁI GÌ" (What) và "KHI NÀO" (When).',
      howToTalkToThem: 'Hãy chuẩn bị ngắn gọn, súc tích, trình bày thẳng kết quả và giải pháp. Tránh nói dài dòng, chi tiết lan man hoặc tranh luận bằng cảm xúc.'
    },

    idealEnvironment: 'Môi trường năng động, trao quyền tự chủ cao, đánh giá dựa trên năng lực và hiệu suất thực tế, có lộ trình thăng tiến rõ ràng.'
  },

  'I': {
    code: 'I',
    name: 'Influence - Người Ảnh Hưởng & Thuyết Phục',
    tagline: 'Truyền cảm hứng - Nhiệt huyết - Kết nối cộng đồng - Tích cực',
    color: '#F59E0B',
    bgLight: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-amber-500',
    text: 'text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300',
    
    overview: `Bạn thuộc nhóm tính cách I (Influence - Ảnh hưởng). Bạn là nguồn năng lượng tích cực của mọi tập thể! Bạn cởi mở, tự tin, hòa đồng và có khả năng giao tiếp, thuyết phục tuyệt vời. Bạn dễ dàng thu hút và truyền cảm hứng cho người khác bằng sự nhiệt huyết, sáng tạo và cái nhìn lạc quan về cuộc sống.`,

    characteristics: [
      'Nhiệt tình, hào hứng, luôn tạo bầu không khí vui vẻ và gắn kết',
      'Giỏi giao tiếp, có biệt tài thuyết phục và trình bày trước đám đông',
      'Tự tin, sáng tạo nhiều ý tưởng mới lạ và có tư duy đổi mới',
      'Dễ kết bạn, mở rộng mạng lưới quan hệ xã hội một cách tự nhiên',
      'Hướng ngoại, thích sự công nhận và các hoạt động sôi nổi'
    ],

    strengths: [
      'Giao tiếp, truyền cảm hứng và khơi dậy động lực cho người khác',
      'Khả năng ngoại giao, bán hàng và thuyết phục xuất sắc',
      'Linh hoạt, thích ứng nhanh với các thay đổi và môi trường mới',
      'Khả năng nghĩ "Out of the box" và sáng tạo nội dung/ý tưởng',
      'Tạo dựng môi trường làm việc tích cực, hòa đồng'
    ],

    weaknesses: [
      'Dễ bị phân tán tư tưởng, thiếu tập trung vào chi tiết tỉ mỉ',
      'Thường hứa hẹn nhiều nhưng đôi khi thiếu sự theo đuổi đến cùng',
      'Làm việc dựa nhiều vào cảm hứng, dễ chán khi làm công việc lặp đi lặp lại',
      'Quản lý thời gian và lập kế hoạch chi tiết còn hạn chế',
      'Sợ cảm giác bị từ chối hoặc bị cô lập khỏi tập thể'
    ],

    motivations: [
      'Sự tán thưởng, công nhận công khai và khen ngợi từ mọi người',
      'Các cơ hội giao lưu, kết nối, làm việc nhóm và thể hiện bản thân',
      'Môi trường tự do sáng tạo, không gò bó theo khuôn mẫu cứng nhắc'
    ],

    fears: [
      'Bị gạt ra ngoài lề, bị cô lập hoặc mất đi sự chú ý của mọi người',
      'Sự chỉ trích công khai hoặc bị từ chối tình cảm/quan hệ',
      'Các công việc đơn điệu, giấy tờ chi tiết lặp đi lặp lại'
    ],

    communicationStyle: {
      howTheyTalk: 'Nói hào hứng, giàu cảm xúc, sử dụng nhiều hình ảnh, câu chuyện và ngôn ngữ cơ thể sinh động.',
      howToTalkToThem: 'Lắng nghe chân thành, khen ngợi những ý tưởng hay của họ, tạo không khí thoải mái, vui vẻ và cởi mở trước khi đi vào công việc.'
    },

    idealEnvironment: 'Môi trường sáng tạo, tương tác xã hội cao, được khuyến khích đưa ra ý tưởng mới và truyền thông điệp tích cực.'
  },

  'S': {
    code: 'S',
    name: 'Steadiness - Người Kiên Định & Trầm Tĩnh',
    tagline: 'Lắng nghe sâu sắc - Tận tụy - Trung thành - Hòa nhã',
    color: '#10B981',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-emerald-500',
    text: 'text-emerald-600 dark:text-emerald-400',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300',
    
    overview: `Bạn thuộc nhóm tính cách S (Steadiness - Kiên định). Bạn là điểm tựa tinh thần vững chắc và tin cậy nhất trong bất kỳ đội ngũ nào. Bạn chân thành, chu đáo, kiên nhẫn và luôn coi trọng sự hòa hợp trong mối quan hệ con người. Bạn làm việc bền bỉ, có trách nhiệm cao và sẵn sàng lắng nghe, giúp đỡ người khác mà không cần phô trương.`,

    characteristics: [
      'Điềm tĩnh, ôn hòa, kiên nhẫn và luôn giữ thái độ tôn trọng',
      'Tận tụy, trung thành và có khả năng làm việc bền bỉ lâu dài',
      'Lắng nghe tuyệt vời, biết thấu hiểu và đồng cảm với cảm xúc người khác',
      'Ưu tiên sự ổn định, an toàn và tinh thần đồng đội',
      'Sẵn sàng làm hòa giải viên để giữ gìn không khí hòa thuận'
    ],

    strengths: [
      'Khả năng làm việc nhóm tuyệt vời, hỗ trợ đồng đội tận tình',
      'Kiên trì hoàn thành nhiệm vụ theo quy trình đã cam kết',
      'Lắng nghe sâu, xây dựng niềm tin và tình bạn bền vững',
      'Giữ sự bình tĩnh và là chỗ dựa tinh thần trong lúc xung đột',
      'Đáng tin cậy, bảo mật thông tin và trách nhiệm cao'
    ],

    weaknesses: [
      'Ngần ngại thay đổi, dễ cảm thấy bất an trước các biến động đột ngột',
      'Khó nói "Không" dẫn đến việc tự ôm đồm quá nhiều việc vào mình',
      'Tránh né mâu thuẫn trực tiếp, đôi khi giấu kín suy nghĩ thật',
      'Chậm đưa ra quyết định vì muốn cân nhắc sự an toàn cho mọi người',
      'Thiếu sự quyết liệt khi cần bảo vệ quyền lợi cá nhân'
    ],

    motivations: [
      'Môi trường ổn định, hòa thuận và tình cảm chân thành',
      'Sự trân trọng đối với những đóng góp thầm lặng của họ',
      'Quy trình rõ ràng, hướng dẫn cụ thể và có thời gian để thích nghi'
    ],

    fears: [
      'Sự thay đổi đột ngột không báo trước, xung đột và rạn nứt quan hệ',
      'Bị ép buộc hành động nhanh mà thiếu sự chuẩn bị tâm lý',
      'Làm ai đó tổn thương hoặc khiến tập thể mất đoàn kết'
    ],

    communicationStyle: {
      howTheyTalk: 'Nói nhẹ nhàng, điềm đạm, lắng nghe nhiều hơn nói, quan tâm sâu sắc tới cảm xúc người nghe.',
      howToTalkToThem: 'Giao tiếp ân cần, chân thành, tránh áp đặt hoặc vội vã. Giải thích rõ ràng các thay đổi và cam kết sự đồng hành hỗ trợ.'
    },

    idealEnvironment: 'Môi trường làm việc ấm cúng, thân thiện, ổn định, nơi mọi người tôn trọng lẫn nhau và hợp tác cùng phát triển.'
  },

  'C': {
    code: 'C',
    name: 'Conscientiousness - Người Tuân Thủ & Cẩn Trọng',
    tagline: 'Chính xác tuyệt đối - Tư duy logic - Kỷ luật - Chất lượng',
    color: '#3B82F6',
    bgLight: 'bg-blue-50 dark:bg-blue-950/40',
    border: 'border-blue-500',
    text: 'text-blue-600 dark:text-blue-400',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300',
    
    overview: `Bạn thuộc nhóm tính cách C (Conscientiousness - Tuân thủ). Bạn là chuyên gia phân tích với tư duy logic sắc bén, tính kỷ luật cao và tinh thần trách nhiệm khắt khe đối với chất lượng công việc. Bạn coi trọng thực tế, dữ liệu, sự chính xác và luôn thực hiện nhiệm vụ một cách chỉn chu, hoàn hảo nhất.`,

    characteristics: [
      'Phân tích sâu sắc, logic, nhìn nhận vấn đề dựa trên dữ liệu thực tế',
      'Cẩn trọng, tỉ mỉ, luôn soát lỗi và đặt chuẩn mực chất lượng cao',
      'Tôn trọng quy trình, quy định, kỷ luật và cam kết chất lượng',
      'Độc lập, tự giác, có khả năng nghiên cứu chuyên sâu',
      'Giao tiếp khách quan, công bằng và không cảm tính'
    ],

    strengths: [
      'Khả năng kiểm soát chất lượng, phát hiện sai sót nhỏ nhất',
      'Tư duy phân tích dữ liệu và giải quyết vấn đề kỹ thuật phức tạp',
      'Xây dựng hệ thống, quy trình làm việc chuẩn hóa và rõ ràng',
      'Độ tin cậy và chính xác cao trong mọi báo cáo và tính toán',
      'Cẩn thận phòng ngừa rủi ro trước khi thực hiện'
    ],

    weaknesses: [
      'Đôi khi quá cầu toàn (Perfectionist) dẫn đến chậm tiến độ',
      'Quá soi xét chi tiết khiến người khác cảm thấy áp lực hoặc bị soi lỗi',
      'Khó mở lòng chia sẻ cảm xúc cá nhân, đôi khi tỏ ra xa cách',
      'Quá cứng nhắc theo quy trình, thiếu sự linh hoạt trong tình huống bất ngờ',
      'Ngần ngại đưa ra quyết định nếu chưa đủ 100% dữ liệu'
    ],

    motivations: [
      'Chất lượng công việc cao, sự chính xác và chuyên môn vượt trội',
      'Môi trường có trật tự, tiêu chuẩn rõ ràng và minh bạch',
      'Cơ hội nghiên cứu, phân tích chuyên sâu mà không bị làm phiền'
    ],

    fears: [
      'Mắc phải sai lầm, bị phê bình về chất lượng chuyên môn',
      'Môi trường hỗn loạn, thiếu quy trình và làm việc ngẫu hứng',
      'Quyết định vội vã mà thiếu dữ liệu kiểm chứng'
    ],

    communicationStyle: {
      howTheyTalk: 'Nói ngắn gọn, logic, chính xác, sử dụng nhiều con số, bảng biểu và dẫn chứng thực tế.',
      howToTalkToThem: 'Cung cấp dữ liệu, thông tin minh bạch, trình bày có cấu trúc rõ ràng. Tôn trọng chuyên môn và không đưa ra kết luận cảm tính.'
    },

    idealEnvironment: 'Môi trường làm việc chuyên nghiệp, có tiêu chuẩn chất lượng cao, quy trình làm việc rõ ràng và tôn trọng chiều sâu chuyên môn.'
  },

  'DI': {
    code: 'DI',
    name: 'Nhà Dẫn Dắt Truyền Cảm Hứng (Inspirer)',
    tagline: 'Quyết đoán kết hợp với sức thu hút lôi cuốn',
    color: '#F43F5E',
    bgLight: 'bg-rose-50 dark:bg-rose-950/40',
    border: 'border-rose-500',
    text: 'text-rose-600 dark:text-rose-400',
    badgeBg: 'bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300',
    overview: 'Bạn kết hợp giữa tầm nhìn mạnh mẽ của nhóm D và sức ảnh hưởng truyền cảm hứng của nhóm I. Bạn dũng cảm dẫn dắt, tràn đầy năng lượng và có khả năng thu hút mọi người cùng hướng tới mục tiêu chung.',
    characteristics: ['Tiên phong, tự tin', 'Giao tiếp truyền cảm hứng', 'Tốc độ hành động cao', 'Nhiệt huyết và quyết liệt'],
    strengths: ['Khởi xướng dự án lớn', 'Thuyết phục và truyền năng lượng', 'Chịu áp lực tốt', 'Đưa ra ý tưởng đột phá'],
    weaknesses: ['Dễ bỏ qua chi tiết nhỏ', 'Có thể thiếu kiên nhẫn', 'Suy nghĩ đôi khi nhanh hơn khả năng thực thi của nhóm'],
    motivations: ['Mục tiêu thách thức và sự công nhận vị thế dẫn đầu'],
    fears: ['Bị hạn chế tự do và sự trì trệ'],
    communicationStyle: { howTheyTalk: 'Mạnh mẽ, truyền cảm hứng, đi thẳng vào kết quả với thái độ hào hứng.', howToTalkToThem: 'Trình bày ý tưởng lớn, kết quả kỳ vọng và không đi vào chi tiết tiểu tiết.' },
    idealEnvironment: 'Môi trường làm việc tốc độ cao, khuyến khích sáng tạo và cho phép dẫn dắt.'
  },

  'DC': {
    code: 'DC',
    name: 'Nhà Kiến Tạo Chiến Lược (Developer)',
    tagline: 'Mục tiêu cao - Logic sắc bén - Chất lượng đỉnh cao',
    color: '#8B5CF6',
    bgLight: 'bg-purple-50 dark:bg-purple-950/40',
    border: 'border-purple-500',
    text: 'text-purple-600 dark:text-purple-400',
    badgeBg: 'bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300',
    overview: 'Sự kết hợp giữa D và C tạo nên một nhà chiến lược xuất sắc. Bạn vừa muốn đạt kết quả nhanh chóng, vừa đòi hỏi mức độ chính xác và chuẩn mực chất lượng khắt khe.',
    characteristics: ['Tư duy chiến lược sắc bén', 'Kỷ luật và mục tiêu rõ ràng', 'Không thỏa hiệp với sai sót', 'Quyết đoán dựa trên dữ liệu'],
    strengths: ['Tối ưu quy trình và hiệu suất', 'Giải quyết vấn đề phức tạp', 'Tự chủ cao', 'Xây dựng tiêu chuẩn vượt trội'],
    weaknesses: ['Đôi khi quá nghiêm khắc', 'Gây áp lực lớn lên đồng đội', 'Khó thể hiện sự thông cảm tâm lý'],
    motivations: ['Thành tựu đỉnh cao dựa trên sự chính xác tuyệt đối'],
    fears: ['Thất bại do sự thiếu cẩn thận hoặc thiếu năng lực của người khác'],
    communicationStyle: { howTheyTalk: 'Trực diện, chính xác, dùng con số và lập luận logic.', howToTalkToThem: 'Trình bày dữ liệu chính xác, giải pháp thực tế và mục tiêu cụ thể.' },
    idealEnvironment: 'Môi trường chuyên nghiệp, yêu cầu cao về chiến lược và chất lượng kỹ thuật.'
  },

  'IS': {
    code: 'IS',
    name: 'Nhà Kết Nối Thân Thiện (Promoter)',
    tagline: 'Nhiệt tình, chu đáo, xây dựng môi trường gắn kết',
    color: '#14B8A6',
    bgLight: 'bg-teal-50 dark:bg-teal-950/40',
    border: 'border-teal-500',
    text: 'text-teal-600 dark:text-teal-400',
    badgeBg: 'bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300',
    overview: 'Bạn kết hợp sự nhiệt thành của nhóm I và tính ân cần của nhóm S. Bạn là bậc thầy về xây dựng quan hệ con người, luôn lắng nghe, chia sẻ và mang lại nụ cười cho mọi người.',
    characteristics: ['Thân thiện, ấm áp', 'Thấu hiểu và chia sẻ', 'Tạo sự đoàn kết', 'Linh hoạt và hòa nhã'],
    strengths: ['Xây dựng môi trường hòa thuận', 'Lắng nghe chân thành', 'Khả năng ngoại giao mềm mỏng', 'Được mọi người yêu mến'],
    weaknesses: ['Thiếu sự quyết đoán khi tranh chấp', 'Sợ làm tổn thương người khác', 'Né tránh quyết định cứng rắn'],
    motivations: ['Mối quan hệ tốt đẹp và tinh thần đồng đội ấm áp'],
    fears: ['Xung đột cá nhân và bị tẩy chay'],
    communicationStyle: { howTheyTalk: 'Ấm áp, vui vẻ, quan tâm tới tinh thần đối phương.', howToTalkToThem: 'Trò chuyện chân thành, hỏi thăm và xây dựng lòng tin trước.' },
    idealEnvironment: 'Môi trường nhân văn, môi trường làm việc tập thể thân thiện.'
  },

  'SC': {
    code: 'SC',
    name: 'Chuyên Gia Tận Tụy (Specialist)',
    tagline: 'Chu đáo, cẩn trọng, xây dựng nền tảng vững chắc',
    color: '#06B6D4',
    bgLight: 'bg-cyan-50 dark:bg-cyan-950/40',
    border: 'border-cyan-500',
    text: 'text-cyan-600 dark:text-cyan-400',
    badgeBg: 'bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300',
    overview: 'Sự kết hợp giữa S và C tạo nên một con người cực kỳ đáng tin cậy, tỉ mỉ và kiên trì. Bạn là cột trụ thầm lặng đảm bảo mọi dự án vận hành mượt mà và không mắc sai sót.',
    characteristics: ['Kiên trì, chỉn chu', 'Tôn trọng quy trình chuẩn', 'Lắng nghe và cẩn trọng', 'Ít khi tranh cãi'],
    strengths: ['Thực thi công việc hoàn hảo', 'Quản lý thông tin chính xác', 'Sự trung thành cao', 'Chịu khó nghiên cứu tỉ mỉ'],
    weaknesses: ['Rất ngại sự thay đổi đột ngột', 'Thường giữ áp lực trong lòng', 'Khó bứt phá khỏi vùng an toàn'],
    motivations: ['Sự an toàn, ổn định và quy định rõ ràng'],
    fears: ['Sự hỗn loạn và trách nhiệm đột xuất không báo trước'],
    communicationStyle: { howTheyTalk: 'Khẽ khàng, lịch sự, đúng mực và chu đáo.', howToTalkToThem: 'Đưa ra hướng dẫn cụ thể từng bước, nhẹ nhàng và rõ ràng.' },
    idealEnvironment: 'Môi trường làm việc ổn định, quy chuẩn cao và không có biến động lớn.'
  }
};

// Fallback profile generator for secondary combinations
export function getDiscProfile(primary, secondary) {
  const comboKey = `${primary}${secondary}`;
  if (DISC_PROFILES[comboKey]) {
    return DISC_PROFILES[comboKey];
  }
  if (DISC_PROFILES[primary]) {
    return DISC_PROFILES[primary];
  }
  return DISC_PROFILES['D'];
}
