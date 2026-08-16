import React from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle2, AlertCircle } from 'lucide-react';

export default function QuestionCard({
  question,
  answer = { most: null, least: null },
  onSelectOption
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((opt) => {
          const isMost = answer.most === opt.type;
          const isLeast = answer.least === opt.type;

          return (
            <div
              key={opt.id}
              className={`p-5 rounded-2xl border-2 transition-all relative flex flex-col justify-between ${
                isMost
                  ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20 shadow-md'
                  : isLeast
                  ? 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 ring-2 ring-rose-500/20 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Option Text */}
              <div className="space-y-2 pb-4">
                <p className="font-semibold text-slate-900 dark:text-white text-base leading-snug">
                  {opt.text}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {opt.description}
                </p>
              </div>

              {/* Selection Control Buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                
                {/* Button MOST */}
                <button
                  type="button"
                  onClick={() => onSelectOption(question.id, opt.type, 'most')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                    isMost
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-100 hover:text-emerald-700 dark:hover:bg-emerald-900/50'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{isMost ? 'Đã Chọn: Đúng Nhất' : 'Đúng Nhất'}</span>
                </button>

                <div className="w-2"></div>

                {/* Button LEAST */}
                <button
                  type="button"
                  onClick={() => onSelectOption(question.id, opt.type, 'least')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                    isLeast
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-100 hover:text-rose-700 dark:hover:bg-rose-900/50'
                  }`}
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                  <span>{isLeast ? 'Đã Chọn: Ít Đúng Nhất' : 'Ít Đúng Nhất'}</span>
                </button>

              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
