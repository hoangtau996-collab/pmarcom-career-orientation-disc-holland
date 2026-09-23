import React from 'react';
import { CheckCircle2, ArrowRight, Layers, Clock } from 'lucide-react';
import { HOLLAND_CARDS } from '../data/hollandCards';

// Màn chuyển tiếp giữa phần 1 (DISC) và phần 2 (Holland) của bài Combo
export default function ComboBreakModal({ discResult, onContinue }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm p-4 flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden animate-rise-in">
        <div className="px-6 pt-8 pb-6 text-center bg-gradient-to-b from-teal-50 to-white dark:from-teal-950/40 dark:to-slate-900">
          <span className="mx-auto w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-600/30 animate-pop-in">
            <CheckCircle2 className="w-9 h-9" />
          </span>
          <div className="mt-4 text-sm font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">Hoàn thành phần 1/2</div>
          <h2 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">Bạn đã xong bài DISC</h2>
          {discResult?.profile?.name && (
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Nhóm nổi bật của bạn: <strong className="text-slate-900 dark:text-white">{discResult.profile.name}</strong>.
              Báo cáo đầy đủ sẽ có sau phần 2.
            </p>
          )}
        </div>

        <div className="px-6 pb-6 space-y-5">
          {/* Thanh tiến độ 2 phần */}
          <div className="flex items-center gap-2">
            <span className="flex-1 h-2 rounded-full bg-teal-600" />
            <span className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700" />
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
            <span className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Phần 2: Sở thích nghề nghiệp Holland</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{HOLLAND_CARDS.length} thẻ hoạt động — chọn Thích, Phân vân hoặc Không thích.</div>
              <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500"><Clock className="w-4 h-4" /> Khoảng 6 – 8 phút</div>
            </div>
          </div>

          <button
            onClick={onContinue}
            autoFocus
            className="w-full py-4 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-base transition-colors flex items-center justify-center gap-2"
          >
            Bắt đầu phần 2 <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
