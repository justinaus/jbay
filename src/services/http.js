import axios from 'axios';
import LocalStorageManager from '@/LocalStorageManager';
import store from '@/store';
import {
  PROGRESS_START_ACTION,
  PROGRESS_END_ACTION,
} from '@/store/modules/progressbar/action';

const http = axios.create({
  // baseURL: '/api',
  baseURL: 'https://jsonplaceholder.typicode.com',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json', 'X-Custom-Header': 'foobar' },
});

// Add a request interceptor
http.interceptors.request.use(
  function(config) {
    progressAction(config, store, PROGRESS_START_ACTION);

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
    const { config, data } = response;

    progressAction(config, store, PROGRESS_END_ACTION);

    if (data && data.code === '401') {
      // 토큰 재요청 api 호출.
      // 재요청 했는데, 그래도 만료면.
      // localstorage 비우고, 로그인으로 router push.
      // 정상적으로 토큰 다시 받았으면.
      // localstorage에 토큰 저장하고.
      // config.headers.Authorization = `Bearer ${ newToken }`
      // const resultRetry = await axios.request(config);
      // return resultRetry;
    }

    return response;
  },
  function(error) {
    const { config } = error;

    console.log('Error: ' + error.message);

    progressAction(config, store, PROGRESS_END_ACTION);

    return Promise.reject(error);
  },
);

function progressAction(config, store, action) {
  const { method, isShowProgressbar } = config;

  // if (method !== 'post' && method !== 'put' && method !== 'delete') {
  //   return;
  // }

  if (isShowProgressbar === false) {
    return;
  }

  store.dispatch(action);
}

export default http;
