import React from 'react';
import { History, Calendar, Trash2, ArrowRight, User, Award } from 'lucide-react';

export default function HistoryModal({ historyList, onSelectHistory, onClearHistory, onClose }) {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Lịch Sử Các Lần Test DISC</h3>
              <p className="text-xs text-slate-500">Xem lại các kết quả bài đánh giá đã thực hiện trên trình duyệt này</p>
            </div>
          </div>

          {historyList.length > 0 && (
            <button
              onClick={onClearHistory}
              className="text-xs text-rose-500 hover:text-rose-600 flex items-center space-x-1 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa lịch sử</span>
            </button>
          )}
        </div>

        {/* List */}
        {historyList.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <p className="text-sm text-slate-500 dark:text-slate-400">Bạn chưa thực hiện bài test DISC nào trước đây.</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {historyList.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onSelectHistory(item)}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 hover:border-indigo-500 dark:hover:border-indigo-500 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <User className="w-3.5 h-3.5 text-indigo-500" />
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{item.user?.fullName || 'Người test'}</span>
                    <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold rounded-full">
                      {item.user?.category === 'student' ? 'Sinh viên' : 'Người đi làm'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-xs text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(item.date).toLocaleDateString('vi-VN')}</span>
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      Primary: Nhóm {item.result.primaryTrait} ({item.result.profile.name})
                    </span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}
