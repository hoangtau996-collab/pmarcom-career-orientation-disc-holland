import React, { useState, useEffect } from 'react';
import { Compass, BookOpen, Layers, History, Sun, Moon, Sparkles, UserCheck, Eye, Crown, LogIn, LogOut, Menu, X, User } from 'lucide-react';
import { getVisitorStats } from '../utils/visitorCounter';
import { isAdmin, isSuperAdmin } from '../utils/userManager';

export default function Header({ currentScreen, setCurrentScreen, darkMode, setDarkMode, user, onOpenAuth, onLogout, onOpenProfile }) {
  const [stats, setStats] = useState({ totalVisits: '15,420', totalTests: '8,930' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setStats(getVisitorStats());
  }, [currentScreen]);

  const userIsAdmin = isAdmin(user);
  const userIsSuperAdmin = isSuperAdmin(user);

  const navigateTo = (screen) => {
    setCurrentScreen(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* P Marcom Logo + Title */}
        <div 
          onClick={() => navigateTo('selectTest')}
          className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group shrink-0"
        >
          <div className="h-9 sm:h-10 px-1.5 sm:px-2 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-xl border border-amber-300/40 dark:border-amber-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
            <img 
              src="/logo-pmarcom.png" 
              alt="P Marcom Logo" 
              className="h-7 sm:h-8 w-auto object-contain drop-shadow-sm" 
            />
          </div>

          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-sm sm:text-base md:text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                Định Hướng Nghề Nghiệp
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5 hidden xs:block">
              Hệ Thống DISC & Holland Code (RIASEC)
            </p>
          </div>
        </div>

        {/* Desktop & iPad Navigation */}
        <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
          
          {/* Visitor Counter */}
          <div className="flex items-center space-x-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/60 rounded-full text-xs font-semibold text-amber-800 dark:text-amber-300">
            <Eye className="w-3.5 h-3.5 text-amber-600" />
            <span>{stats.totalVisits} lượt xem</span>
          </div>

          {/* Admin Button */}
          {userIsAdmin && (
            <button
              onClick={() => navigateTo('admin')}
              className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all scale-105"
            >
              <Crown className="w-3.5 h-3.5 fill-slate-950" />
              <span>Quản Trị Admin</span>
            </button>
          )}

          <button
            onClick={() => navigateTo('overviewDisc')}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              currentScreen === 'overviewDisc'
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Giới thiệu DISC</span>
          </button>

          <button
            onClick={() => navigateTo('overviewHolland')}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              currentScreen === 'overviewHolland'
                ? 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Giới thiệu Holland</span>
          </button>

          <button
            onClick={() => navigateTo('history')}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              currentScreen === 'history'
                ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Lịch sử</span>
          </button>

          {/* User Status / Edit Profile Button */}
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
                title="Đăng xuất"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors"
            >
              <LogIn className="w-3.5 h-3.5 text-indigo-500" />
              <span>Đăng Nhập</span>
            </button>
          )}

          {/* CTA Test */}
          {currentScreen !== 'quizDisc' && currentScreen !== 'quizHolland' && currentScreen !== 'results' && (
            <button
              onClick={() => navigateTo('selectTest')}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 hover:scale-105 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Vào Test</span>
            </button>
          )}

          {/* Dark Mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>

        {/* Mobile & Tablet Controls */}
        <div className="flex items-center space-x-2 lg:hidden">
          
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
                Đăng xuất
              </button>
            </div>
          ) : (
            <button
              onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Đăng Nhập / Đăng Ký</span>
            </button>
          )}

          {userIsAdmin && (
            <button
              onClick={() => navigateTo('admin')}
              className="w-full py-2.5 bg-amber-500 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center space-x-2 shadow-sm"
            >
              <Crown className="w-4 h-4" />
              <span>Trang Quản Trị Admin</span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
            <button
              onClick={() => navigateTo('selectTest')}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-800 dark:text-slate-200 flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>Chọn Bài Test</span>
            </button>

            <button
              onClick={() => navigateTo('history')}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-800 dark:text-slate-200 flex items-center justify-center space-x-1.5"
            >
              <History className="w-4 h-4 text-purple-500" />
              <span>Lịch Sử Test</span>
            </button>

            <button
              onClick={() => navigateTo('overviewDisc')}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-800 dark:text-slate-200 flex items-center justify-center space-x-1.5"
            >
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>Giới Thiệu DISC</span>
            </button>

            <button
              onClick={() => navigateTo('overviewHolland')}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-800 dark:text-slate-200 flex items-center justify-center space-x-1.5"
            >
              <Layers className="w-4 h-4 text-purple-500" />
              <span>Giới Thiệu Holland</span>
            </button>
          </div>

          <div className="pt-2 text-center text-[11px] text-amber-700 dark:text-amber-400 font-semibold flex items-center justify-center space-x-1">
            <Eye className="w-3.5 h-3.5" />
            <span>{stats.totalVisits} lượt truy cập hệ thống</span>
          </div>

        </div>
      )}

    </header>
  );
}
