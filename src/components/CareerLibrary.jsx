import React, { useState, useMemo } from 'react';
import { CAREER_MAPPINGS, HOLLAND_CAREER_MAPPINGS, getHollandCareerMapping } from '../data/careerMappings';
import { HOLLAND_TYPES } from '../data/hollandProfiles';
import { DISC_PROFILES } from '../data/discProfiles';
import {
  Compass, BookOpen, Layers, GraduationCap, Briefcase, Search, Filter,
  Star, Sparkles, CheckCircle2, Award, ChevronRight, X, ArrowRight, BookMarked,
  Lightbulb, ExternalLink
} from 'lucide-react';

export default function CareerLibrary({ onStartTest, userCategory = 'student' }) {
  const [modelType, setModelType] = useState('holland'); // 'holland' | 'disc'
  const [activeCategory, setActiveCategory] = useState('ALL'); // 'ALL' | 'R' | 'I' | 'A' | 'S' | 'E' | 'C' or 'D' | 'I' | 'S' | 'C'
  const [audienceMode, setAudienceMode] = useState(userCategory); // 'student' | 'professional'
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [selectedItemDetail, setSelectedItemDetail] = useState(null);

  const isStudent = audienceMode === 'student';

  const industryTags = [
    { id: 'all', name: 'Tất cả lĩnh vực' },
    { id: 'tech', name: 'Tech & CNTT' },
    { id: 'marketing', name: 'Marketing & Digital' },
    { id: 'business', name: 'Kinh Doanh & Quản Lý' },
    { id: 'design', name: 'Nghệ Thuật & Thiết Kế' },
    { id: 'ai', name: 'Xu Hướng AI 2026' }
  ];

  // Tổng hợp tất cả các thẻ ngành nghề trong Thư Viện
  const libraryItems = useMemo(() => {
    const items = [];

    if (modelType === 'holland') {
      // Lấy từ HOLLAND_CAREER_MAPPINGS
      Object.entries(HOLLAND_CAREER_MAPPINGS).forEach(([code, data]) => {
        const hollandProfile = HOLLAND_TYPES[code[0]] || HOLLAND_TYPES['R'];
        
        if (isStudent) {
          data.student.majors.forEach((m) => {
            items.push({
              id: `holland-${code}-student-${m.name}`,
              code: code,
              codeName: `Mã Holland ${code}`,
              model: 'Holland',
              color: hollandProfile.color,
              bg: hollandProfile.bg,
              border: hollandProfile.border,
              text: hollandProfile.text,
              title: m.name,
              match: m.match,
              description: m.reason,
              clubRoles: data.student.clubRoles,
              softSkills: data.student.softSkills,
              internships: data.student.internships,
              primaryCode: code[0]
            });
          });
        } else {
          data.professional.careers.forEach((c) => {
            items.push({
              id: `holland-${code}-pro-${c.title}`,
              code: code,
              codeName: `Mã Holland ${code}`,
              model: 'Holland',
              color: hollandProfile.color,
              bg: hollandProfile.bg,
              border: hollandProfile.border,
              text: hollandProfile.text,
              title: c.title,
              match: c.match,
              description: c.desc,
              leadershipStyle: data.professional.leadershipStyle,
              stressManagement: data.professional.stressManagement,
              recommendedCertificates: data.professional.recommendedCertificates,
              primaryCode: code[0]
            });
          });
        }
      });
    } else {
      // Lấy từ DISC CAREER_MAPPINGS
      Object.entries(CAREER_MAPPINGS).forEach(([trait, data]) => {
        const discProfile = DISC_PROFILES[trait] || DISC_PROFILES['D'];

        if (isStudent) {
          data.student.majors.forEach((m) => {
            items.push({
              id: `disc-${trait}-student-${m.name}`,
              code: trait,
              codeName: `Nhóm DISC ${trait}`,
              model: 'DISC',
              color: discProfile.color || '#3B82F6',
              bg: 'bg-indigo-50 dark:bg-indigo-950/40',
              border: 'border-indigo-500',
              text: 'text-indigo-600 dark:text-indigo-400',
              title: m.name,
              match: m.match,
              description: m.reason,
              clubRoles: data.student.clubRoles,
              softSkills: data.student.softSkills,
              internships: data.student.internships,
              primaryCode: trait
            });
          });
        } else {
          data.professional.careers.forEach((c) => {
            items.push({
              id: `disc-${trait}-pro-${c.title}`,
              code: trait,
              codeName: `Nhóm DISC ${trait}`,
              model: 'DISC',
              color: discProfile.color || '#3B82F6',
              bg: 'bg-indigo-50 dark:bg-indigo-950/40',
              border: 'border-indigo-500',
              text: 'text-indigo-600 dark:text-indigo-400',
              title: c.title,
              match: c.match,
              description: c.desc,
              leadershipStyle: data.professional.leadershipStyle,
              stressManagement: data.professional.stressManagement,
              recommendedCertificates: data.professional.recommendedCertificates,
              primaryCode: trait
            });
          });
        }
      });
    }

    return items;
  }, [modelType, isStudent]);

  // Lọc ngành nghề theo Search, Category & Industry
  const filteredItems = useMemo(() => {
    return libraryItems.filter((item) => {
      // Filter theo mã Holland / DISC
      if (activeCategory !== 'ALL') {
        if (modelType === 'holland' && !item.code.includes(activeCategory)) {
          return false;
        }
        if (modelType === 'disc' && item.code !== activeCategory) {
          return false;
        }
      }

      // Filter theo từ khóa
      const searchMatch = (item.title + ' ' + item.description + ' ' + item.codeName)
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());
      if (!searchMatch) return false;

      // Filter theo ngành nghề
      if (industryFilter === 'all') return true;
      const textLower = (item.title + ' ' + item.description).toLowerCase();
      if (industryFilter === 'tech' && (textLower.includes('công nghệ') || textLower.includes('it') || textLower.includes('phần mềm') || textLower.includes('kỹ thuật') || textLower.includes('dữ liệu') || textLower.includes('mạng'))) return true;
      if (industryFilter === 'marketing' && (textLower.includes('marketing') || textLower.includes('truyền thông') || textLower.includes('quảng cáo') || textLower.includes('content') || textLower.includes('thương hiệu') || textLower.includes('pr'))) return true;
      if (industryFilter === 'business' && (textLower.includes('kinh doanh') || textLower.includes('quản trị') || textLower.includes('tài chính') || textLower.includes('lãnh đạo') || textLower.includes('nhân sự') || textLower.includes('sales') || textLower.includes('đầu tư'))) return true;
      if (industryFilter === 'design' && (textLower.includes('thiết kế') || textLower.includes('nghệ thuật') || textLower.includes('sáng tạo') || textLower.includes('đồ họa') || textLower.includes('kiến trúc') || textLower.includes('3d') || textLower.includes('ui/ux'))) return true;
      if (industryFilter === 'ai' && (textLower.includes('ai') || textLower.includes('dữ liệu') || textLower.includes('tự động') || textLower.includes('phân tích') || textLower.includes('đổi mới') || textLower.includes('robotics'))) return true;

      return false;
    });
  }, [libraryItems, activeCategory, modelType, searchQuery, industryFilter]);

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8 animate-fade-in">
      
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-teal-950 text-white p-6 sm:p-10 shadow-2xl border border-indigo-500/30 space-y-4">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Thư Viện Tra Cứu Ngành Nghề Chuẩn Quốc Tế</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Thư Viện Ngành Nghề & Định Hướng Sự Nghiệp 2026
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
            Khám phá hàng trăm ngành học đại học, vị trí công việc thực chiến, vai trò câu lạc bộ và chứng chỉ quốc tế được mã hóa chi tiết theo <strong className="text-teal-300 font-bold">Mô Hình Holland (RIASEC)</strong> &amp; <strong className="text-indigo-300 font-bold">Nhóm Tính Cách DISC</strong>.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onStartTest && onStartTest('combo')}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center space-x-2"
            >
              <span>Làm Bài Test Đo Độ Tương Thích Cá Nhân</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* FILTER CONTROL PANEL */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        
        {/* Row 1: Model Selection & Audience Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          
          {/* Model Selection Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
              Mô hình đánh giá:
            </span>

            <button
              onClick={() => { setModelType('holland'); setActiveCategory('ALL'); }}
              className={`px-3.5 py-2 rounded-xl font-extrabold text-xs transition-all flex items-center space-x-1.5 ${
                modelType === 'holland'
                  ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-500/20 scale-105'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Mã Holland (RIASEC)</span>
            </button>

            <button
              onClick={() => { setModelType('disc'); setActiveCategory('ALL'); }}
              className={`px-3.5 py-2 rounded-xl font-extrabold text-xs transition-all flex items-center space-x-1.5 ${
                modelType === 'disc'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 scale-105'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Nhóm Tính Cách DISC</span>
            </button>
          </div>

          {/* Audience Mode Toggle */}
          <div className="flex items-center justify-center sm:justify-start bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl shrink-0 self-start lg:self-auto">
            <button
              onClick={() => setAudienceMode('student')}
              className={`px-4 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 ${
                audienceMode === 'student'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-md'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>🎓 Sinh Viên / Học Sinh</span>
            </button>

            <button
              onClick={() => setAudienceMode('professional')}
              className={`px-4 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 ${
                audienceMode === 'professional'
                  ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-md'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>💼 Người Đi Làm</span>
            </button>
          </div>

        </div>

        {/* Row 2: Specific Trait Category Filter Buttons */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Lọc theo {modelType === 'holland' ? 'Mã Nhóm Holland Code' : 'Nhóm Tính Cách DISC'}:
          </span>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setActiveCategory('ALL')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                activeCategory === 'ALL'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              Tất cả các nhóm
            </button>

            {modelType === 'holland' ? (
              Object.entries(HOLLAND_TYPES).map(([code, p]) => (
                <button
                  key={code}
                  onClick={() => setActiveCategory(code)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 flex items-center space-x-1.5 ${
                    activeCategory === code
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20 scale-105'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-teal-200 text-teal-800 font-extrabold text-[10px] flex items-center justify-center">
                    {code}
                  </span>
                  <span>{p.name.split(' - ')[1] || p.name}</span>
                </button>
              ))
            ) : (
              Object.entries(DISC_PROFILES).map(([code, p]) => (
                <button
                  key={code}
                  onClick={() => setActiveCategory(code)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 flex items-center space-x-1.5 ${
                    activeCategory === code
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 scale-105'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-indigo-200 text-indigo-800 font-extrabold text-[10px] flex items-center justify-center">
                    {code}
                  </span>
                  <span>{p.name}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Row 3: Search Bar & Industry Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
          
          {/* Industry Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-xs font-bold text-slate-400 uppercase shrink-0 flex items-center space-x-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Chủ đề:</span>
            </span>
            {industryTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setIndustryFilter(tag.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                  industryFilter === tag.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 scale-105'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tên ngành, công việc (VD: AI, Kế toán)..."
              className="w-full pl-10 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

      </div>

      {/* RESULTS COUNT & CARDS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
            <BookMarked className="w-4 h-4 text-teal-600" />
            <span>Hiển thị <strong>{filteredItems.length}</strong> ngành nghề phù hợp trong thư viện</span>
          </div>

          <span className="text-xs text-slate-400">
            {isStudent ? 'Chế độ: 🎓 Ngành Học & Thực Tập' : 'Chế độ: 💼 Vị Trí Công Việc & Lộ Trình'}
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Không tìm thấy ngành nghề tương ứng</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc để khám phá toàn bộ thư viện nhé!
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('ALL'); setIndustryFilter('all'); }}
              className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-md"
            >
              Xóa bộ lọc tìm kiếm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItemDetail(item)}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  
                  {/* Card Header Tag */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-[11px] font-extrabold flex items-center space-x-1">
                      <span>{item.codeName}</span>
                    </span>

                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold flex items-center space-x-1 shrink-0">
                      <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                      <span>{item.match}% Phù hợp</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-black text-slate-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                </div>

                {/* Card Footer Action */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-bold group-hover:translate-x-1 transition-transform">
                  <span>Xem chi tiết lộ trình &amp; kỹ năng</span>
                  <ChevronRight className="w-4 h-4" />
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* DETAIL MODAL FOR SELECTED CAREER ITEM */}
      {selectedItemDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedItemDetail(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="space-y-2 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-extrabold text-xs rounded-full">
                  {selectedItemDetail.codeName}
                </span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold text-xs rounded-full flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                  <span>Tỉ lệ tương thích: {selectedItemDetail.match}%</span>
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {selectedItemDetail.title}
              </h3>
              
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {selectedItemDetail.description}
              </p>
            </div>

            {/* Student Mode Details */}
            {isStudent ? (
              <div className="space-y-4 text-xs">
                
                {/* Club Roles */}
                {selectedItemDetail.clubRoles && (
                  <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 space-y-2">
                    <h5 className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center space-x-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>Vai trò phù hợp trong Câu Lạc Bộ / Bài tập nhóm:</span>
                    </h5>
                    <ul className="space-y-1 text-slate-700 dark:text-slate-300 pl-4 list-disc">
                      {selectedItemDetail.clubRoles.map((role, idx) => (
                        <li key={idx}>{role}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Internships */}
                {selectedItemDetail.internships && (
                  <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 space-y-2">
                    <h5 className="font-bold text-purple-900 dark:text-purple-200 flex items-center space-x-1.5">
                      <Compass className="w-4 h-4 text-purple-600" />
                      <span>Hướng Thực Tập (Internship Entry Pathway):</span>
                    </h5>
                    <ul className="space-y-1 text-slate-700 dark:text-slate-300 pl-4 list-disc">
                      {selectedItemDetail.internships.map((intern, idx) => (
                        <li key={idx}>{intern}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Soft Skills */}
                {selectedItemDetail.softSkills && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                    <h5 className="font-bold text-slate-900 dark:text-white">
                      💡 Kỹ năng mềm cần rèn luyện thời sinh viên:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedItemDetail.softSkills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                          • {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ) : (
              /* Professional Mode Details */
              <div className="space-y-4 text-xs">
                
                {/* Leadership Style */}
                {selectedItemDetail.leadershipStyle && (
                  <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 space-y-1.5">
                    <h5 className="font-bold text-purple-900 dark:text-purple-200">
                      👑 Phong cách làm việc &amp; Lãnh đạo:
                    </h5>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedItemDetail.leadershipStyle}
                    </p>
                  </div>
                )}

                {/* Stress Management */}
                {selectedItemDetail.stressManagement && (
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/50 space-y-1.5">
                    <h5 className="font-bold text-amber-900 dark:text-amber-200">
                      🧘‍♂️ Giải pháp quản lý stress công sở:
                    </h5>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedItemDetail.stressManagement}
                    </p>
                  </div>
                )}

                {/* Certificates */}
                {selectedItemDetail.recommendedCertificates && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                    <h5 className="font-bold text-slate-900 dark:text-white">
                      🏆 Chứng chỉ &amp; Khóa học đề xuất nâng tầm sự nghiệp:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedItemDetail.recommendedCertificates.map((cert, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                          • {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* Action CTA */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
              <button
                onClick={() => setSelectedItemDetail(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs"
              >
                Đóng
              </button>

              <button
                onClick={() => {
                  setSelectedItemDetail(null);
                  if (onStartTest) onStartTest('combo');
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center space-x-1.5"
              >
                <span>Làm Bài Test Đo Độ Tương Thích</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
