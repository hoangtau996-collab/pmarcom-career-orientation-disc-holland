import React from 'react';
import ChartsSection from './ChartsSection';
import CareerGuide from './CareerGuide';
import AdviceSection from './AdviceSection';
import { exportToPdf, exportToImage } from '../utils/exporter';
import { Download, FileImage, Printer, RotateCcw, Award, Calendar, User, Mail, Sparkles, CheckCircle2, Layers } from 'lucide-react';

export default function ResultsDashboard({ user, discResult, hollandResult, onRetakeTest }) {
  const hasDisc = !!discResult;
  const hasHolland = !!hollandResult;

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
              <img src="/logo-pmarcom.png" alt="P Marcom Logo" className="h-10 w-auto object-contain" />
              <div>
                <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">P Marcom Career Platform</h2>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Báo Cáo Phân Tích Định Hướng Phát Triển Nghề Nghiệp</p>
              </div>
            </div>

            <div className="px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold rounded-full text-xs">
              Mã chứng nhận: PM-{Math.floor(100000 + Math.random() * 900000)}
            </div>
          </div>

          {/* User Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-indigo-500" />
              <span>Họ tên: <strong className="text-slate-900 dark:text-white font-bold">{user?.fullName || 'Khách hàng'}</strong></span>
            </div>
            {user?.email && (
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-indigo-500" />
                <span>{user.email}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-indigo-500" />
              <span>Ngày test: {new Date().toLocaleDateString('vi-VN')}</span>
            </div>
            <div className="px-3 py-1 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold rounded-full text-[11px]">
              Đối tượng: {user?.category === 'student' ? '🎓 Sinh Viên / Học Sinh' : '💼 Người Đi Làm'}
            </div>
          </div>

          {/* DISC Profile Badge */}
          {hasDisc && (
            <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Hồ Sơ Nhóm Tính Cách DISC</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {discResult.profile.name}
                  </h1>
                  <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    {discResult.profile.tagline}
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-lg">
                    {discResult.primaryTrait}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-bold text-lg flex items-center justify-center">
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
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4 text-purple-600" />
                <span>Mã Sở Thích Nghề Nghiệp Holland Top 3</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-3xl font-black text-purple-600 dark:text-purple-400 tracking-tight">
                    Top 3 Mã Holland: {hollandResult.top3Code}
                  </h2>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {hollandResult.profile.combinedTitle}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {hollandResult.top3Code.split('').map((letter, idx) => (
                    <div key={idx} className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white font-black text-lg flex items-center justify-center shadow-md">
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
          <ChartsSection discResult={discResult} hollandResult={hollandResult} />
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
            userCategory={user?.category || 'student'}
          />
        </div>

        {/* FOOTER BRANDING */}
        <div className="text-center py-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <img src="/logo-pmarcom.png" alt="P Marcom Logo" className="h-5 w-auto object-contain" />
            <span className="font-bold text-slate-600 dark:text-slate-400">P Marcom Career Platform</span>
          </div>
          <p>Hệ Thống Định Hướng Phát Triển Nghề Nghiệp • Kết hợp DISC & Holland Code (RIASEC)</p>
        </div>

      </div>

    </div>
  );
}
