import React, { useState } from 'react';
import { User, Mail, Phone, GraduationCap, Briefcase, Target, ArrowRight, ShieldCheck } from 'lucide-react';

export default function UserRegisterModal({ onSubmitUser, onCancel }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('student'); // 'student' | 'professional'
  const [goal, setGoal] = useState('Dự định sự nghiệp & phát triển bản thân');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập Họ và tên của bạn';
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Vui lòng nhập định dạng Email hợp lệ (ví dụ: name@example.com)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const userData = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      category,
      goal,
      registeredAt: new Date().toISOString()
    };

    onSubmitUser(userData);
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        
        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center font-bold">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Đăng Ký Thông Tin Người Test
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Thông tin giúp cá nhân hóa báo cáo và gợi ý nghề nghiệp chuẩn xác dành riêng cho bạn
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Đối tượng */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Bạn là ai? <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCategory('student')}
                className={`p-3.5 rounded-2xl border text-left flex items-center space-x-3 transition-all ${
                  category === 'student'
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 shadow-sm ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className={`p-2 rounded-xl ${category === 'student' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm">Sinh Viên / Học Sinh</div>
                  <div className="text-[11px] opacity-75">Định hướng ngành & học tập</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setCategory('professional')}
                className={`p-3.5 rounded-2xl border text-left flex items-center space-x-3 transition-all ${
                  category === 'professional'
                    ? 'border-purple-600 bg-purple-50/70 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 shadow-sm ring-2 ring-purple-500/20'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className={`p-2 rounded-xl ${category === 'professional' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm">Người Đi Làm</div>
                  <div className="text-[11px] opacity-75">Sự nghiệp & Phong cách sếp</div>
                </div>
              </button>
            </div>
          </div>

          {/* Họ và tên */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Họ và tên của bạn <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Ví dụ: Nguyễn Văn An"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors({ ...errors, fullName: null });
                }}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              />
            </div>
            {errors.fullName && <p className="text-xs text-red-500 font-medium">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Địa chỉ Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                placeholder="Ví dụ: nguyenvanan@gmail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              />
            </div>
            {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
          </div>

          {/* Số điện thoại (Tùy chọn) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Số điện thoại <span className="text-slate-400 font-normal text-[11px]">(Không bắt buộc)</span>
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="tel"
                placeholder="Ví dụ: 0912 345 678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              />
            </div>
          </div>

          {/* Mục tiêu */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Mục tiêu chính khi làm bài test
            </label>
            <div className="relative">
              <Target className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm appearance-none"
              >
                <option value="Dự định sự nghiệp & phát triển bản thân">Dự định sự nghiệp & phát triển bản thân</option>
                <option value="Định hướng chọn ngành nghề phù hợp">Định hướng chọn ngành nghề phù hợp</option>
                <option value="Cải thiện kỹ năng giao tiếp & làm việc nhóm">Cải thiện kỹ năng giao tiếp & làm việc nhóm</option>
                <option value="Tìm kiếm phong cách quản lý & lãnh đạo phù hợp">Tìm kiếm phong cách quản lý & lãnh đạo phù hợp</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Thông tin của bạn được bảo mật tuyệt đối và lưu trữ nội bộ trên trình duyệt.</span>
          </div>

          {/* Buttons */}
          <div className="pt-4 flex items-center space-x-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold transition-colors"
              >
                Quay lại
              </button>
            )}
            <button
              type="submit"
              className="flex-1 py-3.5 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 text-base"
            >
              <span>Vào Bài Test (28 Câu)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
