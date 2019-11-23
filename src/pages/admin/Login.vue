<template>
  <div>
    login
  </div>
</template>

<script>
import LocalStorageManager from '@/LocalStorageManager'

export default {
  name: 'Login',
  data() {
    return {
      userId: '',
      password: '',
      isWrong: false,
    }
  },
}
</script>