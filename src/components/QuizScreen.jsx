import React, { useState, useEffect, useRef } from 'react';
import { DISC_QUESTIONS } from '../data/discQuestions';
import QuestionCard from './QuestionCard';
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles, HelpCircle, AlertTriangle, X, ChevronRight, Clock, RefreshCw, ThumbsUp, ThumbsDown } from 'lucide-react';
import confetti from 'canvas-confetti';

const AUTO_ADVANCE_MS = 450;

export default function QuizScreen({ user, onCompleteQuiz, onBackToOverview }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showUnansweredModal, setShowUnansweredModal] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const advanceTimer = useRef(null);

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

  const currentQuestion = DISC_QUESTIONS[currentIndex];
  const currentAnswer = answers[currentQuestion.id] || { most: null, least: null };
  const isLastQuestion = currentIndex === DISC_QUESTIONS.length - 1;

  const goTo = (idx) => {
    clearTimeout(advanceTimer.current);
    setCurrentIndex(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (qId, optionType, mode) => {
    const existing = answers[qId] || { most: null, least: null };
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

    setAnswers((prev) => ({ ...prev, [qId]: { most: newMost, least: newLeast } }));

    // Vừa chọn đủ 2 ý → tự sang câu tiếp theo
    const justCompleted = newMost && newLeast && !(existing.most && existing.least);
    clearTimeout(advanceTimer.current);
    if (justCompleted && !isLastQuestion) {
      const target = currentIndex + 1;
      advanceTimer.current = setTimeout(() => goTo(target), AUTO_ADVANCE_MS);
    }
  };

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

  const handleResetQuiz = () => {
    if (window.confirm('Bạn có chắc chắn muốn làm lại từ đầu bài test DISC?')) {
      setAnswers({});
      localStorage.removeItem('disc_current_answers');
      goTo(0);
      setElapsedSeconds(0);
    }
  };

  const handleJumpToQuestion = (targetIdx) => {
    setShowUnansweredModal(false);
    goTo(targetIdx);
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

  // Gợi ý bước tiếp theo cho câu hiện tại (thay cho khung hướng dẫn dài)
  const stepHint = !currentAnswer.most
    ? { icon: ThumbsUp, tone: 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-900', text: <>Bước 1: chọn <strong>1 ý ĐÚNG NHẤT</strong> với bạn</> }
    : !currentAnswer.least
    ? { icon: ThumbsDown, tone: 'text-rose-700 bg-rose-50 border-rose-200 dark:text-rose-300 dark:bg-rose-950/40 dark:border-rose-900', text: <>Bước 2: chọn <strong>1 ý ÍT ĐÚNG NHẤT</strong> với bạn</> }
    : { icon: CheckCircle, tone: 'text-teal-700 bg-teal-50 border-teal-200 dark:text-teal-300 dark:bg-teal-950/40 dark:border-teal-900', text: isLastQuestion ? <>Đã xong câu cuối — bấm <strong>Hoàn thành & Xem báo cáo</strong></> : <>Đã xong câu này, đang chuyển câu tiếp theo…</> };
  const HintIcon = stepHint.icon;

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-6 space-y-5">

      {/* Thanh trên: tiến độ + đồng hồ */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-bold text-teal-700 dark:text-teal-400">Bài test DISC</div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Câu {currentIndex + 1}<span className="text-slate-400 font-bold">/{DISC_QUESTIONS.length}</span>
            </h2>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-full flex items-center gap-1.5 font-mono font-bold text-sm" aria-label="Thời gian làm bài">
              <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              {formatTimer(elapsedSeconds)}
            </span>
            <button onClick={handleResetQuiz} className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800" title="Làm lại từ đầu" aria-label="Làm lại từ đầu">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button onClick={onBackToOverview} className="px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-white">
              Thoát
            </button>
          </div>
        </div>

        {/* Tiến độ theo số câu đã hoàn thành */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>Đã xong {completedCount}/{DISC_QUESTIONS.length} câu ({progressPercent}%)</span>
            {missingCount > 0 && completedCount > 0 && (
              <button onClick={() => setShowUnansweredModal(true)} className="font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1">
                Còn {missingCount} câu <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Gợi ý thao tác cho câu hiện tại */}
      <div className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-sm sm:text-base ${stepHint.tone}`} aria-live="polite">
        <span className="flex items-center gap-2.5">
          <HintIcon className="w-5 h-5 shrink-0" />
          <span>{stepHint.text}</span>
        </span>
        <details className="relative shrink-0">
          <summary className="list-none cursor-pointer p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10" aria-label="Xem hướng dẫn">
            <HelpCircle className="w-5 h-5" />
          </summary>
          <div className="absolute right-0 top-full mt-2 w-72 p-4 z-20 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl text-sm leading-relaxed">
            Mỗi câu có 4 mô tả. Hãy chọn <strong>1 ý đúng nhất</strong> (màu xanh) và <strong>1 ý ít đúng nhất</strong> (màu đỏ) với bạn. Trả lời theo phản xạ tự nhiên, không có đáp án đúng hay sai.
          </div>
        </details>
      </div>

      {/* Question Card Content */}
      <div key={currentQuestion.id} className="animate-slide-up">
        <QuestionCard
          question={currentQuestion}
          answer={currentAnswer}
          onSelectOption={handleSelectOption}
        />
      </div>

      {/* Prev / Next / Submit Controls */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          onClick={() => goTo(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Câu trước</span>
        </button>

        {isLastQuestion ? (
          <button
            onClick={handleSubmit}
            className="px-7 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl shadow-lg shadow-teal-600/25 transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Hoàn Thành & Xem Báo Cáo</span>
          </button>
        ) : (
          <button
            onClick={() => goTo(currentIndex + 1)}
            className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors ${
              currentAnswer.most && currentAnswer.least
                ? 'bg-teal-600 hover:bg-teal-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <span>Câu tiếp theo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Điều hướng nhanh tới từng câu */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500 dark:text-slate-400">
          <span className="font-semibold">Danh sách câu hỏi</span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-500" />Đã xong</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />Chưa làm</span>
          </span>
        </div>

        <div className="grid grid-cols-7 sm:grid-cols-[repeat(14,minmax(0,1fr))] gap-1.5">
          {DISC_QUESTIONS.map((q, idx) => {
            const isAns = answers[q.id] && answers[q.id].most && answers[q.id].least;
            const isCurr = idx === currentIndex;

            return (
              <button
                key={q.id}
                onClick={() => goTo(idx)}
                title={`Câu ${idx + 1}: ${isAns ? 'Đã hoàn thành' : 'Chưa hoàn thành'}`}
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

      {/* MODAL THÔNG BÁO CÁC CÂU CÒN THIẾU/SÓT */}
      {showUnansweredModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-fade-in">

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/80 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Còn {missingCount} câu chưa hoàn thành
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Mỗi câu cần chọn cả ý "Đúng nhất" và "Ít đúng nhất".
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowUnansweredModal(false)}
                className="p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of Unanswered Questions */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              <div className="grid grid-cols-1 gap-2">
                {unansweredQuestions.map((unans) => (
                  <button
                    key={unans.questionId}
                    onClick={() => handleJumpToQuestion(unans.index)}
                    className="flex items-center justify-between p-3 bg-amber-50/70 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 rounded-xl border border-amber-200 dark:border-amber-800/60 text-left transition-colors group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="w-8 h-8 rounded-lg bg-amber-500 text-white font-black text-sm flex items-center justify-center shrink-0">
                        {unans.number}
                      </span>
                      <div>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">
                          Câu {unans.number}
                        </span>
                        <span className="text-sm text-amber-700 dark:text-amber-400">
                          {unans.reason}
                        </span>
                      </div>
                    </div>

                    <span className="text-sm font-bold text-teal-700 dark:text-teal-400 group-hover:underline flex items-center">
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
                className="flex-1 py-3 px-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition-colors text-center"
              >
                Tới câu {unansweredQuestions[0]?.number}
              </button>
              <button
                onClick={() => setShowUnansweredModal(false)}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-colors text-center"
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
