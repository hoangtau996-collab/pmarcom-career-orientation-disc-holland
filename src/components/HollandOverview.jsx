import React from 'react';
import { Layers, CheckCircle2, ArrowRight, Compass, Sparkles, Target } from 'lucide-react';
import { HOLLAND_TYPES } from '../data/hollandProfiles';

export default function HollandOverview({ onStartTest }) {
  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4 sm:py-6">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 text-white p-6 sm:p-10 shadow-2xl border border-purple-800/40">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mô Hình Đánh Giá Sở Thích Nghề Nghiệp Quốc Tế</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Holland Code (Mã RIASEC) Là Gì?
          </h1>

          <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
            Hệ thống phân loại sở thích nghề nghiệp được nghiên cứu bởi Giáo sư Tâm lý học John Holland (Mỹ). Mô phỏng bộ thẻ bài tương tác sinh động giúp bạn lựa chọn sở thích, môi trường làm việc và giải mã <strong className="font-bold text-purple-300">Top 3 Mã Holland (RIASEC)</strong> của chính mình.
          </p>

          <button
            onClick={onStartTest}
            className="px-6 py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center space-x-2"
          >
            <span>Trải Nghiệm Holland Card Sort Ngay</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* 6 RIASEC Categories Grid */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            6 Nhóm Sở Thích Nghề Nghiệp RIASEC
          </h2>
          <p className="text-xs text-slate-500">
            Mỗi cá nhân thường sở hữu sự kết hợp của 3 nhóm tính cách vượt trội nhất
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(HOLLAND_TYPES).map(([code, profile]) => (
            <div
              key={code}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-md space-y-3 hover:border-purple-300 transition-all"
            >
              <div className="flex items-center space-x-3">
                <span className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 font-black text-lg flex items-center justify-center border border-purple-200 dark:border-purple-800">
                  {code}
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                    {profile.name}
                  </h3>
                  <span className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
                    {profile.code}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                {profile.summary}
              </p>

              {/* Suitable Careers List */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Ngành nghề tiêu biểu:</span>
                <div className="flex flex-wrap gap-1.5">
                  {profile.suitableCareers.slice(0, 4).map((career, idx) => (
                    <span key={idx} className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium border border-slate-200/60 dark:border-slate-700/60">
                      {career}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
