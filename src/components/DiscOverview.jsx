import React from 'react';
import { Target, Users, HeartHandshake, ShieldCheck, ArrowRight, BookOpen, GraduationCap, Briefcase, Sparkles, Award, CheckCircle2 } from 'lucide-react';

export default function DiscOverview({ onStartTest }) {
  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white shadow-2xl p-6 sm:p-12 border border-slate-800">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold">
            <img src="/logo-pmarcom.png" alt="P Marcom Logo" className="h-6 w-auto object-contain" />
            <span>Nền tảng Khoa Học DISC Chuẩn Hoa Kỳ (William Moulton Marston)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Khám Phá Bản Thể Tính Cách Với <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
              Bài Đánh Giá DISC Quốc Tế
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Hệ thống đánh giá hành vi chuẩn xác dành riêng cho <strong className="text-indigo-400 font-semibold">Người đi làm</strong> và <strong className="text-pink-400 font-semibold">Sinh viên - Học sinh</strong>. Thấu hiểu điểm mạnh, làm chủ giao tiếp và định hướng sự nghiệp tối ưu.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartTest}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-3"
            >
              <span>Nhập Thông Tin & Bắt Đầu Test</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* CÂU HỎI: DISC LA GI? CHỮ VIẾT TẮT TIẾNG ANH VỚI ẢNH MINH HỌA */}
      <section className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Mô Hình DISC Là Gì? Phân Tích Viết Tắt Tiếng Anh
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            DISC là viết tắt tiếng Anh của 4 nhóm hành vi tính cách cốt lõi: <strong>Dominance</strong> (Thống trị), <strong>Influence</strong> (Ảnh hưởng), <strong>Steadiness</strong> (Kiên định), và <strong>Conscientiousness</strong> (Tuân thủ).
          </p>
        </div>

        {/* GRID 4 CHỮ CÁI D - I - S - C VỚI ẢNH MINH HỌA SẮC NÉT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* D */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-red-200 dark:border-red-900/60 shadow-lg overflow-hidden space-y-4">
            <div className="h-40 overflow-hidden relative">
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
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Quyết Đoán / Thống Trị</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Mạnh mẽ, quyết đoán, hướng tới kết quả, thích quyền chủ động và thẳng thắn đối mặt với thách thức.
              </p>
            </div>
          </div>

          {/* I */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-amber-200 dark:border-amber-900/60 shadow-lg overflow-hidden space-y-4">
            <div className="h-40 overflow-hidden relative">
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
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Ảnh Hưởng / Thuyết Phục</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Hòa đồng, nhiệt huyết, giỏi giao tiếp, tự tin truyền cảm hứng và yêu thích kết nối xã hội.
              </p>
            </div>
          </div>

          {/* S */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-emerald-200 dark:border-emerald-900/60 shadow-lg overflow-hidden space-y-4">
            <div className="h-40 overflow-hidden relative">
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
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Kiên Định / Trầm Tĩnh</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Điềm tĩnh, trung thành, lắng nghe sâu sắc, coi trọng sự hòa hợp và giúp đỡ đồng đội thầm lặng.
              </p>
            </div>
          </div>

          {/* C */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-blue-200 dark:border-blue-900/60 shadow-lg overflow-hidden space-y-4">
            <div className="h-40 overflow-hidden relative">
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
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tuân Thủ / Cẩn Trọng</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Logic, cẩn thận, kỷ luật, tư duy dựa trên dữ liệu thực tế và tôn trọng quy trình chuẩn.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
