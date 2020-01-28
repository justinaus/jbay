import axios from 'axios';
import apiPath from './apiPath';
import LocalStorageManager from '@/LocalStorageManager';

class ApiService {
  static instance;

  axios = axios.create({
    // baseURL: '/api',
    baseURL: 'https://jsonplaceholder.typicode.com',
  });

  static get shared() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new ApiService();
    return this.instance;
  }

  async login(obj, userCode) {
    const url = apiPath.LOGIN;
    const config = this.getConfig(null, userCode);

    // const result = await this.post( url, obj, config );

    // === temp test ====================================
    const isSuccess = obj.loginId === 'admin' && obj.password === '1';

    await new Promise(resolve => setTimeout(resolve, 500));

    const retSuccess = {
      code: '200',
      data: {
        token: 'abcde',
        refreshToken: 'fghij',
        isAdmin: true,
        loginId: 'justinaus',
      },
    };
    const retFail = {
      text: 'failed!',
    };
    const result = isSuccess ? retSuccess : retFail;
    // === temp test ====================================

    return result;
  }

  async getData(path) {
    const url = path;
    const config = this.getConfigWithTokenIfHas();

    const result = await this.get(url, config);
    return result;
  }

  async postData(path, obj) {
    const url = path;
    const config = this.getConfigWithTokenIfHas();

    const result = await this.post(url, obj, config);
    return result;
  }

  async get(url, config) {
    const result = await this.axios
      .get(url, config)
      .then(response => {
        const totalCount = response.headers['x-total-count'];

        if (!totalCount) return response;

        return {
          totalCount: Number.parseInt(totalCount),
          list: response.data,
        };
      })
      .catch(error => {
        console.log('error: ' + error.message);
        return error;
      });

    if (result && result.code === '401') {
      const newConfig = await this.retryToken(config);
      if (!newConfig) return null;

      const resultRetry = await this.get(url, config);
      return resultRetry;
    }

    return result;
  }

  async post(url, obj, config) {
    const result = await this.axios
      .post(url, obj, config)
      .then(response => response.data)
      .catch(error => {
        console.log('error: ' + error.message);
        return error;
      });

    if (result && result.code === '401') {
      const newConfig = await this.retryToken(config);
      if (!newConfig) return null;

      const resultRetry = await this.post(url, obj, newConfig);
      return resultRetry;
    }

    return result;
  }

  async retryToken(config) {
    const refreshToken = await this.refreshToken();

    if (!refreshToken || refreshToken.code !== '200') {
      // go to login.
      return null;
    }

    const newToken = refreshToken.data.token;

    LocalStorageManager.shared.changeToken(newToken);

    config.headers.Authorization = `Bearer ${newToken}`;

    return config;
  }

  async refreshToken() {
    const loginData = LocalStorageManager.shared.getLoginData();
    if (!loginData) return null;

    const token = {
      token: loginData.token,
      refreshToken: loginData.refreshToken,
    };

    const url = `/api${apiPath.TOKEN}`;

    const config = this.getConfig();

    const result = await this.axios
      .post(url, token, config)
      .then(response => response.data)
      .catch(error => {
        console.log('error: ' + error.message);
        return error;
      });

    return result;
  }

  getConfig(contentType, userCodeForce) {
    let userCode = 'type0'; // 초기값.

    const loginData = LocalStorageManager.shared.getLoginData();
    if (loginData && loginData.userCode) {
      userCode = loginData.userCode;
    }

    if (userCodeForce) {
      userCode = userCodeForce;
    }

    const config = {
      headers: {
        'Content-Type': contentType ? contentType : 'application/json',
        'X-Custom-Header': userCode,
      },
      // data: {},
    };

    return config;
  }

  getConfigWithTokenIfHas(contentType, userCodeForce) {
    let config = this.getConfig(contentType, userCodeForce);

    const loginData = LocalStorageManager.shared.getLoginData();

    if (!loginData || !loginData.token) {
      return config;
    }

    config.headers.Authorization = `Bearer ${loginData.token}`;

    return config;
  }
}

export default ApiService;
