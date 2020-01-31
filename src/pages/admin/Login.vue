<template>
  <div>
    login
    <Input :value.sync="loginId" />
    <Input :value.sync="password" type="password" @onEnterKey="onEnterKey" />
    <button @click="onClickSubmit">login</button>
    test id: admin, pass: 1
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

      const isSuccess = loginId === 'admin' && password === '1';

      if (!isSuccess) {
        this.$store.dispatch(SHOW_ALERT_ACTION, { text: 'failed' });
        return;
      }

      const result = {
        token: 'abcde',
        refreshToken: 'fghij',
        isAdmin: true,
        loginId: 'justinaus',
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
