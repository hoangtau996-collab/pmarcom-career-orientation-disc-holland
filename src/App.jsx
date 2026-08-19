import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import TestSelector from './components/TestSelector';
import DiscOverview from './components/DiscOverview';
import HollandOverview from './components/HollandOverview';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import QuizScreen from './components/QuizScreen';
import HollandCardSort from './components/HollandCardSort';

// Code Splitting cho các trang nặng giúp tối ưu tốc độ tải trang chủ (FCP)
const ResultsDashboard = lazy(() => import('./components/ResultsDashboard'));
const HistoryModal = lazy(() => import('./components/HistoryModal'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const MbtiOverview = lazy(() => import('./components/MbtiOverview'));
const MbtiQuizScreen = lazy(() => import('./components/MbtiQuizScreen'));

import { calculateDiscResult } from './utils/discCalculator';
import { calculateHollandResult } from './utils/hollandCalculator';
import { calculateMbtiResult } from './utils/mbtiCalculator';
import { incrementVisitCount, incrementTestCount } from './utils/visitorCounter';
import { isAdmin } from './utils/userManager';
import { getTranslation } from './utils/translations';

// Static URL Hash mapping
const SCREEN_HASH_MAP = {
  'selectTest': '',
  'overviewDisc': '#/disc-overview',
  'overviewHolland': '#/holland-overview',
  'overviewMbti': '#/mbti-overview',
  'quizDisc': '#/quiz-disc',
  'quizHolland': '#/quiz-holland',
  'quizMbti': '#/quiz-mbti',
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
  '#/mbti-overview': 'overviewMbti',
  '#/quiz-disc': 'quizDisc',
  '#/quiz-holland': 'quizHolland',
  '#/quiz-mbti': 'quizMbti',
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

  const [testMode, setTestMode] = useState('combo'); // 'disc' | 'holland' | 'mbti' | 'combo'
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
  const [mbtiResult, setMbtiResult] = useState(null);

  // History
  const [historyList, setHistoryList] = useState(() => {
    const saved = localStorage.getItem('disc_test_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Save language setting
  useEffect(() => {
    localStorage.setItem('disc_lang', lang);
  }, [lang]);

  // Increment real visit count once per session
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('pmarcom_visited_session');
    if (!hasVisited) {
      sessionStorage.setItem('pmarcom_visited_session', 'true');
      incrementVisitCount();
    }
  }, []);

  // ROUTE PROTECTION GUARD: Bắt buộc đăng nhập để vào bài test
  useEffect(() => {
    if (!user && (currentScreen === 'quizDisc' || currentScreen === 'quizHolland' || currentScreen === 'quizMbti' || currentScreen === 'results')) {
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
      if (!user && (targetScreen === 'quizDisc' || targetScreen === 'quizHolland' || targetScreen === 'quizMbti' || targetScreen === 'results')) {
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
    if (mode === 'disc') {
      setCurrentScreen('quizDisc');
    } else if (mode === 'holland') {
      setCurrentScreen('quizHolland');
    } else if (mode === 'mbti') {
      setCurrentScreen('quizMbti');
    } else {
      // Combo mode starts with DISC
      setCurrentScreen('quizDisc');
    }
  };

  // Auth Success Callback
  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setShowAuthModal(false);

    if (userData.email.toLowerCase() === 'pmarcomvn@gmail.com') {
      if (window.confirm('Chào mừng Super Admin P Marcom! Bạn có muốn mở Trang Quản Trị Admin ngay không?')) {
        setCurrentScreen('admin');
        return;
      }
    }

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
  const handleCompleteDisc = (answers, durationFormatted = '') => {
    const dRes = calculateDiscResult(answers);
    if (durationFormatted) dRes.durationFormatted = durationFormatted;
    setDiscResult(dRes);

    if (testMode === 'combo') {
      setCurrentScreen('quizHolland');
    } else {
      incrementTestCount();
      saveAndShowResults(dRes, null, null);
    }
  };

  // Holland completed
  const handleCompleteHolland = (choices, durationFormatted = '') => {
    const hRes = calculateHollandResult(choices);
    if (durationFormatted) hRes.durationFormatted = durationFormatted;
    setHollandResult(hRes);

    incrementTestCount();
    saveAndShowResults(discResult, hRes, null);
  };

  // MBTI completed
  const handleCompleteMbti = (answers, durationFormatted = '') => {
    const mRes = calculateMbtiResult(answers);
    if (durationFormatted) mRes.durationFormatted = durationFormatted;
    setMbtiResult(mRes);

    incrementTestCount();
    saveAndShowResults(null, null, mRes);
  };

  const saveAndShowResults = (dRes, hRes, mRes = null) => {
    const historyItem = {
      id: Date.now(),
      date: new Date().toISOString(),
      user: user,
      discResult: dRes,
      hollandResult: hRes,
      mbtiResult: mRes
    };

    const updatedHistory = [historyItem, ...historyList];
    setHistoryList(updatedHistory);
    localStorage.setItem('disc_test_history', JSON.stringify(updatedHistory));

    setCurrentScreen('results');
  };

  const handleRetakeTest = () => {
    setDiscResult(null);
    setHollandResult(null);
    setMbtiResult(null);
    setCurrentScreen('selectTest');
  };

  const handleSelectHistoryItem = (item) => {
    setUser(item.user);
    setDiscResult(item.discResult);
    setHollandResult(item.hollandResult);
    setMbtiResult(item.mbtiResult);
    setCurrentScreen('results');
  };

  const handleClearHistory = () => {
    if (window.confirm(lang === 'vi' ? 'Bạn có chắc muốn xóa toàn bộ lịch sử test trên thiết bị này?' : 'Clear all test history on this device?')) {
      setHistoryList([]);
      localStorage.removeItem('disc_test_history');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* HEADER */}
      <Header
        user={user}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        lang={lang}
        setLang={setLang}
        onOpenLogin={() => handleOpenAuthModal('login')}
        onOpenRegister={() => handleOpenAuthModal('register')}
        onOpenProfile={() => setShowProfileModal(true)}
        onOpenHistory={() => setCurrentScreen('history')}
        onOpenAdmin={() => setCurrentScreen('admin')}
        onLogoClick={() => setCurrentScreen('selectTest')}
        onLogout={handleLogout}
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {currentScreen === 'selectTest' && (
          <TestSelector
            onSelectTestMode={handleSelectTestMode}
            user={user}
            lang={lang}
          />
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

        <Suspense fallback={
          <div className="py-16 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-bold text-slate-500">Đang tải bài test...</p>
          </div>
        }>
          {currentScreen === 'overviewMbti' && (
            <MbtiOverview onStartTest={() => handleSelectTestMode('mbti')} />
          )}

          {currentScreen === 'quizMbti' && user && (
            <MbtiQuizScreen
              onComplete={handleCompleteMbti}
              onBackToOverview={() => setCurrentScreen('selectTest')}
            />
          )}

          {currentScreen === 'results' && user && (
            <ResultsDashboard
              user={user}
              discResult={discResult}
              hollandResult={hollandResult}
              mbtiResult={mbtiResult}
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
              historyList={historyList}
              onSelectHistory={handleSelectHistoryItem}
              onClose={() => setCurrentScreen('selectTest')}
            />
          )}
        </Suspense>

      </main>

      {/* BILINGUAL FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center space-x-3">
            <img src="/logo-pmarcom.png" alt="P Marcom Logo" className="h-7 w-auto object-contain" />
            <span className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">P Marcom Career Platform</span>
          </div>
          <p>© 2026 P Marcom. Tất cả quyền được bảo lưu. Hệ thống đánh giá định hướng sự nghiệp DISC, Holland &amp; MBTI 16 Nhóm Tính Cách.</p>
        </div>
      </footer>

      {/* MODALS */}
      {showAuthModal && (
        <AuthModal
          initialTab={authTabMode}
          onSuccess={handleAuthSuccess}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {showProfileModal && user && (
        <ProfileModal
          user={user}
          onSave={handleSaveProfile}
          onClose={() => setShowProfileModal(false)}
        />
      )}

    </div>
  );
}
