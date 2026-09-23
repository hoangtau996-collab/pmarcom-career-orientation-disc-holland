import React, { useState, useEffect, useRef } from 'react';
import { HOLLAND_CARDS } from '../data/hollandCards';
import { Heart, HelpCircle, XCircle, ArrowLeft, ArrowRight, Sparkles, Layers, AlertTriangle, X, ChevronRight, Clock, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HollandCardSort({ user, onCompleteHolland, onBackToOverview }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const advanceTimer = useRef(null);
  const [showUnansweredModal, setShowUnansweredModal] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [cardChoices, setCardChoices] = useState(() => {
    const saved = localStorage.getItem('holland_current_choices');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('holland_current_choices', JSON.stringify(cardChoices));
  }, [cardChoices]);

  // Live Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
      clearTimeout(advanceTimer.current);
    };
  }, []);

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const getDurationText = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    if (mins === 0) return `${remainingSecs} giây`;
    return `${mins} phút ${remainingSecs} giây`;
  };

  const currentCard = HOLLAND_CARDS[currentIndex];
  const currentChoice = cardChoices[currentCard?.id];

  const goTo = (idx) => {
    clearTimeout(advanceTimer.current);
    setCurrentIndex(Math.max(0, Math.min(HOLLAND_CARDS.length - 1, idx)));
  };

  // Chọn xong → giữ màu lựa chọn một nhịp ngắn rồi sang thẻ tiếp theo
  const handleChoice = (choiceType) => {
    setCardChoices((prev) => ({
      ...prev,
      [currentCard.id]: choiceType
    }));

    clearTimeout(advanceTimer.current);
    if (currentIndex < HOLLAND_CARDS.length - 1) {
      const target = currentIndex + 1;
      advanceTimer.current = setTimeout(() => goTo(target), 250);
    }
  };

  const completedCount = Object.keys(cardChoices).length;
  const missingCount = HOLLAND_CARDS.length - completedCount;
  const progressPercent = Math.round((completedCount / HOLLAND_CARDS.length) * 100);

  // Danh sách các thẻ chưa được chọn sở thích
  const unansweredCards = HOLLAND_CARDS.map((card, idx) => {
    if (!cardChoices[card.id]) {
      return {
        index: idx,
        number: idx + 1,
        cardId: card.id,
        title: card.title,
        categoryName: card.categoryName
      };
    }
    return null;
  }).filter(Boolean);

  const handleJumpToCard = (targetIdx) => {
    goTo(targetIdx);
    setShowUnansweredModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetHolland = () => {
    if (window.confirm('Bạn có chắc chắn muốn xếp thẻ lại từ đầu?')) {
      setCardChoices({});
      localStorage.removeItem('holland_current_choices');
      setCurrentIndex(0);
      setElapsedSeconds(0);
    }
  };

  const handleFinalizeSubmission = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    localStorage.removeItem('holland_current_choices');
    onCompleteHolland(cardChoices, getDurationText(elapsedSeconds));
  };

  const handleSubmit = () => {
    if (missingCount > 0) {
      setShowUnansweredModal(true);
      return;
    }

    handleFinalizeSubmission();
  };

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-6 space-y-5">

      {/* Thanh trên: tiến độ + đồng hồ */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-bold text-teal-700 dark:text-teal-400">Sở thích nghề nghiệp Holland</div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Thẻ {currentIndex + 1}<span className="text-slate-400 font-bold">/{HOLLAND_CARDS.length}</span>
            </h2>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-full flex items-center gap-1.5 font-mono font-bold text-sm" aria-label="Thời gian làm bài">
              <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              {formatTimer(elapsedSeconds)}
            </span>
            <button onClick={handleResetHolland} className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800" title="Xếp lại từ đầu" aria-label="Xếp lại từ đầu">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button onClick={onBackToOverview} className="px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white">
              Thoát
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>Đã xếp {completedCount}/{HOLLAND_CARDS.length} thẻ ({progressPercent}%)</span>
            {missingCount > 0 && completedCount > 0 && (
              <button onClick={() => setShowUnansweredModal(true)} className="font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1">
                Còn {missingCount} thẻ <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hướng dẫn ngắn (mở sẵn ở lần đầu, thu gọn khi đã bắt đầu) */}
      <details open={completedCount === 0} className="group bg-teal-50/70 dark:bg-teal-950/30 rounded-2xl border border-teal-200 dark:border-teal-900 text-sm sm:text-base">
        <summary className="list-none cursor-pointer flex items-center justify-between gap-3 px-4 py-3 font-semibold text-teal-900 dark:text-teal-200">
          <span className="flex items-center gap-2"><HelpCircle className="w-5 h-5 shrink-0" />Chọn theo sở thích thật của bạn</span>
          <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90" />
        </summary>
        <div className="px-4 pb-4 space-y-3 text-slate-700 dark:text-slate-300">
          <p>Bạn có <strong>thích làm</strong> hoạt động này không? Đừng cân nhắc lương, độ khó hay kinh nghiệm.</p>
          <ul className="grid sm:grid-cols-3 gap-2 text-sm">
            <li className="flex items-center gap-2"><Heart className="w-4 h-4 text-emerald-600 shrink-0" /><span><strong>Thích:</strong> hào hứng, muốn làm</span></li>
            <li className="flex items-center gap-2"><HelpCircle className="w-4 h-4 text-amber-600 shrink-0" /><span><strong>Phân vân:</strong> bình thường</span></li>
            <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-rose-600 shrink-0" /><span><strong>Không thích:</strong> nhàm chán</span></li>
          </ul>
        </div>
      </details>

      {/* THẺ HOẠT ĐỘNG */}
      <div key={currentCard.id} className="animate-slide-up bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-semibold">
          <Layers className="w-4 h-4 text-teal-600" />
          {currentCard.categoryName}
        </span>

        <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {currentCard.title}
        </h3>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
          {currentCard.description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {currentCard.tags.map((tag, idx) => (
            <span key={idx} className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm rounded-lg border border-slate-200 dark:border-slate-700">
              #{tag}
            </span>
          ))}
        </div>

        {/* 3 lựa chọn — luôn 3 cột, đủ lớn để bấm trên điện thoại */}
        <div className="pt-2 grid grid-cols-3 gap-2 sm:gap-3 max-w-xl mx-auto" role="group" aria-label="Mức độ yêu thích">
          {[
            { type: 'like', label: 'Thích', icon: Heart, on: 'border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-600/30', off: 'border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:border-emerald-500' },
            { type: 'unsure', label: 'Phân vân', icon: HelpCircle, on: 'border-amber-500 bg-amber-500 text-white shadow-lg shadow-amber-500/30', off: 'border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:border-amber-500' },
            { type: 'dislike', label: 'Không thích', icon: XCircle, on: 'border-rose-600 bg-rose-600 text-white shadow-lg shadow-rose-600/30', off: 'border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 hover:border-rose-500' }
          ].map(({ type, label, icon: Icon, on, off }) => (
            <button
              key={type}
              onClick={() => handleChoice(type)}
              aria-pressed={currentChoice === type}
              className={`min-h-[76px] p-3 rounded-2xl border-2 font-bold text-sm sm:text-base transition-all flex flex-col items-center justify-center gap-1.5 active:scale-95 ${currentChoice === type ? on : off}`}
            >
              <Icon className="w-6 h-6 shrink-0" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Prev / Next / Submit Controls */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => goTo(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Thẻ trước</span>
        </button>

        {currentIndex === HOLLAND_CARDS.length - 1 || missingCount === 0 ? (
          <button
            onClick={handleSubmit}
            className="px-7 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl shadow-lg shadow-teal-600/25 transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Xem Mã Holland Top 3</span>
          </button>
        ) : (
          <button
            onClick={() => goTo(currentIndex + 1)}
            className="px-6 py-3 rounded-xl font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors"
          >
            <span>Thẻ tiếp theo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Điều hướng nhanh tới từng thẻ */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500 dark:text-slate-400">
          <span className="font-semibold">Danh sách thẻ</span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-500" />Đã xếp</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />Chưa xếp</span>
          </span>
        </div>
        <div className="grid grid-cols-9 sm:grid-cols-12 gap-1.5">
          {HOLLAND_CARDS.map((card, idx) => {
            const isAns = !!cardChoices[card.id];
            const isCurr = idx === currentIndex;
            return (
              <button
                key={card.id}
                onClick={() => goTo(idx)}
                title={`Thẻ ${idx + 1}: ${card.title} (${isAns ? 'Đã xếp' : 'Chưa xếp'})`}
                aria-current={isCurr ? 'step' : undefined}
                className={`h-9 rounded-lg text-sm font-bold transition-colors ${
                  isCurr
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : isAns
                    ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* MODAL THÔNG BÁO THẺ BÀI CÒN THIẾU HOÀN THÀNH */}
      {showUnansweredModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/80 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Còn {missingCount} thẻ chưa được phân loại!
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Phân loại đầy đủ các thẻ giúp mã Holland RIASEC của bạn đạt độ chính xác tối đa.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowUnansweredModal(false)}
                className="p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of Unanswered Cards */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                Danh sách thẻ bài chưa xếp (bấm vào để tới làm):
              </span>
              <div className="grid grid-cols-1 gap-2">
                {unansweredCards.map((unans) => (
                  <button
                    key={unans.cardId}
                    onClick={() => handleJumpToCard(unans.index)}
                    className="flex items-center justify-between p-3 bg-amber-50/70 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 rounded-xl border border-amber-200 dark:border-amber-800/60 text-left transition-all group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="w-7 h-7 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                        {unans.number}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                          Thẻ #{unans.number}: {unans.title}
                        </span>
                        <span className="text-xs text-purple-600 dark:text-purple-400">
                          {unans.categoryName}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400 group-hover:underline flex items-center">
                      <span>Xếp thẻ này</span>
                      <ChevronRight className="w-4 h-4 ml-0.5" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => handleJumpToCard(unansweredCards[0]?.index || 0)}
                className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-purple-600/20 text-center"
              >
                Tới thẻ chưa xếp đầu tiên (Thẻ #{unansweredCards[0]?.number})
              </button>

              <div className="flex gap-2">
                <button
                  onClick={handleFinalizeSubmission}
                  className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-amber-100 text-amber-800 dark:bg-slate-800 dark:hover:bg-amber-950 dark:text-amber-300 font-bold rounded-xl text-xs transition-all text-center border border-amber-200 dark:border-amber-800"
                >
                  Xem kết quả với {completedCount} thẻ đã xếp
                </button>
                <button
                  onClick={() => setShowUnansweredModal(false)}
                  className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs transition-all text-center"
                >
                  Đóng
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

