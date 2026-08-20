import React, { useState, useEffect, useRef } from 'react';
import { MBTI_QUESTIONS } from '../data/mbtiQuestions';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, AlertTriangle, Clock, RefreshCw, X, ShieldAlert, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MbtiQuizScreen({ onComplete, onBackToOverview, lang = 'vi' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem('mbti_current_answers');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [showUnansweredModal, setShowUnansweredModal] = useState(false);

  // Live Timer
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainderSecs.toString().padStart(2, '0')}`;
  };

  const getDurationText = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    if (mins === 0) return `${remainderSecs} giây`;
    return `${mins} phút ${remainderSecs} giây`;
  };

  useEffect(() => {
    try {
      localStorage.setItem('mbti_current_answers', JSON.stringify(answers));
    } catch (e) {}
  }, [answers]);

  const currentQ = MBTI_QUESTIONS[currentIndex];
  const selectedTrait = answers[currentQ.id];

  const handleSelectOption = (trait) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: trait
    }));
  };

  const handleResetQuiz = () => {
    if (window.confirm(lang === 'vi' ? 'Bạn có muốn làm lại từ đầu bài test MBTI?' : 'Reset MBTI quiz from start?')) {
      setAnswers({});
      setCurrentIndex(0);
      setElapsedSeconds(0);
      localStorage.removeItem('mbti_current_answers');
    }
  };

  const unansweredQuestions = MBTI_QUESTIONS.filter(q => !answers[q.id]);
  const missingCount = unansweredQuestions.length;

  const handleNext = () => {
    if (currentIndex < MBTI_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleCompleteSubmit = () => {
    if (missingCount > 0) {
      setShowUnansweredModal(true);
      return;
    }

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    localStorage.removeItem('mbti_current_answers');
    onComplete(answers, getDurationText(elapsedSeconds));
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      
      {/* TOOLBAR TOP */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-md">
        
        <button
          onClick={onBackToOverview}
          className="flex items-center space-x-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span> Quay lại</span>
        </button>

        {/* Live Timer & Reset */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono font-bold text-xs rounded-xl border border-indigo-200 dark:border-indigo-900">
            <Clock className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>⏱️ {formatTimer(elapsedSeconds)}</span>
          </div>

          <button
            onClick={handleResetQuiz}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
            title="Làm lại từ đầu"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* QUESTION NAV DOTS BAR (20 DOTS) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>Tiến trình: Câu {currentIndex + 1} / {MBTI_QUESTIONS.length}</span>
          {missingCount > 0 ? (
            <span className="text-amber-600 dark:text-amber-400 font-extrabold flex items-center space-x-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Còn thiếu {missingCount} câu</span>
            </span>
          ) : (
            <span className="text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Đã xong tất cả</span>
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1">
          {MBTI_QUESTIONS.map((q, idx) => {
            const isAnswered = !!answers[q.id];
            const isCurrent = idx === currentIndex;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center transition-all shrink-0 ${
                  isCurrent
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 scale-110 shadow-md'
                    : isAnswered
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300'
                }`}
              >
                {q.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* QUESTION DISPLAY CARD */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Câu {currentQ.id} • Chiều đo {currentQ.dimension}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
            {lang === 'vi' ? currentQ.questionVi : currentQ.questionEn}
          </h3>
        </div>

        {/* OPTIONS */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedTrait === opt.trait;

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt.trait)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-start space-x-3 group ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50/70 dark:bg-teal-950/40 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 hover:border-teal-300 dark:hover:border-teal-700 bg-slate-50/50 dark:bg-slate-950/40'
                }`}
              >
                <div className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  isSelected
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-teal-200'
                }`}>
                  {idx === 0 ? 'A' : 'B'}
                </div>

                <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                  isSelected ? 'text-teal-950 dark:text-teal-100 font-extrabold' : 'text-slate-700 dark:text-slate-300'
                }`}>
                  {lang === 'vi' ? opt.textVi : opt.textEn}
                </p>
              </button>
            );
          })}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 font-bold text-xs rounded-xl transition-all flex items-center space-x-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Câu trước</span>
          </button>

          {currentIndex < MBTI_QUESTIONS.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center space-x-1"
            >
              <span>Câu tiếp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleCompleteSubmit}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 via-cyan-600 to-slate-900 hover:from-teal-600 hover:to-slate-950 text-white font-black text-xs sm:text-sm rounded-xl shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              Hoàn Thành Bài Test MBTI
            </button>
          )}
        </div>

      </div>

      {/* UNANSWERED QUESTIONS MODAL */}
      {showUnansweredModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5">
            
            <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Bạn Còn {missingCount} Câu Chưa Trả Lời!
                </h4>
                <p className="text-xs text-slate-500">Vui lòng hoàn thành đủ {MBTI_QUESTIONS.length} câu để có kết quả MBTI chính xác nhất</p>
              </div>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {unansweredQuestions.map(q => (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(MBTI_QUESTIONS.findIndex(item => item.id === q.id));
                    setShowUnansweredModal(false);
                  }}
                  className="w-full p-2.5 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 rounded-xl text-left border border-amber-200 dark:border-amber-900 text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center justify-between"
                >
                  <span>Câu {q.id}: {q.questionVi.slice(0, 45)}...</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowUnansweredModal(false)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Tiếp tục hoàn thành
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
