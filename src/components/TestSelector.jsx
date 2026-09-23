import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Eye, Clock, GraduationCap, ExternalLink, ListChecks, MousePointerClick, FileBarChart, BookOpen, Layers, Brain, Sparkles, PlayCircle, X } from 'lucide-react';
import { getVisitorStats, subscribeToVisitorStats } from '../utils/visitorCounter';
import { getTranslation } from '../utils/translations';
import { DISC_QUESTIONS } from '../data/discQuestions';
import { HOLLAND_CARDS } from '../data/hollandCards';

const DISC_TOTAL = DISC_QUESTIONS.length;
const HOLLAND_TOTAL = HOLLAND_CARDS.length;
const MBTI_TOTAL = 28; // MBTI_QUESTIONS nạp lười (lazy) nên không import vào trang chủ

const MODE_KEY = 'pmarcom_active_test_mode';
const COMBO_DISC_KEY = 'pmarcom_combo_disc_result';

function readProgress() {
  try {
    const disc = JSON.parse(localStorage.getItem('disc_current_answers') || '{}');
    const holland = JSON.parse(localStorage.getItem('holland_current_choices') || '{}');
    return {
      dCount: Object.values(disc).filter(a => a && a.most && a.least).length,
      hCount: Object.keys(holland).length,
      comboDiscDone: !!localStorage.getItem(COMBO_DISC_KEY),
      mode: localStorage.getItem(MODE_KEY) || ''
    };
  } catch {
    return { dCount: 0, hCount: 0, comboDiscDone: false, mode: '' };
  }
}

// Minh họa báo cáo mẫu trên hero (dữ liệu mẫu, có ghi rõ nhãn "Mẫu")
function SampleReportCard({ vi }) {
  const bars = [
    { k: 'D', v: 72, c: 'bg-red-500' },
    { k: 'I', v: 88, c: 'bg-amber-500' },
    { k: 'S', v: 41, c: 'bg-emerald-500' },
    { k: 'C', v: 55, c: 'bg-blue-500' }
  ];
  return (
    <div className="w-64 p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur rounded-2xl shadow-2xl border border-white/60 dark:border-slate-700 text-slate-900 dark:text-white">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{vi ? 'Mẫu báo cáo' : 'Sample report'}</span>
        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-700 text-xs font-bold">DISC · I/D</span>
      </div>
      <div className="mt-1 text-sm font-extrabold">{vi ? 'Người Truyền Cảm Hứng' : 'The Inspirer'}</div>
      <div className="mt-3 space-y-1.5">
        {bars.map(b => (
          <div key={b.k} className="flex items-center gap-2 text-xs font-bold">
            <span className="w-3 text-slate-500">{b.k}</span>
            <span className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <span className={`block h-full rounded-full ${b.c}`} style={{ width: `${b.v}%` }} />
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
        {vi ? 'Gợi ý: Marketing, Truyền thông, Kinh doanh…' : 'Suggested: Marketing, Communications, Sales…'}
      </div>
    </div>
  );
}

export default function TestSelector({ onSelectTestMode, user, lang = 'vi' }) {
  const [stats, setStats] = useState(getVisitorStats());
  const [progress, setProgress] = useState(readProgress);
  const vi = lang === 'vi';
  const t = (key, params) => getTranslation(lang, key, params);

  useEffect(() => subscribeToVisitorStats(setStats), []);

  const hasUnfinished = progress.dCount > 0 || progress.hCount > 0 || progress.comboDiscDone;

  // Tiếp tục đúng chế độ đang làm dở (Combo / DISC / Holland)
  const handleResume = () => {
    const mode = progress.comboDiscDone ? 'combo' : progress.mode || (progress.dCount > 0 ? 'disc' : 'holland');
    onSelectTestMode(mode);
  };

  const handleClearSavedProgress = () => {
    if (window.confirm(vi ? 'Xóa câu trả lời đang làm dở và làm lại từ đầu?' : 'Clear saved progress and start fresh?')) {
      localStorage.removeItem('disc_current_answers');
      localStorage.removeItem('holland_current_choices');
      localStorage.removeItem(MODE_KEY);
      localStorage.removeItem(COMBO_DISC_KEY);
      setProgress(readProgress());
    }
  };

  const scrollToTests = () => {
    document.getElementById('chon-bai-test')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const steps = [
    { icon: ListChecks, title: vi ? 'Chọn bài đánh giá' : 'Pick an assessment', desc: vi ? 'Combo DISC + Holland, hoặc từng bài riêng lẻ.' : 'DISC + Holland combo, or a single test.' },
    { icon: MousePointerClick, title: vi ? 'Trả lời theo cảm nhận' : 'Answer honestly', desc: vi ? '4 – 18 phút tùy bài, tự lưu tiến độ, làm tiếp bất cứ lúc nào.' : '4 – 18 minutes per test, progress saved automatically.' },
    { icon: FileBarChart, title: vi ? 'Nhận báo cáo ngay' : 'Get your report', desc: vi ? 'Biểu đồ tính cách, ngành học & nghề nghiệp phù hợp, tải PDF.' : 'Personality charts, matching majors & careers, PDF export.' }
  ];

  const singleTests = [
    {
      mode: 'disc', icon: BookOpen, tone: 'text-rose-600 bg-rose-50 dark:bg-rose-950/50 dark:text-rose-300',
      title: t('discTitle'), time: vi ? `8 – 10 phút · ${DISC_TOTAL} câu` : `8 – 10 min · ${DISC_TOTAL} questions`,
      desc: vi ? 'Phong cách hành vi, giao tiếp và làm việc của bạn.' : 'Your behavioral, communication and work style.',
      cta: t('startDisc')
    },
    {
      mode: 'holland', icon: Layers, tone: 'text-teal-700 bg-teal-50 dark:bg-teal-950/50 dark:text-teal-300',
      title: vi ? 'Sở thích nghề nghiệp Holland' : 'Holland Career Interests', time: vi ? `6 – 8 phút · ${HOLLAND_TOTAL} thẻ` : `6 – 8 min · ${HOLLAND_TOTAL} cards`,
      desc: vi ? 'Tìm mã Holland top 3 trong 6 nhóm nghề RIASEC.' : 'Find your top-3 code across 6 RIASEC groups.',
      cta: t('startHolland')
    },
    {
      mode: 'mbti', icon: Brain, tone: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 dark:text-indigo-300',
      title: vi ? 'MBTI 16 nhóm tính cách' : 'MBTI 16 Personalities', time: vi ? `4 – 6 phút · ${MBTI_TOTAL} câu` : `4 – 6 min · ${MBTI_TOTAL} questions`,
      desc: vi ? 'Khám phá 4 chiều tính cách và mã MBTI của bạn.' : 'Discover your 4 dimensions and MBTI code.',
      cta: vi ? 'Bắt đầu test MBTI' : 'Start MBTI test'
    }
  ];

  return (
    <div className="space-y-14 sm:space-y-20 pb-6">

      {/* Banner làm tiếp bài dở */}
      {hasUnfinished && (
        <div className="animate-fade-in p-4 sm:p-5 bg-white dark:bg-slate-900 border border-teal-300 dark:border-teal-700 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
              <PlayCircle className="w-6 h-6" />
            </span>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">{vi ? 'Bạn đang làm dở một bài test' : 'You have a test in progress'}</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                {progress.comboDiscDone && (vi ? 'Combo: đã xong phần DISC' : 'Combo: DISC part done')}
                {progress.comboDiscDone && (progress.dCount > 0 || progress.hCount > 0) && ' · '}
                {progress.dCount > 0 && (vi ? `DISC: ${progress.dCount}/${DISC_TOTAL} câu` : `DISC: ${progress.dCount}/${DISC_TOTAL}`)}
                {progress.dCount > 0 && progress.hCount > 0 && ' · '}
                {progress.hCount > 0 && (vi ? `Holland: ${progress.hCount}/${HOLLAND_TOTAL} thẻ` : `Holland: ${progress.hCount}/${HOLLAND_TOTAL}`)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={handleResume} className="flex-1 sm:flex-none px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2">
              {vi ? 'Làm tiếp' : 'Resume'} <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={handleClearSavedProgress} className="p-2.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label={vi ? 'Xóa bài làm dở' : 'Clear progress'} title={vi ? 'Xóa bài làm dở' : 'Clear progress'}>
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-blue-950 to-teal-900 text-white shadow-2xl">
        <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid lg:grid-cols-12 gap-10 items-center px-6 py-10 sm:px-12 sm:py-16">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left animate-rise-in">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm font-semibold text-teal-200">
              <Sparkles className="w-4 h-4" />
              {vi ? 'Miễn phí · Có báo cáo ngay' : 'Free · Instant report'}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-black tracking-tight leading-[1.1]">
              {t('heroTitle')}
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-200 to-white">
                DISC · Holland · MBTI
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {vi
                ? 'Hiểu rõ tính cách, sở thích và thế mạnh của bạn trong chưa đến 20 phút — nhận gợi ý ngành học, nghề nghiệp phù hợp cho học sinh, sinh viên và người đi làm.'
                : 'Understand your personality, interests and strengths in under 20 minutes — get matching majors and careers for students and professionals.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                onClick={() => onSelectTestMode('combo')}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-base shadow-lg shadow-teal-500/30 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                {vi ? 'Bắt đầu miễn phí' : 'Start for free'} <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={scrollToTests}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl border border-white/25 hover:bg-white/10 text-white font-semibold text-base transition-colors"
              >
                {vi ? 'Xem các bài test' : 'See all tests'}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 pt-2 text-sm text-slate-300">
              <span className="flex items-center gap-2"><Eye className="w-4 h-4 text-cyan-300" /><strong className="text-white">{stats.totalVisits}</strong> {vi ? 'lượt truy cập' : 'visits'}</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-300" /><strong className="text-white">{stats.totalTests}</strong> {vi ? 'bài test đã hoàn thành' : 'tests completed'}</span>
            </div>

            {!user && (
              <p className="text-sm text-slate-400">
                {vi ? 'Đăng ký miễn phí để lưu kết quả và xem lại bất cứ lúc nào.' : 'Sign up free to save your results and revisit anytime.'}
              </p>
            )}
          </div>

          <div className="lg:col-span-5 relative hidden sm:block">
            <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
                alt={vi ? 'Nhóm bạn trẻ cùng thảo luận định hướng nghề nghiệp' : 'Young people discussing career paths'}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-2 lg:-left-10 animate-rise-in" style={{ animationDelay: '0.25s' }}>
              <SampleReportCard vi={vi} />
            </div>
          </div>
        </div>
      </section>

      {/* 3 BƯỚC */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{vi ? 'Cách hoạt động' : 'How it works'}</h2>
          <p className="text-slate-500 dark:text-slate-400">{vi ? 'Ba bước đơn giản để hiểu mình hơn' : 'Three simple steps'}</p>
        </div>
        <ol className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <li key={title} className="relative p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="absolute top-5 right-5 text-4xl font-black text-slate-100 dark:text-slate-800 select-none">{i + 1}</span>
              <span className="w-11 h-11 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </span>
              <h3 className="mt-4 font-bold text-lg text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-1 text-slate-600 dark:text-slate-400">{desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CHỌN BÀI TEST */}
      <section id="chon-bai-test" className="space-y-8 scroll-mt-24">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{t('selectMode')}</h2>
          <p className="text-slate-500 dark:text-slate-400">{vi ? 'Lần đầu làm? Hãy chọn Combo để có báo cáo đầy đủ nhất.' : 'First time? Pick the combo for the most complete report.'}</p>
        </div>

        {/* Combo nổi bật */}
        <div className="relative grid md:grid-cols-5 overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-teal-400 dark:border-teal-600 shadow-xl shadow-teal-500/10">
          <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-teal-600 text-white text-xs font-bold uppercase tracking-wider shadow">
            {vi ? 'Khuyên dùng' : 'Recommended'}
          </span>
          <div className="md:col-span-2 relative h-48 md:h-auto">
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop"
              alt={vi ? 'Làm bài đánh giá định hướng nghề nghiệp' : 'Taking a career assessment'}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-3 p-6 sm:p-8 space-y-5">
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{vi ? 'Đánh giá Combo: DISC + Holland' : 'Combo: DISC + Holland'}</h3>
              <p className="text-slate-600 dark:text-slate-300">{t('comboDesc')}</p>
            </div>
            <ul className="grid sm:grid-cols-2 gap-2.5 text-sm text-slate-700 dark:text-slate-300">
              {(vi
                ? ['Khoảng 15 – 18 phút cho cả hai phần', 'Biểu đồ tính cách & sở thích', 'Gợi ý ngành học, nghề nghiệp', 'Xuất báo cáo PDF khổ A4']
                : ['About 15 – 18 minutes in total', 'Personality & interest charts', 'Matching majors and careers', 'A4 PDF report export']
              ).map(item => (
                <li key={item} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />{item}</li>
              ))}
            </ul>
            <button
              onClick={() => onSelectTestMode('combo')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold transition-colors flex items-center justify-center gap-2"
            >
              {vi ? 'Làm bài Combo' : 'Take the combo'} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bài lẻ */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {singleTests.map(({ mode, icon: Icon, tone, title, time, desc, cta }) => (
            <div key={mode} className="group flex flex-col p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-teal-400 dark:hover:border-teal-600 hover:shadow-lg transition-all">
              <span className={`w-11 h-11 rounded-xl flex items-center justify-center ${tone}`}>
                <Icon className="w-5 h-5" />
              </span>
              <h3 className="mt-4 font-bold text-lg text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-1 text-slate-600 dark:text-slate-400 flex-1">{desc}</p>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-slate-500"><Clock className="w-4 h-4" />{time}</p>
              <button
                onClick={() => onSelectTestMode(mode)}
                className="mt-5 w-full py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-colors flex items-center justify-center gap-2"
              >
                {cta} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ACADEMY (thu gọn, đặt cuối trang) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-teal-950 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute -right-16 -top-16 w-72 h-72 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex items-start gap-4">
          <span className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6" />
          </span>
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-teal-300">P Marcom Academy</div>
            <h2 className="text-xl sm:text-2xl font-black">{vi ? 'Khóa học Digital Marketing thực chiến' : 'Practical Digital Marketing Course'}</h2>
            <p className="text-slate-300 max-w-2xl">
              {vi
                ? 'SEO & Content, Performance Ads, xây dựng thương hiệu và ứng dụng AI trong Marketing — học qua dự án thật, có chứng chỉ.'
                : 'SEO & Content, Performance Ads, branding and AI in marketing — project-based, with certification.'}
            </p>
          </div>
        </div>
        <a
          href="https://academy.pmarcom.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative shrink-0 px-6 py-3.5 rounded-xl bg-white text-slate-900 hover:bg-teal-50 font-bold transition-colors flex items-center justify-center gap-2"
        >
          {vi ? 'Xem khóa học' : 'View course'} <ExternalLink className="w-4 h-4" />
        </a>
      </section>
    </div>
  );
}
