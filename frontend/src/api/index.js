import axios from 'axios';

const api = axios.create({
  baseURL: 'https://book-review-api1-w6ah.onrender.com/api',
});

export default api;
