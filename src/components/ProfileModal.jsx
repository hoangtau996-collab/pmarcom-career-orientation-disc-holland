import React, { useState } from 'react';
import { User, Mail, Phone, GraduationCap, Briefcase, Save, X, ShieldCheck, CheckCircle } from 'lucide-react';
import { saveOrUpdateUser } from '../utils/userManager';

export default function ProfileModal({ user, onSaveProfile, onClose }) {
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [category, setCategory] = useState(user?.category || 'student');
  const [errors, setErrors] = useState({});
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Bắt buộc nhập Họ và tên';
    }

    if (!phone.trim() || phone.trim().length < 9) {
      newErrors.phone = 'Bắt buộc nhập Số điện thoại hợp lệ';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedData = saveOrUpdateUser({
      ...user,
      fullName: fullName.trim(),
      phone: phone.trim(),
      category: category
    });

    setSavedSuccess(true);
    setTimeout(() => {
      onSaveProfile(updatedData);
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Hồ Sơ Cá Nhân</h3>
              <p className="text-xs text-slate-500">Cập nhật thông tin thành viên của bạn</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        {savedSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Cập Nhật Thành Công!</h4>
            <p className="text-xs text-slate-500">Thông tin cá nhân của bạn đã được đồng bộ.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email (Read only) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase text-slate-500">
                Địa chỉ Email (Cố định)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/50 text-slate-500 text-xs font-medium"
                />
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                Họ và Tên (Bắt buộc)
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-bold"
                />
              </div>
              {errors.fullName && <p className="text-[11px] text-red-500 font-medium">{errors.fullName}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                Số Điện Thoại (Bắt buộc)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-bold"
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
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20'
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
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500/20'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600'
                  }`}
                >
                  💼 Người Đi Làm
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-3 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 text-xs font-semibold"
              >
                Đóng
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Lưu Thay Đổi</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
