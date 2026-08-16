import React, { useState, useEffect } from 'react';
import { DISC_QUESTIONS } from '../data/discQuestions';
import QuestionCard from './QuestionCard';
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles, HelpCircle, Save } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuizScreen({ user, onCompleteQuiz, onBackToOverview }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem('disc_current_answers');
    return saved ? JSON.parse(saved) : {};
  });

  // Auto save to localStorage
  useEffect(() => {
    localStorage.setItem('disc_current_answers', JSON.stringify(answers));
  }, [answers]);

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

  const progressPercent = Math.round((completedCount / DISC_QUESTIONS.length) * 100);

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

  const handleSubmit = () => {
    if (completedCount < DISC_QUESTIONS.length) {
      const unansweredIndex = DISC_QUESTIONS.findIndex(
        q => !answers[q.id] || !answers[q.id].most || !answers[q.id].least
      );
      if (unansweredIndex !== -1) {
        alert(`Bạn chưa hoàn thành câu số ${unansweredIndex + 1}. Vui lòng chọn cả ý "Đúng nhất" và "Ít đúng nhất"!`);
        setCurrentIndex(unansweredIndex);
        return;
      }
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
    onCompleteQuiz(answers);
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

          <div className="flex items-center space-x-3 text-xs font-semibold">
            <span className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-200 dark:border-indigo-800">
              Đã xong: {completedCount}/{DISC_QUESTIONS.length} câu ({progressPercent}%)
            </span>
            <button
              onClick={onBackToOverview}
              className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline"
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

      {/* Guide Note */}
      <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl text-xs sm:text-sm text-amber-800 dark:text-amber-300 flex items-start space-x-3">
        <HelpCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong>Hướng dẫn chọn đáp án:</strong> Với mỗi 4 lựa chọn dưới đây, hãy bấm chọn <strong>1 ý "Đúng nhất với bạn"</strong> (màu xanh) và <strong>1 ý "Ít đúng nhất với bạn"</strong> (màu đỏ).
        </div>
      </div>

      {/* Question Card Content */}
      <QuestionCard
        question={currentQuestion}
        answer={currentAnswer}
        onSelectOption={handleSelectOption}
      />

      {/* Direct Navigation Quick Dots */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
        <div className="flex items-center space-x-1.5 min-w-max">
          {DISC_QUESTIONS.map((q, idx) => {
            const isAns = answers[q.id] && answers[q.id].most && answers[q.id].least;
            const isCurr = idx === currentIndex;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  isCurr
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-500/40 scale-110'
                    : isAns
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {idx + 1}
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

    </div>
  );
}
