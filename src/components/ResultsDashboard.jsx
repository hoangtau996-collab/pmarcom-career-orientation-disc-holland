import React, { useMemo, useState, useRef } from 'react';
import ChartsSection from './ChartsSection';
import CareerGuide from './CareerGuide';
import AdviceSection from './AdviceSection';
import { exportToPdf, exportToImage, shareResultCard } from '../utils/exporter';
import { getInitials } from '../utils/userManager';
import { Download, FileImage, Printer, RotateCcw, Calendar, Mail, Phone, Clock, GraduationCap, ExternalLink, Share2, ShieldCheck, Sparkles, Zap, AlertTriangle, Loader2, CheckCircle2 } from 'lucide-react';

const DISC_COLORS = { D: 'bg-red-500', I: 'bg-amber-500', S: 'bg-emerald-500', C: 'bg-blue-500' };

// Ô mã kết quả (chữ cái DISC / Holland / MBTI) với hiệu ứng bật lên lần lượt
function CodeTiles({ label, letters, colorFor, delayBase = 0, big = false }) {
  return (
    <div className="space-y-2">
      <div className="text-xs font-bold uppercase tracking-wider text-teal-200/80">{label}</div>
      <div className="flex items-center gap-1.5">
        {letters.map((letter, i) => (
          <span
            key={i}
            className={`animate-pop-in rounded-xl text-white font-black flex items-center justify-center shadow-lg ${
              big && i === 0 ? 'w-14 h-14 text-3xl' : 'w-11 h-11 text-xl'
            } ${colorFor ? colorFor(letter, i) : 'bg-white/15 ring-1 ring-white/25'}`}
            style={{ animationDelay: `${delayBase + i * 0.08}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}

// Thẻ ảnh để chia sẻ mạng xã hội (render ngoài màn hình, không chứa email/SĐT)
function ShareCard({ id, name, headline, tagline, codes, strengths }) {
  return (
    <div id={id} style={{ width: 540, height: 675 }} className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-teal-800 text-white p-10 flex flex-col font-sans">
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-teal-400/25 rounded-full blur-3xl" />
      <div className="relative flex items-center gap-3">
        <span className="h-10 px-2.5 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center">
          <img src="/logo-pmarcom.png" alt="" className="h-6 w-auto" />
        </span>
        <span className="text-lg font-black">P Marcom Career</span>
      </div>
      <div className="relative mt-10 text-teal-200 font-semibold">Kết quả định hướng của</div>
      <div className="relative text-3xl font-black">{name}</div>
      <div className="relative mt-6 text-4xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-white">{headline}</div>
      {tagline && <div className="relative mt-2 text-lg text-slate-300">{tagline}</div>}
      <div className="relative mt-8 flex flex-wrap gap-6">
        {codes.map(c => (
          <div key={c.label}>
            <div className="text-xs font-bold uppercase tracking-wider text-teal-200/80">{c.label}</div>
            <div className="mt-1 text-3xl font-black tracking-widest">{c.value}</div>
          </div>
        ))}
      </div>
      {strengths.length > 0 && (
        <div className="relative mt-8 space-y-2">
          {strengths.slice(0, 3).map(s => (
            <div key={s} className="flex items-center gap-2 text-base"><span className="w-2 h-2 rounded-full bg-teal-300" />{s}</div>
          ))}
        </div>
      )}
      <div className="relative mt-auto pt-6 border-t border-white/15 flex items-center justify-between text-sm">
        <span className="text-slate-300">Làm test miễn phí tại</span>
        <span className="font-bold text-teal-200">career.pmarcom.com</span>
      </div>
    </div>
  );
}

export default function ResultsDashboard({ user, reportDate, discResult, hollandResult, mbtiResult, onRetakeTest }) {
  const hasDisc = !!discResult;
  const hasHolland = !!hollandResult;
  const hasMbti = !!mbtiResult;

  const [activeTab, setActiveTab] = useState('overview');
  const [busy, setBusy] = useState(''); // 'pdf' | 'png' | 'share'
  const [toast, setToast] = useState('');
  const tabsRef = useRef(null);

  // Mã chứng nhận cố định cho mỗi lần xem báo cáo
  const certId = useMemo(() => Math.floor(100000 + Math.random() * 900000), []);

  const durationText = discResult?.durationFormatted || hollandResult?.durationFormatted || mbtiResult?.durationFormatted || '3 phút 30 giây';
  const consistency = discResult?.consistencyScore || hollandResult?.consistencyScore || mbtiResult?.consistencyScore || 98;
  const dateText = new Date(reportDate || Date.now()).toLocaleDateString('vi-VN');
  const fullName = user?.fullName || 'Khách hàng';

  // Tiêu đề chính của báo cáo: ưu tiên DISC → MBTI → Holland
  const headline = hasDisc
    ? discResult.profile.name
    : hasMbti
    ? `${mbtiResult.code} · ${mbtiResult.profile.name}`
    : `Mã Holland ${hollandResult?.top3Code || ''}`;
  const tagline = hasDisc ? discResult.profile.tagline : hasMbti ? mbtiResult.profile.tagline : hollandResult?.profile?.combinedTitle;
  const strengths = (hasDisc ? discResult.profile.strengths : hasMbti ? mbtiResult.profile.strengths : []) || [];

  const shareCodes = [
    hasDisc && { label: 'DISC', value: `${discResult.primaryTrait}${discResult.secondaryTrait || ''}` },
    hasHolland && { label: 'Holland', value: hollandResult.top3Code },
    hasMbti && { label: 'MBTI', value: mbtiResult.code }
  ].filter(Boolean);

  const tabs = [
    { id: 'overview', label: 'Tổng quan' },
    (hasDisc || hasMbti) && { id: 'personality', label: 'Tính cách' },
    { id: 'careers', label: 'Nghề nghiệp' },
    { id: 'growth', label: 'Phát triển' }
  ].filter(Boolean);

  const selectTab = (id) => {
    setActiveTab(id);
    tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const run = async (kind, fn) => {
    if (busy) return;
    setBusy(kind);
    try { await fn(); } finally { setBusy(''); }
  };

  const handleDownloadPdf = () => run('pdf', () => exportToPdf('disc-report-container', fullName));
  const handleDownloadImage = () => run('png', () => exportToImage('disc-report-container', fullName));
  const handleShare = () => run('share', async () => {
    const res = await shareResultCard('share-result-card', fullName, `Mình vừa khám phá kết quả định hướng nghề nghiệp: ${headline}. Thử ngay tại career.pmarcom.com`);
    if (res === 'downloaded') showToast('Đã tải ảnh kết quả — đăng lên Facebook, Zalo để chia sẻ nhé!');
    else if (res === 'error') showToast('Chưa tạo được ảnh chia sẻ. Vui lòng thử lại.');
  });

  const panelClass = (id) => (activeTab === id ? 'animate-fade-in space-y-6' : 'hidden print:block space-y-6');

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-6 space-y-6">

      {/* THANH CÔNG CỤ */}
      <div className="no-print sticky top-16 z-30 -mx-4 sm:mx-0 px-4 sm:px-4 py-3 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md sm:rounded-2xl border-b sm:border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
        <span className="hidden md:flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
          <CheckCircle2 className="w-5 h-5 text-teal-600" /> Báo cáo của bạn đã sẵn sàng
        </span>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button onClick={handleShare} disabled={!!busy} className="flex-1 md:flex-none px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
            {busy === 'share' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
            Chia sẻ
          </button>
          <button onClick={handleDownloadPdf} disabled={!!busy} className="flex-1 md:flex-none px-4 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
            {busy === 'pdf' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {busy === 'pdf' ? 'Đang tạo…' : 'Tải PDF'}
          </button>
          <button onClick={handleDownloadImage} disabled={!!busy} className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-60" title="Lưu toàn bộ báo cáo thành ảnh PNG" aria-label="Lưu ảnh PNG">
            {busy === 'png' ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileImage className="w-4 h-4" />}
          </button>
          <button onClick={() => window.print()} className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800" title="In báo cáo" aria-label="In báo cáo">
            <Printer className="w-4 h-4" />
          </button>
          <button onClick={onRetakeTest} className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800" title="Làm lại bài test" aria-label="Làm lại bài test">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {toast && (
        <div className="no-print fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold shadow-xl animate-fade-in" role="status">
          {toast}
        </div>
      )}

      {/* REPORT CONTAINER FOR PDF & PRINT */}
      <div id="disc-report-container" className="space-y-6">

        {/* THẺ KẾT QUẢ CHÍNH */}
        <section className="pdf-section relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-blue-950 to-teal-900 text-white shadow-2xl animate-rise-in">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative p-6 sm:p-10 space-y-8">

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2.5">
                <span className="h-9 px-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center"><img src="/logo-pmarcom.png" alt="P Marcom" className="h-5 w-auto" /></span>
                <span className="font-bold">P Marcom Career</span>
                <span className="hidden sm:inline text-slate-400">· Báo cáo định hướng nghề nghiệp</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-300"><Calendar className="w-4 h-4" />{dateText}</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-14 h-14 rounded-full bg-white/15 ring-2 ring-white/30 flex items-center justify-center text-lg font-black shrink-0">
                {getInitials(fullName)}
              </span>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-black truncate">{fullName}</div>
                <div className="text-sm text-teal-200">{user?.category === 'student' ? 'Học sinh / Sinh viên' : 'Người đi làm'}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-bold uppercase tracking-wider text-teal-300">Nhóm tính cách nổi bật của bạn</div>
              <h1 className="text-3xl sm:text-5xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-cyan-100 to-white">
                {headline}
              </h1>
              {tagline && <p className="text-base sm:text-lg text-slate-300 max-w-2xl">{tagline}</p>}
            </div>

            <div className="flex flex-wrap gap-6 sm:gap-10">
              {hasDisc && (
                <CodeTiles
                  label="DISC"
                  letters={[discResult.primaryTrait, discResult.secondaryTrait].filter(Boolean)}
                  colorFor={(l) => DISC_COLORS[l] || 'bg-slate-600'}
                  big
                />
              )}
              {hasHolland && <CodeTiles label="Holland" letters={hollandResult.top3Code.split('')} delayBase={0.2} />}
              {hasMbti && <CodeTiles label="MBTI" letters={mbtiResult.code.split('')} delayBase={0.4} />}
            </div>

            {strengths.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-bold uppercase tracking-wider text-teal-300">Điểm mạnh nổi bật</div>
                <div className="flex flex-wrap gap-2">
                  {strengths.slice(0, 3).map(s => (
                    <span key={s} className="px-3.5 py-2 rounded-xl bg-white/10 ring-1 ring-white/15 text-sm font-semibold">{s}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-300">
              <span className="flex items-center gap-2 min-w-0"><Mail className="w-4 h-4 shrink-0 text-teal-300" /><span className="truncate">{user?.email || 'N/A'}</span></span>
              <span className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0 text-teal-300" />{user?.phone || 'Chưa cập nhật'}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4 shrink-0 text-teal-300" />{durationText}</span>
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 shrink-0 text-teal-300" />PM-{certId} · Tin cậy {consistency}%</span>
            </div>
          </div>
        </section>

        {/* TABS */}
        <div ref={tabsRef} className="no-print scroll-mt-36">
          <div role="tablist" aria-label="Nội dung báo cáo" className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => selectTab(tab.id)}
                className={`flex-1 min-w-[6.5rem] px-4 py-2.5 rounded-xl text-sm sm:text-base font-bold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB: TỔNG QUAN */}
        <div data-tab-panel role="tabpanel" id="panel-overview" aria-labelledby="tab-overview" className={panelClass('overview')}>
          <div className="pdf-section grid gap-4 md:grid-cols-2">
            {hasDisc && (
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-sm font-bold text-teal-700 dark:text-teal-400">DISC · {discResult.profile.name}</div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{discResult.profile.overview}</p>
              </div>
            )}
            {hasHolland && (
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-sm font-bold text-teal-700 dark:text-teal-400">Holland · {hollandResult.top3Code}</div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{hollandResult.profile.summary}</p>
              </div>
            )}
            {hasMbti && (
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 md:col-span-2">
                <div className="text-sm font-bold text-teal-700 dark:text-teal-400">MBTI · {mbtiResult.code} ({mbtiResult.profile.groupNameVi})</div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{mbtiResult.profile.overview}</p>
              </div>
            )}
          </div>
          <div className="pdf-section">
            <ChartsSection discResult={discResult} hollandResult={hollandResult} mbtiResult={mbtiResult} />
          </div>
        </div>

        {/* TAB: TÍNH CÁCH */}
        {(hasDisc || hasMbti) && (
          <div data-tab-panel role="tabpanel" id="panel-personality" aria-labelledby="tab-personality" className={panelClass('personality')}>
            {hasDisc && (
              <div className="pdf-section">
                <AdviceSection profile={discResult.profile} />
              </div>
            )}
            {hasMbti && (
              <div className="pdf-section grid gap-4 md:grid-cols-2">
                <div className="p-6 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-3">
                  <h3 className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-200"><Zap className="w-5 h-5" />Điểm mạnh ({mbtiResult.code})</h3>
                  <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                    {(mbtiResult.profile.strengths || []).map(s => <li key={s} className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />{s}</li>)}
                  </ul>
                </div>
                <div className="p-6 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 space-y-3">
                  <h3 className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200"><AlertTriangle className="w-5 h-5" />Điểm cần lưu ý</h3>
                  <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                    {(mbtiResult.profile.blindspots || []).map(s => <li key={s} className="flex gap-2"><span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-amber-500 shrink-0" />{s}</li>)}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: NGHỀ NGHIỆP */}
        <div data-tab-panel role="tabpanel" id="panel-careers" aria-labelledby="tab-careers" className={panelClass('careers')}>
          <div className="pdf-section">
            <CareerGuide
              primaryTrait={discResult ? discResult.primaryTrait : 'D'}
              hollandResult={hollandResult}
              discResult={discResult}
              mbtiResult={mbtiResult}
              userCategory={user?.category || 'student'}
            />
          </div>
        </div>

        {/* TAB: PHÁT TRIỂN */}
        <div data-tab-panel role="tabpanel" id="panel-growth" aria-labelledby="tab-growth" className={panelClass('growth')}>
          <div className="pdf-section relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-teal-950 text-white rounded-3xl p-6 sm:p-10 space-y-5">
            <div className="absolute -right-16 -top-16 w-72 h-72 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative flex items-start gap-4">
              <span className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6" />
              </span>
              <div className="space-y-1">
                <div className="text-sm font-bold uppercase tracking-wider text-teal-300">Gợi ý phát triển kỹ năng · P Marcom Academy</div>
                <h3 className="text-xl sm:text-2xl font-black">
                  Khóa học đề xuất cho bạn ({hasMbti ? `MBTI ${mbtiResult.code}` : hasDisc ? `nhóm ${discResult.primaryTrait}` : `Holland ${hollandResult?.top3Code}`})
                </h3>
              </div>
            </div>
            <p className="relative text-slate-300 leading-relaxed">
              {mbtiResult?.profile?.academyRecommendation || 'Dựa trên thiên hướng tính cách và sở thích công việc của bạn, P Marcom Academy đề xuất bạn nâng cao kỹ năng thực chiến với khóa học Digital Marketing Thực Chiến 2026 (SEO, Performance Ads, AI Content Strategy) để rút ngắn lộ trình thăng tiến sự nghiệp từ 2 - 3 năm.'}
            </p>
            <a
              href="https://academy.pmarcom.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex px-6 py-3.5 rounded-xl bg-white text-slate-900 hover:bg-teal-50 font-bold transition-colors items-center gap-2"
            >
              Đăng ký tư vấn khóa học <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* FOOTER BRANDING */}
        <div className="text-center py-6 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-400 space-y-1">
          <div className="flex items-center justify-center gap-2 font-bold text-slate-600 dark:text-slate-400">
            <Sparkles className="w-4 h-4 text-teal-500" /> P Marcom Career Platform
          </div>
          <p>Hệ thống định hướng nghề nghiệp · DISC, Holland Code (RIASEC) &amp; MBTI</p>
        </div>
      </div>

      {/* Thẻ ảnh chia sẻ — nằm ngoài màn hình, chỉ dùng để chụp ảnh */}
      <div aria-hidden="true" className="no-print" style={{ position: 'fixed', left: -10000, top: 0 }}>
        <ShareCard
          id="share-result-card"
          name={fullName}
          headline={headline}
          tagline={tagline}
          codes={shareCodes}
          strengths={strengths}
        />
      </div>
    </div>
  );
}
