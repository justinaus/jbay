import axios from 'axios';
import LocalStorageManager from '@/LocalStorageManager';

const http = axios.create({
  // baseURL: '/api',
  baseURL: 'https://jsonplaceholder.typicode.com',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json', 'X-Custom-Header': 'foobar' },
});

// Add a request interceptor
http.interceptors.request.use(
  function(config) {
    const loginData = LocalStorageManager.shared.getLoginData();

    if (loginData && loginData.token) {
      config.headers.Authorization = `Bearer ${loginData.token}`;
    }

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
http.interceptors.response.use(
  async function(response) {
    if (response && response.code === '401') {
      // axios interceptors 401 retry
      // 재발급도 실패하면 localstorage 지우고, 로그인으로 보낸다.
      // const { config } = response;
      // const newConfig = await this.retryToken(config);
      // if (!newConfig) return null;
      // const resultRetry = await this.post(url, obj, newConfig);
      // return resultRetry;
    }

    return response;
  },
  function(error) {
    return Promise.reject(error);
  },
);

export default http;
