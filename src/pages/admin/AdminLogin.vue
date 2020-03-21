<template>
  <div>
    Admin Login
    <div>
      <Input :value.sync="loginId" />
      <Input :value.sync="password" type="password" @onEnterKey="onEnterKey" />
      <button @click="onClickSubmit">login</button>
    </div>
    test id: admin, pass: 1
  </div>
</template>

<script>
import LocalStorageManager from '@/LocalStorageManager';
import http from '@/services/http';
import { SHOW_ALERT_ACTION } from '@/store/modules/alert/action';
import Input from '@/components/common/input/Input';

export default {
  components: {
    Input,
  },
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

      // vue-router.esm.js?8c4f:2051 Uncaught (in promise) undefined
      // 로그인 후 홈으로 push -> beforeEnter에서 isadmin에 따라 다른 페이지 오픈.
      // 근데 이런 오류 메시지가 뜸.
      // 이전에 확인한 router replace - navigationduplicated 에러와 관련이 있는 것 같다.

      this.$router
        .push({
          path: toPath || this.$routerPath.HOME,
        })
        .catch(err => {});
    },
  },
};
</script>
