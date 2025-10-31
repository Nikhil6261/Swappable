import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://swappable.onrender.com', 'http://localhost:3000'
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
