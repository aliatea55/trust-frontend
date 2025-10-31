import axios from 'axios';

const api = axios.create({
  baseURL: 'https://trust-backend-usx2.onrender.com', // رابط الباك إند الصحيح
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true, // مهم إذا كنت تستخدم الكوكيز أو الجلسات
});

export default api;
