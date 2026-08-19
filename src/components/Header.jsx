import React, { useState, useEffect } from 'react';
import { Compass, BookOpen, Layers, History, Sun, Moon, Sparkles, UserCheck, Eye, Crown, LogIn, LogOut, Menu, X, User, Globe, UserPlus, Brain } from 'lucide-react';
import { getVisitorStats, subscribeToVisitorStats } from '../utils/visitorCounter';
import { isAdmin, isSuperAdmin } from '../utils/userManager';
import { getTranslation } from '../utils/translations';

export default function Header({
  currentScreen = 'selectTest',
  setCurrentScreen = () => {},
  darkMode = false,
  setDarkMode = () => {},
  lang = 'vi',
  setLang = () => {},
  user = null,
  onOpenLogin,
  onOpenRegister,
  onOpenAuth,
  onLogout = () => {},
  onOpenProfile = () => {},
  onOpenHistory,
  onOpenAdmin,
  onLogoClick
}) {
  const [stats, setStats] = useState(getVisitorStats());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToVisitorStats((newStats) => {
      setStats(newStats);
    });
    return () => unsubscribe();
  }, []);

  const userIsAdmin = isAdmin(user);
  const userIsSuperAdmin = isSuperAdmin(user);

  const t = (key, params) => getTranslation(lang, key, params);

  const navigateTo = (screen) => {
    if (screen === 'selectTest' && onLogoClick) {
      onLogoClick();
    } else if (screen === 'admin' && onOpenAdmin) {
      onOpenAdmin();
    } else if (screen === 'history' && onOpenHistory) {
      onOpenHistory();
    } else if (setCurrentScreen) {
      setCurrentScreen(screen);
    }
    setMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    if (onOpenLogin) onOpenLogin();
    else if (onOpenAuth) onOpenAuth('login');
    setMobileMenuOpen(false);
  };

  const handleRegisterClick = () => {
    if (onOpenRegister) onOpenRegister();
    else if (onOpenAuth) onOpenAuth('register');
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    const nextLang = lang === 'vi' ? 'en' : 'vi';
    if (setLang) setLang(nextLang);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-indigo-100 dark:border-slate-800 transition-colors shadow-sm">
      {/* Top Colorful Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-pink-500 to-indigo-600"></div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* P Marcom Logo + Title */}
        <div 
          onClick={() => navigateTo('selectTest')}
          className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group shrink-0"
        >
          <div className="h-10 px-2 bg-gradient-to-r from-amber-400/20 via-pink-500/20 to-indigo-500/20 rounded-xl border border-amber-400/40 dark:border-amber-500/30 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
            <img 
              src="/logo-pmarcom.png" 
              alt="P Marcom Logo" 
              className="h-8 w-auto object-contain drop-shadow-sm" 
            />
          </div>

          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-black text-sm sm:text-base md:text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-pink-600 to-indigo-600 dark:from-amber-300 dark:via-pink-400 dark:to-indigo-400">
                {t('heroTitle')}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5 hidden xs:block font-medium">
              {t('heroSubtitle')}
            </p>
          </div>
        </div>

        {/* Desktop & iPad Navigation */}
        <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
          
          {/* Visitor Counter (Đồng bộ Realtime Toàn Cầu) */}
          <div className="flex items-center space-x-1.5 px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950/60 dark:to-orange-950/60 border border-amber-300 dark:border-amber-800 rounded-full text-xs font-bold text-amber-900 dark:text-amber-300 shadow-xs">
            <Eye className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>{stats.totalVisits} {lang === 'vi' ? 'lượt xem' : 'visits'}</span>
          </div>

          {/* Admin Button */}
          {userIsAdmin && (
            <button
              onClick={() => navigateTo('admin')}
              className="flex items-center space-x-1 px-3.5 py-1.5 bg-gradient-to-r from-amber-400 via-pink-500 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all scale-105 transform hover:scale-110 active:scale-95"
            >
              <Crown className="w-3.5 h-3.5 fill-slate-950" />
              <span>{t('adminPortal')}</span>
            </button>
          )}

          <button
            onClick={() => navigateTo('selectTest')}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentScreen === 'selectTest'
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('home')}</span>
          </button>

          <button
            onClick={() => navigateTo('overviewDisc')}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentScreen === 'overviewDisc'
                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            <span>{t('discOverview')}</span>
          </button>

          <button
            onClick={() => navigateTo('overviewHolland')}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentScreen === 'overviewHolland'
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-purple-500" />
            <span>{t('hollandOverview')}</span>
          </button>

          <button
            onClick={() => navigateTo('overviewMbti')}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentScreen === 'overviewMbti'
                ? 'bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-pink-500" />
            <span>MBTI</span>
          </button>

          <button
            onClick={() => navigateTo('history')}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentScreen === 'history'
                ? 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <History className="w-3.5 h-3.5 text-slate-500" />
            <span>{t('history')}</span>
          </button>

          {/* User Status / Edit Profile Button OR 2 Distinct Auth Buttons */}
          {user ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenProfile}
                className="flex items-center space-x-1.5 px-3 py-1 bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-full border border-indigo-200 dark:border-slate-700 transition-all"
                title="Bấm để chỉnh sửa hồ sơ cá nhân"
              >
                <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span className="max-w-[100px] truncate">{user.fullName}</span>
                {userIsSuperAdmin && <span className="text-[10px] text-amber-500 font-bold">👑</span>}
              </button>

              <button
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition-colors"
                title={t('logout')}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* 2 DISTINCT SEPARATE BUTTONS FOR LOGIN & REGISTER */
            <div className="flex items-center space-x-2">
              <button
                onClick={handleLoginClick}
                className="flex items-center space-x-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-xl transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t('login')}</span>
              </button>

              <button
                onClick={handleRegisterClick}
                className="flex items-center space-x-1 px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow transition-all hover:scale-105"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{t('register')}</span>
              </button>
            </div>
          )}

          {/* Language Switcher Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all shadow-sm"
            title="Chuyển đổi Ngôn ngữ / Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-500" />
            <span>{lang === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN'}</span>
          </button>

          {/* Dark Mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>

        {/* Mobile & Tablet Controls */}
        <div className="flex items-center space-x-1.5 lg:hidden">
          
          <button
            onClick={toggleLanguage}
            className="px-2 py-1 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
          >
            {lang === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN'}
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3 shadow-xl">
          
          {/* User info on mobile */}
          {user ? (
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <button onClick={() => { onOpenProfile(); setMobileMenuOpen(false); }} className="flex items-center space-x-2 text-left">
                <UserCheck className="w-4 h-4 text-indigo-500 shrink-0" />
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center space-x-1">
                    <span>{user.fullName}</span>
                    {userIsSuperAdmin && <span>👑</span>}
                  </div>
                  <div className="text-[10px] text-indigo-600 dark:text-indigo-400">SĐT: {user.phone || 'Bấm để sửa'}</div>
                </div>
              </button>

              <button onClick={onLogout} className="text-xs text-rose-500 font-bold">
                {t('logout')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleLoginClick}
                className="py-2.5 bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span>{t('login')}</span>
              </button>

              <button
                onClick={handleRegisterClick}
                className="py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>{t('register')}</span>
              </button>
            </div>
          )}

          {userIsAdmin && (
            <button
              onClick={() => navigateTo('admin')}
              className="w-full py-2.5 bg-amber-500 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center space-x-2 shadow-sm"
            >
              <Crown className="w-4 h-4" />
              <span>{t('adminPortal')}</span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
            <button
              onClick={() => navigateTo('selectTest')}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-800 dark:text-slate-200 flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t('home')}</span>
            </button>

            <button
              onClick={() => navigateTo('history')}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-800 dark:text-slate-200 flex items-center justify-center space-x-1.5"
            >
              <History className="w-4 h-4 text-purple-500" />
              <span>{t('history')}</span>
            </button>

            <button
              onClick={() => navigateTo('overviewDisc')}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-800 dark:text-slate-200 flex items-center justify-center space-x-1.5"
            >
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>{t('discOverview')}</span>
            </button>

            <button
              onClick={() => navigateTo('overviewHolland')}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-800 dark:text-slate-200 flex items-center justify-center space-x-1.5"
            >
              <Layers className="w-4 h-4 text-purple-500" />
              <span>{t('hollandOverview')}</span>
            </button>
          </div>

          <div className="pt-2 text-center text-[11px] text-amber-700 dark:text-amber-400 font-semibold flex items-center justify-center space-x-1">
            <Eye className="w-3.5 h-3.5" />
            <span>{stats.totalVisits} {lang === 'vi' ? 'lượt truy cập hệ thống' : 'system visits'}</span>
          </div>

        </div>
      )}

    </header>
  );
}
