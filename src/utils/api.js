import axios from 'axios';

const api = axios.create({
  baseURL: 'https://trust-backend-usx2.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
