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
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 dark:bg-slate-950/95 border-b border-teal-100 dark:border-slate-800 transition-colors shadow-sm">
      {/* Top Colorful Accent Line: Xanh ngọc - Cyan - Xanh Navi */}
      <div className="h-1 w-full bg-gradient-to-r from-teal-400 via-cyan-500 to-slate-900"></div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* P Marcom Logo + Title */}
        <div 
          onClick={() => navigateTo('selectTest')}
          className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group shrink-0"
        >
          <div className="h-10 px-3 bg-gradient-to-r from-teal-600 to-cyan-700 rounded-2xl border-2 border-teal-300 dark:border-teal-400 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
            <img 
              src="/logo-pmarcom.png" 
              alt="P Marcom Logo" 
              className="h-7 w-auto object-contain filter brightness-110 drop-shadow" 
            />
          </div>

          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-black text-sm sm:text-base md:text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-cyan-600 to-slate-900 dark:from-teal-300 dark:via-cyan-300 dark:to-white">
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
          
          {/* Visitor Counter */}
          <div className="flex items-center space-x-1.5 px-3 py-1 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/60 dark:to-cyan-950/60 border border-teal-200 dark:border-teal-800 rounded-full text-xs font-bold text-teal-900 dark:text-teal-300 shadow-xs shrink-0 whitespace-nowrap">
            <Eye className="w-3.5 h-3.5 text-teal-600 animate-pulse shrink-0" />
            <span className="whitespace-nowrap">{stats.totalVisits} {lang === 'vi' ? 'lượt xem' : 'visits'}</span>
          </div>

          {/* Admin Button */}
          {userIsAdmin && (
            <button
              onClick={() => navigateTo('admin')}
              className="flex items-center space-x-1 px-3.5 py-1.5 bg-gradient-to-r from-teal-500 via-cyan-600 to-slate-900 hover:from-teal-600 hover:to-slate-950 text-white font-black text-xs rounded-xl shadow-md transition-all scale-105 transform hover:scale-110 active:scale-95"
            >
              <Crown className="w-3.5 h-3.5 fill-teal-300" />
              <span>{t('adminPortal')}</span>
            </button>
          )}

          <button
            onClick={() => navigateTo('selectTest')}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentScreen === 'selectTest'
                ? 'bg-teal-100 text-teal-900 dark:bg-teal-950 dark:text-teal-300'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-500" />
            <span>{t('home')}</span>
          </button>

          <button
            onClick={() => navigateTo('overviewDisc')}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentScreen === 'overviewDisc'
                ? 'bg-cyan-100 text-cyan-900 dark:bg-cyan-950 dark:text-cyan-300'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
            <span>{t('discOverview')}</span>
          </button>

          <button
            onClick={() => navigateTo('overviewHolland')}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentScreen === 'overviewHolland'
                ? 'bg-teal-100 text-teal-900 dark:bg-teal-950 dark:text-teal-300'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-teal-600" />
            <span>{t('hollandOverview')}</span>
          </button>

          <button
            onClick={() => navigateTo('overviewMbti')}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentScreen === 'overviewMbti'
                ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-emerald-600" />
            <span>MBTI</span>
          </button>

          <button
            onClick={() => navigateTo('careerLibrary')}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentScreen === 'careerLibrary'
                ? 'bg-gradient-to-r from-teal-500 to-indigo-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-indigo-500" />
            <span>Thư Viện Ngành Nghề</span>
          </button>

          <button
            onClick={() => navigateTo('history')}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentScreen === 'history'
                ? 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <History className="w-3.5 h-3.5 text-slate-600" />
            <span>{t('history')}</span>
          </button>

          {/* User Status / Edit Profile Button OR 2 Distinct Auth Buttons */}
          {user ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenProfile}
                className="flex items-center space-x-1.5 px-3 py-1 bg-teal-50 hover:bg-teal-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-full border border-teal-200 dark:border-slate-700 transition-all"
                title="Bấm để chỉnh sửa hồ sơ cá nhân"
              >
                <UserCheck className="w-3.5 h-3.5 text-teal-600" />
                <span className="max-w-[100px] truncate">{user.fullName}</span>
                {userIsSuperAdmin && <span className="text-[10px] text-amber-500 font-bold">👑</span>}
              </button>

              <button
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl transition-colors"
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
                className="flex items-center space-x-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-teal-700 dark:text-teal-300 text-xs font-bold rounded-xl transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t('login')}</span>
              </button>

              <button
                onClick={handleRegisterClick}
                className="flex items-center space-x-1 px-3.5 py-1.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs rounded-xl shadow transition-all hover:scale-105"
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
            <Globe className="w-3.5 h-3.5 text-teal-600" />
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
                <UserCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center space-x-1">
                    <span>{user.fullName}</span>
                    {userIsSuperAdmin && <span>👑</span>}
                  </div>
                  <div className="text-[10px] text-teal-600 dark:text-teal-400">SĐT: {user.phone || 'Bấm để sửa'}</div>
                </div>
              </button>

              <button onClick={onLogout} className="text-xs text-red-500 font-bold">
                {t('logout')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleLoginClick}
                className="py-2.5 bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span>{t('login')}</span>
              </button>

              <button
                onClick={handleRegisterClick}
                className="py-2.5 bg-teal-600 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>{t('register')}</span>
              </button>
            </div>
          )}

          {userIsAdmin && (
            <button
              onClick={() => navigateTo('admin')}
              className="w-full py-2.5 bg-gradient-to-r from-teal-500 to-slate-900 text-white font-black text-xs rounded-xl flex items-center justify-center space-x-2 shadow-sm"
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
              <Sparkles className="w-4 h-4 text-teal-500" />
              <span>{t('home')}</span>
            </button>

            <button
              onClick={() => navigateTo('history')}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-800 dark:text-slate-200 flex items-center justify-center space-x-1.5"
            >
              <History className="w-4 h-4 text-slate-600" />
              <span>{t('history')}</span>
            </button>

            <button
              onClick={() => navigateTo('overviewDisc')}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-800 dark:text-slate-200 flex items-center justify-center space-x-1.5"
            >
              <BookOpen className="w-4 h-4 text-cyan-600" />
              <span>{t('discOverview')}</span>
            </button>

            <button
              onClick={() => navigateTo('overviewHolland')}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-800 dark:text-slate-200 flex items-center justify-center space-x-1.5"
            >
              <Layers className="w-4 h-4 text-teal-600" />
              <span>{t('hollandOverview')}</span>
            </button>

            <button
              onClick={() => navigateTo('careerLibrary')}
              className="col-span-2 p-2.5 bg-gradient-to-r from-teal-600 to-indigo-600 text-white rounded-xl font-bold flex items-center justify-center space-x-1.5 shadow-sm"
            >
              <Compass className="w-4 h-4" />
              <span>Thư Viện Ngành Nghề</span>
            </button>
          </div>

          <div className="pt-2 text-center text-[11px] text-teal-700 dark:text-teal-400 font-semibold flex items-center justify-center space-x-1 shrink-0 whitespace-nowrap">
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">{stats.totalVisits} {lang === 'vi' ? 'lượt truy cập hệ thống' : 'system visits'}</span>
          </div>

        </div>
      )}

    </header>
  );
}
