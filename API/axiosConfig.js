// axiosConfig.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/', // Change '/api' to match your backend API path
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
