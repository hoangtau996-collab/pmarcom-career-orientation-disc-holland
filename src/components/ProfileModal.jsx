import React, { useState, useRef } from 'react';
import { User, Mail, Phone, Save, X, CheckCircle, Camera, Trash2, LogOut } from 'lucide-react';
import { saveUserProfile, authErrorMessage, getAvatarUrl, getInitials, resizeAvatarFile } from '../utils/userManager';

export default function ProfileModal({ user, onSaveProfile, onClose, onLogout }) {
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [category, setCategory] = useState(user?.category || 'student');
  const [photoURL, setPhotoURL] = useState(() => getAvatarUrl(user));
  const [errors, setErrors] = useState({});
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const handlePickAvatar = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, avatar: 'Vui lòng chọn file ảnh (JPG, PNG...) dưới 10MB' }));
      return;
    }
    try {
      setPhotoURL(await resizeAvatarFile(file));
      setErrors(prev => ({ ...prev, avatar: undefined }));
    } catch {
      setErrors(prev => ({ ...prev, avatar: 'Không đọc được ảnh, vui lòng thử ảnh khác' }));
    }
  };

  const handleSubmit = async (e) => {
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

    setSaving(true);
    let updatedData;
    try {
      updatedData = await saveUserProfile({ fullName, phone, category, photoURL });
    } catch (error) {
      console.error('Save profile error:', error);
      setErrors({ general: authErrorMessage(error.code) });
      setSaving(false);
      return;
    }

    setSavedSuccess(true);
    setTimeout(() => {
      onSaveProfile(updatedData);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm p-3 sm:p-4 animate-fade-in" role="dialog" aria-modal="true">
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

            {errors.general && (
              <p className="p-3 bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-300 text-xs font-bold rounded-xl border border-red-200 dark:border-red-900">
                {errors.general}
              </p>
            )}

            {/* Avatar */}
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="relative group w-20 h-20 shrink-0 rounded-full overflow-hidden ring-4 ring-indigo-100 dark:ring-indigo-950 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
                title="Đổi ảnh đại diện"
              >
                {photoURL ? (
                  <img src={photoURL} alt="Ảnh đại diện" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <span className="text-2xl font-extrabold text-white">{getInitials(fullName)}</span>
                )}
                <span className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </span>
              </button>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">Ảnh Đại Diện</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{photoURL ? 'Đổi ảnh' : 'Tải ảnh lên'}</span>
                  </button>
                  {photoURL && (
                    <button
                      type="button"
                      onClick={() => setPhotoURL('')}
                      className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 text-xs font-semibold transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa</span>
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">JPG, PNG — ảnh được cắt vuông tự động</p>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePickAvatar} className="hidden" />
            </div>
            {errors.avatar && <p className="text-[11px] text-red-500 font-medium">{errors.avatar}</p>}

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

            {/* Logout + Save Buttons */}
            <div className="pt-3 flex items-center justify-end space-x-3">
              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  className="mr-auto flex items-center space-x-1.5 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 text-xs font-bold transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng Xuất</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 text-xs font-semibold"
              >
                Đóng
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5 disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
    </div>
  );
}
