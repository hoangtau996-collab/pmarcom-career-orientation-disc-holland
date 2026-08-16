import React from 'react';
import { Layers, Compass, CheckCircle2, ArrowRight, Sparkles, Award, GraduationCap, Briefcase } from 'lucide-react';

export default function HollandOverview({ onStartTest }) {
  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-pink-950 text-white shadow-2xl p-6 sm:p-12 border border-slate-800">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold">
            <img src="/logo-pmarcom.png" alt="P Marcom Logo" className="h-6 w-auto object-contain" />
            <span>Mô Hình Mật Mã Nghề Nghiệp Holland RIASEC (John Holland - USA)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Khám Phá Mã Nghề Nghiệp Với <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-amber-300">
              Trải Nghiệm Holland Card Sort
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Mô phỏng bộ thẻ bài tương tác sinh động giúp bạn lựa chọn sở thích, môi trường làm việc và giải mã **Top 3 Mã Holland (RIASEC)** của chính mình.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartTest}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-purple-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-3"
            >
              <span>Vào Trải Nghiệm Thẻ Bài Holland</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* HOLLAND 6 GROUPS RIASEC WITH ATTRACTIVE IMAGES */}
      <section className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            6 Nhóm Sở Thích Nghề Nghiệp RIASEC
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Thuyết chọn lựa nghề nghiệp của Tiến sĩ <strong>John Holland</strong> khẳng định việc chọn đúng môi trường phù hợp với tính cách sẽ mang lại sự thăng tiến đỉnh cao.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* R */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-red-200 dark:border-red-900/60 shadow-lg overflow-hidden space-y-3">
            <div className="h-40 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80" alt="Realistic" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-red-600 text-white font-black text-xl flex items-center justify-center shadow-md">R</div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Realistic (Kỹ Thuật / Thực Tế)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">Thích máy móc, công cụ, thi công công trình và làm việc trực tiếp ngoài trời.</p>
            </div>
          </div>

          {/* I */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-blue-200 dark:border-blue-900/60 shadow-lg overflow-hidden space-y-3">
            <div className="h-40 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80" alt="Investigative" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-xl flex items-center justify-center shadow-md">I</div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Investigative (Nghiên Cứu)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">Thích phân tích dữ liệu, khám phá tri thức, thí nghiệm và bóc tách bài toán logic.</p>
            </div>
          </div>

          {/* A */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-pink-200 dark:border-pink-900/60 shadow-lg overflow-hidden space-y-3">
            <div className="h-40 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80" alt="Artistic" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-pink-600 text-white font-black text-xl flex items-center justify-center shadow-md">A</div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Artistic (Nghệ Thuật)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">Thích sáng tạo hình ảnh, hội họa, thiết kế, âm nhạc, viết lách và cái tôi độc đáo.</p>
            </div>
          </div>

          {/* S */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-emerald-200 dark:border-emerald-900/60 shadow-lg overflow-hidden space-y-3">
            <div className="h-40 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" alt="Social" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-xl flex items-center justify-center shadow-md">S</div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Social (Xã Hội / Giúp Đỡ)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">Thích lắng nghe, tư vấn, giảng dạy, chăm sóc người khác và các hoạt động cộng đồng.</p>
            </div>
          </div>

          {/* E */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-amber-200 dark:border-amber-900/60 shadow-lg overflow-hidden space-y-3">
            <div className="h-40 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80" alt="Enterprising" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-amber-500 text-white font-black text-xl flex items-center justify-center shadow-md">E</div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Enterprising (Quản Lý / Thuyết Phục)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">Thích bán hàng, kinh doanh, khởi nghiệp, lãnh đạo đội ngũ và đàm phán.</p>
            </div>
          </div>

          {/* C */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-purple-200 dark:border-purple-900/60 shadow-lg overflow-hidden space-y-3">
            <div className="h-40 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80" alt="Conventional" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-purple-600 text-white font-black text-xl flex items-center justify-center shadow-md">C</div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Conventional (Nghiệp Vụ / Kỷ Luật)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">Thích kế toán, quản trị sổ sách văn phòng, kiểm soát quy trình và kỷ luật.</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
