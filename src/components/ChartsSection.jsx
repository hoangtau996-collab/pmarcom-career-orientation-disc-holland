import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

export default function ChartsSection({ discResult, hollandResult }) {
  const hasDisc = !!discResult;
  const hasHolland = !!hollandResult;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white">
          Biểu Đồ Phân Tích Tỉ Lệ {hasDisc && hasHolland ? 'DISC & Holland Code' : hasDisc ? 'DISC' : 'Holland RIASEC'}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Phản ánh định lượng đặc điểm hành vi và nhóm sở thích nghề nghiệp
        </p>
      </div>

      {/* DISC CHARTS */}
      {hasDisc && (
        <div className="space-y-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b pb-2">
            📊 Phân Tích Mô Hình DISC (William Marston)
          </h4>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Radar Chart */}
            <div className="bg-slate-50 dark:bg-slate-950/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
              <span className="text-xs font-bold text-slate-500 mb-2">Biểu Đồ Radar DISC</span>
              <div className="w-full h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={discResult.chartData}>
                    <PolarGrid stroke="#94a3b8" strokeDasharray="3 3" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
                    <Radar name="DISC %" dataKey="A" stroke="#6366f1" fill="#818cf8" fillOpacity={0.5} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-slate-50 dark:bg-slate-950/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
              <span className="text-xs font-bold text-slate-500 mb-2">Biểu Đồ Cột DISC %</span>
              <div className="w-full h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'D - Quyết đoán', score: discResult.percentages.D, color: '#EF4444' },
                    { name: 'I - Ảnh hưởng', score: discResult.percentages.I, color: '#F59E0B' },
                    { name: 'S - Kiên định', score: discResult.percentages.S, color: '#10B981' },
                    { name: 'C - Tuân thủ', score: discResult.percentages.C, color: '#3B82F6' },
                  ]}>
                    <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
                    <YAxis domain={[0, 100]} unit="%" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', color: '#fff' }} />
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
          <h4 className="text-sm font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 border-b pb-2">
            🃏 Phân Tích Mã Holland RIASEC (John Holland)
          </h4>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Radar Chart Holland Hexagon */}
            <div className="bg-slate-50 dark:bg-slate-950/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
              <span className="text-xs font-bold text-slate-500 mb-2">Biểu Đồ Lục Giác Holland RIASEC</span>
              <div className="w-full h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={hollandResult.chartData}>
                    <PolarGrid stroke="#94a3b8" strokeDasharray="3 3" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
                    <Radar name="Holland %" dataKey="A" stroke="#a855f7" fill="#c084fc" fillOpacity={0.5} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart Holland */}
            <div className="bg-slate-50 dark:bg-slate-950/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col items-center">
              <span className="text-xs font-bold text-slate-500 mb-2">Tỉ Lệ % 6 Nhóm Sở Thích</span>
              <div className="w-full h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hollandResult.chartData}>
                    <XAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9, fontWeight: 600 }} />
                    <YAxis domain={[0, 100]} unit="%" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', color: '#fff' }} />
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
