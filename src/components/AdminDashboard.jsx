import React, { useState, useEffect } from 'react';
import { Users, ShieldCheck, Crown, Trash2, Search, Award, Eye, UserPlus, RefreshCw, Mail, Phone, Calendar, CheckCircle } from 'lucide-react';
import { getRegisteredUsers, deleteUserByEmail, updateUserRole, isSuperAdmin } from '../utils/userManager';
import { getVisitorStats, subscribeToVisitorStats } from '../utils/visitorCounter';

export default function AdminDashboard({ currentUser, onClose }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [stats, setStats] = useState(getVisitorStats());

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
              Đồng bộ kết quả &amp; theo dõi thống kê người dùng thời gian thực (Realtime Cloud Sync)
            </p>
          </div>

          <div className="flex items-center space-x-2">
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
                <th className="p-4">Vai Trò</th>
                <th className="p-4 text-right">Thao Tác</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-800 dark:text-slate-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-400 font-semibold">
                    Không tìm thấy thành viên phù hợp với từ khóa!
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u, idx) => (
                  <tr key={u.email} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    
                    <td className="p-4 text-slate-400 font-bold">{idx + 1}</td>

                    <td className="p-4 font-bold text-slate-900 dark:text-white">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black flex items-center justify-center text-xs shrink-0">
                          {u.fullName.charAt(0).toUpperCase()}
                        </div>
                        <span className="truncate max-w-[150px]">{u.fullName}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center space-x-1.5 font-semibold text-indigo-600 dark:text-indigo-400">
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate max-w-[180px]">{u.email}</span>
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
                      {u.role !== 'super_admin' && (
                        <div className="flex items-center justify-end space-x-2">
                          
                          {canManageRoles && (
                            <button
                              onClick={() => handleToggleRole(u.email, u.role)}
                              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all border ${
                                u.role === 'admin'
                                  ? 'border-slate-300 text-slate-600 hover:bg-slate-100'
                                  : 'border-amber-400 bg-amber-50 text-amber-800 hover:bg-amber-100'
                              }`}
                              title="Thay đổi quyền thành viên"
                            >
                              {u.role === 'admin' ? 'Hạ Quyền User' : 'Nâng Quyền Admin'}
                            </button>
                          )}

                          <button
                            onClick={() => handleDeleteUser(u.email, u.fullName)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-lg transition-colors"
                            title="Xóa tài khoản"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                        </div>
                      )}
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}
