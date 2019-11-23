<template>
  <div>
    login
    <Input :value.sync="userId" />
    <Input :value.sync="password" type="password" />
  </div>
</template>

<script>
import LocalStorageManager from '@/LocalStorageManager'

export default {
  data() {
    return {
      userId: '',
      password: '',
      isWrong: false,
    }
  },
}
</script>