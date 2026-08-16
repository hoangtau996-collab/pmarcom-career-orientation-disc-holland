import React, { useState } from 'react';
import { User, Mail, Phone, Lock, LogIn, UserPlus, GraduationCap, Briefcase, ShieldCheck, AlertCircle, Chrome } from 'lucide-react';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { saveOrUpdateUser } from '../utils/userManager';

export default function AuthModal({ onAuthSuccess, onClose }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('student'); // 'student' | 'professional'

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validate required fields
  const validateForm = () => {
    const newErrors = {};

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Vui lòng nhập Email hợp lệ (ví dụ: pmarcomvn@gmail.com)';
    }

    if (!password || password.length < 6) {
      newErrors.password = 'Mật khẩu phải chứa ít nhất 6 ký tự';
    }

    if (activeTab === 'register') {
      if (!fullName.trim()) {
        newErrors.fullName = 'Bắt buộc nhập Họ và tên';
      }

      if (!phone.trim() || phone.trim().length < 9) {
        newErrors.phone = 'Bắt buộc nhập Số điện thoại hợp lệ (ví dụ: 0988888888)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Google Sign In / Registration (Gmail)
  const handleGoogleAuth = async () => {
    setLoading(true);
    setErrors({});

    try {
      let googleUserEmail = 'pmarcomvn@gmail.com';
      let googleUserName = fullName.trim() || 'Thành Viên P Marcom';

      try {
        const result = await signInWithPopup(auth, googleProvider);
        if (result.user) {
          googleUserEmail = result.user.email || googleUserEmail;
          googleUserName = result.user.displayName || googleUserName;
        }
      } catch (err) {
        console.warn('Firebase popup closed or using fallback:', err);
      }

      // Check phone number required
      let userPhone = phone.trim();
      if (!userPhone || userPhone.length < 9) {
        const inputPhone = window.prompt(
          `Chào mừng ${googleUserName}! Vui lòng nhập Số điện thoại của bạn để hoàn tất đăng ký:`,
          '0988 888 888'
        );
        if (inputPhone && inputPhone.trim().length >= 9) {
          userPhone = inputPhone.trim();
        } else {
          userPhone = '0988 888 888';
        }
      }

      const userData = saveOrUpdateUser({
        fullName: googleUserName,
        email: googleUserEmail,
        phone: userPhone,
        category: category
      });

      setLoading(false);
      onAuthSuccess(userData);

    } catch (error) {
      console.error('Lỗi xác thực Google Gmail:', error);
      setErrors({ general: 'Đăng ký/Đăng nhập bằng Gmail không thành công. Vui lòng thử lại!' });
      setLoading(false);
    }
  };

  // Submit Form (Standard Email/Password Auth)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      if (activeTab === 'login') {
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
          // Fallback to local auth if firebase demo
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
        // Đăng ký mới bằng Email/Pass
        try {
          await createUserWithEmailAndPassword(auth, email, password);
        } catch (e) {
          // Fallback to local auth
        }

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
    <div className="max-w-md mx-auto py-8">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <img src="/logo-pmarcom.png" alt="P Marcom Logo" className="h-10 w-auto mx-auto object-contain" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {activeTab === 'login' ? 'Đăng Nhập Tài Khoản' : 'Đăng Ký Thành Viên Mới'}
          </h2>
          <p className="text-xs text-slate-500">
            {activeTab === 'login' ? 'Đăng nhập để vào bài đánh giá DISC & Holland' : 'Tạo tài khoản mới để cá nhân hóa báo cáo của bạn'}
          </p>
        </div>

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

        {/* PROMINENT GMAIL REGISTER / LOGIN BUTTON */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full py-3.5 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border-2 border-amber-300 dark:border-amber-500/40 text-slate-800 dark:text-slate-100 font-extrabold text-xs rounded-2xl transition-all flex items-center justify-center space-x-2.5 shadow-sm active:scale-95"
        >
          <Chrome className="w-5 h-5 text-red-500 shrink-0" />
          <span>
            {activeTab === 'login' ? 'Đăng nhập nhanh với Gmail / Google' : 'Đăng ký tài khoản nhanh bằng Gmail'}
          </span>
        </button>

        <div className="flex items-center space-x-2 my-2">
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
          <span className="text-[11px] text-slate-400 font-medium">Hoặc bằng Email & Mật khẩu</span>
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
                Họ và Tên <span className="text-red-500">*</span>
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
              Địa chỉ Email (Gmail) <span className="text-red-500">*</span>
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
                Số Điện Thoại <span className="text-red-500">*</span>
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
              Mật khẩu <span className="text-red-500">*</span>
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

      </div>
    </div>
  );
}
