import React from 'react';
import { ShieldAlert, Zap, MessageSquare, Heart, Compass, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function AdviceSection({ profile }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white">
          Báo Cáo Phân Tích Tính Cách & Lời Khuyên
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Hiểu sâu bản thân để tối ưu hiệu suất công việc và nâng cao chất lượng mối quan hệ
        </p>
      </div>

      {/* Grid Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Strengths */}
        <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-base">
              Điểm Mạnh Nổi Bật (Strengths)
            </h4>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {profile.strengths.map((str, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h4 className="font-bold text-amber-900 dark:text-amber-200 text-base">
              Điểm Cần Tối Ưu (Areas for Growth)
            </h4>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {profile.weaknesses.map((wk, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2"></span>
                <span>{wk}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Communication Style */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-indigo-600" />
          <h4 className="font-bold text-slate-900 dark:text-white text-base">
            Cẩm Nang Giao Tiếp Cá Nhân
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold uppercase text-indigo-600">Cách bạn giao tiếp với thế giới:</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {profile.communicationStyle.howTheyTalk}
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold uppercase text-purple-600">Cách người khác nên giao tiếp với bạn:</span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {profile.communicationStyle.howToTalkToThem}
            </p>
          </div>
        </div>
      </div>

      {/* Motivations & Fears */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Motivations */}
        <div className="p-6 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-3">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-indigo-600" />
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Động Lực Cốt Lõi (Motivations)
            </h4>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {profile.motivations.map((m, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Fears */}
        <div className="p-6 rounded-2xl bg-rose-50/40 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-3">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Nỗi Sợ Cốt Lõi (Core Fears)
            </h4>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {profile.fears.map((f, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Ideal Environment */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900/10 via-purple-900/10 to-transparent border border-indigo-200 dark:border-indigo-900/60 space-y-2">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center space-x-2">
          <Compass className="w-5 h-5 text-indigo-600" />
          <span>Môi Trường Phát Triển Tối Ưu (Ideal Environment):</span>
        </h4>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {profile.idealEnvironment}
        </p>
      </div>

    </div>
  );
}
