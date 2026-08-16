import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Cấu hình Firebase SDK chính thức từ P Marcom (disc---holland)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAnoHkQu_RjGhSgA_8Q8por6lqbk2uTdaY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "disc---holland.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "disc---holland",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "disc---holland.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "568872886726",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:568872886726:web:3d674c8bdcee0ca52ad2c7",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-5N4DLWNM3J"
};

// Khởi tạo ứng dụng Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// BẮT BUỘC GOOGLE HIỂN THỊ MÀN HÌNH CHỌN TÀI KHOẢN GMAIL MỖI LẦN NHẤP ĐĂNG NHẬP
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const db = getFirestore(app);

export default app;
