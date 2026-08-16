import React, { useState, useEffect } from 'react';
import { HOLLAND_CARDS } from '../data/hollandCards';
import { Heart, HelpCircle, XCircle, ArrowLeft, ArrowRight, Sparkles, Layers, RotateCcw, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HollandCardSort({ user, onCompleteHolland, onBackToOverview }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardChoices, setCardChoices] = useState(() => {
    const saved = localStorage.getItem('holland_current_choices');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('holland_current_choices', JSON.stringify(cardChoices));
  }, [cardChoices]);

  const currentCard = HOLLAND_CARDS[currentIndex];
  const currentChoice = cardChoices[currentCard?.id];

  const handleChoice = (choiceType) => {
    setCardChoices((prev) => ({
      ...prev,
      [currentCard.id]: choiceType
    }));

    if (currentIndex < HOLLAND_CARDS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const completedCount = Object.keys(cardChoices).length;
  const progressPercent = Math.round((completedCount / HOLLAND_CARDS.length) * 100);

  const handleSubmit = () => {
    if (completedCount < HOLLAND_CARDS.length) {
      if (!window.confirm(`Bạn mới phân loại ${completedCount}/${HOLLAND_CARDS.length} thẻ bài. Bạn có muốn xem kết quả ngay?`)) {
        return;
      }
    }

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    localStorage.removeItem('holland_current_choices');
    onCompleteHolland(cardChoices);
  };

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-6 space-y-4 sm:space-y-6">
      
      {/* Top Header Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-center sm:text-left">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Trải Nghiệm Trật Tự Thẻ Bài Holland (Holland Card Sort)
          </span>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            Thẻ Bài {currentIndex + 1} / {HOLLAND_CARDS.length}
          </h2>
        </div>

        <div className="flex items-center space-x-3 text-xs font-semibold">
          <span className="px-3 py-1 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-full border border-purple-200 dark:border-purple-800">
            Đã xếp: {completedCount}/{HOLLAND_CARDS.length} thẻ ({progressPercent}%)
          </span>
          <button onClick={onBackToOverview} className="text-slate-500 hover:text-slate-700 underline">
            Thoát
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 h-2.5 rounded-full transition-all duration-300 shadow-sm"
          style={{ width: `${((currentIndex + 1) / HOLLAND_CARDS.length) * 100}%` }}
        ></div>
      </div>

      {/* CARD INTERFACE STACK */}
      <div className="relative">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-10 border-2 border-purple-200 dark:border-purple-900/60 shadow-2xl space-y-5 text-center transition-all transform active:scale-[0.99]">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4 text-purple-600" />
            <span>{currentCard.categoryName}</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {currentCard.title}
          </h3>

          <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            {currentCard.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1">
            {currentCard.tags.map((tag, idx) => (
              <span key={idx} className="px-2.5 py-1 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-[11px] sm:text-xs font-semibold rounded-lg border border-purple-200 dark:border-purple-900">
                #{tag}
              </span>
            ))}
          </div>

          {/* TOUCH-FRIENDLY ACTION BUTTONS (STACK ON MOBILE, GRID ON TABLET/DESKTOP) */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto">
            
            {/* LIKE */}
            <button
              onClick={() => handleChoice('like')}
              className={`min-h-[52px] p-3 sm:p-4 rounded-2xl border-2 font-extrabold text-xs sm:text-sm transition-all flex sm:flex-col items-center justify-center space-x-2 sm:space-x-0 sm:space-y-1 active:scale-95 ${
                currentChoice === 'like'
                  ? 'border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-102'
                  : 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white'
              }`}
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              <span>Thích / Rất Phù Hợp</span>
            </button>

            {/* UNSURE */}
            <button
              onClick={() => handleChoice('unsure')}
              className={`min-h-[52px] p-3 sm:p-4 rounded-2xl border-2 font-extrabold text-xs sm:text-sm transition-all flex sm:flex-col items-center justify-center space-x-2 sm:space-x-0 sm:space-y-1 active:scale-95 ${
                currentChoice === 'unsure'
                  ? 'border-amber-500 bg-amber-500 text-white shadow-lg shadow-amber-500/30 scale-102'
                  : 'border-amber-200 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-500 hover:text-white'
              }`}
            >
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              <span>Phân Vân</span>
            </button>

            {/* DISLIKE */}
            <button
              onClick={() => handleChoice('dislike')}
              className={`min-h-[52px] p-3 sm:p-4 rounded-2xl border-2 font-extrabold text-xs sm:text-sm transition-all flex sm:flex-col items-center justify-center space-x-2 sm:space-x-0 sm:space-y-1 active:scale-95 ${
                currentChoice === 'dislike'
                  ? 'border-rose-500 bg-rose-600 text-white shadow-lg shadow-rose-600/30 scale-102'
                  : 'border-rose-200 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-600 hover:text-white'
              }`}
            >
              <XCircle className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              <span>Không Phù Hợp</span>
            </button>

          </div>

        </div>
      </div>

      {/* Prev / Next / Submit Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className={`px-4 sm:px-5 py-3 rounded-xl border font-bold text-xs sm:text-sm flex items-center space-x-1.5 transition-all ${
            currentIndex === 0
              ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
              : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Thẻ trước</span>
        </button>

        {currentIndex === HOLLAND_CARDS.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-6 sm:px-8 py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-black rounded-xl shadow-lg shadow-purple-500/30 transition-all hover:scale-105 active:scale-95 flex items-center space-x-2 text-xs sm:text-base"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Xem Mã Holland Top 3</span>
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex((prev) => Math.min(HOLLAND_CARDS.length - 1, prev + 1))}
            className="px-4 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 flex items-center space-x-1.5"
          >
            <span>Thẻ tiếp theo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
}
