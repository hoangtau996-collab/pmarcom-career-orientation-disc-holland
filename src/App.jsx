import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import Header from './components/Header';
import TestSelector from './components/TestSelector';
import DiscOverview from './components/DiscOverview';
import HollandOverview from './components/HollandOverview';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import CategoryNoticeModal from './components/CategoryNoticeModal';
import QuizScreen from './components/QuizScreen';
import HollandCardSort from './components/HollandCardSort';
import ComboBreakModal from './components/ComboBreakModal';

// Code Splitting cho các trang nặng giúp tối ưu tốc độ tải trang chủ (FCP)
const ResultsDashboard = lazy(() => import('./components/ResultsDashboard'));
const HistoryModal = lazy(() => import('./components/HistoryModal'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const MbtiOverview = lazy(() => import('./components/MbtiOverview'));
const MbtiQuizScreen = lazy(() => import('./components/MbtiQuizScreen'));
const CareerLibrary = lazy(() => import('./components/CareerLibrary'));

import { calculateDiscResult } from './utils/discCalculator';
import { calculateHollandResult } from './utils/hollandCalculator';
import { calculateMbtiResult } from './utils/mbtiCalculator';
import { trackVisit, incrementTestCount } from './utils/visitorCounter';
import { isAdmin, isSuperAdmin, getCachedActiveUser, cacheActiveUser, fetchUserProfile } from './utils/userManager';
import { saveTestResult, fetchMyHistory, clearLocalHistory } from './utils/resultStore';
import { auth } from './config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getTranslation } from './utils/translations';

// Chế độ đang làm & kết quả DISC tạm của Combo (giữ qua lần tải lại trang)
const MODE_KEY = 'pmarcom_active_test_mode';
const COMBO_DISC_KEY = 'pmarcom_combo_disc_result';
const readJson = (key) => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };
const writeLS = (key, value) => { try { value == null ? localStorage.removeItem(key) : localStorage.setItem(key, value); } catch { /* ignore */ } };

// Static URL Hash mapping
const SCREEN_HASH_MAP = {
  'selectTest': '',
  'overviewDisc': '#/disc-overview',
  'overviewHolland': '#/holland-overview',
  'overviewMbti': '#/mbti-overview',
  'careerLibrary': '#/career-library',
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
  '#/career-library': 'careerLibrary',
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

  const [testMode, setTestMode] = useState(() => localStorage.getItem(MODE_KEY) || 'combo'); // 'disc' | 'holland' | 'mbti' | 'combo'
  const [showComboBreak, setShowComboBreak] = useState(false);
  const [reportDate, setReportDate] = useState(null);
  const [libraryCategory, setLibraryCategory] = useState('ALL'); // nhóm Holland lọc sẵn khi mở thư viện từ trang chủ
  const [pendingTestMode, setPendingTestMode] = useState('combo');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTabMode, setAuthTabMode] = useState('login'); // 'login' | 'register'
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCategoryNoticeModal, setShowCategoryNoticeModal] = useState(false);

  // Dark mode
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('disc_dark_mode') === 'true';
  });

  // Active user info
  const [user, setUser] = useState(() => getCachedActiveUser());

  // Người đứng tên trên báo cáo đang xem (khác user khi Admin mở báo cáo của thành viên)
  const [reportUser, setReportUser] = useState(null);

  // Firebase Auth đã khôi phục phiên chưa (cần để xác thực quyền Super Admin)
  const [authReady, setAuthReady] = useState(false);
  const [, setFirebaseEmail] = useState(null);

  const authModalOpenRef = useRef(false);
  useEffect(() => { authModalOpenRef.current = showAuthModal; }, [showAuthModal]);

  useEffect(() => {
    return onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseEmail(fbUser?.email || null); // re-render để Header/Admin tính lại quyền

      if (!fbUser) {
        setUser(null);
        cacheActiveUser(null);
        setAuthReady(true);
        return;
      }

      try {
        const profile = await fetchUserProfile(fbUser.uid);
        if (profile) {
          setUser(profile);
          cacheActiveUser(profile);
        } else if (!authModalOpenRef.current) {
          // Đã đăng nhập nhưng chưa có hồ sơ (vd. quay về từ redirect Google): yêu cầu bổ sung
          setAuthTabMode('confirm_google');
          setShowAuthModal(true);
        }
      } catch (err) {
        console.warn('Không tải được hồ sơ từ Firestore, dùng bản cache:', err);
      }
      setAuthReady(true);
    });
  }, []);

  // Rời thư viện ngành nghề thì bỏ bộ lọc nhóm đã chọn từ trang chủ
  useEffect(() => {
    if (currentScreen !== 'careerLibrary') setLibraryCategory('ALL');
  }, [currentScreen]);

  // Tải lịch sử làm test của tài khoản đang đăng nhập
  useEffect(() => {
    if (!user) {
      setHistoryList([]);
      return;
    }
    let cancelled = false;
    fetchMyHistory(user).then((list) => { if (!cancelled) setHistoryList(list); });
    return () => { cancelled = true; };
  }, [user?.uid]);

  const userIsAdmin = isAdmin(user);

  // Chặn truy cập Trang Quản Trị khi không có quyền
  useEffect(() => {
    if (currentScreen === 'admin' && authReady && !userIsAdmin) {
      setCurrentScreen('selectTest');
    }
  }, [currentScreen, authReady, userIsAdmin]);

  // Current test results
  const [discResult, setDiscResult] = useState(null);
  const [hollandResult, setHollandResult] = useState(null);
  const [mbtiResult, setMbtiResult] = useState(null);

  // History
  const [historyList, setHistoryList] = useState([]);

  // Save language setting
  useEffect(() => {
    localStorage.setItem('disc_lang', lang);
  }, [lang]);

  // Ghi nhận lượt truy cập thực tế (1 lượt / phiên, phiên hết hạn sau 30 phút không hoạt động)
  useEffect(() => {
    trackVisit();
  }, []);

  // ROUTE PROTECTION GUARD: Bắt buộc đăng nhập để vào bài test
  useEffect(() => {
    if (authReady && !user && (currentScreen === 'quizDisc' || currentScreen === 'quizHolland' || currentScreen === 'quizMbti' || currentScreen === 'results')) {
      setCurrentScreen('selectTest');
      setAuthTabMode('login');
      setShowAuthModal(true);
    }
  }, [currentScreen, user, authReady]);

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
    setPendingTestMode(mode);
    if (!user) {
      setAuthTabMode('login');
      setShowAuthModal(true);
    } else {
      setShowCategoryNoticeModal(true);
    }
  };

  const handleConfirmCategoryAndStart = (mode, updatedUserData) => {
    if (updatedUserData) {
      setUser(updatedUserData);
    }
    setShowCategoryNoticeModal(false);
    startTest(mode);
  };

  const startTest = (mode) => {
    setTestMode(mode);
    writeLS(MODE_KEY, mode);
    if (mode === 'combo' && readJson(COMBO_DISC_KEY)) {
      // Đã xong phần DISC của Combo trước đó: làm tiếp phần Holland
      setCurrentScreen('quizHolland');
    } else if (mode === 'disc') {
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
    cacheActiveUser(userData);
    setShowAuthModal(false);

    if (isSuperAdmin(userData)) {
      if (window.confirm('Chào mừng Super Admin P Marcom! Bạn có muốn mở Trang Quản Trị Admin ngay không?')) {
        setCurrentScreen('admin');
        return;
      }
    }

    // Sau khi login xong, mở popup xác nhận category trước khi làm test
    setShowCategoryNoticeModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
    if (auth.currentUser && !user) {
      signOut(auth).catch(() => {});
    }
  };

  // Save Profile Update
  const handleSaveProfile = (updatedUserData) => {
    setUser(updatedUserData);
    cacheActiveUser(updatedUserData);
    setShowProfileModal(false);
  };

  // Logout
  const handleLogout = () => {
    if (window.confirm(lang === 'vi' ? 'Bạn có chắc chắn muốn đăng xuất tài khoản?' : 'Are you sure you want to log out?')) {
      setUser(null);
      cacheActiveUser(null);
      setHistoryList([]);
      setShowProfileModal(false);
      signOut(auth).catch(() => {});
      setCurrentScreen('selectTest');
    }
  };

  // DISC completed
  const handleCompleteDisc = (answers, durationFormatted = '') => {
    const dRes = calculateDiscResult(answers);
    if (durationFormatted) dRes.durationFormatted = durationFormatted;
    setDiscResult(dRes);

    if (testMode === 'combo') {
      writeLS(COMBO_DISC_KEY, JSON.stringify(dRes));
      setShowComboBreak(true);
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
    const comboDisc = testMode === 'combo' ? (discResult || readJson(COMBO_DISC_KEY)) : null;
    saveAndShowResults(comboDisc, hRes, null);
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

    setHistoryList((prev) => [historyItem, ...prev]);
    saveTestResult(historyItem); // bản trên máy + Firestore (chạy nền)

    writeLS(MODE_KEY, null);
    writeLS(COMBO_DISC_KEY, null);
    setShowComboBreak(false);
    setDiscResult(dRes);
    setReportDate(historyItem.date);
    setReportUser(null);
    setCurrentScreen('results');
  };

  const handleRetakeTest = () => {
    setDiscResult(null);
    setHollandResult(null);
    setMbtiResult(null);
    setCurrentScreen('selectTest');
  };

  const handleSelectHistoryItem = (item) => {
    setReportUser(item.user || null);
    setReportDate(item.date || null);
    setDiscResult(item.discResult);
    setHollandResult(item.hollandResult);
    setMbtiResult(item.mbtiResult);
    setCurrentScreen('results');
  };

  const handleClearHistory = () => {
    if (window.confirm(lang === 'vi'
      ? 'Xóa bản lưu lịch sử trên thiết bị này? Các kết quả đã lưu vào tài khoản của bạn vẫn được giữ.'
      : 'Clear test history saved on this device? Results saved to your account are kept.')) {
      clearLocalHistory();
      if (user) fetchMyHistory(user).then(setHistoryList);
      else setHistoryList([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* HEADER */}
      <Header
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
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
            onOpenCareerLibrary={(category = 'ALL') => {
              setLibraryCategory(category);
              setCurrentScreen('careerLibrary');
              window.scrollTo({ top: 0 });
            }}
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

        {showComboBreak && currentScreen === 'quizHolland' && (
          <ComboBreakModal discResult={discResult} onContinue={() => setShowComboBreak(false)} />
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

          {currentScreen === 'careerLibrary' && (
            <CareerLibrary
              key={libraryCategory}
              initialCategory={libraryCategory}
              onStartTest={handleSelectTestMode}
              userCategory={user?.category || 'student'}
            />
          )}

          {currentScreen === 'quizMbti' && user && (
            <MbtiQuizScreen
              onComplete={handleCompleteMbti}
              onBackToOverview={() => setCurrentScreen('selectTest')}
            />
          )}

          {currentScreen === 'results' && user && (
            <ResultsDashboard
              user={reportUser || user}
              reportDate={reportDate}
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

          {currentScreen === 'admin' && userIsAdmin && (
            <AdminDashboard
              currentUser={user}
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
          onAuthSuccess={handleAuthSuccess}
          onClose={handleCloseAuthModal}
        />
      )}

      {showProfileModal && user && (
        <ProfileModal
          user={user}
          onSaveProfile={handleSaveProfile}
          onClose={() => setShowProfileModal(false)}
          onLogout={handleLogout}
        />
      )}

      {showCategoryNoticeModal && user && (
        <CategoryNoticeModal
          user={user}
          pendingTestMode={pendingTestMode}
          onConfirmStart={handleConfirmCategoryAndStart}
          onClose={() => setShowCategoryNoticeModal(false)}
        />
      )}

    </div>
  );
}
