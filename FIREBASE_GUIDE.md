# 🎯 Hướng Dẫn Cài Đặt Firebase Authentication & Security Rules Cho Web App P Marcom

Tài liệu hướng dẫn từng bước tạo Dự án Firebase miễn phí, lấy **API Keys** và cài đặt **Quy Tắc Bảo Mật (Security Rules)** kết nối ứng dụng web **Định Hướng Phát Triển Nghề Nghiệp (P Marcom)**.

---

## 📌 Bước 1: Tạo Dự Án Firebase Mới

1. Truy cập vào **[Firebase Console](https://console.firebase.google.com/)** và đăng nhập bằng tài khoản Google (`pmarcomvn@gmail.com`).
2. Nhấp vào nút **"Add project"** (hoặc **"Create a project"**).
3. Đặt tên dự án: ví dụ `PMARCOM-CAREER-APP`.
4. Nhấn **Continue** (Có thể tắt Google Analytics nếu không cần) -> Chọn **Create Project**.
5. Chờ vài giây để Firebase khởi tạo dự án -> Nhấn **Continue** để vào bảng điều khiển.

---

## 🔓 Bước 2: Kích Hoạt Đăng Nhập (Firebase Authentication)

1. Tại menu bên trái, chọn **Build** -> **Authentication**.
2. Nhấn nút **"Get Started"**.
3. Chuyển sang tab **"Sign-in method"** (Phương thức đăng nhập):
   - **Email/Password:** Nhấp vào -> Bật **Enable** -> Nhấn **Save**.
   - **Google:** Nhấp vào -> Bật **Enable** -> Chọn Email hỗ trợ (ví dụ: `pmarcomvn@gmail.com`) -> Nhấn **Save**.

---

## 🔒 Bước 3: Cài Đặt Quy Tắc Bảo Mật (Firebase Security Rules) - BẮT BUỘC

Nếu bạn sử dụng **Firestore Database** để lưu trữ thông tin người dùng và kết quả test, bạn cần cài đặt **Rules** để Firebase cho phép đọc/ghi dữ liệu.

### 3.1. Quy Tắc Bảo Mật Cho Firestore Database
1. Vào menu **Build** -> **Firestore Database** -> Chọn tab **"Rules"**.
2. Xóa toàn bộ nội dung cũ và dán đoạn mã Rules chuẩn bảo mật dưới đây vào:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Quy tắc cho tập thành viên: Người dùng có thể xem/sửa thông tin chính mình
    // Super Admin (pmarcomvn@gmail.com) có toàn quyền quản trị
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && (request.auth.uid == userId || request.auth.token.email == 'pmarcomvn@gmail.com');
    }

    // Quy tắc chung cho toàn bộ tập tài liệu
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

*Lưu ý cho giai đoạn chạy thử nghiệm (Test Mode nhanh):* Bạn cũng có thể mở quyền thử nghiệm bằng cách dùng rule:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
3. Bấm **"Publish"** để lưu quy tắc.

---

## 🌐 Bước 4: Thêm Tên Miền Cho Phép (Authorized Domains)

1. Trong trang **Authentication**, nhấp vào tab **"Settings"** -> chọn **"Authorized domains"**.
2. Mặc định Firebase đã cho phép `localhost`.
3. Nếu bạn đưa web lên Vercel, Netlify hay GitHub Pages, hãy bấm **"Add domain"** và điền tên miền web của bạn vào đây.

---

## 🔑 Bước 5: Đăng Ký App Web & Lấy Mã Firebase Config

1. Nhấp vào biểu tượng bánh răng ⚙️ **Project Settings** (Góc trên bên trái).
2. Kéo xuống mục **"Your apps"** -> Nhấp vào biểu tượng **Web `</>`**.
3. Đặt tên ứng dụng: `P Marcom Web App` -> Nhấn **Register app**.
4. Firebase sẽ hiển thị đoạn mã `firebaseConfig` chứa các API Key.

---

## ⚙️ Bước 6: Cấu Hình API Keys Vào Web App

Dán trực tiếp đoạn mã `firebaseConfig` vào file [`src/config/firebase.js`](file:///d:/CLAUDE%20CODE/DISC%20-%20HOLLAND/src/config/firebase.js) hoặc lưu vào file `.env`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "disc---holland.firebaseapp.com",
  projectId: "disc---holland",
  storageBucket: "disc---holland.firebasestorage.app",
  messagingSenderId: "568872886726",
  appId: "1:568872886726:web:3d674c8bdcee0ca52ad2c7",
  measurementId: "G-5N4DLWNM3J"
};
```

---

## 🚀 Bước 7: Tự Động Đồng Bộ Lên GitHub

Sau khi hoàn tất cài đặt, gõ lệnh trong terminal:

```bash
npm run push
```
