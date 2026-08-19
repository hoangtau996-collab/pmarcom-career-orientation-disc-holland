import React, { useState, useEffect } from 'react';
import { Users, ShieldCheck, Crown, Trash2, Search, Award, Eye, UserPlus, RefreshCw, Mail, Phone, Calendar, CheckCircle, FileSpreadsheet, Download, Layers, X, FileText, ChevronRight } from 'lucide-react';
import { getRegisteredUsers, deleteUserByEmail, updateUserRole, isSuperAdmin } from '../utils/userManager';
import { getVisitorStats, subscribeToVisitorStats } from '../utils/visitorCounter';
import { exportUsersToCsv, exportToPdf } from '../utils/exporter';

export default function AdminDashboard({ currentUser, historyList = [], onSelectHistory, onClose }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [stats, setStats] = useState(getVisitorStats());
  const [selectedMember, setSelectedMember] = useState(null);

  const loadData = () => {
    setUsers(getRegisteredUsers());
  };

  useEffect(() => {
    loadData();
    const unsubscribe = subscribeToVisitorStats((newStats) => {
      setStats(newStats);
    });
    return () => unsubscribe();
  }, []);

  const handleDeleteUser = (email, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn XÓA thành viên "${name}" (${email}) khỏi hệ thống?`)) {
      if (deleteUserByEmail(email)) {
        loadData();
      }
    }
  };

  const handleToggleRole = (email, currentRole) => {
    const nextRole = currentRole === 'admin' ? 'user' : 'admin';
    const roleName = nextRole === 'admin' ? 'Quản Trị Viên (Admin)' : 'Thành Viên Thường (User)';
    if (window.confirm(`Bạn có chắc muốn thay đổi quyền của tài khoản ${email} thành "${roleName}"?`)) {
      if (updateUserRole(email, nextRole)) {
        loadData();
      }
    }
  };

  const handleExportCsv = () => {
    exportUsersToCsv(filteredUsers, historyList);
  };

  const handleViewMemberReport = (member) => {
    const userTests = historyList.filter(
      h => h.user?.email?.toLowerCase() === member.email.toLowerCase()
    );

    if (userTests.length > 0) {
      if (onSelectHistory) {
        onSelectHistory(userTests[0]);
      }
    } else {
      alert(`Thành viên "${member.fullName}" chưa thực hiện bài test nào trên hệ thống.`);
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.phone.includes(searchTerm);
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const canManageRoles = isSuperAdmin(currentUser);

  return (
    <div className="space-y-6 py-4 animate-fade-in">
      
      {/* Header Admin */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-indigo-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-extrabold text-xs">
              <Crown className="w-4 h-4 fill-amber-300" />
              <span>Bảng Quản Trị Hệ Thống P Marcom</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Quản Lý Thành Viên &amp; Lượt Xem Toàn Cầu
            </h2>
            <p className="text-xs text-slate-300">
              Xuất báo cáo kết quả kiểm tra &amp; theo dõi thống kê người dùng thời gian thực
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Nút Xuất File Excel/CSV */}
            <button
              onClick={handleExportCsv}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-extrabold transition-all shadow-md flex items-center space-x-1.5 active:scale-95"
              title="Xuất toàn bộ danh sách thành viên & bài test sang Excel / CSV"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
              <span>Xuất Báo Cáo Excel/CSV</span>
            </button>

            <button
              onClick={loadData}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Làm Mới</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black transition-all shadow-md"
              >
                Về Trang Chủ
              </button>
            )}
          </div>
        </div>

        {/* Global Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-slate-400 font-medium">Tổng Thành Viên</div>
            <div className="text-2xl font-black text-white mt-1">{users.length}</div>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-slate-400 font-medium">Lượt Xem Toàn Cầu</div>
            <div className="text-2xl font-black text-amber-400 mt-1">{stats.totalVisits}</div>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-slate-400 font-medium">Bài Test Đã Hoàn Thành</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{stats.totalTests}</div>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-slate-400 font-medium">Super Admin Chính</div>
            <div className="text-xs font-bold text-amber-300 mt-2 truncate">pmarcomvn@gmail.com</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên, email, SĐT..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Role Filter */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500 shrink-0">Lọc quyền:</span>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full sm:w-auto text-xs font-bold">
            <button
              onClick={() => setRoleFilter('all')}
              className={`px-3 py-1 rounded-lg transition-all ${
                roleFilter === 'all' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'
              }`}
            >
              Tất Cả ({users.length})
            </button>
            <button
              onClick={() => setRoleFilter('admin')}
              className={`px-3 py-1 rounded-lg transition-all ${
                roleFilter === 'admin' ? 'bg-white dark:bg-slate-900 text-amber-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              Admin ({users.filter(u => u.role === 'admin' || u.role === 'super_admin').length})
            </button>
            <button
              onClick={() => setRoleFilter('user')}
              className={`px-3 py-1 rounded-lg transition-all ${
                roleFilter === 'user' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              Member ({users.filter(u => u.role === 'user').length})
            </button>
          </div>
        </div>

      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            
            <thead className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-extrabold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">STT</th>
                <th className="p-4">Họ &amp; Tên Thành Viên</th>
                <th className="p-4">Email Liên Hệ</th>
                <th className="p-4">Số Điện Thoại</th>
                <th className="p-4">Đối Tượng</th>
                <th className="p-4">Kết Quả Bài Test</th>
                <th className="p-4">Vai Trò</th>
                <th className="p-4 text-right">Thao Tác Quản Trị</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-800 dark:text-slate-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-slate-400 font-semibold">
                    Không tìm thấy thành viên phù hợp với từ khóa!
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u, idx) => {
                  const userTests = historyList.filter(
                    h => h.user?.email?.toLowerCase() === u.email.toLowerCase()
                  );
                  const latestTest = userTests[0] || null;
                  const dRes = latestTest?.discResult || latestTest?.result;
                  const hRes = latestTest?.hollandResult;

                  return (
                    <tr key={u.email} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      
                      <td className="p-4 text-slate-400 font-bold">{idx + 1}</td>

                      <td className="p-4 font-bold text-slate-900 dark:text-white">
                        <div className="flex items-center space-x-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black flex items-center justify-center text-xs shrink-0">
                            {u.fullName.charAt(0).toUpperCase()}
                          </div>
                          <span className="truncate max-w-[140px]">{u.fullName}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center space-x-1.5 font-semibold text-indigo-600 dark:text-indigo-400">
                          <Mail className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate max-w-[170px]">{u.email}</span>
                        </div>
                      </td>

                      <td className="p-4 font-bold text-slate-700 dark:text-slate-300">
                        <div className="flex items-center space-x-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{u.phone || 'Chưa cập nhật'}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        {u.category === 'student' ? (
                          <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-full font-bold text-[11px]">
                            🎓 Sinh viên
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-full font-bold text-[11px]">
                            💼 Người đi làm
                          </span>
                        )}
                      </td>

                      {/* Cột Bài Test & Kết Quả */}
                      <td className="p-4">
                        {userTests.length > 0 ? (
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1.5">
                              {dRes && (
                                <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-[10px] rounded">
                                  DISC: {dRes.primaryTrait}
                                </span>
                              )}
                              {hRes && (
                                <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold text-[10px] rounded">
                                  Holland: {hRes.top3Code}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 font-semibold block">
                              Đã làm {userTests.length} bài test
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px] font-medium">Chưa làm bài test</span>
                        )}
                      </td>

                      <td className="p-4">
                        {u.role === 'super_admin' ? (
                          <span className="px-2.5 py-1 bg-amber-500 text-slate-950 rounded-full font-black text-[11px] flex items-center space-x-1 w-fit shadow-sm">
                            <Crown className="w-3 h-3 fill-slate-950" />
                            <span>Super Admin</span>
                          </span>
                        ) : u.role === 'admin' ? (
                          <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 rounded-full font-extrabold text-[11px]">
                            🛡️ Admin
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full font-semibold text-[11px]">
                            👤 User
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          
                          {/* Nút Xem & Xuất báo cáo test của thành viên */}
                          {userTests.length > 0 && (
                            <>
                              <button
                                onClick={() => handleViewMemberReport(u)}
                                className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-[11px] rounded-lg border border-indigo-200 dark:border-indigo-800 flex items-center space-x-1 transition-all"
                                title="Xem báo cáo kết quả bài test của thành viên này"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Xem Báo Cáo</span>
                              </button>

                              <button
                                onClick={() => setSelectedMember({ userObj: u, tests: userTests })}
                                className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-[11px] font-bold transition-all"
                                title="Xem lịch sử tất cả các lần test"
                              >
                                <FileText className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}

                          {u.role !== 'super_admin' && (
                            <>
                              {canManageRoles && (
                                <button
                                  onClick={() => handleToggleRole(u.email, u.role)}
                                  className={`px-2 py-1 rounded-lg font-bold text-[10px] transition-all border ${
                                    u.role === 'admin'
                                      ? 'border-slate-300 text-slate-600 hover:bg-slate-100'
                                      : 'border-amber-400 bg-amber-50 text-amber-800 hover:bg-amber-100'
                                  }`}
                                  title="Thay đổi quyền thành viên"
                                >
                                  {u.role === 'admin' ? 'Hạ User' : 'Nâng Admin'}
                                </button>
                              )}

                              <button
                                onClick={() => handleDeleteUser(u.email, u.fullName)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-lg transition-colors"
                                title="Xóa tài khoản"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}

                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* MODAL XEM LỊCH SỬ BÀI TEST TỪNG THÀNH VIÊN */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 font-bold flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Lịch Sử Test: {selectedMember.userObj.fullName}
                  </h4>
                  <p className="text-xs text-slate-500">{selectedMember.userObj.email}</p>
                </div>
              </div>
              <button onClick={() => setSelectedMember(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                Danh sách {selectedMember.tests.length} bài test đã làm:
              </span>
              {selectedMember.tests.map((item, idx) => {
                const dRes = item.discResult || item.result;
                const hRes = item.hollandResult;

                return (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                        <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Lần {selectedMember.tests.length - idx}: {new Date(item.date).toLocaleDateString('vi-VN')}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[11px]">
                        {dRes && <span className="text-indigo-600 dark:text-indigo-400 font-bold">DISC: Nhóm {dRes.primaryTrait}</span>}
                        {hRes && <span className="text-purple-600 dark:text-purple-400 font-bold">Holland: {hRes.top3Code}</span>}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedMember(null);
                        if (onSelectHistory) onSelectHistory(item);
                      }}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow flex items-center space-x-1"
                    >
                      <span>Xem chi tiết</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedMember(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

