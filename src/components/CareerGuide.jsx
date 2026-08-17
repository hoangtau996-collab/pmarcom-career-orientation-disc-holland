import React, { useState } from 'react';
import { CAREER_MAPPINGS } from '../data/careerMappings';
import { GraduationCap, Briefcase, Award, CheckCircle2, Star, Sparkles, BookMarked, Compass, Search, Filter, X } from 'lucide-react';

export default function CareerGuide({ primaryTrait, userCategory = 'student' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const mapping = CAREER_MAPPINGS[primaryTrait] || CAREER_MAPPINGS['D'];
  const isStudent = userCategory === 'student';

  const categoryTags = [
    { id: 'all', name: 'Tất cả' },
    { id: 'tech', name: 'Tech & CNTT' },
    { id: 'marketing', name: 'Marketing & Digital' },
    { id: 'business', name: 'Kinh Doanh & Quản Lý' },
    { id: 'design', name: 'Nghệ Thuật & Thiết Kế' },
    { id: 'ai', name: 'Xu Hướng AI 2026' }
  ];

  const filterItems = (items, isStudentMode) => {
    return items.filter((item) => {
      const name = isStudentMode ? item.name : item.title;
      const desc = isStudentMode ? item.reason : item.desc;
      const matchSearch = (name + ' ' + desc).toLowerCase().includes(searchQuery.toLowerCase().trim());
      
      if (activeFilter === 'all') return matchSearch;
      
      const textLower = (name + ' ' + desc).toLowerCase();
      if (activeFilter === 'tech' && (textLower.includes('công nghệ') || textLower.includes('it') || textLower.includes('phần mềm') || textLower.includes('kỹ thuật') || textLower.includes('dữ liệu'))) return matchSearch;
      if (activeFilter === 'marketing' && (textLower.includes('marketing') || textLower.includes('truyền thông') || textLower.includes('quảng cáo') || textLower.includes('content') || textLower.includes('thương hiệu'))) return matchSearch;
      if (activeFilter === 'business' && (textLower.includes('kinh doanh') || textLower.includes('quản trị') || textLower.includes('tài chính') || textLower.includes('lãnh đạo') || textLower.includes('nhân sự') || textLower.includes('sales'))) return matchSearch;
      if (activeFilter === 'design' && (textLower.includes('thiết kế') || textLower.includes('nghệ thuật') || textLower.includes('sáng tạo') || textLower.includes('đồ họa') || textLower.includes('kiến trúc'))) return matchSearch;
      if (activeFilter === 'ai' && (textLower.includes('ai') || textLower.includes('dữ liệu') || textLower.includes('tự động') || textLower.includes('phân tích') || textLower.includes('đổi mới'))) return matchSearch;
      
      return matchSearch;
    });
  };

  const displayedStudentItems = filterItems(mapping.student.majors, true);
  const displayedProItems = filterItems(mapping.professional.careers, false);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 shrink-0">
            {isStudent ? <GraduationCap className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {isStudent ? '🎯 Định Hướng Ngành Nghề & Lĩnh Vực Phù Hợp' : '💼 Gợi Ý Sự Nghiệp & Vị Trí Công Việc'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Dựa trên thiên hướng tự nhiên của nhóm tính cách <strong className="text-indigo-600 dark:text-indigo-400">{primaryTrait}</strong>
            </p>
          </div>
        </div>

        {/* Interactive Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm ngành nghề (VD: Marketing, IT)..."
            className="w-full pl-10 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        <span className="text-xs font-bold text-slate-400 uppercase shrink-0 flex items-center space-x-1">
          <Filter className="w-3.5 h-3.5" />
          <span>Lọc nhanh:</span>
        </span>
        {categoryTags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => setActiveFilter(tag.id)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
              activeFilter === tag.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 scale-105'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            {tag.name}
          </button>
        ))}
      </div>

      {/* STUDENT MODE */}
      {isStudent ? (
        <div className="space-y-8">
          
          {/* Majors Recommendation */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <BookMarked className="w-5 h-5 text-indigo-600" />
                <span>Top Ngành Nghề & Lĩnh Vực Chuyên Môn Phù Hợp Nhất</span>
              </h4>
              <span className="text-xs font-bold text-slate-400">
                Hiển thị {displayedStudentItems.length} kết quả
              </span>
            </div>

            {displayedStudentItems.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 dark:bg-slate-950 rounded-2xl text-xs text-slate-500">
                Không tìm thấy ngành nghề phù hợp với từ khóa "{searchQuery}". Thử từ khóa khác xem nhé!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayedStudentItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2 hover:border-indigo-300 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-slate-900 dark:text-white text-base">{item.name}</h5>
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold rounded-full flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                        <span>{item.match}% Phù hợp</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Club Roles & Internships */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Club Roles */}
            <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-3">
              <h4 className="font-bold text-indigo-900 dark:text-indigo-200 text-sm flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Vai Trò Trong Câu Lạc Bộ / Bài Tập Nhóm</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {mapping.student.clubRoles.map((role, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Internships */}
            <div className="p-6 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/60 space-y-3">
              <h4 className="font-bold text-purple-900 dark:text-purple-200 text-sm flex items-center space-x-2">
                <Compass className="w-4 h-4 text-purple-600" />
                <span>Hướng Thực Tập (Internship Entry)</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {mapping.student.internships.map((intern, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>{intern}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Soft Skills */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              💡 Kỹ Năng Mềm Cần Tập Trung Rèn Luyện Trong Thời Sinh Viên:
            </h4>
            <div className="flex flex-wrap gap-2">
              {mapping.student.softSkills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium">
                  • {skill}
                </span>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* PROFESSIONAL MODE */
        <div className="space-y-8">
          
          {/* Careers List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-purple-600" />
                <span>Top Vị Trí Công Việc & Lộ Trình Thăng Tiến Lý Tưởng</span>
              </h4>
              <span className="text-xs font-bold text-slate-400">
                Hiển thị {displayedProItems.length} kết quả
              </span>
            </div>

            {displayedProItems.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 dark:bg-slate-950 rounded-2xl text-xs text-slate-500">
                Không tìm thấy vị trí công việc phù hợp với từ khóa "{searchQuery}". Thử từ khóa khác xem nhé!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayedProItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2 hover:border-purple-300 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-slate-900 dark:text-white text-base">{item.title}</h5>
                      <span className="px-2.5 py-1 bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 text-xs font-bold rounded-full flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-purple-600 text-purple-600" />
                        <span>{item.match}% Đề xuất</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Leadership Style & Stress Management */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/60 space-y-2">
              <h4 className="font-bold text-purple-900 dark:text-purple-200 text-sm">
                👑 Phong Cách Lãnh Đạo / Quản Lý:
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {mapping.professional.leadershipStyle}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-2">
              <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm">
                🧘‍♂️ Quản Lý Căng Thẳng Công Sở (Stress Solution):
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {mapping.professional.stressManagement}
              </p>
            </div>

          </div>

          {/* Certificates */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              🏆 Chứng Chỉ & Khóa Học Đề Xuất Để Nâng Tầm Sự Nghiệp:
            </h4>
            <div className="flex flex-wrap gap-2">
              {mapping.professional.recommendedCertificates.map((cert, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium">
                  • {cert}
                </span>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
