/**
 * Quản lý người dùng, phân quyền Super Admin (pmarcomvn@gmail.com) và Lưu trữ danh sách thành viên
 */

const SUPER_ADMIN_EMAIL = 'pmarcomvn@gmail.com';

// Danh sách thành viên khởi tạo mẫu cho Admin kiểm tra
const INITIAL_USERS = [
  {
    id: 'u-super-admin',
    fullName: 'P Marcom Super Admin',
    email: SUPER_ADMIN_EMAIL,
    phone: '0988 888 888',
    role: 'super_admin',
    category: 'professional',
    createdAt: '2026-08-01T08:00:00.000Z'
  },
  {
    id: 'u-sample-1',
    fullName: 'Nguyễn Văn An',
    email: 'nguyenvanan@gmail.com',
    phone: '0912 345 678',
    role: 'user',
    category: 'student',
    createdAt: '2026-08-10T10:30:00.000Z'
  },
  {
    id: 'u-sample-2',
    fullName: 'Trần Thị Mai',
    email: 'tranthimai@gmail.com',
    phone: '0903 888 999',
    role: 'admin',
    category: 'professional',
    createdAt: '2026-08-12T14:20:00.000Z'
  }
];

// Lấy danh sách toàn bộ thành viên
export function getRegisteredUsers() {
  const saved = localStorage.getItem('pmarcom_users_list');
  if (!saved) {
    localStorage.setItem('pmarcom_users_list', JSON.stringify(INITIAL_USERS));
    return INITIAL_USERS;
  }
  return JSON.parse(saved);
}

// Tìm thông tin thành viên theo Email đã đăng ký
export function findRegisteredUserByEmail(email) {
  if (!email) return null;
  const users = getRegisteredUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase().trim()) || null;
}

// Đăng ký hoặc cập nhật tài khoản người dùng
export function saveOrUpdateUser(userData) {
  const users = getRegisteredUsers();
  const emailLower = userData.email.toLowerCase().trim();

  // Xác định vai trò
  let role = 'user';
  if (emailLower === SUPER_ADMIN_EMAIL.toLowerCase()) {
    role = 'super_admin';
  } else if (userData.role) {
    role = userData.role;
  }

  const existingIndex = users.findIndex(u => u.email.toLowerCase() === emailLower);

  const fullUserData = {
    id: existingIndex !== -1 ? users[existingIndex].id : `user-${Date.now()}`,
    fullName: userData.fullName.trim(),
    email: emailLower,
    phone: userData.phone.trim(),
    role: role,
    category: userData.category || 'student',
    createdAt: existingIndex !== -1 ? users[existingIndex].createdAt : new Date().toISOString()
  };

  if (existingIndex !== -1) {
    users[existingIndex] = fullUserData;
  } else {
    users.unshift(fullUserData);
  }

  localStorage.setItem('pmarcom_users_list', JSON.stringify(users));
  localStorage.setItem('disc_active_user', JSON.stringify(fullUserData));
  return fullUserData;
}

// Xóa thành viên (Dành cho Admin)
export function deleteUserByEmail(targetEmail) {
  if (targetEmail.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase()) {
    alert('Không thể xóa tài khoản Super Admin chính!');
    return false;
  }

  let users = getRegisteredUsers();
  users = users.filter(u => u.email.toLowerCase() !== targetEmail.toLowerCase());
  localStorage.setItem('pmarcom_users_list', JSON.stringify(users));
  return true;
}

// Nâng quyền hoặc thay đổi quyền thành viên
export function updateUserRole(targetEmail, newRole) {
  if (targetEmail.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase()) {
    alert('Tài khoản Super Admin pmarcomvn@gmail.com luôn có quyền cao nhất!');
    return false;
  }

  const users = getRegisteredUsers();
  const userObj = users.find(u => u.email.toLowerCase() === targetEmail.toLowerCase());

  if (userObj) {
    userObj.role = newRole;
    localStorage.setItem('pmarcom_users_list', JSON.stringify(users));
    return true;
  }
  return false;
}

// Kiểm tra quyền Admin
export function isAdmin(user) {
  if (!user || !user.email) return false;
  const emailLower = user.email.toLowerCase();
  return emailLower === SUPER_ADMIN_EMAIL.toLowerCase() || user.role === 'super_admin' || user.role === 'admin';
}

// Kiểm tra quyền Super Admin
export function isSuperAdmin(user) {
  if (!user || !user.email) return false;
  return user.email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase() || user.role === 'super_admin';
}
