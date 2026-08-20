import React, { useState } from 'react';
import { ShieldAlert, GraduationCap, Briefcase, CheckCircle2, ArrowRight, X, UserCheck } from 'lucide-react';
import { saveOrUpdateUser } from '../utils/userManager';

export default function CategoryNoticeModal({ user, pendingTestMode, onConfirmStart, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState(user?.category || 'student');

  const testModeName = {
    'disc': 'DISC (Nhóm Tính Cách)',
    'holland': 'Holland Code (Sở Thích Nghề Nghiệp)',
    'mbti': 'MBTI (16 Nhóm Tính Cách)',
    'combo': 'Combo Toàn Diện (DISC + Holland + MBTI)'
  }[pendingTestMode] || 'Bài Đánh Giá';

  const handleConfirm = () => {
    // Nếu người dùng thay đổi category so với user ban đầu, cập nhật lại trong userManager
    if (user && selectedCategory !== user.category) {
      const updatedUser = saveOrUpdateUser({
        ...user,
        category: selectedCategory
      });
      onConfirmStart(pendingTestMode, updatedUser);
    } else {
      onConfirmStart(pendingTestMode, user);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 sm:space-y-6 relative">
        
        {/* Decorative Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-indigo-600 to-teal-500"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="flex items-center space-x-3 pt-1">
          <div className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 shrink-0 border border-amber-300 dark:border-amber-800">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Lưu Ý Cài Đặt Cá Nhân Trước Khi Test
            </h3>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-bold">
              Bài test đang chọn: {testModeName}
            </p>
          </div>
        </div>

        {/* Notice Explanation Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 via-indigo-50/50 to-slate-50 dark:from-slate-800/80 dark:via-indigo-950/40 dark:to-slate-800/80 border border-indigo-100 dark:border-indigo-900/50 text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
          <p className="font-semibold text-slate-800 dark:text-slate-200">
            💡 <strong>Báo cáo kết quả và gợi ý định hướng sự nghiệp sẽ khác nhau hoàn toàn</strong> tùy thuộc vào đối tượng của bạn:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
            <li><strong>Sinh viên / Học sinh:</strong> Nhận gợi ý ngành học đại học, hoạt động câu lạc bộ, hướng thực tập và kỹ năng phát triển bản thân.</li>
            <li><strong>Người đi làm:</strong> Nhận gợi ý vị trí công việc, lộ trình thăng tiến, phong cách lãnh đạo, giải pháp stress & chứng chỉ chuyên môn.</li>
          </ul>
        </div>

        {/* Selection Options */}
        <div className="space-y-2">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
            <UserCheck className="w-4 h-4 text-indigo-600" />
            <span>Xác nhận nhóm đối tượng hiện tại của bạn:</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Student Option */}
            <div
              onClick={() => setSelectedCategory('student')}
              className={`cursor-pointer p-4 rounded-2xl border transition-all space-y-2 relative ${
                selectedCategory === 'student'
                  ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60 ring-2 ring-indigo-500/30'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-indigo-900 dark:text-indigo-200 flex items-center space-x-1.5">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  <span>🎓 Sinh Viên / Học Sinh</span>
                </span>
                {selectedCategory === 'student' && (
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Dành cho người đang đi học, tìm kiếm ngành trường và hướng đi thực tập.
              </p>
            </div>

            {/* Professional Option */}
            <div
              onClick={() => setSelectedCategory('professional')}
              className={`cursor-pointer p-4 rounded-2xl border transition-all space-y-2 relative ${
                selectedCategory === 'professional'
                  ? 'border-purple-600 bg-purple-50/70 dark:bg-purple-950/60 ring-2 ring-purple-500/30'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-purple-900 dark:text-purple-200 flex items-center space-x-1.5">
                  <Briefcase className="w-4 h-4 text-purple-600" />
                  <span>💼 Người Đi Làm</span>
                </span>
                {selectedCategory === 'professional' && (
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Dành cho người đã đi làm, muốn định hướng nhảy việc hoặc thăng tiến.
              </p>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            Hủy / Chọn Bài Test Khác
          </button>

          <button
            onClick={handleConfirm}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <span>Xác Nhận & Bắt Đầu Test</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </div>
  );
}
