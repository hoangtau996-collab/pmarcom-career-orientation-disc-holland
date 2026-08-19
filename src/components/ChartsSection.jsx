import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

export default function ChartsSection({ discResult, hollandResult, mbtiResult }) {
  const hasDisc = !!discResult;
  const hasHolland = !!hollandResult;
  const hasMbti = !!mbtiResult;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8 overflow-hidden">
      
      {/* Title */}
      <div className="text-center space-y-1 sm:space-y-2">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          Biểu Đồ Phân Tích Tỉ Lệ Tương Quan
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Phản ánh định lượng đặc điểm hành vi, nhóm sở thích và 4 chiều đo nhân cách MBTI
        </p>
      </div>

      {/* MBTI CHARTS */}
      {hasMbti && (
        <div className="space-y-6">
          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 border-b pb-2">
            🧠 Phân Tích 4 Chiều Đo MBTI ({mbtiResult.code} - {mbtiResult.profile.name})
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* E vs I */}
            <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-black text-slate-800 dark:text-slate-200">
                <span>E (Hướng ngoại): {mbtiResult.percentages.E}%</span>
                <span>I (Hướng nội): {mbtiResult.percentages.I}%</span>
              </div>
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-indigo-600" style={{ width: `${mbtiResult.percentages.E}%` }}></div>
                <div className="h-full bg-purple-600" style={{ width: `${mbtiResult.percentages.I}%` }}></div>
              </div>
            </div>

            {/* S vs N */}
            <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-black text-slate-800 dark:text-slate-200">
                <span>S (Thực tế): {mbtiResult.percentages.S}%</span>
                <span>N (Trực giác): {mbtiResult.percentages.N}%</span>
              </div>
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-emerald-600" style={{ width: `${mbtiResult.percentages.S}%` }}></div>
                <div className="h-full bg-pink-600" style={{ width: `${mbtiResult.percentages.N}%` }}></div>
              </div>
            </div>

            {/* T vs F */}
            <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-black text-slate-800 dark:text-slate-200">
                <span>T (Lý trí): {mbtiResult.percentages.T}%</span>
                <span>F (Cảm xúc): {mbtiResult.percentages.F}%</span>
              </div>
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-blue-600" style={{ width: `${mbtiResult.percentages.T}%` }}></div>
                <div className="h-full bg-rose-500" style={{ width: `${mbtiResult.percentages.F}%` }}></div>
              </div>
            </div>

            {/* J vs P */}
            <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-black text-slate-800 dark:text-slate-200">
                <span>J (Nguyên tắc): {mbtiResult.percentages.J}%</span>
                <span>P (Linh hoạt): {mbtiResult.percentages.P}%</span>
              </div>
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-amber-500" style={{ width: `${mbtiResult.percentages.J}%` }}></div>
                <div className="h-full bg-teal-500" style={{ width: `${mbtiResult.percentages.P}%` }}></div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* DISC CHARTS */}
      {hasDisc && (
        <div className="space-y-6">
          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b pb-2">
            📊 Phân Tích Mô Hình DISC (William Marston)
          </h4>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Radar Chart */}
            <div className="bg-slate-50 dark:bg-slate-950/60 rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
              <span className="text-[11px] font-bold text-slate-500 mb-2">Biểu Đồ Radar DISC</span>
              <div className="w-full h-[220px] sm:h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={discResult.chartData}>
                    <PolarGrid stroke="#94a3b8" strokeDasharray="3 3" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
                    <Radar name="DISC %" dataKey="A" stroke="#6366f1" fill="#818cf8" fillOpacity={0.5} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-slate-50 dark:bg-slate-950/60 rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
              <span className="text-[11px] font-bold text-slate-500 mb-2">Biểu Đồ Cột DISC %</span>
              <div className="w-full h-[220px] sm:h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'D', score: discResult.percentages.D, color: '#EF4444' },
                    { name: 'I', score: discResult.percentages.I, color: '#F59E0B' },
                    { name: 'S', score: discResult.percentages.S, color: '#10B981' },
                    { name: 'C', score: discResult.percentages.C, color: '#3B82F6' },
                  ]}>
                    <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} />
                    <YAxis domain={[0, 100]} unit="%" tick={{ fill: '#64748b', fontSize: 10 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', color: '#fff', fontSize: '11px' }} />
                    <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                      <Cell fill="#EF4444" />
                      <Cell fill="#F59E0B" />
                      <Cell fill="#10B981" />
                      <Cell fill="#3B82F6" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HOLLAND CHARTS */}
      {hasHolland && (
        <div className="space-y-6 pt-4">
          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 border-b pb-2">
            🃏 Phân Tích Mã Holland RIASEC (John Holland)
          </h4>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Radar Chart Holland Hexagon */}
            <div className="bg-slate-50 dark:bg-slate-950/60 rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
              <span className="text-[11px] font-bold text-slate-500 mb-2">Biểu Đồ Lục Giác Holland RIASEC</span>
              <div className="w-full h-[220px] sm:h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={hollandResult.chartData}>
                    <PolarGrid stroke="#94a3b8" strokeDasharray="3 3" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
                    <Radar name="Holland %" dataKey="A" stroke="#a855f7" fill="#c084fc" fillOpacity={0.5} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart Holland */}
            <div className="bg-slate-50 dark:bg-slate-950/60 rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
              <span className="text-[11px] font-bold text-slate-500 mb-2">Tỉ Lệ % 6 Nhóm Sở Thích</span>
              <div className="w-full h-[220px] sm:h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hollandResult.chartData}>
                    <XAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 8, fontWeight: 600 }} />
                    <YAxis domain={[0, 100]} unit="%" tick={{ fill: '#64748b', fontSize: 10 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', color: '#fff', fontSize: '11px' }} />
                    <Bar dataKey="A" radius={[8, 8, 0, 0]}>
                      {hollandResult.chartData.map((entry, idx) => (
                        <Cell key={idx} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

