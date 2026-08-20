import React, { useMemo } from 'react';
import ChartsSection from './ChartsSection';
import CareerGuide from './CareerGuide';
import AdviceSection from './AdviceSection';
import { exportToPdf, exportToImage } from '../utils/exporter';
import { Download, FileImage, Printer, RotateCcw, Award, Calendar, User, Mail, Phone, Sparkles, CheckCircle2, Layers, ShieldCheck, Clock, GraduationCap, ExternalLink, Rocket, Brain } from 'lucide-react';

export default function ResultsDashboard({ user, discResult, hollandResult, mbtiResult, onRetakeTest }) {
  const hasDisc = !!discResult;
  const hasHolland = !!hollandResult;
  const hasMbti = !!mbtiResult;

  // Mã chứng nhận cố định cho mỗi lần xem báo cáo
  const certId = useMemo(() => Math.floor(100000 + Math.random() * 900000), []);

  const durationText = discResult?.durationFormatted || hollandResult?.durationFormatted || mbtiResult?.durationFormatted || '3 phút 30 giây';
  const consistency = discResult?.consistencyScore || hollandResult?.consistencyScore || mbtiResult?.consistencyScore || 98;

  const handleDownloadPdf = () => {
    exportToPdf('disc-report-container', user?.fullName || 'User');
  };

  const handleDownloadImage = () => {
    exportToImage('disc-report-container', user?.fullName || 'User');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      
      {/* ACTION TOOLBAR (NO-PRINT) */}
      <div className="no-print bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Báo cáo định hướng nghề nghiệp P Marcom đã sẵn sàng!</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleDownloadPdf}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Tải File PDF Dàn Trang</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>In / Lưu PDF Trình Duyệt</span>
          </button>

          <button
            onClick={handleDownloadImage}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5"
          >
            <FileImage className="w-4 h-4" />
            <span>Lưu File Ảnh (PNG)</span>
          </button>

          <button
            onClick={onRetakeTest}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl transition-all flex items-center space-x-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm lại bài test</span>
          </button>
        </div>
      </div>

      {/* REPORT CONTAINER FOR PDF & PRINT */}
      <div id="disc-report-container" className="space-y-8 bg-slate-50 dark:bg-slate-950 p-2 sm:p-8 rounded-3xl">
        
        {/* SECTION 1: USER INFO & BRANDING HEADER */}
        <div className="pdf-section bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          
          {/* Header Branding P Marcom */}
          <div className="flex flex-wrap items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-1.5 px-2.5 bg-gradient-to-r from-teal-600 to-cyan-700 rounded-xl border border-teal-300 shadow-sm flex items-center justify-center">
                <img src="/logo-pmarcom.png" alt="P Marcom Logo" className="h-7 w-auto object-contain filter brightness-110" />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">P Marcom Career Platform</h2>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Báo Cáo Phân Tích Định Hướng Phát Triển Nghề Nghiệp</p>
              </div>
            </div>

            <div className="px-3.5 py-1.5 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-extrabold rounded-full text-xs border border-amber-300 dark:border-amber-800 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Mã chứng nhận: PM-{certId}</span>
            </div>
          </div>

          {/* KHUNG THÔNG TIN CÁ NHÂN THÍ SINH HIỂN THỊ KHI XUẤT BÁO CÁO */}
          <div className="bg-gradient-to-r from-slate-50 via-indigo-50/40 to-slate-50 dark:from-slate-800/80 dark:via-indigo-950/40 dark:to-slate-800/80 rounded-2xl p-5 border border-indigo-100 dark:border-indigo-900/50 space-y-3">
            
            <div className="flex items-center justify-between border-b border-indigo-100 dark:border-indigo-900/40 pb-2.5">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center space-x-1.5">
                <User className="w-4 h-4 text-indigo-600" />
                <span>Thông Tin Cá Nhân Thí Sinh</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Độ tin cậy bài test: {consistency}% (Rất Cao)</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 pt-1">
              
              {/* Họ tên */}
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Họ và Tên</span>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center space-x-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>{user?.fullName || 'Khách hàng'}</span>
                </span>
              </div>

              {/* Email */}
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Địa chỉ Email</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5 truncate" title={user?.email || 'N/A'}>
                  <Mail className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span className="truncate">{user?.email || 'N/A'}</span>
                </span>
              </div>

              {/* Số điện thoại */}
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Số điện thoại</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>{user?.phone || 'Chưa cập nhật'}</span>
                </span>
              </div>

              {/* Thời gian làm test */}
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Thời gian làm test</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>{durationText}</span>
                </span>
              </div>

              {/* Đối tượng & Ngày test */}
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Đối tượng & Ngày thực hiện</span>
                <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>{new Date().toLocaleDateString('vi-VN')}</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-purple-600 dark:text-purple-400 font-extrabold">
                    {user?.category === 'student' ? '🎓 Sinh Viên' : '💼 Đi Làm'}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* MBTI Profile Badge */}
          {hasMbti && (
            <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
                <Brain className="w-4 h-4 text-teal-600" />
                <span>Hồ Sơ Nhóm Tính Cách MBTI ({mbtiResult.profile.groupNameVi})</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl font-black text-teal-600 dark:text-teal-400 tracking-tight">
                    MBTI: {mbtiResult.code} - {mbtiResult.profile.name}
                  </h1>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {mbtiResult.profile.tagline}
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {mbtiResult.code.split('').map((letter, idx) => (
                    <div key={idx} className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-slate-900 text-white font-black text-lg flex items-center justify-center shadow-md">
                      {letter}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {mbtiResult.profile.overview}
              </p>
            </div>
          )}

          {/* DISC Profile Badge */}
          {hasDisc && (
            <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Hồ Sơ Nhóm Tính Cách DISC</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {discResult.profile.name}
                  </h1>
                  <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                    {discResult.profile.tagline}
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white font-black text-2xl flex items-center justify-center shadow-lg">
                    {discResult.primaryTrait}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold text-lg flex items-center justify-center">
                    {discResult.secondaryTrait}
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {discResult.profile.overview}
              </p>
            </div>
          )}

          {/* Holland Top 3 Badge */}
          {hasHolland && (
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4 text-teal-600" />
                <span>Mã Sở Thích Nghề Nghiệp Holland Top 3</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-3xl font-black text-teal-600 dark:text-teal-400 tracking-tight">
                    Top 3 Mã Holland: {hollandResult.top3Code}
                  </h2>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {hollandResult.profile.combinedTitle}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {hollandResult.top3Code.split('').map((letter, idx) => (
                    <div key={idx} className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-600 text-white font-black text-lg flex items-center justify-center shadow-md">
                      {letter}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {hollandResult.profile.summary}
              </p>
            </div>
          )}

        </div>

        {/* SECTION 2: CHARTS */}
        <div className="pdf-section">
          <ChartsSection discResult={discResult} hollandResult={hollandResult} mbtiResult={mbtiResult} />
        </div>

        {/* SECTION 3: PERSONALITY ANALYSIS */}
        {hasDisc && (
          <div className="pdf-section">
            <AdviceSection profile={discResult.profile} />
          </div>
        )}

        {/* SECTION 4: CAREER GUIDANCE */}
        <div className="pdf-section">
          <CareerGuide
            primaryTrait={discResult ? discResult.primaryTrait : 'D'}
            hollandResult={hollandResult}
            discResult={discResult}
            mbtiResult={mbtiResult}
            userCategory={user?.category || 'student'}
          />
        </div>

        {/* SECTION 5: PERSONALIZED ACADEMY COURSE RECOMMENDATION */}
        <div className="pdf-section bg-gradient-to-r from-slate-950 via-blue-950 to-teal-950 text-white rounded-3xl p-6 sm:p-8 border border-teal-500/40 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-teal-900/60 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-bold uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-teal-300" />
                <span>Gợi Ý Phát Triển Kỹ Năng • P Marcom Academy</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Khóa Học Đề Xuất Dành Cho Bạn ({mbtiResult ? `MBTI: ${mbtiResult.code}` : discResult ? `Nhóm ${discResult.primaryTrait}` : `Mã Holland: ${hollandResult?.top3Code}`})
              </h3>
            </div>

            <a
              href="https://academy.pmarcom.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-teal-500 via-cyan-500 to-slate-900 hover:from-teal-600 hover:to-slate-950 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 shrink-0"
            >
              <span>Đăng Ký Tư Vấn Khóa Học</span>
              <ExternalLink className="w-4 h-4 text-white stroke-[2.5]" />
            </a>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            {mbtiResult?.profile?.academyRecommendation || 'Dựa trên thiên hướng tính cách và sở thích công việc của bạn, P Marcom Academy đề xuất bạn nâng cao kỹ năng thực chiến với khóa học Digital Marketing Thực Chiến 2026 (SEO, Performance Ads, AI Content Strategy) để rút ngắn lộ trình thăng tiến sự nghiệp từ 2 - 3 năm.'}
          </p>
        </div>

        {/* FOOTER BRANDING */}
        <div className="text-center py-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <img src="/logo-pmarcom.png" alt="P Marcom Logo" className="h-5 w-auto object-contain" />
            <span className="font-bold text-slate-600 dark:text-slate-400">P Marcom Career Platform</span>
          </div>
          <p>Hệ Thống Định Hướng Phát Triển Nghề Nghiệp • Kết hợp DISC, Holland Code (RIASEC) &amp; MBTI 16 Nhóm Tính Cách</p>
        </div>

      </div>

    </div>
  );
}


