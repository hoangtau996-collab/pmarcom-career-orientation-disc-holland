# 🎯 Hướng Dẫn Cài Đặt Firebase Authentication Cho Web App P Marcom

Tài liệu hướng dẫn từng bước tạo Dự án Firebase miễn phí và lấy **API Keys** kết nối ứng dụng web **Định Hướng Phát Triển Nghề Nghiệp (P Marcom)** để đồng bộ Đăng Nhập bằng Google (Gmail) và Email/Mật khẩu online.

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

## 🌐 Bước 3: Thêm Tên Miền Cho Phép (Authorized Domains)

1. Trong trang **Authentication**, nhấp vào tab **"Settings"** -> chọn **"Authorized domains"**.
2. Mặc định Firebase đã cho phép `localhost`.
3. Nếu bạn đưa web lên các nền tảng hosting miễn phí như Vercel, Netlify hay GitHub Pages, hãy bấm **"Add domain"** và điền tên miền web của bạn vào đây.

---

## 🔑 Bước 4: Đăng Ký App Web & Lấy Mã Firebase Config

1. Nhấp vào biểu tượng bánh răng ⚙️ **Project Settings** (Góc trên bên trái).
2. Kéo xuống mục **"Your apps"** -> Nhấp vào biểu tượng **Web `</>`**.
3. Đặt tên ứng dụng: `P Marcom Web App` -> Nhấn **Register app**.
4. Firebase sẽ hiển thị đoạn mã `firebaseConfig` chứa các API Key dạng:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "pmarcom-career.firebaseapp.com",
  projectId: "pmarcom-career",
  storageBucket: "pmarcom-career.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef..."
};
```

---

## ⚙️ Bước 5: Cấu Hình API Keys Vào Web App

Bạn có thể chọn 1 trong 2 cách sau:

### Cách 1: Thay trực tiếp vào file cấu hình (Dễ thực hiện nhất)
Mở file [`src/config/firebase.js`](file:///d:/CLAUDE%20CODE/DISC%20-%20HOLLAND/src/config/firebase.js) trong thư mục dự án và dán thông tin từ Firebase của bạn vào đoạn:

```javascript
const firebaseConfig = {
  apiKey: "ĐIỀN_API_KEY_CỦA_BẠN",
  authDomain: "ĐIỀN_AUTH_DOMAIN_CỦA_BẠN",
  projectId: "ĐIỀN_PROJECT_ID_CỦA_BẠN",
  storageBucket: "ĐIỀN_STORAGE_BUCKET_CỦA_BẠN",
  messagingSenderId: "ĐIỀN_MESSAGING_SENDER_ID_CỦA_BẠN",
  appId: "ĐIỀN_APP_ID_CỦA_BẠN"
};
```

### Cách 2: Sử dụng File Biến Môi Trường `.env` (Bảo mật cho GitHub)
Tạo 1 file tên là `.env` tại thư mục gốc của dự án (`d:\CLAUDE CODE\DISC - HOLLAND\.env`) với nội dung:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=pmarcom-career.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=pmarcom-career
VITE_FIREBASE_STORAGE_BUCKET=pmarcom-career.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef...
```

---

## 🚀 Bước 6: Khởi Động Lại & Đồng Bộ Lên GitHub

Sau khi hoàn tất cài đặt, hãy chạy lệnh tự động đẩy code cập nhật lên GitHub:

```bash
npm run push
```

Bây giờ toàn bộ người dùng khi làm bài test trên web đều có thể đăng nhập online thực tế thông qua tài khoản Google hoặc Email!
