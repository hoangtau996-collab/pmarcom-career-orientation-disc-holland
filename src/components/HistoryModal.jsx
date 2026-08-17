import React, { useState } from 'react';
import { History, Calendar, Trash2, ArrowRight, User, Award, Layers, Scale, Sparkles, X } from 'lucide-react';

export default function HistoryModal({ historyList, onSelectHistory, onClearHistory, onClose }) {
  const [showCompareModal, setShowCompareModal] = useState(false);

  const item1 = historyList[0];
  const item2 = historyList[1];

  const getDiscTrait = (item) => {
    const res = item?.discResult || item?.result;
    return res?.primaryTrait || 'N/A';
  };

  const getDiscName = (item) => {
    const res = item?.discResult || item?.result;
    return res?.profile?.name || 'N/A';
  };

  const getHollandCode = (item) => {
    return item?.hollandResult?.top3Code || 'N/A';
  };

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
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Lịch Sử Các Lần Test DISC & Holland</h3>
              <p className="text-xs text-slate-500">Xem lại và so sánh kết quả các bài đánh giá đã thực hiện</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {historyList.length >= 2 && (
              <button
                onClick={() => setShowCompareModal(true)}
                className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs rounded-xl border border-indigo-200 dark:border-indigo-800 flex items-center space-x-1"
              >
                <Scale className="w-3.5 h-3.5 text-indigo-600" />
                <span>So sánh 2 lần test</span>
              </button>
            )}

            {historyList.length > 0 && (
              <button
                onClick={onClearHistory}
                className="text-xs text-rose-500 hover:text-rose-600 flex items-center space-x-1 font-semibold p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa</span>
              </button>
            )}
          </div>
        </div>

        {/* List */}
        {historyList.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <p className="text-sm text-slate-500 dark:text-slate-400">Bạn chưa thực hiện bài test nào trước đây.</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {historyList.map((item, idx) => {
              const dRes = item.discResult || item.result;
              const hRes = item.hollandResult;

              return (
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

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(item.date).toLocaleDateString('vi-VN')}</span>
                      </span>

                      {dRes && (
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
                          <Award className="w-3.5 h-3.5" />
                          <span>DISC: Nhóm {dRes.primaryTrait} ({dRes.profile?.name})</span>
                        </span>
                      )}

                      {hRes && (
                        <span className="font-semibold text-purple-600 dark:text-purple-400 flex items-center space-x-1">
                          <Layers className="w-3.5 h-3.5" />
                          <span>Holland: {hRes.top3Code}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
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

      {/* MODAL SO SÁNH 2 LẦN TEST */}
      {showCompareModal && item1 && item2 && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                    So Sánh Sự Dịch Chuyển Giữa 2 Lần Test
                  </h4>
                  <p className="text-xs text-slate-500">Đối chiếu kết quả gần nhất và lần test trước đó</p>
                </div>
              </div>
              <button onClick={() => setShowCompareModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              
              {/* Lần test 1 (Gần nhất) */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 space-y-2">
                <span className="px-2.5 py-0.5 bg-indigo-600 text-white font-extrabold text-[10px] rounded-full uppercase">
                  Lần 1 (Gần nhất)
                </span>
                <p className="text-xs font-bold text-slate-500">
                  📅 {new Date(item1.date).toLocaleDateString('vi-VN')}
                </p>
                <div className="space-y-1 pt-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    DISC: <strong className="text-indigo-600">Nhóm {getDiscTrait(item1)}</strong>
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">{getDiscName(item1)}</p>
                  <p className="text-xs font-bold text-purple-600 pt-1">
                    Holland: {getHollandCode(item1)}
                  </p>
                </div>
              </div>

              {/* Lần test 2 (Trước đó) */}
              <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="px-2.5 py-0.5 bg-slate-600 text-white font-extrabold text-[10px] rounded-full uppercase">
                  Lần 2 (Trước đó)
                </span>
                <p className="text-xs font-bold text-slate-500">
                  📅 {new Date(item2.date).toLocaleDateString('vi-VN')}
                </p>
                <div className="space-y-1 pt-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    DISC: <strong className="text-indigo-600">Nhóm {getDiscTrait(item2)}</strong>
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">{getDiscName(item2)}</p>
                  <p className="text-xs font-bold text-purple-600 pt-1">
                    Holland: {getHollandCode(item2)}
                  </p>
                </div>
              </div>

            </div>

            {/* Analysis Note */}
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300 flex items-start space-x-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>Đánh giá biến đổi:</strong> {getDiscTrait(item1) === getDiscTrait(item2) 
                  ? 'Tính cách thiên bẩm của bạn duy trì ổn định cao qua các thời điểm.'
                  : `Có sự dịch chuyển phong cách hành vi từ nhóm ${getDiscTrait(item2)} sang nhóm ${getDiscTrait(item1)} do môi trường và kinh nghiệm công việc.`}
              </span>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Đóng So Sánh
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
