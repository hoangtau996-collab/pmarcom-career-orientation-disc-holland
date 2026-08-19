import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, Layers, ArrowRight, CheckCircle2, Star, Eye, ShieldCheck, Lock, UserCheck, Bell, Award, ExternalLink, GraduationCap, Rocket, Zap } from 'lucide-react';
import { getVisitorStats, subscribeToVisitorStats } from '../utils/visitorCounter';
import { getTranslation } from '../utils/translations';

export default function TestSelector({ onSelectTestMode, user, lang = 'vi' }) {
  const [stats, setStats] = useState(getVisitorStats());
  const [hasUnfinished, setHasUnfinished] = useState(() => {
    const discSaved = localStorage.getItem('disc_current_answers');
    const hollandSaved = localStorage.getItem('holland_current_choices');
    const dCount = discSaved ? Object.keys(JSON.parse(discSaved)).length : 0;
    const hCount = hollandSaved ? Object.keys(JSON.parse(hollandSaved)).length : 0;
    return { dCount, hCount };
  });

  useEffect(() => {
    const unsubscribe = subscribeToVisitorStats((newStats) => {
      setStats(newStats);
    });
    return () => unsubscribe();
  }, []);

  const handleClearSavedProgress = () => {
    if (window.confirm(lang === 'vi' ? 'Bạn có muốn xóa câu trả lời dở dang và làm lại từ đầu?' : 'Clear saved progress and start fresh?')) {
      localStorage.removeItem('disc_current_answers');
      localStorage.removeItem('holland_current_choices');
      setHasUnfinished({ dCount: 0, hCount: 0 });
    }
  };

  const t = (key, params) => getTranslation(lang, key, params);

  return (
    <div className="space-y-8 sm:space-y-10 py-4 sm:py-6">

      {/* UNFINISHED TEST RESUME BANNER */}
      {(hasUnfinished.dCount > 0 || hasUnfinished.hCount > 0) && (
        <div className="p-4 bg-teal-500/10 border-2 border-teal-400 dark:border-teal-500/50 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md animate-in fade-in slide-in-from-top duration-300">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <div className="p-2.5 rounded-xl bg-teal-500 text-slate-950 shrink-0">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900 dark:text-white flex items-center justify-center sm:justify-start space-x-1.5">
                <span>{lang === 'vi' ? 'Phát hiện bài test đang làm dở dang!' : 'Unfinished test in progress!'}</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                {hasUnfinished.dCount > 0 && `• Bài DISC: Đã xong ${hasUnfinished.dCount}/28 câu. `}
                {hasUnfinished.hCount > 0 && `• Bài Holland: Đã xếp ${hasUnfinished.hCount}/36 thẻ.`}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => onSelectTestMode(hasUnfinished.dCount > 0 ? 'disc' : 'holland')}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-black text-xs rounded-xl shadow transition-all flex items-center space-x-1"
            >
              <span>{lang === 'vi' ? 'Tiếp tục làm bài' : 'Resume Test'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleClearSavedProgress}
              className="px-3 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-all"
            >
              {lang === 'vi' ? 'Xóa dở dang' : 'Clear'}
            </button>
          </div>
        </div>
      )}
      
      {/* GUEST NOTICE BANNER FOR FIRST TIME VISITORS */}
      {!user && (
        <div className="p-4 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-slate-900/10 border-2 border-teal-300 dark:border-teal-500/40 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <div className="p-2.5 rounded-xl bg-teal-500 text-slate-950 shrink-0">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center justify-center sm:justify-start space-x-1.5">
                <span>{lang === 'vi' ? 'Chào mừng bạn đến với P Marcom!' : 'Welcome to P Marcom Career Platform!'}</span>
                <Sparkles className="w-4 h-4 text-teal-500" />
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {t('guestNotice')}
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectTestMode('combo')}
            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs rounded-xl shadow shrink-0"
          >
            {t('login')}
          </button>
        </div>
      )}

      {/* HERO BANNER SECTION - GAM MÀU TRẮNG, XANH NGỌC & XANH NAVI */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-teal-900 text-white p-6 sm:p-12 shadow-2xl border border-teal-400/40">
        
        {/* Glow Background */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-xs font-black uppercase tracking-wider shadow-sm">
              <img src="/logo-pmarcom.png" alt="Logo P Marcom" className="h-5 w-auto object-contain" />
              <span>{lang === 'vi' ? 'Nền Tảng Độc Quyền P Marcom' : 'Exclusive P Marcom Platform'}</span>
            </div>

            {/* HEADLINE */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-md">
              {t('heroTitle')} <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-200 to-white">
                {t('heroSubtitle')}
              </span>
            </h1>

            {/* PARAGRAPH */}
            <p className="text-teal-100 text-xs sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              {t('heroDesc')}
            </p>

            {/* STATS PILLS - ĐỒNG BỘ REALTIME TOÀN CẦU */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              
              {/* Visit Counter Pill */}
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 shadow-md text-xs font-semibold">
                <Eye className="w-4 h-4 text-cyan-300 shrink-0 animate-pulse" />
                <span className="text-white font-extrabold text-sm">{stats.totalVisits}</span>
                <span className="text-teal-100">{t('statsVisits')}</span>
              </div>

              {/* Completed Tests Counter Pill */}
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 shadow-md text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="text-white font-extrabold text-sm">{stats.totalTests}</span>
                <span className="text-teal-100">{t('statsCompletedTests')}</span>
              </div>

            </div>

          </div>

          {/* Right Hero Image - Ảnh Minh Họa Người Thật Chuyên Nghiệp */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-teal-300/30 group">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
                alt="Định hướng nghề nghiệp P Marcom với hình ảnh người thật"
                className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-slate-900/85 backdrop-blur-md rounded-2xl border border-teal-400/30 text-xs shadow-lg">
                <div className="font-black text-teal-300 flex items-center space-x-1.5">
                  <Star className="w-4 h-4 fill-teal-300 text-teal-300" />
                  <span>{lang === 'vi' ? 'Ma Trận Gợi Ý 50+ Ngành Học & Nghề Nghiệp' : 'Matrix of 50+ Recommended Majors & Careers'}</span>
                </div>
                <div className="text-[11px] text-slate-200 font-medium mt-0.5">{lang === 'vi' ? 'Dành cho Sinh viên/Học sinh và Người đi làm' : 'For Students, Fresh Grads & Working Professionals'}</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FOUR TEST CARDS - BỘ MÀU TRẮNG, XANH NGỌC, XANH NAVI */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {t('selectMode')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            {lang === 'vi' ? 'Khuyến nghị thực hiện ' : 'Recommended to take the '}
            <strong className="font-bold text-teal-600 dark:text-teal-400">{t('comboTitle')}</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          
          {/* CARD 1: DISC TEST */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between space-y-5 hover:border-teal-500 hover:shadow-teal-500/20 transition-all hover:scale-[1.02]">
            
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden h-36">
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop"
                  alt="DISC Assessment"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-slate-900 text-white font-extrabold text-xs rounded-full shadow">
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
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                  <span>{t('discTime')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                  <span>{lang === 'vi' ? 'Phân tích phong cách hành vi' : 'Behavioral Style Analysis'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectTestMode('disc')}
              className="w-full py-3 px-4 bg-gradient-to-r from-slate-900 to-teal-700 hover:from-slate-950 hover:to-teal-600 text-white font-black text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 transform hover:scale-[1.02] active:scale-95"
            >
              <span>{t('startDisc')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

          {/* CARD 2: HOLLAND CARD SORT */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-teal-200 dark:border-teal-900 shadow-xl flex flex-col justify-between space-y-5 hover:border-teal-500 hover:shadow-teal-500/20 transition-all hover:scale-[1.02]">
            
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden h-36">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop"
                  alt="Holland Card Sort"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-teal-600 text-white font-black text-xs rounded-full shadow-md">
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
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                  <span>{t('hollandTime')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                  <span>{lang === 'vi' ? 'Tìm Mã Holland Top 3' : 'Top 3 Holland RIASEC Code'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectTestMode('holland')}
              className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-black text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 transform hover:scale-[1.02] active:scale-95"
            >
              <span>{t('startHolland')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

          {/* CARD 3: MBTI 16 PERSONALITY TYPES (NEW STANDALONE TEST) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-cyan-200 dark:border-cyan-900 shadow-xl flex flex-col justify-between space-y-5 hover:border-cyan-500 hover:shadow-cyan-500/20 transition-all hover:scale-[1.02]">
            
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden h-36">
                <img
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600&auto=format&fit=crop"
                  alt="MBTI 16 Personality Types"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-cyan-600 text-white font-black text-xs rounded-full shadow-md">
                  MBTI 16 Types
                </span>
              </div>

              <div>
                <h4 className="text-lg font-black text-slate-900 dark:text-white">
                  {lang === 'vi' ? 'Bài Test MBTI 16 Nhóm' : 'MBTI 16 Personality Test'}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {lang === 'vi' ? 'Khám phá 4 chiều đo nhân cách cốt lõi (E/I, S/N, T/F, J/P) và định hình mã MBTI 16 loại.' : 'Identify your 4 personality dichotomies and discover your 16 MBTI code.'}
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                  <span>{lang === 'vi' ? '⏱️ 3-5 phút (20 câu)' : '⏱️ 3-5 mins (20 questions)'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                  <span>{lang === 'vi' ? 'Bài test độc lập 100%' : '100% Standalone Assessment'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectTestMode('mbti')}
              className="w-full py-3 px-4 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-black text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 transform hover:scale-[1.02] active:scale-95"
            >
              <span>{lang === 'vi' ? 'Bắt đầu Test MBTI' : 'Start MBTI Test'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

          {/* CARD 4: COMBO TEST (RECOMMENDED) */}
          <div className="bg-gradient-to-b from-teal-50/60 to-cyan-50/40 dark:from-slate-900 dark:to-slate-900 rounded-3xl p-6 border-2 border-teal-400 dark:border-teal-500/60 shadow-2xl flex flex-col justify-between space-y-5 relative transform hover:scale-[1.03] transition-all">
            
            <div className="absolute -top-3.5 right-6 px-3 py-1 bg-teal-600 text-white font-black text-[11px] rounded-full uppercase tracking-wider shadow">
              🔥 {lang === 'vi' ? 'Khuyên Dùng' : 'Recommended'}
            </div>

            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden h-40">
                <img
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop"
                  alt="Combo Assessment"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-black text-xs rounded-full shadow">
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
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>{lang === 'vi' ? 'Báo cáo tỉ lệ & Biểu đồ kép' : 'Dual Radar & Bar Charts'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>{lang === 'vi' ? 'Xuất file PDF phân trang chuẩn A4' : 'A4 PDF Report Export'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectTestMode('combo')}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-teal-500 via-cyan-500 to-slate-900 hover:from-teal-600 hover:to-slate-950 text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 animate-pulse text-cyan-300" />
              <span>{t('startCombo')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>

      {/* BANNER GIỚI THIỆU KHÓA HỌC DIGITAL MARKETING (P MARCOM ACADEMY) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-teal-950 text-white p-6 sm:p-10 shadow-2xl border-2 border-teal-500/40 group">
        
        {/* Decorative Ambient Lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Course Information */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-teal-400/40 text-teal-300 text-xs font-black uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-teal-300 shrink-0" />
              <span>P Marcom Academy • Digital Marketing Professional</span>
            </div>

            <h3 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-snug">
              {lang === 'vi' ? (
                <>
                  Khóa Học <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-200 to-white">Digital Marketing Thực Chiến</span> – Kiến Tạo Sự Nghiệp Đột Phá
                </>
              ) : (
                <>
                  Practical <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-200 to-white">Digital Marketing Masterclass</span> – Accelerate Your Career
                </>
              )}
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              {lang === 'vi' 
                ? 'Lộ trình đào tạo chuẩn doanh nghiệp từ cơ bản đến chuyên sâu: SEO & Content Strategy, Performance Ads, Xây dựng thương hiệu & Ứng dụng AI trong Marketing.'
                : 'Enterprise-grade practical training from foundations to advanced: SEO & Content Strategy, Performance Ads, Brand Strategy & AI Marketing Application.'}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
              <span className="px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-xl text-xs font-bold text-slate-200 border border-white/15 flex items-center space-x-1.5 shadow-sm">
                <Rocket className="w-4 h-4 text-teal-300 shrink-0" />
                <span>{lang === 'vi' ? 'Thực chiến 100% Dự án thật' : '100% Real-world Projects'}</span>
              </span>

              <span className="px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-xl text-xs font-bold text-slate-200 border border-white/15 flex items-center space-x-1.5 shadow-sm">
                <Zap className="w-4 h-4 text-cyan-300 shrink-0" />
                <span>{lang === 'vi' ? 'Ứng dụng AI Marketing Tool' : 'AI Marketing Workflows'}</span>
              </span>

              <span className="px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-xl text-xs font-bold text-slate-200 border border-white/15 flex items-center space-x-1.5 shadow-sm">
                <Award className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>{lang === 'vi' ? 'Cấp chứng chỉ khóa học' : 'Course Certification Included'}</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <a
                href="https://academy.pmarcom.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-slate-900 hover:from-teal-600 hover:to-slate-950 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>{lang === 'vi' ? 'Khám Phá Khóa Học Ngay' : 'Explore Academy Courses'}</span>
                <ExternalLink className="w-4 h-4 text-white stroke-[2.5]" />
              </a>
              <span className="text-xs text-slate-400 font-medium">
                👉 academy.pmarcom.com
              </span>
            </div>

          </div>

          {/* Right Realistic Banner Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-teal-400/30 group-hover:border-cyan-400/50 transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=800&auto=format&fit=crop"
                alt="Khóa học Digital Marketing Thực Chiến P Marcom Academy"
                className="w-full h-56 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

              {/* Floating Badge on Image */}
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-950/85 backdrop-blur-md rounded-2xl border border-teal-400/30 text-xs flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-extrabold text-teal-300 text-xs flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Digital Marketing & AI Tools 2026</span>
                  </div>
                  <div className="text-[11px] text-slate-300">Performance Ads • SEO & Content Strategy</div>
                </div>
                <span className="px-2.5 py-1 bg-teal-600 text-white font-extrabold text-[10px] rounded-lg shrink-0">
                  P MARCOM ACADEMY
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
