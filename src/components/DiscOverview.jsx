import React from 'react';
import { Target, Users, HeartHandshake, ShieldCheck, ArrowRight, BookOpen, GraduationCap, Briefcase, Sparkles, Award, CheckCircle2, History, Compass, Lightbulb, Zap, HelpCircle } from 'lucide-react';

export default function DiscOverview({ onStartTest }) {
  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-16 animate-fade-in">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white shadow-2xl p-6 sm:p-12 border border-slate-800">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold">
            <img src="/logo-pmarcom.png" alt="P Marcom Logo" className="h-6 w-auto object-contain" />
            <span>Nền Tảng Khoa Học Đánh Giá Hành Vi Quốc Tế</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Giải Mã Bản Thể Hành Vi Với <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
              Mô Hình Tính Cách DISC
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Hệ thống phân tích tâm lý hành vi được ứng dụng rộng rãi bởi hơn 70% các tập đoàn Fortune 500. Giúp bạn thấu hiểu điểm mạnh tự nhiên, phong cách giao tiếp và định hướng sự nghiệp bứt phá.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartTest}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-3"
            >
              <span>Bắt Đầu Làm Bài Test DISC Ngay</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

        </div>

        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* SECTION 1: BẮT NGUỒN LỊCH SỬ & NỀN TẢNG KHOA HỌC */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
        <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 shrink-0">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Bắt Nguồn Lịch Sử &amp; Nền Tảng Khoa Học Của DISC
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Hành trình gần 100 năm phát triển tâm lý học hành vi con người
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              Mô hình <strong>DISC</strong> được nghiên cứu và khởi xướng vào năm 1928 bởi Nhà tâm lý học nổi tiếng người Mỹ <strong>Dr. William Moulton Marston</strong> (người tốt nghiệp tiến sĩ tâm lý tại Đại học Harvard) trong cuốn sách kinh điển <em>"Emotions of Normal People"</em>.
            </p>
            
            {/* Visual Image Banner for History */}
            <div className="my-4 rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1000&q=80"
                alt="Nghiên cứu khoa học tâm lý học DISC"
                className="w-full h-48 sm:h-56 object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 text-xs text-slate-500 font-medium">
                📷 Ảnh minh họa: Nghiên cứu khoa học tâm lý hành vi con người thế kỷ 20
              </div>
            </div>

            <p>
              Khác với các bài kiểm tra tâm thần học đo lường rối loạn cảm xúc, Tiến sĩ Marston tập trung phân tích <strong>những phản ứng hành vi bình thường của con người</strong> trước môi trường xung quanh. Ông phát hiện ra rằng biểu hiện hành vi của mỗi cá nhân phụ thuộc vào hai yếu tố chính:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-200 font-medium text-sm sm:text-base">
              <li><strong>Góc nhìn về môi trường:</strong> Cá nhân nhìn nhận môi trường xung quanh là <em>Thuận lợi (Favorable)</em> hay <em>Thách thức/Bất lợi (Unfavorable)</em>.</li>
              <li><strong>Cơ chế phản ứng:</strong> Cá nhân cảm thấy bản thân <em>Mạnh mẽ hơn môi trường (Chủ động kiểm soát)</em> hay <em>Yếu hơn môi trường (Thụ động thích nghi)</em>.</li>
            </ul>
            <p>
              Đến năm 1950, nhà tâm lý học tổ chức **Walter V. Clarke** đã phát triển lý thuyết của Marston thành bài trắc nghiệm đánh giá hành vi hoàn chỉnh, trở thành nền tảng cho hệ thống DISC toàn cầu ngày nay.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/40 dark:via-purple-950/40 dark:to-pink-950/40 border border-indigo-100 dark:border-indigo-900/50 space-y-4">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg flex items-center space-x-2">
              <Compass className="w-5 h-5 text-indigo-600" />
              <span>Sơ Đồ 2 Trục Cốt Lõi Tạo Nên 4 Nhóm DISC</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start space-x-3">
                <span className="px-2.5 py-1 bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 font-extrabold rounded text-sm">D</span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Dominance (Chủ động + Thách thức)</h4>
                  <p className="text-slate-500 dark:text-slate-400">Quyết đoán, vượt qua trở ngại để đạt mục tiêu.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start space-x-3">
                <span className="px-2.5 py-1 bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 font-extrabold rounded text-sm">I</span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Influence (Chủ động + Thuận lợi)</h4>
                  <p className="text-slate-500 dark:text-slate-400">Thuyết phục, xây dựng mối quan hệ và truyền cảm hứng.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start space-x-3">
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold rounded text-sm">S</span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Steadiness (Thụ động + Thuận lợi)</h4>
                  <p className="text-slate-500 dark:text-slate-400">Kiên định, kiên nhẫn, hợp tác và duy trì sự ổn định.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-start space-x-3">
                <span className="px-2.5 py-1 bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-extrabold rounded text-sm">C</span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Conscientiousness (Thụ động + Thách thức)</h4>
                  <p className="text-slate-500 dark:text-slate-400">Tuân thủ, cẩn trọng, phân tích và tôn trọng quy trình chuẩn.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PHÂN TÍCH CHI TIẾT 4 NHÓM HÀNH VI D - I - S - C */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Phân Tích Chi Tiết 4 Nhóm Tính Cách DISC
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            Mỗi con người thường có sự phối hợp giữa 1 nhóm nổi trội chính (Primary) và 1 nhóm bổ trợ (Secondary)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Group D */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-red-200 dark:border-red-900/60 shadow-xl overflow-hidden space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-44 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
                  alt="Group D Dominance"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-red-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                  D
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Dominance</span>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Nhóm Quyết Đoán</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Bạn là người mạnh mẽ, quyết đoán, coi trọng kết quả và thích cạnh tranh. Bạn không ngại đối mặt với thách thức và thích cầm quyền chỉ đạo.
                </p>
                <div className="pt-2 space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                  <div>🎯 <strong>Động lực chính:</strong> Thách thức, quyền lực và thành tích.</div>
                  <div>😨 <strong>Nỗi sợ chính:</strong> Bị người khác lợi dụng hoặc mất kiểm soát.</div>
                  <div>💬 <strong>Giao tiếp:</strong> Thẳng thắn, đi thẳng vào vấn đề.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Group I */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-amber-200 dark:border-amber-900/60 shadow-xl overflow-hidden space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-44 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
                  alt="Group I Influence"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-amber-500 text-white font-black text-xl flex items-center justify-center shadow-md">
                  I
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">Influence</span>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Nhóm Thuyết Phục</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Bạn là người nhiệt huyết, hòa đồng, giàu năng lượng sáng tạo. Bạn có khả năng diễn thuyết và kết nối cộng đồng bứt phá.
                </p>
                <div className="pt-2 space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                  <div>🎯 <strong>Động lực chính:</strong> Sự công nhận, sự hào hứng và quan hệ xã hội.</div>
                  <div>😨 <strong>Nỗi sợ chính:</strong> Bị từ chối, cô lập hoặc quy trình cứng nhắc.</div>
                  <div>💬 <strong>Giao tiếp:</strong> Truyền cảm hứng, cởi mở và lạc quan.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Group S */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-emerald-200 dark:border-emerald-900/60 shadow-xl overflow-hidden space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-44 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=600&q=80"
                  alt="Group S Steadiness"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                  S
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Steadiness</span>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Nhóm Kiên Định</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Bạn là người kiên nhẫn, chân thành, biết lắng nghe thấu cảm và tôn trọng tập thể. Bạn là chỗ dựa tinh thần đáng tin cậy.
                </p>
                <div className="pt-2 space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                  <div>🎯 <strong>Động lực chính:</strong> Sự an toàn, hòa hợp và làm việc nhóm.</div>
                  <div>😨 <strong>Nỗi sợ chính:</strong> Thay đổi đột ngột hoặc xung đột gay gắt.</div>
                  <div>💬 <strong>Giao tiếp:</strong> Ôn hòa, lắng nghe và đồng cảm.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Group C */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-blue-200 dark:border-blue-900/60 shadow-xl overflow-hidden space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-44 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
                  alt="Group C Conscientiousness"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                  C
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">Conscientiousness</span>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Nhóm Tuân Thủ</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Bạn là người tỉ mỉ, kỷ luật, tư duy dựa trên logic và số liệu thực tế. Bạn luôn yêu cầu sự chính xác cao nhất trong công việc.
                </p>
                <div className="pt-2 space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                  <div>🎯 <strong>Động lực chính:</strong> Chất lượng, sự chính xác và chuẩn mực.</div>
                  <div>😨 <strong>Nỗi sợ chính:</strong> Sai sót chuyên môn hoặc bị chỉ trích thiếu logic.</div>
                  <div>💬 <strong>Giao tiếp:</strong> Dựa trên số liệu, chi tiết và nguyên tắc.</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: ỨNG DỤNG THỰC TẾ TRONG QUẢN TRỊ & PHÁT TRIỂN SỰ NGHIỆP */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
        <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Ứng Dụng Thực Tế Của DISC Trong Quản Trị &amp; Sự Nghiệp
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Công cụ thay đổi cách bạn giao tiếp, lãnh đạo và xây dựng sự nghiệp
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          
          <div className="p-6 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Tuyển Dụng &amp; Quản Trị Nhân Sự (HR)
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Các nhà quản trị dùng DISC để tuyển đúng người vào đúng vị trí công việc, kết hợp các mảnh ghép tính cách bổ trợ cho nhau để xây dựng đội ngũ vô địch.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Phát Triển Lãnh Đạo &amp; Bán Hàng
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Giúp người quản lý tùy chỉnh phong cách lãnh đạo cho từng nhân viên, và giúp đội ngũ Sales thấu hiểu "nhóm tâm lý khách hàng" để chốt deal thành công.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Định Hướng Ngành Học &amp; Nghề Nghiệp
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Giúp sinh viên và người đi làm xác định môi trường làm việc lý tưởng giúp phát huy 100% năng lượng tự nhiên mà không bị áp lực stress đào thải.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

