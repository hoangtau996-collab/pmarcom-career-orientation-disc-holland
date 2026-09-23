import React, { useState } from 'react';
import { User, Mail, Phone, Lock, LogIn, UserPlus, GraduationCap, Briefcase, ShieldCheck, AlertCircle, CheckCircle2, ArrowRight, Bell, Sparkles, Chrome } from 'lucide-react';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, signInWithRedirect, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { fetchUserProfile, saveUserProfile, cacheActiveUser, isSuperAdminEmail, authErrorMessage } from '../utils/userManager';

const ADMIN_GOOGLE_ONLY_MSG = 'Tài khoản quản trị chỉ được đăng nhập bằng nút Google để xác thực chính chủ.';

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

export default function AuthModal({ initialTab = 'login', onAuthSuccess, onClose }) {
  // initialTab = 'confirm_google': đã đăng nhập Firebase (vd. quay về từ redirect Google) nhưng chưa có hồ sơ
  const pendingUser = initialTab === 'confirm_google' ? auth.currentUser : null;

  const [activeTab, setActiveTab] = useState(initialTab); // 'login' | 'register' | 'confirm_google'

  // Form fields
  const [email, setEmail] = useState(pendingUser?.email || '');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(pendingUser?.displayName || '');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('student'); // 'student' | 'professional'

  const [googleUser, setGoogleUser] = useState(pendingUser ? { email: pendingUser.email, displayName: pendingUser.displayName } : null);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);

  // Validate required fields (BẮT BUỘC ĐIỀN ĐẦY ĐỦ TẤT CẢ THÔNG TIN MỚI ĐƯỢC ĐĂNG KÝ)
  const validateForm = () => {
    const newErrors = {};

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Vui lòng nhập Email / Gmail hợp lệ';
    }

    if (!password || password.length < 6) {
      newErrors.password = 'Mật khẩu phải chứa ít nhất 6 ký tự';
    }

    if (activeTab === 'register') {
      if (!fullName.trim() || fullName.trim().length < 2) {
        newErrors.fullName = 'Bắt buộc nhập đầy đủ Họ và tên (ít nhất 2 ký tự)';
      }

      const cleanPhone = phone.trim().replace(/\s+/g, '');
      if (!cleanPhone || !/^[0-9]{9,11}$/.test(cleanPhone)) {
        newErrors.phone = 'Bắt buộc nhập Số điện thoại hợp lệ (9 - 11 chữ số)';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      newErrors.general = 'Vui lòng điền đầy đủ tất cả các thông tin bắt buộc trước khi xác nhận!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Sau khi Firebase Auth thành công: tải hồ sơ từ Firestore, chưa có hồ sơ thì yêu cầu bổ sung
  const finishSignIn = async (fbUser) => {
    const profile = await fetchUserProfile(fbUser.uid);
    if (profile) {
      cacheActiveUser(profile);
      onAuthSuccess(profile);
      return;
    }
    setGoogleUser({ email: fbUser.email, displayName: fbUser.displayName || '' });
    setEmail(fbUser.email || '');
    setFullName((prev) => prev || fbUser.displayName || '');
    setErrors({});
    setActiveTab('confirm_google');
  };

  // Đăng nhập / Đăng ký bằng Google (tài khoản mới sẽ được yêu cầu bổ sung Họ tên & SĐT)
  const handleGoogleAuthClick = async () => {
    setLoading(true);
    setErrors({});
    setNotice('');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      await finishSignIn(result.user);
    } catch (error) {
      console.warn('Google sign-in error:', error.code, error.message);

      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        // Người dùng tự đóng popup: giữ nguyên form
      } else if (error.code === 'auth/popup-blocked') {
        // Trình duyệt chặn popup: chuyển sang đăng nhập bằng chuyển trang, App xử lý khi quay lại
        await signInWithRedirect(auth, googleProvider);
        return;
      } else {
        setErrors({ general: authErrorMessage(error.code) });
      }
    } finally {
      setLoading(false);
    }
  };

  // Hoàn tất hồ sơ lần đầu sau khi đăng nhập Google (BẮT BUỘC ĐIỀN ĐẦY ĐỦ)
  const handleConfirmGoogleAuth = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Bắt buộc nhập đầy đủ Họ và tên của bạn';
    }

    const cleanPhone = phone.trim().replace(/\s+/g, '');
    if (!cleanPhone || !/^[0-9]{9,11}$/.test(cleanPhone)) {
      newErrors.phone = 'Bắt buộc nhập Số điện thoại liên hệ hợp lệ (9-11 số)';
    }

    if (Object.keys(newErrors).length > 0) {
      newErrors.general = 'Vui lòng điền đầy đủ Họ tên và Số điện thoại trước khi hoàn tất đăng ký!';
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const profile = await saveUserProfile({ fullName, phone, category });
      onAuthSuccess(profile);
    } catch (error) {
      console.error('Save profile error:', error);
      setErrors({ general: authErrorMessage(error.code) });
    } finally {
      setLoading(false);
    }
  };

  // Submit Form (Email & Mật khẩu qua Firebase Auth)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotice('');
    if (!validateForm()) return;

    if (isSuperAdminEmail(email)) {
      setErrors({ general: ADMIN_GOOGLE_ONLY_MSG });
      return;
    }

    setLoading(true);

    try {
      if (activeTab === 'login') {
        const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
        await finishSignIn(cred.user);
      } else {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
        const profile = await saveUserProfile({ fullName, phone, category });
        onAuthSuccess(profile);
      }
    } catch (error) {
      console.error('Auth Error:', error.code, error.message);
      setErrors({ general: authErrorMessage(error.code) });
    } finally {
      setLoading(false);
    }
  };

  // Gửi email đặt lại mật khẩu tới địa chỉ đang nhập
  const handleForgotPassword = async () => {
    setNotice('');
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: 'Nhập email đã đăng ký vào ô Email trước, rồi bấm "Quên mật khẩu?"' });
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setErrors({});
      setNotice(`Nếu ${email.trim()} đã đăng ký, bạn sẽ nhận được email hướng dẫn đặt lại mật khẩu trong vài phút (kiểm tra cả mục Spam).`);
    } catch (error) {
      setErrors({ general: authErrorMessage(error.code) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm p-3 sm:p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      onKeyDown={(e) => { if (e.key === 'Escape' && onClose) onClose(); }}
    >
    <div className="max-w-md mx-auto py-6 sm:py-8">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
        
        {/* PROMINENT GUEST REQUIREMENT NOTICE BANNER */}
        <div className="p-3.5 bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-indigo-500/15 border-2 border-amber-400/60 dark:border-amber-500/50 rounded-2xl flex items-start space-x-3 shadow-sm">
          <div className="p-1.5 rounded-xl bg-amber-500 text-slate-950 shrink-0 mt-0.5">
            <Bell className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <h4 className="font-black text-xs text-amber-900 dark:text-amber-300 uppercase tracking-wider flex items-center space-x-1">
              <span>Yêu Cầu Đăng Nhập Hệ Thống</span>
              <Sparkles className="w-3 h-3 text-pink-500" />
            </h4>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-snug">
              Vui lòng điền <span className="text-indigo-600 dark:text-indigo-400 underline">đầy đủ thông tin</span> để hoàn tất Đăng Nhập hoặc Đăng Ký và quay về Trang chủ tự do làm bài test!
            </p>
          </div>
        </div>

        {/* Header Branding */}
        <div className="text-center space-y-1.5 pt-1">
          <img src="/logo-pmarcom.png" alt="P Marcom Logo" className="h-9 w-auto mx-auto object-contain" />
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {activeTab === 'confirm_google' 
              ? 'Xác Nhận Thông Tin Lần Đầu' 
              : activeTab === 'login' 
              ? 'Đăng Nhập Tài Khoản' 
              : 'Đăng Ký Thành Viên Mới'}
          </h2>
          <p className="text-xs text-slate-500">
            {activeTab === 'confirm_google'
              ? 'Yêu cầu nhập đầy đủ Họ tên và Số điện thoại để hoàn tất kích hoạt'
              : activeTab === 'login' 
              ? 'Sử dụng tài khoản Google hoặc Gmail đã đăng ký' 
              : 'Yêu cầu điền đầy đủ thông tin bên dưới để tạo tài khoản mới'}
          </p>
        </div>

        {activeTab === 'confirm_google' ? (
          /* GOOGLE CONFIRMATION STEP (BẮT BUỘC ĐIỀN ĐẦY ĐỦ THÔNG TIN) */
          <form onSubmit={handleConfirmGoogleAuth} className="space-y-4">
            
            {errors.general && (
              <div className="p-3 bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-300 text-xs font-bold rounded-xl border border-red-200 dark:border-red-900 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.general}</span>
              </div>
            )}

            <div className="p-3.5 bg-blue-50/80 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-2xl flex items-center space-x-3">
              <GoogleGIcon className="w-6 h-6 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-slate-900 dark:text-white">Tài khoản đăng nhập:</div>
                <div className="font-semibold text-blue-600 dark:text-blue-400 truncate">{googleUser?.email}</div>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                Họ và Tên Của Bạn <span className="text-red-500 font-bold">*</span>
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
              {errors.fullName && <p className="text-[11px] text-red-500 font-bold">{errors.fullName}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                Số Điện Thoại Liên Hệ <span className="text-red-500 font-bold">*</span>
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
              {errors.phone && <p className="text-[11px] text-red-500 font-bold">{errors.phone}</p>}
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                Nhóm Đối Tượng <span className="text-red-500 font-bold">*</span>
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
                onClick={onClose}
                className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold"
              >
                Hủy
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3.5 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-60"
              >
                <span>{loading ? 'Đang lưu hồ sơ...' : 'Xác Nhận & Hoàn Tất'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        ) : (
          /* REGULAR LOGIN / REGISTER FORM WITH SEPARATE FLOWS */
          <>
            {/* Tab Switcher */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => { setActiveTab('login'); setErrors({}); }}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                  activeTab === 'login'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>1. Đăng Nhập</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('register'); setErrors({}); }}
                className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                  activeTab === 'register'
                    ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>2. Đăng Ký Mới</span>
              </button>
            </div>

            {/* CLEAR SEPARATE GOOGLE BUTTON BASED ON TAB */}
            {activeTab === 'login' ? (
              <button
                type="button"
                onClick={handleGoogleAuthClick}
                disabled={loading}
                className="w-full py-3 px-4 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700/80 border-2 border-indigo-200 dark:border-indigo-800 rounded-xl font-extrabold text-indigo-600 dark:text-indigo-300 text-xs sm:text-sm transition-all flex items-center justify-center space-x-3 shadow-sm hover:shadow active:scale-[0.98]"
              >
                <GoogleGIcon className="w-5 h-5 shrink-0" />
                <span>🔑 Đăng Nhập Nhanh bằng Google (Gmail)</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleGoogleAuthClick}
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800 hover:bg-purple-100 dark:hover:bg-slate-700 border-2 border-purple-300 dark:border-purple-700 rounded-xl font-extrabold text-purple-700 dark:text-purple-300 text-xs sm:text-sm transition-all flex items-center justify-center space-x-3 shadow-sm hover:shadow active:scale-[0.98]"
              >
                <GoogleGIcon className="w-5 h-5 shrink-0" />
                <span>✨ Đăng Ký Mới bằng Google (Gmail)</span>
              </button>
            )}

            <div className="flex items-center space-x-2 my-1">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
              <span className="text-[11px] text-slate-400 font-medium">Hoặc bằng Email &amp; Mật khẩu</span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* General Error */}
              {errors.general && (
                <div className="p-3 bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-300 text-xs font-bold rounded-xl border border-red-200 dark:border-red-900 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errors.general}</span>
                </div>
              )}

              {notice && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-xl border border-emerald-200 dark:border-emerald-900 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{notice}</span>
                </div>
              )}

              {/* Full Name (Required on Register) */}
              {activeTab === 'register' && (
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                    Họ và Tên <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Ví dụ: Nguyễn Văn An"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-bold"
                    />
                  </div>
                  {errors.fullName && <p className="text-[11px] text-red-500 font-bold">{errors.fullName}</p>}
                </div>
              )}

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                  Địa chỉ Email / Gmail <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Ví dụ: pmarcomvn@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-bold"
                  />
                </div>
                {errors.email && <p className="text-[11px] text-red-500 font-bold">{errors.email}</p>}
              </div>

              {/* Phone Number (Required on Register) */}
              {activeTab === 'register' && (
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                    Số Điện Thoại Liên Hệ <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="Ví dụ: 0988 888 888"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-bold"
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-red-500 font-bold">{errors.phone}</p>}
                </div>
              )}

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                  Mật khẩu <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    autoComplete={activeTab === 'login' ? 'current-password' : 'new-password'}
                    placeholder={activeTab === 'register' ? 'Tối thiểu 6 ký tự' : '••••••••'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-bold"
                  />
                </div>
                {errors.password && <p className="text-[11px] text-red-500 font-bold">{errors.password}</p>}
                {activeTab === 'login' && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={loading}
                    className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Quên mật khẩu?
                  </button>
                )}
              </div>

              {/* Category selection */}
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                  Đối tượng <span className="text-red-500 font-bold">*</span>
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
                  className={`flex-1 py-3.5 px-6 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all ${
                    activeTab === 'login'
                      ? 'bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-blue-500'
                      : 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500'
                  }`}
                >
                  {loading ? 'Đang xử lý...' : activeTab === 'login' ? '🔑 Đăng Nhập & Quay Về Trang Chủ' : '✨ Đăng Ký & Quay Về Trang Chủ'}
                </button>
              </div>

            </form>
          </>
        )}

      </div>
    </div>
    </div>
  );
}
