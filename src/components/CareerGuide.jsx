import React from 'react';
import { CAREER_MAPPINGS } from '../data/careerMappings';
import { GraduationCap, Briefcase, Award, CheckCircle2, Star, Sparkles, BookMarked, Compass } from 'lucide-react';

export default function CareerGuide({ primaryTrait, userCategory = 'student' }) {
  const mapping = CAREER_MAPPINGS[primaryTrait] || CAREER_MAPPINGS['D'];
  const isStudent = userCategory === 'student';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
      
      {/* Title */}
      <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
          {isStudent ? <GraduationCap className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {isStudent ? '🎓 Định Hướng Ngành Học & Lập Nghiệp' : '💼 Gợi Ý Sự Nghiệp & Vị Trí Công Việc'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Dựa trên thiên hướng tự nhiên của nhóm tính cách <strong className="text-indigo-600 dark:text-indigo-400">{primaryTrait}</strong>
          </p>
        </div>
      </div>

      {/* STUDENT MODE */}
      {isStudent ? (
        <div className="space-y-8">
          
          {/* Majors Recommendation */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <BookMarked className="w-5 h-5 text-indigo-600" />
              <span>Top Ngành Học Đại Học / Cao Đẳng Phù Hợp Nhất</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mapping.student.majors.map((item, idx) => (
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
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Briefcase className="w-5 h-5 text-purple-600" />
              <span>Top Vị Trí Công Việc & Lộ Trình Thăng Tiến Lý Tưởng</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mapping.professional.careers.map((item, idx) => (
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
