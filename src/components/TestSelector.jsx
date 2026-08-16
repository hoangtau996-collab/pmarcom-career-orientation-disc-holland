import React from 'react';
import { Compass, Sparkles, Layers, ArrowRight, CheckCircle2, Star, Eye, ShieldCheck, Lock, UserCheck, Bell, Award, Zap } from 'lucide-react';
import { getVisitorStats } from '../utils/visitorCounter';
import { getTranslation } from '../utils/translations';

export default function TestSelector({ onSelectTestMode, user, lang = 'vi' }) {
  const stats = getVisitorStats();
  const t = (key, params) => getTranslation(lang, key, params);

  return (
    <div className="space-y-8 sm:space-y-10 py-4 sm:py-6">
      
      {/* GUEST NOTICE BANNER FOR FIRST TIME VISITORS */}
      {!user && (
        <div className="p-4 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-indigo-500/10 border-2 border-amber-300 dark:border-amber-500/40 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 shrink-0">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center justify-center sm:justify-start space-x-1.5">
                <span>{lang === 'vi' ? 'Chào mừng bạn đến với P Marcom!' : 'Welcome to P Marcom Career Platform!'}</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {t('guestNotice')}
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectTestMode('combo')}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow shrink-0"
          >
            {t('login')}
          </button>
        </div>
      )}

      {/* OFFICIAL CUSTOM HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl group">
        
        {/* Banner Graphic Image */}
        <div className="relative w-full overflow-hidden">
          <img
            src="/hero-banner.png"
            alt="P Marcom Career Banner - Thấu hiểu bản thân Kiến tạo tương lai"
            className="w-full h-auto max-h-[480px] object-cover object-center w-full transition-transform duration-700 hover:scale-[1.01]"
          />

          {/* Subtle Overlay Shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
        </div>

        {/* Bottom Banner Content & Quick Action Bar */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-slate-900/90 to-slate-950 backdrop-blur-md border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? 'Chuẩn Đánh Giá Quốc Tế Hoa Kỳ' : 'US Standard Assessment Platform'}</span>
            </div>
            
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              Thấu Hiểu Bản Thân – Kiến Tạo Tương Lai
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              {t('heroDesc')}
            </p>

            {/* REAL VISITOR & TEST STATS PILLS */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-amber-300">
                <Eye className="w-4 h-4 text-amber-400" />
                <span>{stats.totalVisits} {t('statsVisits')}</span>
              </div>
              
              <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{stats.totalTests} {t('statsCompletedTests')}</span>
              </div>
            </div>
          </div>

          {/* Quick Call-to-action Button */}
          <button
            onClick={() => onSelectTestMode('combo')}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 via-pink-600 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white font-black text-sm rounded-2xl shadow-xl transition-all hover:scale-105 flex items-center space-x-2 shrink-0"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>{t('startCombo')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* THREE TEST CARDS */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {t('selectMode')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            {lang === 'vi' ? 'Khuyến nghị thực hiện ' : 'Recommended to take the '}
            <strong className="font-bold text-amber-600 dark:text-amber-400">{t('comboTitle')}</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          {/* CARD 1: DISC TEST */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-indigo-100 dark:border-indigo-950 shadow-xl flex flex-col justify-between space-y-5 hover:border-indigo-500 transition-all hover:scale-[1.02]">
            
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden h-40">
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop"
                  alt="DISC Assessment"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-indigo-600 text-white font-extrabold text-xs rounded-full shadow">
                  DISC Model
                </span>
              </div>

              <div>
                <h4 className="text-lg font-black text-slate-900 dark:text-white">
                  {t('discTitle')}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {t('discDesc')}
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{t('discTime')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{lang === 'vi' ? 'Phân tích 16 mẫu tính cách' : '16 Personality Profiles'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectTestMode('disc')}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>{t('startDisc')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

          {/* CARD 2: HOLLAND CARD SORT */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-purple-100 dark:border-purple-950 shadow-xl flex flex-col justify-between space-y-5 hover:border-purple-500 transition-all hover:scale-[1.02]">
            
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden h-40">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop"
                  alt="Holland Card Sort"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-purple-600 text-white font-extrabold text-xs rounded-full shadow">
                  Holland Code (RIASEC)
                </span>
              </div>

              <div>
                <h4 className="text-lg font-black text-slate-900 dark:text-white">
                  {t('hollandTitle')}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {t('hollandDesc')}
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{t('hollandTime')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{lang === 'vi' ? 'Tìm Mã Holland Top 3' : 'Top 3 Holland RIASEC Code'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectTestMode('holland')}
              className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>{t('startHolland')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

          {/* CARD 3: COMBO TEST (RECOMMENDED) */}
          <div className="bg-gradient-to-b from-amber-50/70 to-amber-100/30 dark:from-slate-900 dark:to-slate-900 rounded-3xl p-6 border-2 border-amber-400 dark:border-amber-500/60 shadow-2xl flex flex-col justify-between space-y-5 relative transform hover:scale-[1.03] transition-all">
            
            <div className="absolute -top-3.5 right-6 px-3 py-1 bg-amber-500 text-slate-950 font-black text-[11px] rounded-full uppercase tracking-wider shadow">
              🔥 {lang === 'vi' ? 'Khuyên Dùng' : 'Recommended'}
            </div>

            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden h-40">
                <img
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop"
                  alt="Combo Assessment"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-amber-500 to-pink-500 text-slate-950 font-black text-xs rounded-full shadow">
                  {lang === 'vi' ? 'Đánh Giá Kép Toàn Diện' : 'Comprehensive Dual Combo'}
                </span>
              </div>

              <div>
                <h4 className="text-lg font-black text-slate-900 dark:text-white">
                  {t('comboTitle')}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {t('comboDesc')}
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{lang === 'vi' ? 'Báo cáo tỉ lệ & Biểu đồ kép' : 'Dual Radar & Bar Charts'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{lang === 'vi' ? 'Xuất file PDF phân trang chuẩn A4' : 'A4 PDF Report Export'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectTestMode('combo')}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 via-pink-600 to-indigo-600 hover:from-amber-600 hover:to-indigo-500 text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>{t('startCombo')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>

    </div>
  );
}
