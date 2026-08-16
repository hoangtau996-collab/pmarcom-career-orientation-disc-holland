import React, { useState } from 'react';
import { User, Mail, Phone, Lock, LogIn, UserPlus, GraduationCap, Briefcase, ShieldCheck, AlertCircle, CheckCircle2, ArrowRight, Bell, Sparkles, Chrome } from 'lucide-react';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { saveOrUpdateUser, findRegisteredUserByEmail } from '../utils/userManager';

// Icon Google "G" 4 màu chuẩn thương hiệu Google
function GoogleGIcon({ className = "w-5 h-5 shrink-0" }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export default function AuthModal({ onAuthSuccess, onClose }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register' | 'confirm_google' | 'select_gmail_manual'
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('student'); // 'student' | 'professional'

  const [googleUser, setGoogleUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validate required fields
  const validateForm = () => {
    const newErrors = {};

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Vui lòng nhập Email hợp lệ';
    }

    if (!password || password.length < 6) {
      newErrors.password = 'Mật khẩu phải chứa ít nhất 6 ký tự';
    }

    if (activeTab === 'register') {
      if (!fullName.trim()) {
        newErrors.fullName = 'Bắt buộc nhập Họ và tên';
      }

      if (!phone.trim() || phone.trim().length < 9) {
        newErrors.phone = 'Bắt buộc nhập Số điện thoại hợp lệ';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Trigger Google Gmail Popup (Ghi nhớ thông tin nếu tài khoản đã tồn tại)
  const handleGoogleAuthClick = async () => {
    setLoading(true);
    setErrors({});

    try {
      googleProvider.setCustomParameters({
        prompt: 'select_account'
      });

      const result = await signInWithPopup(auth, googleProvider);
      
      if (result && result.user) {
        const gEmail = result.user.email || '';
        const gName = result.user.displayName || '';

        // KIỂM TRA TÀI KHOẢN ĐÃ ĐĂNG KÝ TRƯỚC ĐÓ HAY CHƯA
        const existingUser = findRegisteredUserByEmail(gEmail);
        
        if (existingUser) {
          // TỰ ĐỘNG ĐĂNG NHẬP NGAY & GHI NHỚ HỒ SƠ CŨ (KHÔNG CẦN NHẬP LẠI)
          localStorage.setItem('disc_active_user', JSON.stringify(existingUser));
          setLoading(false);
          onAuthSuccess(existingUser);
          return;
        }

        // LẦN ĐẦU ĐĂNG KÝ MỚI: CHUYỂN SANG BƯỚC ĐIỀN HỌ TÊN VÀ SĐT
        setGoogleUser({ email: gEmail, displayName: gName });
        setEmail(gEmail);
        setFullName(gName);
        
        setActiveTab('confirm_google');
        setLoading(false);
        return;
      }
    } catch (error) {
      console.warn('Firebase Popup error code:', error.code, error.message);
      
      // Nếu popup bị trình duyệt chặn, chuyển sang chế độ Nhập Gmail thủ công
      setActiveTab('select_gmail_manual');
      setLoading(false);
    }
  };

  // Complete Google Registration / Sign In Confirmation
  const handleConfirmGoogleAuth = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Bắt buộc nhập Họ và tên của bạn';
    }

    if (!phone.trim() || phone.trim().length < 9) {
      newErrors.phone = 'Bắt buộc nhập Số điện thoại liên hệ';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const userData = saveOrUpdateUser({
      fullName: fullName.trim(),
      email: googleUser?.email || email.trim(),
      phone: phone.trim(),
      category: category
    });

    onAuthSuccess(userData);
  };

  // Submit Form (Standard Email/Password Auth)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      if (activeTab === 'login') {
        // Kiểm tra xem email này đã đăng ký trước đó chưa
        const existingUser = findRegisteredUserByEmail(email);

        if (existingUser) {
          localStorage.setItem('disc_active_user', JSON.stringify(existingUser));
          setLoading(false);
          onAuthSuccess(existingUser);
          return;
        }

        const userData = saveOrUpdateUser({
          fullName: fullName || email.split('@')[0],
          email: email,
          phone: phone || '0988 888 888',
          category: category
        });

        setLoading(false);
        onAuthSuccess(userData);

      } else {
        const userData = saveOrUpdateUser({
          fullName: fullName,
          email: email,
          phone: phone,
          category: category
        });

        setLoading(false);
        onAuthSuccess(userData);
      }
    } catch (error) {
      console.error('Auth Error:', error);
      setErrors({ general: 'Đăng nhập/Đăng ký không thành công. Vui lòng thử lại!' });
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-6 sm:py-8">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
        
        {/* PROMINENT GUEST REQUIREMENT NOTICE BANNER */}
        <div className="p-3.5 bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-indigo-500/15 border-2 border-amber-400/60 dark:border-amber-500/50 rounded-2xl flex items-start space-x-3 shadow-sm animate-fade-in">
          <div className="p-1.5 rounded-xl bg-amber-500 text-slate-950 shrink-0 mt-0.5">
            <Bell className="w-4 h-4 animate-bounce" />
          </div>
          <div className="space-y-0.5">
            <h4 className="font-black text-xs text-amber-900 dark:text-amber-300 uppercase tracking-wider flex items-center space-x-1">
              <span>Yêu Cầu Đăng Nhập Hệ Thống</span>
              <Sparkles className="w-3 h-3 text-pink-500" />
            </h4>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-snug">
              Vui lòng hoàn thành <span className="text-indigo-600 dark:text-indigo-400 underline">Đăng Nhập</span> hoặc <span className="text-purple-600 dark:text-purple-400 underline">Đăng Ký</span> để làm bài test và nhận báo cáo kết quả chi tiết của bạn!
            </p>
          </div>
        </div>

        {/* Header Branding */}
        <div className="text-center space-y-1.5 pt-1">
          <img src="/logo-pmarcom.png" alt="P Marcom Logo" className="h-9 w-auto mx-auto object-contain" />
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {activeTab === 'confirm_google' 
              ? 'Xác Nhận Thông Tin Lần Đầu' 
              : activeTab === 'select_gmail_manual'
              ? 'Nhập Tài Khoản Gmail Đăng Nhập'
              : activeTab === 'login' 
              ? 'Đăng Nhập Tài Khoản' 
              : 'Đăng Ký Thành Viên Mới'}
          </h2>
          <p className="text-xs text-slate-500">
            {activeTab === 'confirm_google'
              ? 'Nhập Họ tên và Số điện thoại lần đầu để kích hoạt tài khoản'
              : activeTab === 'select_gmail_manual'
              ? 'Điền tài khoản Gmail cá nhân của bạn để đăng nhập nhanh'
              : activeTab === 'login' 
              ? 'Nhập email và mật khẩu hoặc dùng tài khoản Gmail' 
              : 'Điền đầy đủ thông tin để lưu báo cáo đánh giá của bạn'}
          </p>
        </div>

        {/* MANUAL GMAIL SELECTION FORM IF POPUP IS BLOCKED */}
        {activeTab === 'select_gmail_manual' ? (
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-2xl flex items-center space-x-3 text-xs text-slate-700 dark:text-slate-200 font-medium">
              <GoogleGIcon className="w-5 h-5 shrink-0" />
              <span>Vui lòng điền địa chỉ Gmail bạn muốn sử dụng để Đăng Nhập / Đăng Ký:</span>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                Địa chỉ Gmail Của Bạn (Bắt buộc)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="Ví dụ: nguyenvanan@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-bold"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold"
              >
                Hủy
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!email || !/\S+@\S+\.\S+/.test(email)) {
                    setErrors({ general: 'Vui lòng nhập định dạng Gmail hợp lệ (ví dụ: nguyenvanan@gmail.com)' });
                    return;
                  }
                  
                  const existingUser = findRegisteredUserByEmail(email);
                  if (existingUser) {
                    localStorage.setItem('disc_active_user', JSON.stringify(existingUser));
                    onAuthSuccess(existingUser);
                    return;
                  }

                  setGoogleUser({ email: email, displayName: email.split('@')[0] });
                  if (!fullName) setFullName(email.split('@')[0]);
                  setActiveTab('confirm_google');
                }}
                className="flex-1 py-3.5 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>Tiếp Tục Đăng Nhập</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : activeTab === 'confirm_google' ? (
          /* GOOGLE CONFIRMATION STEP (CHỈ HIỆN LẦN ĐẦU KHI TÀI KHOẢN MỚI TINH) */
          <form onSubmit={handleConfirmGoogleAuth} className="space-y-4">
            
            <div className="p-3.5 bg-blue-50/80 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-2xl flex items-center space-x-3">
              <GoogleGIcon className="w-6 h-6 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-slate-900 dark:text-white">Tài khoản Google / Gmail mới:</div>
                <div className="font-semibold text-blue-600 dark:text-blue-400 truncate">{googleUser?.email}</div>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                Họ và Tên Của Bạn (Bắt buộc)
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Ví dụ: Nguyễn Văn An"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-bold"
                />
              </div>
              {errors.fullName && <p className="text-[11px] text-red-500 font-medium">{errors.fullName}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                Số Điện Thoại Liên Hệ (Bắt buộc)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  placeholder="Ví dụ: 0988 888 888"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-bold"
                />
              </div>
              {errors.phone && <p className="text-[11px] text-red-500 font-medium">{errors.phone}</p>}
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                Nhóm Đối Tượng
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setCategory('student')}
                  className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                    category === 'student'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600'
                  }`}
                >
                  🎓 Sinh Viên / Học Sinh
                </button>
                <button
                  type="button"
                  onClick={() => setCategory('professional')}
                  className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                    category === 'professional'
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600'
                  }`}
                >
                  💼 Người Đi Làm
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold"
              >
                Quay lại
              </button>

              <button
                type="submit"
                className="flex-1 py-3.5 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>Xác Nhận &amp; Làm Test Ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        ) : (
          /* REGULAR LOGIN / REGISTER FORM */
          <>
            {/* Tab Switcher */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => { setActiveTab('login'); setErrors({}); }}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                  activeTab === 'login'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Đăng Nhập
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('register'); setErrors({}); }}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                  activeTab === 'register'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Đăng Ký Mới
              </button>
            </div>

            {/* OFFICIAL CHROME GOOGLE BUTTON WITH AUTOMATIC REMEMBRANCE */}
            <button
              type="button"
              onClick={handleGoogleAuthClick}
              disabled={loading}
              className="w-full py-3 px-4 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-slate-600 rounded-xl font-bold text-slate-700 dark:text-slate-100 text-xs sm:text-sm transition-all flex items-center justify-center space-x-3 shadow-sm hover:shadow active:scale-[0.98]"
            >
              <GoogleGIcon className="w-5 h-5 shrink-0" />
              <span>
                {activeTab === 'login' ? 'Log In with Google' : 'Sign Up with Google'}
              </span>
            </button>

            <div className="flex items-center space-x-2 my-1">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
              <span className="text-[11px] text-slate-400 font-medium">Hoặc bằng Email &amp; Mật khẩu</span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* General Error */}
              {errors.general && (
                <div className="p-3 bg-red-50 text-red-600 text-xs font-medium rounded-xl border border-red-200 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errors.general}</span>
                </div>
              )}

              {/* Full Name (Required on Register) */}
              {activeTab === 'register' && (
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                    Họ và Tên (Bắt buộc)
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Ví dụ: Nguyễn Văn An"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                    />
                  </div>
                  {errors.fullName && <p className="text-[11px] text-red-500 font-medium">{errors.fullName}</p>}
                </div>
              )}

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                  Địa chỉ Email (Gmail) (Bắt buộc)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Ví dụ: pmarcomvn@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>
                {errors.email && <p className="text-[11px] text-red-500 font-medium">{errors.email}</p>}
              </div>

              {/* Phone Number (Required on Register) */}
              {activeTab === 'register' && (
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                    Số Điện Thoại (Bắt buộc)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="Ví dụ: 0988 888 888"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-red-500 font-medium">{errors.phone}</p>}
                </div>
              )}

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                  Mật khẩu (Bắt buộc)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>
                {errors.password && <p className="text-[11px] text-red-500 font-medium">{errors.password}</p>}
              </div>

              {/* Category selection */}
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                  Đối tượng
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setCategory('student')}
                    className={`p-2 rounded-xl border text-center font-bold transition-all ${
                      category === 'student'
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600'
                    }`}
                  >
                    🎓 Sinh Viên / Học Sinh
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory('professional')}
                    className={`p-2 rounded-xl border text-center font-bold transition-all ${
                      category === 'professional'
                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600'
                    }`}
                  >
                    💼 Người Đi Làm
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold"
                  >
                    Hủy
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3.5 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all"
                >
                  {loading ? 'Đang xử lý...' : activeTab === 'login' ? 'Đăng Nhập Ngay' : 'Hoàn Tất Đăng Ký'}
                </button>
              </div>

            </form>
          </>
        )}

      </div>
    </div>
  );
}
