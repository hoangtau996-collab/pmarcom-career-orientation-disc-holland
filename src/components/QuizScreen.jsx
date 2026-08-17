import React, { useState, useEffect } from 'react';
import { DISC_QUESTIONS } from '../data/discQuestions';
import QuestionCard from './QuestionCard';
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles, HelpCircle, Save, AlertCircle, AlertTriangle, X, ChevronRight, Clock, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuizScreen({ user, onCompleteQuiz, onBackToOverview }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showUnansweredModal, setShowUnansweredModal] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem('disc_current_answers');
    return saved ? JSON.parse(saved) : {};
  });

  // Auto save to localStorage
  useEffect(() => {
    localStorage.setItem('disc_current_answers', JSON.stringify(answers));
  }, [answers]);

  // Live Test Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
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

  const currentQuestion = DISC_QUESTIONS[currentIndex];
  const currentAnswer = answers[currentQuestion.id] || { most: null, least: null };

  const handleSelectOption = (qId, optionType, mode) => {
    setAnswers((prev) => {
      const existing = prev[qId] || { most: null, least: null };
      let newMost = existing.most;
      let newLeast = existing.least;

      if (mode === 'most') {
        if (newMost === optionType) {
          newMost = null; // Unselect if clicked again
        } else {
          newMost = optionType;
          if (newLeast === optionType) newLeast = null; // Clear least if selected as most
        }
      } else if (mode === 'least') {
        if (newLeast === optionType) {
          newLeast = null; // Unselect if clicked again
        } else {
          newLeast = optionType;
          if (newMost === optionType) newMost = null; // Clear most if selected as least
        }
      }

      return {
        ...prev,
        [qId]: { most: newMost, least: newLeast }
      };
    });
  };

  const isCurrentComplete = currentAnswer.most && currentAnswer.least;

  // Dem so câu đã hoàn thành
  const completedCount = DISC_QUESTIONS.filter(
    q => answers[q.id] && answers[q.id].most && answers[q.id].least
  ).length;

  const missingCount = DISC_QUESTIONS.length - completedCount;
  const progressPercent = Math.round((completedCount / DISC_QUESTIONS.length) * 100);

  // Danh sách các câu chưa làm hoặc làm dở dang
  const unansweredQuestions = DISC_QUESTIONS.map((q, idx) => {
    const ans = answers[q.id];
    const hasMost = ans && ans.most;
    const hasLeast = ans && ans.least;
    if (!hasMost || !hasLeast) {
      let reason = '';
      if (!hasMost && !hasLeast) reason = 'Chưa chọn đáp án';
      else if (!hasMost) reason = 'Chưa chọn ý "Đúng nhất"';
      else reason = 'Chưa chọn ý "Ít đúng nhất"';
      return { index: idx, number: idx + 1, questionId: q.id, reason };
    }
    return null;
  }).filter(Boolean);

  const handleNext = () => {
    if (currentIndex < DISC_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleResetQuiz = () => {
    if (window.confirm('Bạn có chắc chắn muốn làm lại từ đầu bài test DISC?')) {
      setAnswers({});
      localStorage.removeItem('disc_current_answers');
      setCurrentIndex(0);
      setElapsedSeconds(0);
    }
  };

  const handleJumpToQuestion = (targetIdx) => {
    setCurrentIndex(targetIdx);
    setShowUnansweredModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    if (missingCount > 0) {
      setShowUnansweredModal(true);
      return;
    }

    // Pháo hoa ăn mừng khi hoàn thành test
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    localStorage.removeItem('disc_current_answers');
    onCompleteQuiz(answers, getDurationText(elapsedSeconds));
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      
      {/* Top Bar: Progress and User Info */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Bài Đánh Giá DISC Standard (28 Nhóm Câu Hỏi)
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Câu {currentIndex + 1} / {DISC_QUESTIONS.length}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            {/* Live Timer */}
            <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-full border border-slate-200 dark:border-slate-700 flex items-center space-x-1.5 font-mono font-bold">
              <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>{formatTimer(elapsedSeconds)}</span>
            </span>

            {/* Đã xong */}
            <span className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-200 dark:border-indigo-800">
              Đã xong: {completedCount}/{DISC_QUESTIONS.length} câu ({progressPercent}%)
            </span>

            {/* Thẻ Cảnh báo số câu còn thiếu */}
            {missingCount > 0 ? (
              <button
                onClick={() => setShowUnansweredModal(true)}
                className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/80 dark:hover:bg-amber-900/90 text-amber-700 dark:text-amber-300 rounded-full border border-amber-300 dark:border-amber-700 flex items-center space-x-1.5 transition-all shadow-sm active:scale-95"
                title="Bấm để xem danh sách câu chưa làm"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span>Còn thiếu: <strong>{missingCount} câu</strong></span>
              </button>
            ) : (
              <span className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center space-x-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Hoàn thành 100%</span>
              </span>
            )}

            <button
              onClick={handleResetQuiz}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1"
              title="Làm lại từ đầu"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={onBackToOverview}
              className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline ml-1"
            >
              Thoát bài test
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 h-3 rounded-full transition-all duration-300 shadow-sm"
            style={{ width: `${((currentIndex + 1) / DISC_QUESTIONS.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Guide Note & Quick Notice when missing */}
      <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl text-xs sm:text-sm text-amber-800 dark:text-amber-300 flex items-start justify-between gap-3">
        <div className="flex items-start space-x-3">
          <HelpCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Hướng dẫn chọn đáp án:</strong> Với mỗi 4 lựa chọn dưới đây, hãy bấm chọn <strong>1 ý "Đúng nhất với bạn"</strong> (màu xanh) và <strong>1 ý "Ít đúng nhất với bạn"</strong> (màu đỏ).
          </div>
        </div>

        {missingCount > 0 && (
          <button
            onClick={() => setShowUnansweredModal(true)}
            className="shrink-0 text-xs font-bold text-amber-900 dark:text-amber-200 hover:underline flex items-center space-x-1 bg-amber-100 dark:bg-amber-900/60 px-2.5 py-1 rounded-lg border border-amber-300 dark:border-amber-700"
          >
            <span>Xem {missingCount} câu còn thiếu</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Question Card Content */}
      <QuestionCard
        question={currentQuestion}
        answer={currentAnswer}
        onSelectOption={handleSelectOption}
      />

      {/* Direct Navigation Quick Dots */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
          <span>Danh sách 28 câu hỏi:</span>
          <div className="flex items-center space-x-3 text-[11px]">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              <span>Đã hoàn thành</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              <span>Còn thiếu ({missingCount})</span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
          {DISC_QUESTIONS.map((q, idx) => {
            const isAns = answers[q.id] && answers[q.id].most && answers[q.id].least;
            const isCurr = idx === currentIndex;
            const isMissing = !isAns;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                title={`Câu ${idx + 1}: ${isAns ? 'Đã hoàn thành' : 'Chưa hoàn thành'}`}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all relative shrink-0 ${
                  isCurr
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-500/40 scale-110 z-10 shadow-md'
                    : isAns
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700 hover:bg-amber-100'
                }`}
              >
                {idx + 1}
                {isMissing && !isCurr && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white dark:border-slate-900"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Prev / Next / Submit Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`px-5 py-3 rounded-xl border font-bold text-sm flex items-center space-x-2 transition-all ${
            currentIndex === 0
              ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
              : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Câu trước</span>
        </button>

        {currentIndex === DISC_QUESTIONS.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-black rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 flex items-center space-x-2 text-base"
          >
            <Sparkles className="w-5 h-5" />
            <span>Hoàn Thành & Xem Báo Cáo</span>
          </button>
        ) : (
          <button
            onClick={handleNext}
            className={`px-7 py-3 rounded-xl font-bold text-sm flex items-center space-x-2 transition-all ${
              isCurrentComplete
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 hover:scale-105'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300'
            }`}
          >
            <span>Câu tiếp theo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* MODAL THÔNG BÁO CÁC CÂU CÒN THIẾU/SÓT */}
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
                    Còn {missingCount} câu chưa hoàn thành!
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Bạn cần chọn cả ý "Đúng nhất" và "Ít đúng nhất" cho từng câu để xem báo cáo.
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

            {/* List of Unanswered Questions */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                Danh sách các câu bị sót (bấm vào để tới làm):
              </span>
              <div className="grid grid-cols-1 gap-2">
                {unansweredQuestions.map((unans) => (
                  <button
                    key={unans.questionId}
                    onClick={() => handleJumpToQuestion(unans.index)}
                    className="flex items-center justify-between p-3 bg-amber-50/70 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 rounded-xl border border-amber-200 dark:border-amber-800/60 text-left transition-all group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="w-7 h-7 rounded-lg bg-amber-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                        {unans.number}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                          Câu hỏi số {unans.number}
                        </span>
                        <span className="text-[11px] text-amber-700 dark:text-amber-400">
                          {unans.reason}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline flex items-center">
                      <span>Làm ngay</span>
                      <ChevronRight className="w-4 h-4 ml-0.5" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => handleJumpToQuestion(unansweredQuestions[0]?.index || 0)}
                className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-indigo-600/20 text-center"
              >
                Tới câu chưa làm đầu tiên (Câu {unansweredQuestions[0]?.number})
              </button>
              <button
                onClick={() => setShowUnansweredModal(false)}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-sm transition-all text-center"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

