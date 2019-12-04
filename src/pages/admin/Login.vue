<template>
  <div>
    login
    <Input :value.sync="loginId" />
    <Input :value.sync="password" type="password" @onEnterKey="onEnterKey" />
    <button @click="onClickSubmit">login</button>
  </div>
</template>

<script>
import LocalStorageManager from '@/LocalStorageManager';
import ApiService from '@/services/ApiService';

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
      const result = await ApiService.shared.login(obj);

      if (result.code !== '200') {
        alert(result.text);
        return;
      }

      LocalStorageManager.shared.setLoginData(result.data);

      const toPath = this.$route.query.redirect;

      this.$router.push({
        path: toPath || this.$routerPath.HOME,
      });
    },
  },
};
</script>
