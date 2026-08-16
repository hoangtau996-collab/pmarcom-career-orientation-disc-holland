// Bộ 28 nhóm câu hỏi đánh giá tính cách DISC tiêu chuẩn quốc tế (Hoa Kỳ)
// Phù hợp cho cả Người đi làm và Sinh viên / Học sinh

export const DISC_QUESTIONS = [
  {
    id: 1,
    options: [
      { id: '1a', type: 'D', text: 'Hành động nhanh chóng, hướng tới kết quả ngay lập tức', description: 'Quyết đoán và dám chấp nhận rủi ro' },
      { id: '1b', type: 'I', text: 'Nhiệt tình, hăng hái và thích truyền cảm hứng cho người khác', description: 'Giao tiếp cởi mở, tạo không khí vui vẻ' },
      { id: '1c', type: 'S', text: 'Điềm tĩnh, sẵn sàng lắng nghe và kiên nhẫn hỗ trợ', description: 'Tạo cảm giác an toàn, hòa nhã' },
      { id: '1d', type: 'C', text: 'Chính xác, cẩn trọng và làm việc theo quy trình chuẩn', description: 'Chú trọng chi tiết và chất lượng' }
    ]
  },
  {
    id: 2,
    options: [
      { id: '2a', type: 'D', text: 'Thích thử thách, cạnh tranh và nắm quyền kiểm soát', description: 'Không ngại va chạm để đạt mục tiêu' },
      { id: '2b', type: 'I', text: 'Hòa đồng, dễ kết bạn và có sức thu hút đám đông', description: 'Tạo dựng mối quan hệ tự nhiên' },
      { id: '2c', type: 'S', text: 'Trung thành, đáng tin cậy và duy trì sự ổn định', description: 'Ghét sự thay đổi đột ngột hoặc mâu thuẫn' },
      { id: '2d', type: 'C', text: 'Logic, phân tích kỹ lưỡng trước khi đưa ra quyết định', description: 'Dựa trên thực tế và dữ liệu rõ ràng' }
    ]
  },
  {
    id: 3,
    options: [
      { id: '3a', type: 'D', text: 'Mục tiêu rõ ràng, thẳng thắn và bộc trực', description: 'Nói trực diện vào vấn đề' },
      { id: '3b', type: 'I', text: 'Lạc quan, hóm hỉnh và luôn tạo niềm vui cho nhóm', description: 'Nhìn nhận mặt tích cực của mọi việc' },
      { id: '3c', type: 'S', text: 'Tận tụy, cảm thông và thấu hiểu cảm xúc của người khác', description: 'Chăm sóc và đồng hành lâu dài' },
      { id: '3d', type: 'C', text: 'Kỷ luật, ngăn nắp và tôn trọng các tiêu chuẩn chất lượng', description: 'Yêu cầu sự hoàn hảo và chỉn chu' }
    ]
  },
  {
    id: 4,
    options: [
      { id: '4a', type: 'D', text: 'Tự tin, quyết liệt và sẵn sàng nhận trách nhiệm lớn', description: 'Dẫn dắt và tiên phong' },
      { id: '4b', type: 'I', text: 'Linh hoạt, sáng tạo và thích ứng nhanh với môi trường mới', description: 'Nhiều ý tưởng mới lạ' },
      { id: '4c', type: 'S', text: 'Kiên trì, nhẫn nại và luôn sẵn lòng giúp đỡ người khác', description: 'Hoạt động bền bỉ, âm thầm' },
      { id: '4d', type: 'C', text: 'Cẩn thận, tỉ mỉ và luôn kiểm tra kỹ lưỡng sai sót', description: 'Hạn chế tối đa rủi ro' }
    ]
  },
  {
    id: 5,
    options: [
      { id: '5a', type: 'D', text: 'Giải quyết vấn đề nhanh gọn, không ngần ngại đối mặt với áp lực', description: 'Tập trung vào hiệu suất cao' },
      { id: '5b', type: 'I', text: 'Thích biểu đạt ý kiến, sôi nổi và dễ lan tỏa năng lượng', description: 'Kích thích sự tham gia của mọi người' },
      { id: '5c', type: 'S', text: 'Hòa nhã, không thích tranh cãi, ưu tiên sự hài hòa', description: 'Duy trì hòa khí và tinh thần đồng đội' },
      { id: '5d', type: 'C', text: 'Tập trung sâu, nghiên cứu kỹ và tuân thủ nguyên tắc', description: 'Tận tụy với chuyên môn và quy chuẩn' }
    ]
  },
  {
    id: 6,
    options: [
      { id: '6a', type: 'D', text: 'Mạnh mẽ, kiên định với mục tiêu đến cùng', description: 'Vượt qua chướng ngại vật bằng sự quyết đoán' },
      { id: '6b', type: 'I', text: 'Cởi mở, thân thiện và tạo sự thoải mái cho người đối diện', description: 'Dễ dàng bắt chuyện và tạo thiện cảm' },
      { id: '6c', type: 'S', text: 'Chu đáo, nhẹ nhàng và thấu hiểu người khác', description: 'Lắng nghe chân thành và sâu sắc' },
      { id: '6d', type: 'C', text: 'Độc lập, nguyên tắc và công bằng trong mọi đánh giá', description: 'Đánh giá dựa trên tiêu chuẩn rõ ràng' }
    ]
  },
  {
    id: 7,
    options: [
      { id: '7a', type: 'D', text: 'Thích độc lập tác chiến và đưa ra quyết định nhanh', description: 'Chủ động nắm bắt cơ hội' },
      { id: '7b', type: 'I', text: 'Giỏi thuyết phục, trình bày lôi cuốn và truyền cảm hứng', description: 'Thu hút sự chú ý và tin tưởng' },
      { id: '7c', type: 'S', text: 'Thích môi trường làm việc hòa đồng, quen thuộc và hợp tác', description: 'Gắn bó lâu dài với tập thể' },
      { id: '7d', type: 'C', text: 'Thận trọng, phân tích rủi ro kỹ trước khi hành động', description: 'Suy nghĩ cẩn kẽ mọi khả năng xảy ra' }
    ]
  },
  {
    id: 8,
    options: [
      { id: '8a', type: 'D', text: 'Thích sự thách thức, không chấp nhận sự trì trệ', description: 'Đẩy nhanh tiến độ công việc' },
      { id: '8b', type: 'I', text: 'Thích tham gia các hoạt động xã hội, sự kiện kết nối', description: 'Mở rộng mạng lưới quan hệ' },
      { id: '8c', type: 'S', text: 'Điềm đạm, khiêm tốn và biết đặt lợi ích chung lên trên', description: 'Đóng góp thầm lặng nhưng hiệu quả' },
      { id: '8d', type: 'C', text: 'Chuyên nghiệp, có kế hoạch rõ ràng và minh bạch', description: 'Phương pháp làm việc khoa học' }
    ]
  },
  {
    id: 9,
    options: [
      { id: '9a', type: 'D', text: 'Chủ động dẫn dắt, chỉ đạo và phân công nhiệm vụ', description: 'Thể hiện vai trò người đứng đầu' },
      { id: '9b', type: 'I', text: 'Thích sự khen ngợi, công nhận và tương tác xã hội', description: 'Được truyền động lực bởi sự khích lệ' },
      { id: '9c', type: 'S', text: 'Ổn định, nhất quán và kiên trì hoàn thành nhiệm vụ', description: 'Tạo sự tin tưởng lâu dài' },
      { id: '9d', type: 'C', text: 'Rõ ràng, chi tiết, dựa vào chứng cứ và số liệu', description: 'Nói có sách, mách có chứng' }
    ]
  },
  {
    id: 10,
    options: [
      { id: '10a', type: 'D', text: 'Thích chinh phục các đỉnh cao và vượt qua đối thủ', description: 'Khao khát chiến thắng' },
      { id: '10b', type: 'I', text: 'Thích môi trường làm việc năng động, nhiều niềm vui', description: 'Không thích sự gò bó, nhàm chán' },
      { id: '10c', type: 'S', text: 'Giúp đỡ đồng đội không tính toán, chân thành', description: 'Chăm sóc tinh thần đồng đội' },
      { id: '10d', type: 'C', text: 'Tự đặt chuẩn mực cao cho bản thân và người khác', description: 'Đòi hỏi sự hoàn hảo trong sản phẩm' }
    ]
  },
  {
    id: 11,
    options: [
      { id: '11a', type: 'D', text: 'Thực tế, coi trọng hiệu quả công việc hơn cảm xúc', description: 'Hướng đến kết quả cuối cùng' },
      { id: '11b', type: 'I', text: 'Tự tin giao tiếp trước đám đông, ứng biến linh hoạt', description: 'Thiên bẩm làm diễn giả / kết nối' },
      { id: '11c', type: 'S', text: 'Điềm tĩnh chịu áp lực, là điểm tựa vững chắc cho người khác', description: 'Bình tĩnh trước biến động' },
      { id: '11d', type: 'C', text: 'Đánh giá các lựa chọn theo tư duy phản biện khách quan', description: 'Suy xét đa chiều, chặt chẽ' }
    ]
  },
  {
    id: 12,
    options: [
      { id: '12a', type: 'D', text: 'Tốc độ phản ứng nhanh, dám thay đổi quy trình nếu cần', description: 'Sẵn sàng đột phá' },
      { id: '12b', type: 'I', text: 'Thích chia sẻ câu chuyện, tạo bầu không khí hào hứng', description: 'Gắn kết mọi người bằng nụ cười' },
      { id: '12c', type: 'S', text: 'Thích sự bình yên, môi trường không có xung đột', description: 'Xây dựng sự đoàn kết bền vững' },
      { id: '12d', type: 'C', text: 'Nghiêm túc, coi trọng nguyên tắc và cam kết chất lượng', description: 'Tôn trọng quy định và lời hứa' }
    ]
  },
  {
    id: 13,
    options: [
      { id: '13a', type: 'D', text: 'Đòi hỏi tiến độ công việc phải nhanh và chính xác', description: 'Không chấp nhận sự chậm trễ' },
      { id: '13b', type: 'I', text: 'Khích lệ tinh thần làm việc của người khác bằng sự tích cực', description: 'Đột phá năng lượng tập thể' },
      { id: '13c', type: 'S', text: 'Lắng nghe mọi ý kiến trước khi đưa ra phản hồi', description: 'Tôn trọng sự đóng góp của mọi người' },
      { id: '13d', type: 'C', text: 'Tra cứu thông tin cẩn thận, không suy đoán vô căn cứ', description: 'Đảm bảo độ chính xác tuyệt đối' }
    ]
  },
  {
    id: 14,
    options: [
      { id: '14a', type: 'D', text: 'Kiên quyết bảo vệ quan điểm đúng đắn của mình', description: 'Mạnh mẽ tranh luận khi cần' },
      { id: '14b', type: 'I', text: 'Thích tìm tòi cách tiếp cận mới lạ, đầy sáng tạo', description: 'Bứt phá khỏi lối mòn' },
      { id: '14c', type: 'S', text: 'Làm việc theo đúng lộ trình đã được thỏa thuận', description: 'Tự giác và ổn định' },
      { id: '14d', type: 'C', text: 'Chú ý tỉ mỉ từng chi tiết nhỏ nhất trong bài viết/dự án', description: 'Soát lỗi chuyên nghiệp' }
    ]
  },
  {
    id: 15,
    options: [
      { id: '15a', type: 'D', text: 'Thích tiên phong áp dụng giải pháp mới để bứt phá', description: 'Không ngại rủi ro thử nghiệm' },
      { id: '15b', type: 'I', text: 'Xây dựng mạng lưới quan hệ xã hội rộng lớn', description: 'Kết nối mọi nguồn lực' },
      { id: '15c', type: 'S', text: 'Luôn sẵn sàng hỗ trợ bạn bè / đồng nghiệp khi gặp khó khăn', description: 'Hỗ trợ chân thành' },
      { id: '15d', type: 'C', text: 'Phân tích các số liệu phức tạp một cách có hệ thống', description: 'Tư duy cấu trúc và logic' }
    ]
  },
  {
    id: 16,
    options: [
      { id: '16a', type: 'D', text: 'Không thích sự chần chừ, muốn có kết quả tức thì', description: 'Đẩy nhanh hành động' },
      { id: '16b', type: 'I', text: 'Thích được trình bày và chia sẻ góc nhìn cá nhân', description: 'Thể hiện bản thân năng động' },
      { id: '16c', type: 'S', text: 'Duy trì các thói quen tốt và sự nhất quán lâu dài', description: 'Sự kiên định chuẩn mực' },
      { id: '16d', type: 'C', text: 'Lập biểu đồ, danh sách chi tiết công việc cần làm', description: 'Quản lý thời gian kỷ luật' }
    ]
  },
  {
    id: 17,
    options: [
      { id: '17a', type: 'D', text: 'Thích cạnh tranh lành mạnh để vượt lên dẫn đầu', description: 'Năng lượng thi đấu cao' },
      { id: '17b', type: 'I', text: 'Lan tỏa niềm vui và sự lạc quan cho mọi người xung quanh', description: 'Tạo năng lượng tích cực' },
      { id: '17c', type: 'S', text: 'Tôn trọng sự riêng tư và cảm xúc của người khác', description: 'Giao tiếp tinh tế' },
      { id: '17d', type: 'C', text: 'Hạn chế tối đa rủi ro bằng việc chuẩn bị kỹ kịch bản', description: 'Dự phòng chu đáo' }
    ]
  },
  {
    id: 18,
    options: [
      { id: '18a', type: 'D', text: 'Đưa ra quyết định dứt khoát ngay trong tình huống gấp', description: 'Nắm bắt thời cơ quan trọng' },
      { id: '18b', type: 'I', text: 'Rất linh hoạt, dễ hòa nhập vào mọi môi trường sống', description: 'Khả năng thích ứng nhanh' },
      { id: '18c', type: 'S', text: 'Ủng hộ sự gắn kết và tinh thần đoàn kết trong tập thể', description: 'Keo gắn các thành viên' },
      { id: '18d', type: 'C', text: 'Theo đuổi sự hoàn hảo trong công việc chuyên môn', description: 'Tiêu chuẩn chất lượng vượt trội' }
    ]
  },
  {
    id: 19,
    options: [
      { id: '19a', type: 'D', text: 'Dũng cảm nhận nhiệm vụ khó khăn mà người khác né tránh', description: 'Dấn thân thử thách' },
      { id: '19b', type: 'I', text: 'Sử dụng ngôn ngữ cơ thể và giọng nói sinh động', description: 'Giao tiếp đầy lôi cuốn' },
      { id: '19c', type: 'S', text: 'Thích sự ổn định và có nhịp độ làm việc vừa phải', description: 'Chắc chắn từng bước' },
      { id: '19d', type: 'C', text: 'Đánh giá vấn đề một cách khách quan dựa vào bằng chứng', description: 'Không bị cảm xúc chi phối' }
    ]
  },
  {
    id: 20,
    options: [
      { id: '20a', type: 'D', text: 'Nhắm thẳng tới mục tiêu chính, không vòng vo', description: 'Hiệu quả và tiết kiệm thời gian' },
      { id: '20b', type: 'I', text: 'Giúp nhóm giải tỏa căng thẳng bằng sự hài hước', description: 'Giảm bớt áp lực tâm lý' },
      { id: '20c', type: 'S', text: 'Thích làm việc trong môi trường thân thiện, hợp tác', description: 'Cùng nhau phát triển' },
      { id: '20d', type: 'C', text: 'Yêu cầu quy trình rõ ràng và đúng chuẩn mực', description: 'Đảm bảo sự chuẩn xác' }
    ]
  },
  {
    id: 21,
    options: [
      { id: '21a', type: 'D', text: 'Tự tin tranh luận để bảo vệ chiến lược của dự án', description: 'Tư duy chiến lược mạnh' },
      { id: '21b', type: 'I', text: 'Truyền năng lượng tích cực cho những người thiếu động lực', description: 'Khơi dậy tiềm năng' },
      { id: '21c', type: 'S', text: 'Kiên nhẫn giải thích và hướng dẫn người khác từng bước', description: 'Người thầy / đồng nghiệp tận tâm' },
      { id: '21d', type: 'C', text: 'Làm việc có hệ thống, phân loại công việc rõ ràng', description: 'Sắp xếp khoa học' }
    ]
  },
  {
    id: 22,
    options: [
      { id: '22a', type: 'D', text: 'Quyết đoán đổi mới nếu phương pháp cũ không hiệu quả', description: 'Cải tiến bứt phá' },
      { id: '22b', type: 'I', text: 'Thích tham gia trò chuyện và trao đổi mở với nhiều người', description: 'Mở rộng thế giới quan' },
      { id: '22c', type: 'S', text: 'Giữ lời hứa và hoàn thành đúng cam kết với tập thể', description: 'Chữ tín hàng đầu' },
      { id: '22d', type: 'C', text: 'Sử dụng tư duy logic để bóc tách mọi tình huống phức tạp', description: 'Phân tích đa chiều' }
    ]
  },
  {
    id: 23,
    options: [
      { id: '23a', type: 'D', text: 'Tập trung cao độ vào kết quả đầu ra của nhiệm vụ', description: 'Định hướng sản phẩm' },
      { id: '23b', type: 'I', text: 'Thích được chú ý và khẳng định giá trị bản thân', description: 'Khao khát tỏa sáng' },
      { id: '23c', type: 'S', text: 'Giữ thái độ hòa nhã ngay cả khi chịu áp lực từ bên ngoài', description: 'Kiềm chế cảm xúc tốt' },
      { id: '23d', type: 'C', text: 'Đảm bảo mọi tài liệu và sản phẩm đều chỉn chu nhất', description: 'Tính chính xác cao' }
    ]
  },
  {
    id: 24,
    options: [
      { id: '24a', type: 'D', text: 'Dẫn đầu xu hướng và khởi xướng ý tưởng mới', description: 'Người mở đường' },
      { id: '24b', type: 'I', text: 'Khả năng trình bày và thuyết phục đám đông xuất sắc', description: 'Tác động tâm lý người nghe' },
      { id: '24c', type: 'S', text: 'Mang lại sự an tâm cho đồng đội nhờ tính cẩn thận và sẵn sàng giúp đỡ', description: 'Nền tảng vững chắc' },
      { id: '24d', type: 'C', text: 'Tập trung cao độ vào công việc chuyên môn độc lập', description: 'Nghiên cứu sâu sắc' }
    ]
  },
  {
    id: 25,
    options: [
      { id: '25a', type: 'D', text: 'Dũng cảm nhận rủi ro để giành lấy kết quả vượt trội', description: 'Tối ưu hiệu suất' },
      { id: '25b', type: 'I', text: 'Luôn tìm kiếm các góc nhìn vui vẻ, hào hứng trong công việc', description: 'Động lực từ tinh thần' },
      { id: '25c', type: 'S', text: 'Nhẫn nại giải quyết mâu thuẫn để giữ gìn tình bạn/đồng nghiệp', description: 'Hòa giải viên tài năng' },
      { id: '25d', type: 'C', text: 'Rõ ràng, minh bạch trong các con số và tiêu chí', description: 'Đảm bảo sự công bằng' }
    ]
  },
  {
    id: 26,
    options: [
      { id: '26a', type: 'D', text: 'Thúc đẩy tiến độ và thúc giục người khác hành động nhanh', description: 'Tạo áp lực tích cực' },
      { id: '26b', type: 'I', text: 'Thích tạo sự ảnh hưởng đến suy nghĩ của cộng đồng', description: 'Người có sức hút' },
      { id: '26c', type: 'S', text: 'Trung thành, tận tụy và hết lòng vì sự phát triển chung', description: 'Cống hiến bền bỉ' },
      { id: '26d', type: 'C', text: 'Thích có thời gian riêng để kiểm tra cẩn thận công việc', description: 'Làm việc cẩn mật' }
    ]
  },
  {
    id: 27,
    options: [
      { id: '27a', type: 'D', text: 'Dứt khoát loại bỏ các bước rườm rà để đạt mục đích', description: 'Tối ưu hóa quy trình' },
      { id: '27b', type: 'I', text: 'Dễ dàng bắt đầu cuộc trò chuyện với người hoàn toàn mới', description: 'Kỹ năng giao tiếp tự nhiên' },
      { id: '27c', type: 'S', text: 'Duy trì sự yên tĩnh và môi trường ổn định', description: 'Điềm đạm và bình an' },
      { id: '27d', type: 'C', text: 'Thực hiện kiểm tra chất lượng theo chuẩn mực khắt khe', description: 'Đảm bảo tiêu chuẩn vàng' }
    ]
  },
  {
    id: 28,
    options: [
      { id: '28a', type: 'D', text: 'Chủ động chịu trách nhiệm về kết quả cuối cùng', description: 'Tự tin lãnh đạo' },
      { id: '28b', type: 'I', text: 'Tạo không khí làm việc tràn đầy hứng khởi và sáng tạo', description: 'Khơi nguồn cảm hứng' },
      { id: '28c', type: 'S', text: 'Thấu hiểu, vị tha và luôn giúp đỡ mọi người', description: 'Tấm lòng sẻ chia' },
      { id: '28d', type: 'C', text: 'Phân tích đa khía cạnh trước khi kết luận', description: 'Suy tư thấu đáo' }
    ]
  }
];
