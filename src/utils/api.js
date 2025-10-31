import axios from 'axios';

const api = axios.create({
  baseURL: 'https://trust-backend-usx2.onrender.com/api', // بدل localhost
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
