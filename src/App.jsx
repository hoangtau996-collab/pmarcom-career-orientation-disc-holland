import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TestSelector from './components/TestSelector';
import DiscOverview from './components/DiscOverview';
import HollandOverview from './components/HollandOverview';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import QuizScreen from './components/QuizScreen';
import HollandCardSort from './components/HollandCardSort';
import ResultsDashboard from './components/ResultsDashboard';
import HistoryModal from './components/HistoryModal';
import AdminDashboard from './components/AdminDashboard';

import { calculateDiscResult } from './utils/discCalculator';
import { calculateHollandResult } from './utils/hollandCalculator';
import { incrementVisitCount, incrementTestCount } from './utils/visitorCounter';
import { isAdmin } from './utils/userManager';
import { getTranslation } from './utils/translations';

// Static URL Hash mapping
const SCREEN_HASH_MAP = {
  'selectTest': '',
  'overviewDisc': '#/disc-overview',
  'overviewHolland': '#/holland-overview',
  'quizDisc': '#/quiz-disc',
  'quizHolland': '#/quiz-holland',
  'results': '#/results',
  'history': '#/history',
  'admin': '#/admin'
};

const HASH_SCREEN_MAP = {
  '': 'selectTest',
  '#': 'selectTest',
  '#/': 'selectTest',
  '#/select-test': 'selectTest',
  '#/disc-overview': 'overviewDisc',
  '#/holland-overview': 'overviewHolland',
  '#/quiz-disc': 'quizDisc',
  '#/quiz-holland': 'quizHolland',
  '#/results': 'results',
  '#/history': 'history',
  '#/admin': 'admin'
};

export default function App() {
  const [currentScreen, setCurrentScreenState] = useState(() => {
    const initialHash = window.location.hash || '';
    return HASH_SCREEN_MAP[initialHash] || 'selectTest';
  }); 

  // Language state: 'vi' | 'en'
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('disc_lang') || 'vi';
  });

  const [testMode, setTestMode] = useState('combo'); // 'disc' | 'holland' | 'combo'
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTabMode, setAuthTabMode] = useState('login'); // 'login' | 'register'
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Dark mode
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('disc_dark_mode') === 'true';
  });

  // Active user info
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('disc_active_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Current test results
  const [discResult, setDiscResult] = useState(null);
  const [hollandResult, setHollandResult] = useState(null);

  // History
  const [historyList, setHistoryList] = useState(() => {
    const saved = localStorage.getItem('disc_test_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Save language setting
  useEffect(() => {
    localStorage.setItem('disc_lang', lang);
  }, [lang]);

  // Increment real visit count once per session / mount
  useEffect(() => {
    incrementVisitCount();
  }, []);

  // ROUTE PROTECTION GUARD: Bắt buộc đăng nhập để vào bài test
  useEffect(() => {
    if (!user && (currentScreen === 'quizDisc' || currentScreen === 'quizHolland' || currentScreen === 'results')) {
      setCurrentScreen('selectTest');
      setAuthTabMode('login');
      setShowAuthModal(true);
    }
  }, [currentScreen, user]);

  // Open Auth modal with specific tab ('login' or 'register')
  const handleOpenAuthModal = (tab = 'login') => {
    setAuthTabMode(tab);
    setShowAuthModal(true);
  };

  // Sync screen state with URL (Cleans # for Home / selectTest)
  const setCurrentScreen = (screen) => {
    setCurrentScreenState(screen);
    const hash = SCREEN_HASH_MAP[screen];
    
    if (screen === 'selectTest') {
      if (window.location.hash !== '') {
        window.history.pushState(null, '', window.location.pathname);
      }
    } else {
      if (window.location.hash !== hash) {
        window.history.pushState(null, '', hash);
      }
    }
  };

  // Listen to browser Back/Forward buttons and direct URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '';
      const targetScreen = HASH_SCREEN_MAP[hash] || 'selectTest';
      
      // Strict guard for direct link visitors
      if (!user && (targetScreen === 'quizDisc' || targetScreen === 'quizHolland' || targetScreen === 'results')) {
        setCurrentScreenState('selectTest');
        setAuthTabMode('login');
        setShowAuthModal(true);
      } else {
        setCurrentScreenState(targetScreen);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [user]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('disc_dark_mode', darkMode);
  }, [darkMode]);

  const t = (key, params) => getTranslation(lang, key, params);

  // Request authentication before test
  const handleSelectTestMode = (mode) => {
    setTestMode(mode);
    if (!user) {
      setAuthTabMode('login');
      setShowAuthModal(true);
    } else {
      startTest(mode);
    }
  };

  const startTest = (mode) => {
    if (mode === 'disc' || mode === 'combo') {
      setCurrentScreen('quizDisc');
    } else {
      setCurrentScreen('quizHolland');
    }
  };

  // Auth Success Callback: QUAY VỀ TRANG CHỦ ĐỂ NGƯỜI DÙNG TỰ CHỌN BÀI TEST
  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setShowAuthModal(false);

    if (userData.email.toLowerCase() === 'pmarcomvn@gmail.com') {
      if (window.confirm('Chào mừng Super Admin P Marcom! Bạn có muốn mở Trang Quản Trị Admin ngay không?')) {
        setCurrentScreen('admin');
        return;
      }
    }

    // Quay về Trang chủ để người dùng tự do lựa chọn bài test
    setCurrentScreen('selectTest');
  };

  // Save Profile Update
  const handleSaveProfile = (updatedUserData) => {
    setUser(updatedUserData);
    setShowProfileModal(false);
  };

  // Logout
  const handleLogout = () => {
    if (window.confirm(lang === 'vi' ? 'Bạn có chắc chắn muốn đăng xuất tài khoản?' : 'Are you sure you want to log out?')) {
      setUser(null);
      localStorage.removeItem('disc_active_user');
      setCurrentScreen('selectTest');
    }
  };

  // DISC completed
  const handleCompleteDisc = (answers) => {
    const dRes = calculateDiscResult(answers);
    setDiscResult(dRes);

    if (testMode === 'combo') {
      setCurrentScreen('quizHolland');
    } else {
      incrementTestCount();
      saveAndShowResults(dRes, null);
    }
  };

  // Holland completed
  const handleCompleteHolland = (choices) => {
    const hRes = calculateHollandResult(choices);
    setHollandResult(hRes);

    incrementTestCount();
    saveAndShowResults(discResult, hRes);
  };

  const saveAndShowResults = (dRes, hRes) => {
    const historyItem = {
      id: Date.now(),
      date: new Date().toISOString(),
      user: user,
      discResult: dRes,
      hollandResult: hRes
    };

    const updatedHistory = [historyItem, ...historyList];
    setHistoryList(updatedHistory);
    localStorage.setItem('disc_test_history', JSON.stringify(updatedHistory));

    setCurrentScreen('results');
  };

  const handleRetakeTest = () => {
    setDiscResult(null);
    setHollandResult(null);
    setCurrentScreen('selectTest');
  };

  const handleSelectHistoryItem = (item) => {
    setUser(item.user);
    setDiscResult(item.discResult);
    setHollandResult(item.hollandResult);
    setCurrentScreen('results');
  };

  const handleClearHistory = () => {
    if (window.confirm(lang === 'vi' ? 'Bạn có chắc chắn muốn xóa toàn bộ lịch sử test?' : 'Are you sure you want to clear test history?')) {
      setHistoryList([]);
      localStorage.removeItem('disc_test_history');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      <Header
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        lang={lang}
        setLang={setLang}
        user={user}
        onOpenAuth={handleOpenAuthModal}
        onOpenProfile={() => setShowProfileModal(true)}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* AUTH MODAL POPUP WITH SEPARATE TAB MODES */}
        {showAuthModal && (
          <AuthModal
            initialTab={authTabMode}
            onAuthSuccess={handleAuthSuccess}
            onClose={() => setShowAuthModal(false)}
          />
        )}

        {/* PROFILE EDIT MODAL */}
        {showProfileModal && user && (
          <ProfileModal
            user={user}
            onSaveProfile={handleSaveProfile}
            onClose={() => setShowProfileModal(false)}
          />
        )}

        {currentScreen === 'selectTest' && (
          <TestSelector onSelectTestMode={handleSelectTestMode} user={user} lang={lang} />
        )}

        {currentScreen === 'overviewDisc' && (
          <DiscOverview onStartTest={() => handleSelectTestMode('disc')} />
        )}

        {currentScreen === 'overviewHolland' && (
          <HollandOverview onStartTest={() => handleSelectTestMode('holland')} />
        )}

        {currentScreen === 'quizDisc' && user && (
          <QuizScreen
            user={user}
            onCompleteQuiz={handleCompleteDisc}
            onBackToOverview={() => setCurrentScreen('selectTest')}
          />
        )}

        {currentScreen === 'quizHolland' && user && (
          <HollandCardSort
            user={user}
            onCompleteHolland={handleCompleteHolland}
            onBackToOverview={() => setCurrentScreen('selectTest')}
          />
        )}

        {currentScreen === 'results' && user && (
          <ResultsDashboard
            user={user}
            discResult={discResult}
            hollandResult={hollandResult}
            onRetakeTest={handleRetakeTest}
          />
        )}

        {currentScreen === 'history' && (
          <HistoryModal
            historyList={historyList}
            onSelectHistory={handleSelectHistoryItem}
            onClearHistory={handleClearHistory}
            onClose={() => setCurrentScreen('selectTest')}
          />
        )}

        {currentScreen === 'admin' && (
          <AdminDashboard
            currentUser={user}
            onClose={() => setCurrentScreen('selectTest')}
          />
        )}

      </main>

      {/* BILINGUAL FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center space-x-3">
            <img src="/logo-pmarcom.png" alt="P Marcom Logo" className="h-7 w-auto object-contain" />
            <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">P Marcom Career Platform</span>
          </div>
          <p>{t('footerCopyright')}</p>
          <p className="text-[11px] text-slate-400">{t('footerRights')}</p>
        </div>
      </footer>

    </div>
  );
}
