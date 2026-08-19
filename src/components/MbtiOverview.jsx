import React from 'react';
import { Brain, ArrowRight, Sparkles, CheckCircle2, Award, Zap, Compass, ShieldCheck } from 'lucide-react';
import { getTranslation } from '../utils/translations';

export default function MbtiOverview({ onStartTest, lang = 'vi' }) {
  const t = (key, params) => getTranslation(lang, key, params);

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8 animate-fade-in">
      
      {/* HEADER HERO */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-indigo-500/40 relative overflow-hidden text-center sm:text-left space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 font-extrabold text-xs">
          <Brain className="w-4 h-4 text-purple-400" />
          <span>Myers-Briggs Type Indicator • 16 Personality Types</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
          Khám Phá <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-300">16 Nhóm Tính Cách MBTI</span> Thực Chiến
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed font-medium">
          Bài đánh giá tâm lý học MBTI giúp bạn nhận diện 4 chiều đo nhân cách cốt lõi: Hướng ngoại/Hướng nội (E/I), Thực tế/Trực giác (S/N), Lý trí/Cảm xúc (T/F) và Nguyên tắc/Linh hoạt (J/P). Từ đó định hình phong cách làm việc và lộ trình sự nghiệp lý tưởng.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
          <button
            onClick={onStartTest}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-400 via-pink-500 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-slate-950 font-black text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2.5 transform hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>Bắt Đầu Làm Bài Test MBTI Ngay</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <span className="text-xs text-slate-400 font-semibold flex items-center space-x-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>20 câu hỏi tình huống • Khoảng 3-5 phút</span>
          </span>
        </div>
      </div>

      {/* 4 DICHOTOMIES CARDS */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center space-x-2">
          <Compass className="w-5 h-5 text-indigo-600" />
          <span>4 Chiều Đo Nhân Cách Trong Bài Test MBTI</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-indigo-600 dark:text-indigo-400">1. Nguồn Năng Lượng</span>
              <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-black text-xs rounded">E vs I</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>E (Extraversion - Hướng ngoại)</strong> nạp năng lượng từ tương tác xã hội. <strong>I (Introversion - Hướng nội)</strong> nạp năng lượng từ không gian yên tĩnh nội tâm.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-purple-600 dark:text-purple-400">2. Thu Thập Thông Tin</span>
              <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-black text-xs rounded">S vs N</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>S (Sensing - Thực tế)</strong> tập trung vào chi tiết &amp; dữ liệu hiện tại. <strong>N (Intuition - Trực giác)</strong> tập trung vào bức tranh tổng thể &amp; khả năng tương lai.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-pink-600 dark:text-pink-400">3. Cách Ra Quyết Định</span>
              <span className="px-2 py-0.5 bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 font-black text-xs rounded">T vs F</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>T (Thinking - Tư duy)</strong> quyết định dựa trên logic &amp; lý trí. <strong>F (Feeling - Cảm xúc)</strong> quyết định dựa trên giá trị cá nhân &amp; sự thấu cảm.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-amber-600 dark:text-amber-400">4. Phong Cách Lối Sống</span>
              <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-black text-xs rounded">J vs P</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>J (Judging - Nguyên tắc)</strong> thích kế hoạch rõ ràng &amp; quy chuẩn. <strong>P (Perceiving - Linh hoạt)</strong> thích sự tự do &amp; ứng biến linh hoạt.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
