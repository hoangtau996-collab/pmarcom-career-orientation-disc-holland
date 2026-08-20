import React from 'react';
import { Layers, CheckCircle2, ArrowRight, Compass, Sparkles, Target, History, BookOpen, GraduationCap, Briefcase, Award, Lightbulb, Hexagon } from 'lucide-react';
import { HOLLAND_TYPES } from '../data/hollandProfiles';

export default function HollandOverview({ onStartTest }) {
  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-16 animate-fade-in py-4 sm:py-6">
      
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-950 text-white p-6 sm:p-12 shadow-2xl border border-purple-800/40 space-y-6">
        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span>Mô Hình Đánh Giá Sở Thích Nghề Nghiệp Quốc Tế (John Holland)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Khám Phá Bản Đồ Sở Thích Nghề Nghiệp Với <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-amber-300">
              Holland Code (Mã RIASEC)
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl font-medium">
            Hệ thống phân loại định hướng sự nghiệp khoa học hàng đầu thế giới được xây dựng bởi Giáo sư John Holland. Mô phỏng bộ thẻ tương tác sinh động giúp bạn giải mã <strong className="text-purple-300 font-bold">Top 3 Mã Holland (RIASEC)</strong> cá nhân hóa để tìm ra ngành nghề đam mê nhất.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onStartTest}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:from-purple-400 hover:to-amber-400 text-white font-black text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2.5 transform hover:scale-105 active:scale-95"
            >
              <span>Trải Nghiệm Thẻ Bài Holland Card Sort Ngay</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* SECTION 1: BẮT NGUỒN LỊCH SỬ & NỀN TẢNG KHOA HỌC */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
        <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 shrink-0">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Bắt Nguồn Lịch Sử &amp; Lý Thuyết Lục Giác Holland Hexagon
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Công trình nghiên cứu tâm lý học sự nghiệp nổi tiếng của GS. John L. Holland
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              Mô hình <strong>Holland Code</strong> được phát triển bởi **Giáo sư Tâm lý học John L. Holland** (Đại học Johns Hopkins, Mỹ) bắt đầu từ những năm 1950 và chuẩn hóa liên tục trong hơn 4 thập kỷ.
            </p>
            <p>
              Triết lý cốt lõi của Holland được phát biểu đơn giản nhưng vô cùng mạnh mẽ: 
              <br />
              <em className="text-purple-700 dark:text-purple-300 font-serif font-bold">
                "Sự hài lòng trong công việc và thành công sự nghiệp bền vững phụ thuộc vào mức độ tương thích giữa loại hình tính cách cá nhân và môi trường làm việc thực tế."
              </em>
            </p>
            <p>
              Mô hình chia sở thích con người và môi trường làm việc thành 6 nhóm đặc trưng xếp trên hình Lục giác (Hexagon): <strong>Realistic (R)</strong>, <strong>Investigative (I)</strong>, <strong>Artistic (A)</strong>, <strong>Social (S)</strong>, <strong>Enterprising (E)</strong>, và <strong>Conventional (C)</strong>.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-purple-950/40 dark:via-indigo-950/40 dark:to-pink-950/40 border border-purple-100 dark:border-purple-900/50 space-y-4">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center space-x-2">
              <Hexagon className="w-5 h-5 text-purple-600" />
              <span>Nguyên Lý Lục Giác Holland (RIASEC Hexagon)</span>
            </h3>

            <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                • <strong>Mối quan hệ kề nhau (Adjacent):</strong> Các nhóm nằm cạnh nhau trên lục giác (VD: <em>R và I</em>, hoặc <em>A và S</em>) có mức độ tương đồng sở thích rất cao, dễ dàng hòa hợp trong môi trường công việc.
              </p>
              <p>
                • <strong>Mối quan hệ đối diện (Opposite):</strong> Các nhóm nằm đối diện qua tâm lục giác (VD: <em>R và S</em>, hoặc <em>I và E</em>) thể hiện hai phong cách làm việc trái ngược nhưng lại có khả năng bù trừ hoàn hảo cho nhau trong công tác nhóm.
              </p>
              <p>
                • <strong>Top 3 Mã Holland:</strong> Mỗi cá nhân sẽ lấy ra 3 mã có điểm số cao nhất để tạo thành "Mã Holland Code cá nhân" (Ví dụ: <strong>RIA</strong>, <strong>SEC</strong>, <strong>EAC</strong>,...).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: 6 RIASEC CATEGORIES GRID */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            6 Nhóm Sở Thích Nghề Nghiệp Trong Mô Hình RIASEC
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            Mỗi cá nhân sở hữu một sự kết hợp độc nhất của 3 nhóm sở thích vượt trội nhất
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(HOLLAND_TYPES).map(([code, profile]) => (
            <div
              key={code}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 hover:border-purple-400 dark:hover:border-purple-500 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-lg shrink-0">
                    {code}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                      {profile.name}
                    </h3>
                    <span className="text-xs text-purple-600 dark:text-purple-400 font-bold">
                      {profile.english}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {profile.summary}
                </p>

                {/* Characteristics Pill Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {profile.characteristics.map((char, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/60 text-purple-700 dark:text-purple-300 text-[11px] font-semibold">
                      • {char}
                    </span>
                  ))}
                </div>
              </div>

              {/* Suitable Careers List */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  Ngành nghề tiêu biểu nổi bật:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {profile.suitableCareers.slice(0, 4).map((career, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium border border-slate-200/80 dark:border-slate-700">
                      {career}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: ỨNG DỤNG THỰC TẾ TRONG GIÁO DỤC & DOANH NGHIỆP */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
        <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Ứng Dụng Thực Tế Của Holland Code (RIASEC)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Chiến lược định hướng học tập &amp; phát triển sự nghiệp đỉnh cao
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          
          <div className="p-6 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Chọn Trường &amp; Ngành Học Đại Học
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Giúp học sinh cấp 3 và sinh viên chọn đúng chuyên ngành đại học phù hợp với niềm đam mê nội tại, tránh lãng phí thời gian và chi phí học tập vào ngành không yêu thích.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Chuyển Nghề &amp; Lộ Trình Thăng Tiến
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Giúp người đi làm tìm ra nguyên nhân gây chán nản công sở, hoạch định chiến lược chuyển đổi công việc (Career Switch) sang đúng môi trường giúp phát huy tối đa năng lực.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Xây Dựng Văn Hóa Doanh Nghiệp (L&amp;D)
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Giúp bộ phận Nhân sự &amp; Lãnh đạo quy hoạch chương trình đào tạo nội bộ, phân bổ nhân sự vào dự án phù hợp với thiên hướng và xây dựng môi trường gắn kết.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

