import React from 'react';
import { Brain, ArrowRight, Sparkles, CheckCircle2, Award, Zap, Compass, ShieldCheck, History, Users, GraduationCap, Briefcase, Lightbulb } from 'lucide-react';
import { getTranslation } from '../utils/translations';

export default function MbtiOverview({ onStartTest, lang = 'vi' }) {
  const t = (key, params) => getTranslation(lang, key, params);

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-16 animate-fade-in pb-16">
      
      {/* HEADER HERO */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-teal-950 rounded-3xl p-6 sm:p-12 text-white shadow-2xl border border-teal-400/40 relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 font-extrabold text-xs">
          <Brain className="w-4 h-4 text-teal-300" />
          <span>Myers-Briggs Type Indicator • Nền Tảng Tâm Lý Học 16 Nhóm Tính Cách</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Giải Mã Thế Giới Nội Tâm Với <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-200 to-white">
            16 Nhóm Tính Cách MBTI
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed font-medium">
          Bài đánh giá tâm lý học kinh điển thế giới giúp bạn nhận diện 4 chiều đo nhân cách cốt lõi: Nguồn năng lượng (E/I), Thu thập thông tin (S/N), Cơ chế ra quyết định (T/F) và Lối sống (J/P). Thấu hiểu bản thân để định hình phong cách làm việc bứt phá.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onStartTest}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-teal-500 via-cyan-500 to-slate-900 hover:from-teal-600 hover:to-slate-950 text-white font-black text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2.5 transform hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-cyan-300" />
            <span>Bắt Đầu Làm Bài Test MBTI Ngay</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <span className="text-xs text-teal-200 font-semibold flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>28 câu hỏi tình huống tâm lý chuyên sâu • Hoàn thành trong 4-6 phút</span>
          </span>
        </div>
      </div>

      {/* SECTION 1: BẮT NGUỒN LỊCH SỬ & NỀN TẢNG KHOA HỌC */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
        <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="p-3 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 shrink-0">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Bắt Nguồn Lịch Sử &amp; Nền Tảng Tâm Lý Học Carl Jung
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Hơn 100 năm phát triển từ tâm lý học phân tâm học đến công cụ đánh giá nhân cách quốc tế
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              Mô hình <strong>MBTI (Myers-Briggs Type Indicator)</strong> khởi nguồn từ công trình lý thuyết vĩ đại <em>"Psychological Types"</em> (Các loại hình tâm lý - 1921) của Nhà tâm lý học phân tâm học lỗi lạc <strong>Carl Gustav Jung</strong>.
            </p>
            
            {/* Visual Image Banner for MBTI Psychology */}
            <div className="my-4 rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1000&q=80"
                alt="Tâm lý học 16 nhóm tính cách MBTI"
                className="w-full h-48 sm:h-56 object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 text-xs text-slate-500 font-medium">
                📷 Ảnh minh họa: Giải mã chiều sâu tư duy và khuôn mẫu nhận thức tâm lý con người
              </div>
            </div>

            <p>
              Vào thập niên 1940, hai nhà nghiên cứu là <strong>Katharine Cook Briggs</strong> và con gái của bà là <strong>Isabel Briggs Myers</strong> đã tiếp tục phát triển công trình của Carl Jung thành một công cụ trắc nghiệm thực chứng có tính ứng dụng cao.
            </p>
            <p>
              MBTI khẳng định rằng sự khác biệt trong hành vi con người không phải là ngẫu nhiên, mà tuân theo những <strong>khuôn mẫu nhận thức nội tâm (Cognitive Functions)</strong> vô cùng nhất quán về cách nạp năng lượng, xử lý thông tin và ra quyết định trong cuộc sống.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-50 via-cyan-50 to-indigo-50 dark:from-teal-950/40 dark:via-cyan-950/40 dark:to-indigo-950/40 border border-teal-100 dark:border-teal-900/50 space-y-4">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg flex items-center space-x-2">
              <Compass className="w-5 h-5 text-teal-600" />
              <span>4 Chiều Đo Nhân Cách Trong MBTI</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                • <strong>E (Hướng ngoại) vs I (Hướng nội):</strong> Nạp năng lượng từ tương tác xã hội hay không gian nội tâm.
              </p>
              <p>
                • <strong>S (Thực tế) vs N (Trực giác):</strong> Cách thu thập thông tin dựa trên dữ liệu hiện tại hay tầm nhìn tương lai.
              </p>
              <p>
                • <strong>T (Tư duy) vs F (Cảm xúc):</strong> Ra quyết định theo logic khách quan hay giá trị thấu cảm.
              </p>
              <p>
                • <strong>J (Nguyên tắc) vs P (Linh hoạt):</strong> Tổ chức cuộc sống theo kế hoạch rõ ràng hay ứng biến tự do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: 4 NHÓM KHÍ CHẤT (TEMPERAMENTS) */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            4 Nhóm Khí Chất Nhân Cách Trong 16 Nhóm MBTI
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            16 loại hình tính cách được phân chia thành 4 họ khí chất đặc trưng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Analysts */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-purple-200 dark:border-purple-900/60 shadow-xl space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 font-extrabold text-xs rounded-full inline-block">
                🧩 Analysts (NT)
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Nhóm Nhà Phân Tích</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                INTJ, INTP, ENTJ, ENTP. Tầm nhìn chiến lược, tư duy logic sắc bén, coi trọng tri thức và liên tục cải tiến hệ thống.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-purple-600 dark:text-purple-400">
              Phong cách: Chiến lược &amp; Đổi mới
            </div>
          </div>

          {/* Diplomats */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-emerald-200 dark:border-emerald-900/60 shadow-xl space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold text-xs rounded-full inline-block">
                🕊️ Diplomats (NF)
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Nhóm Nhà Tưởng Tượng</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                INFJ, INFP, ENFJ, ENFP. Giàu lòng trắc ẩn, hướng tới các giá trị nhân văn, truyền cảm hứng và giúp đỡ người khác phát triển.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              Phong cách: Thấu cảm &amp; Ý nghĩa
            </div>
          </div>

          {/* Sentinels */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-blue-200 dark:border-blue-900/60 shadow-xl space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-extrabold text-xs rounded-full inline-block">
                🛡️ Sentinels (SJ)
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Nhóm Người Bảo Vệ</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                ISTJ, ISFJ, ESTJ, ESFJ. Kỷ luật, trách nhiệm, tôn trọng trật tự chuẩn mực và sự ổn định bền vững của tổ chức.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-blue-600 dark:text-blue-400">
              Phong cách: Chuẩn mực &amp; Trách nhiệm
            </div>
          </div>

          {/* Explorers */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-amber-200 dark:border-amber-900/60 shadow-xl space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-extrabold text-xs rounded-full inline-block">
                🎨 Explorers (SP)
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Nhóm Nhà Khám Phá</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                ISTP, ISFP, ESTP, ESFP. Linh hoạt, thích trải nghiệm thực tế, phản ứng nhanh nhạy trước các tình huống bất ngờ.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-amber-600 dark:text-amber-400">
              Phong cách: Linh hoạt &amp; Thực tiễn
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: ỨNG DỤNG THỰC TẾ TRONG SỰ NGHIỆP */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
        <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="p-3 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Ứng Dụng Thực Tế Của MBTI Trong Đời Sống &amp; Sự Nghiệp
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Nâng cao trí tuệ cảm xúc (EQ) và hiệu suất làm việc đội ngũ
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          
          <div className="p-6 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Thấu Hiểu Bản Thể &amp; Quản Lý Emotion
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Nhận diện điểm mù tâm lý (Blindspots), hiểu rõ cách nạp năng lượng bản thân để phòng tránh hiện tượng kiệt sức (Burnout) trong công việc.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Cải Thiện Giao Tiếp &amp; Xây Dựng Mối Quan Hệ
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Tôn trọng sự khác biệt trong tư duy đồng nghiệp, giải quyết xung đột nhẹ nhàng và truyền thông hiệu quả theo đúng "ngôn ngữ tâm lý" của đối phương.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Lựa Chọn Môi Trường Làm Việc Đam Mê
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Tìm ra công việc phù hợp với khí chất thiên bẩm, giúp bạn liên tục sáng tạo, cống hiến và xây dựng lộ trình sự nghiệp vững chắc.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

