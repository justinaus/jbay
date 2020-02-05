<template>
  <div>
    User Login
    <Input :value.sync="loginId" />
    <Input :value.sync="password" type="password" @onEnterKey="onEnterKey" />
    <button @click="onClickSubmit">login</button>
    test id: user, pass: 1
  </div>
</template>

<script>
import LocalStorageManager from '@/LocalStorageManager';
import http from '@/services/http';
import { SHOW_ALERT_ACTION } from '@/store/modules/alert/action';

export default {
  data() {
    return {
      loginId: '',
      password: '',
      isWrong: false,
    };
  },
  methods: {
    onClickSubmit() {
      this.submit();
    },
    onEnterKey() {
      this.submit();
    },
    submit() {
      const loginId = this.loginId.trim();
      const password = this.password.trim();

      if (!loginId || !password) return;

      const obj = {
        loginId: loginId,
        password: password,
      };
      this.postLogin(obj);
    },
    async postLogin(obj) {
      // fake call
      const { loginId, password } = obj;

      const isSuccess = loginId === 'user' && password === '1';

      if (!isSuccess) {
        this.$store.dispatch(SHOW_ALERT_ACTION, { text: 'failed' });
        return;
      }

      const result = {
        token: '12345',
        refreshToken: '67890',
        isAdmin: false,
        loginId: 'kobe',
      };
      LocalStorageManager.shared.setLoginData(result);

      const toPath = this.$route.query.redirect;

      this.$router.push({
        path: toPath || this.$routerPath.HOME,
      });
    },
  },
};
</script>
