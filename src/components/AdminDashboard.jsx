import React, { useState, useEffect } from 'react';
import { Users, ShieldCheck, Crown, Trash2, Search, Award, Eye, UserPlus, RefreshCw, Mail, Phone, Calendar, CheckCircle } from 'lucide-react';
import { getRegisteredUsers, deleteUserByEmail, updateUserRole, isSuperAdmin } from '../utils/userManager';
import { getVisitorStats } from '../utils/visitorCounter';

export default function AdminDashboard({ currentUser, onClose }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [stats, setStats] = useState({ totalVisits: '0', totalTests: '0' });

  const loadData = () => {
    setUsers(getRegisteredUsers());
    setStats(getVisitorStats());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteUser = (email, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn XÓA thành viên "${name}" (${email}) khỏi hệ thống?`)) {
      if (deleteUserByEmail(email)) {
        loadData();
      }
    }
  };

  const handleToggleAdminRole = (email, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const actionText = newRole === 'admin' ? 'NÂNG QUYỀN ADMIN' : 'HẠ QUYỀN THÀNH VIÊN';

    if (window.confirm(`Xác nhận ${actionText} cho tài khoản ${email}?`)) {
      if (updateUserRole(email, newRole)) {
        loadData();
      }
    }
  };

  // Filtered users list
  const filteredUsers = users.filter(u => {
    const matchSearch = u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.phone.includes(searchTerm);
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const totalAdminsCount = users.filter(u => u.role === 'admin' || u.role === 'super_admin').length;

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8">
      
      {/* Header Admin Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center space-x-4">
            <img src="/logo-pmarcom.png" alt="P Marcom Logo" className="h-12 w-auto object-contain" />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-black">Trang Quản Trị Thành Viên</h1>
                <span className="px-3 py-0.5 bg-amber-500 text-slate-950 text-xs font-black rounded-full uppercase">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Tài khoản quản trị cao nhất: <strong className="text-amber-300">pmarcomvn@gmail.com</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/10 transition-colors"
          >
            Đóng trang Quản trị
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-xs text-slate-400 font-bold uppercase">Tổng Thành Viên</div>
            <div className="text-3xl font-black text-white mt-1">{users.length}</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-xs text-slate-400 font-bold uppercase">Tài Khoản Admin</div>
            <div className="text-3xl font-black text-amber-400 mt-1">{totalAdminsCount}</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-xs text-slate-400 font-bold uppercase">Lượt Truy Cập</div>
            <div className="text-3xl font-black text-emerald-400 mt-1">{stats.totalVisits}</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-xs text-slate-400 font-bold uppercase">Bài Test Hoàn Thành</div>
            <div className="text-3xl font-black text-pink-400 mt-1">{stats.totalTests}</div>
          </div>

        </div>
      </div>

      {/* User Management Table Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        
        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo Tên, Email, SĐT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
            >
              <option value="all">Tất cả vai trò</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="user">Thành viên (User)</option>
            </select>

            <button
              onClick={loadData}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              title="Làm mới danh sách"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Thành Viên</th>
                <th className="p-4">Email</th>
                <th className="p-4">Số Điện Thoại</th>
                <th className="p-4">Đối Tượng</th>
                <th className="p-4">Vai Trò</th>
                <th className="p-4 text-center">Hành Động</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((u) => {
                const isSuperAdminAccount = u.email.toLowerCase() === 'pmarcomvn@gmail.com' || u.role === 'super_admin';

                return (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    
                    {/* Name */}
                    <td className="p-4 font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                      <span>{u.fullName}</span>
                      {isSuperAdminAccount && (
                        <Crown className="w-4 h-4 text-amber-500 fill-amber-400" />
                      )}
                    </td>

                    {/* Email */}
                    <td className="p-4 text-slate-600 dark:text-slate-300 font-medium">
                      {u.email}
                    </td>

                    {/* Phone */}
                    <td className="p-4 text-slate-600 dark:text-slate-300 font-semibold">
                      {u.phone || 'Chưa cập nhật'}
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-full">
                        {u.category === 'student' ? '🎓 Sinh viên' : '💼 Người đi làm'}
                      </span>
                    </td>

                    {/* Role Badge */}
                    <td className="p-4">
                      {isSuperAdminAccount ? (
                        <span className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-black rounded-full text-[10px] uppercase border border-amber-300">
                          Super Admin
                        </span>
                      ) : u.role === 'admin' ? (
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 font-bold rounded-full text-[10px] uppercase border border-purple-300">
                          Admin
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 font-semibold rounded-full text-[10px] uppercase">
                          Thành viên
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-center">
                      {!isSuperAdminAccount && (
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleToggleAdminRole(u.email, u.role)}
                            className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all ${
                              u.role === 'admin'
                                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                : 'bg-purple-600 text-white hover:bg-purple-500 shadow-sm'
                            }`}
                            title={u.role === 'admin' ? 'Hạ xuống Thành viên' : 'Nâng lên Admin'}
                          >
                            {u.role === 'admin' ? 'Hạ Quyền' : 'Nâng Admin'}
                          </button>

                          <button
                            onClick={() => handleDeleteUser(u.email, u.fullName)}
                            className="p-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950 dark:hover:bg-rose-900 transition-colors"
                            title="Xóa tài khoản"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
