import React, { useState, useEffect } from 'react';
import { Target, Layers, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Eye, Award, Users, TrendingUp } from 'lucide-react';
import { getVisitorStats } from '../utils/visitorCounter';

export default function TestSelector({ onSelectTestMode }) {
  const [stats, setStats] = useState({ totalVisits: '15,420', totalTests: '8,930' });

  useEffect(() => {
    setStats(getVisitorStats());
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-12">
      
      {/* BANNER TỔNG (HERO BANNER HOÀNH TRÁNG VỚI LOGO P MARCOM & ẢNH MINH HỌA) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white shadow-2xl border border-slate-800 p-8 sm:p-12">
        
        {/* Background Image Effect */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
            alt="Career Team Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            
            {/* P Marcom Badge */}
            <div className="inline-flex items-center space-x-3 px-4 py-2 bg-amber-500/20 backdrop-blur-md border border-amber-400/40 rounded-full text-amber-300 text-xs sm:text-sm font-bold">
              <img src="/logo-pmarcom.png" alt="P Marcom Logo" className="h-6 w-auto object-contain" />
              <span>Nền Tảng Độc Quyền Bản Quyền P Marcom</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Định Hướng Phát Triển Nghề Nghiệp <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-pink-400 to-indigo-300">
                Toàn Diện Với DISC & Holland
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Giải pháp thấu hiểu bản thân chuẩn mực khoa học Hoa Kỳ. Kết hợp bài đánh giá hành vi **DISC (William Marston)** & **Bộ thẻ bài sở thích Holland RIASEC**, mang lại ma trận định hướng ngành học và sự nghiệp tối ưu nhất.
            </p>

            {/* Live Stats Counter Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-8">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
                <Eye className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="text-lg font-black text-white">{stats.totalVisits}</div>
                  <div className="text-[11px] text-slate-400 font-medium">Lượt truy cập hệ thống</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
                <Award className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-lg font-black text-white">{stats.totalTests}</div>
                  <div className="text-[11px] text-slate-400 font-medium">Bài test hoàn thành</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
                <Users className="w-5 h-5 text-pink-400" />
                <div>
                  <div className="text-lg font-black text-white">99.2%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Độ hài lòng người dùng</div>
                </div>
              </div>
            </div>

          </div>

          {/* Hero Banner Visual Image */}
          <div className="lg:col-span-4 relative hidden lg:block">
            <div className="relative mx-auto max-w-[280px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                alt="Career Mentoring"
                className="w-full h-[320px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs rounded-full">
                  P MARCOM CAREER
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CHỌN BÀI TEST VỚI ẢNH MINH HỌA BẮT MẮT */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Lựa Chọn Bài Đánh Giá
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Bấm chọn bài test bạn muốn bắt đầu thực hiện ngay dưới đây
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD 1: DISC */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-indigo-200 dark:border-indigo-900/60 shadow-xl overflow-hidden flex flex-col justify-between hover:border-indigo-500 transition-all group">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
                alt="DISC Leadership"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-transparent to-transparent"></div>
              <span className="absolute bottom-3 left-3 px-3 py-1 bg-indigo-600 text-white font-extrabold text-xs rounded-lg">
                Mô hình DISC
              </span>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Đánh Giá Tính Cách DISC</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  28 nhóm câu hỏi trắc nghiệm Forced-Choice giúp nhận diện hành vi tự nhiên, điểm mạnh, phong cách giao tiếp & lãnh đạo.
                </p>
              </div>

              <button
                onClick={() => onSelectTestMode('disc')}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-sm"
              >
                <span>Vào Test DISC</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CARD 2: HOLLAND CARD SORT */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-purple-200 dark:border-purple-900/60 shadow-xl overflow-hidden flex flex-col justify-between hover:border-purple-500 transition-all group">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80"
                alt="Holland Card Sort Creative"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent"></div>
              <span className="absolute bottom-3 left-3 px-3 py-1 bg-purple-600 text-white font-extrabold text-xs rounded-lg">
                Holland Card Sort
              </span>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Holland Card Sort</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Mô phỏng 36 thẻ bài tương tác sinh động xếp loại sở thích, nhóm kỹ năng & giải mã Top 3 Mã Holland (RIASEC).
                </p>
              </div>

              <button
                onClick={() => onSelectTestMode('holland')}
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-sm"
              >
                <span>Xếp Thẻ Holland</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CARD 3: COMBO BOTH */}
          <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white rounded-3xl border-2 border-pink-500 shadow-2xl overflow-hidden flex flex-col justify-between hover:scale-[1.02] transition-all group relative">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80"
                alt="Combo DISC + Holland"
                className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-purple-950/40 to-transparent"></div>
              <span className="absolute top-3 right-3 px-3 py-1 bg-pink-500 text-white font-black text-xs rounded-full">
                Khuyên Dùng
              </span>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-white">Combo DISC + Holland</h3>
                <p className="text-xs text-indigo-100 leading-relaxed">
                  Đánh giá song song Hành vi (DISC) & Sở thích Nghề nghiệp (Holland Card Sort) để tạo ma trận định hướng sự nghiệp hoàn hảo nhất.
                </p>
              </div>

              <button
                onClick={() => onSelectTestMode('combo')}
                className="w-full py-3 bg-white text-slate-900 hover:bg-slate-100 font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 text-sm"
              >
                <span>Làm Bài Combo Kép</span>
                <ArrowRight className="w-4 h-4 text-pink-600" />
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
