import React, { useState, useEffect, useRef } from 'react';
import { Compass, BookOpen, Layers, History, Sun, Moon, Crown, LogIn, LogOut, Menu, X, User, UserPlus, Brain, ChevronDown, Home } from 'lucide-react';
import { isAdmin, isSuperAdmin, getAvatarUrl, getInitials } from '../utils/userManager';
import { getTranslation } from '../utils/translations';

function UserAvatar({ user, className }) {
  const url = getAvatarUrl(user);
  return url ? (
    <img src={url} alt="" referrerPolicy="no-referrer" className={`${className} rounded-full object-cover shrink-0`} />
  ) : (
    <span className={`${className} rounded-full shrink-0 bg-gradient-to-br from-teal-500 to-slate-800 text-white text-[11px] font-extrabold flex items-center justify-center`}>
      {getInitials(user?.fullName)}
    </span>
  );
}

// Đóng menu thả xuống khi bấm ra ngoài
function useClickOutside(ref, onOutside) {
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onOutside(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, onOutside]);
}

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testsMenuOpen, setTestsMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const testsRef = useRef(null);
  const accountRef = useRef(null);
  useClickOutside(testsRef, () => setTestsMenuOpen(false));
  useClickOutside(accountRef, () => setAccountMenuOpen(false));

  const userIsAdmin = isAdmin(user);
  const userIsSuperAdmin = isSuperAdmin(user);
  const vi = lang === 'vi';

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
    setTestsMenuOpen(false);
    setAccountMenuOpen(false);
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
    if (setLang) setLang(vi ? 'en' : 'vi');
  };

  const testPages = [
    { screen: 'overviewDisc', icon: BookOpen, label: 'DISC', desc: vi ? 'Phong cách hành vi & giao tiếp' : 'Behavioral & communication style' },
    { screen: 'overviewHolland', icon: Layers, label: 'Holland RIASEC', desc: vi ? 'Sở thích & môi trường nghề nghiệp' : 'Career interests & environments' },
    { screen: 'overviewMbti', icon: Brain, label: 'MBTI', desc: vi ? '16 nhóm tính cách' : '16 personality types' }
  ];
  const isTestPage = testPages.some(p => p.screen === currentScreen);

  const navItemClass = (active) =>
    `flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
      active
        ? 'bg-teal-50 text-teal-800 dark:bg-teal-950/70 dark:text-teal-300'
        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <button onClick={() => navigateTo('selectTest')} className="flex items-center gap-2.5 shrink-0 group" aria-label={vi ? 'Về trang chủ' : 'Go to home'}>
          <span className="h-10 px-2.5 bg-gradient-to-br from-teal-600 to-cyan-700 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <img src="/logo-pmarcom.png" alt="P Marcom" className="h-6 w-auto object-contain" />
          </span>
          <span className="text-left leading-tight">
            <span className="block font-black text-base text-slate-900 dark:text-white tracking-tight">P Marcom Career</span>
            <span className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 font-medium">
              {vi ? 'Định hướng nghề nghiệp' : 'Career orientation'}
            </span>
          </span>
        </button>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-1" aria-label={vi ? 'Điều hướng chính' : 'Main navigation'}>
          <button onClick={() => navigateTo('selectTest')} className={navItemClass(currentScreen === 'selectTest')}>
            {t('home')}
          </button>

          <div className="relative" ref={testsRef}>
            <button
              onClick={() => setTestsMenuOpen(!testsMenuOpen)}
              className={navItemClass(isTestPage)}
              aria-expanded={testsMenuOpen}
              aria-haspopup="true"
            >
              <span>{vi ? 'Các bài test' : 'Assessments'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${testsMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            {testsMenuOpen && (
              <div className="absolute left-0 top-full mt-2 w-72 p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl animate-fade-in">
                {testPages.map(({ screen, icon: Icon, label, desc }) => (
                  <button
                    key={screen}
                    onClick={() => navigateTo(screen)}
                    className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-colors ${
                      currentScreen === screen ? 'bg-teal-50 dark:bg-teal-950/60' : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="w-9 h-9 rounded-lg bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-slate-900 dark:text-white">{label}</span>
                      <span className="block text-xs text-slate-500 dark:text-slate-400">{desc}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => navigateTo('careerLibrary')} className={navItemClass(currentScreen === 'careerLibrary')}>
            {vi ? 'Thư viện ngành nghề' : 'Career library'}
          </button>

          <button onClick={() => navigateTo('history')} className={navItemClass(currentScreen === 'history')}>
            {t('history')}
          </button>
        </nav>

        {/* Desktop right side */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {userIsAdmin && (
            <button
              onClick={() => navigateTo('admin')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors"
            >
              <Crown className="w-4 h-4" />
              <span>Admin</span>
            </button>
          )}

          <button
            onClick={toggleLanguage}
            className="px-2.5 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={vi ? 'Switch to English' : 'Chuyển sang tiếng Việt'}
          >
            {vi ? 'EN' : 'VI'}
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={darkMode ? (vi ? 'Giao diện sáng' : 'Light mode') : (vi ? 'Giao diện tối' : 'Dark mode')}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {user ? (
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 hover:border-teal-400 dark:hover:border-teal-600 transition-colors"
                aria-expanded={accountMenuOpen}
                aria-haspopup="true"
              >
                <UserAvatar user={user} className="w-8 h-8" />
                <span className="max-w-[120px] truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{user.fullName}</span>
                {userIsSuperAdmin && <Crown className="w-3.5 h-3.5 text-amber-500" />}
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
              {accountMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-60 p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl animate-fade-in">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                    <div className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.fullName}</div>
                    <div className="text-xs text-slate-500 truncate">{user.email}</div>
                  </div>
                  <button onClick={() => { setAccountMenuOpen(false); onOpenProfile(); }} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <User className="w-4 h-4" /> {vi ? 'Hồ sơ cá nhân' : 'My profile'}
                  </button>
                  <button onClick={() => navigateTo('history')} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <History className="w-4 h-4" /> {t('history')}
                  </button>
                  <button onClick={() => { setAccountMenuOpen(false); onLogout(); }} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40" title={t('logout')}>
                    <LogOut className="w-4 h-4" /> {t('logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={handleLoginClick} className="px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                {t('login')}
              </button>
              <button onClick={handleRegisterClick} className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-teal-600 hover:bg-teal-500 shadow-sm transition-colors">
                {t('register')}
              </button>
            </>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 lg:hidden">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400"
            aria-label={darkMode ? 'Light mode' : 'Dark mode'}
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>
          {user && <UserAvatar user={user} className="w-8 h-8" />}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800"
            aria-label={mobileMenuOpen ? (vi ? 'Đóng menu' : 'Close menu') : (vi ? 'Mở menu' : 'Open menu')}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-4 py-4 space-y-4 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
          {user ? (
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl">
              <button onClick={() => { onOpenProfile(); setMobileMenuOpen(false); }} className="flex items-center gap-3 text-left min-w-0">
                <UserAvatar user={user} className="w-10 h-10" />
                <span className="min-w-0">
                  <span className="flex items-center gap-1 font-bold text-sm text-slate-900 dark:text-white">
                    <span className="truncate">{user.fullName}</span>
                    {userIsSuperAdmin && <Crown className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                  </span>
                  <span className="block text-xs text-teal-700 dark:text-teal-400">{vi ? 'Xem hồ sơ cá nhân' : 'View profile'}</span>
                </span>
              </button>
              <button onClick={() => { setMobileMenuOpen(false); onLogout(); }} className="p-2.5 text-red-500" aria-label={t('logout')}>
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button onClick={handleLoginClick} className="py-3 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-sm rounded-xl flex items-center justify-center gap-2">
                <LogIn className="w-4 h-4" /> {t('login')}
              </button>
              <button onClick={handleRegisterClick} className="py-3 bg-teal-600 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2">
                <UserPlus className="w-4 h-4" /> {t('register')}
              </button>
            </div>
          )}

          {userIsAdmin && (
            <button onClick={() => navigateTo('admin')} className="w-full py-3 bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 font-bold text-sm rounded-xl flex items-center justify-center gap-2">
              <Crown className="w-4 h-4" /> {t('adminPortal')}
            </button>
          )}

          <div className="space-y-1">
            {[
              { screen: 'selectTest', icon: Home, label: t('home') },
              ...testPages.map(p => ({ screen: p.screen, icon: p.icon, label: (vi ? 'Giới thiệu ' : 'About ') + p.label })),
              { screen: 'careerLibrary', icon: Compass, label: vi ? 'Thư viện ngành nghề' : 'Career library' },
              { screen: 'history', icon: History, label: t('history') }
            ].map(({ screen, icon: Icon, label }) => (
              <button
                key={screen}
                onClick={() => navigateTo(screen)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  currentScreen === screen
                    ? 'bg-teal-50 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" /> {label}
              </button>
            ))}
          </div>

          <button onClick={toggleLanguage} className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300">
            {vi ? 'Switch to English' : 'Chuyển sang tiếng Việt'}
          </button>
        </div>
      )}
    </header>
  );
}
