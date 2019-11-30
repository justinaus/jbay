<template>
  <Popup>
    <header>
      <h5>{{ popAlertTitle }}</h5>
    </header>
    <div class="content">{{ popAlertText }}</div>
    <footer>
      <b-button variant="primary" @click="onClickPrimary">{{ popAlertBtnPrimaryText }}</b-button>
      <b-button variant="secondary" v-if="isYN" @click="onClickSecondary">{{ popAlertBtnSecondaryText }}</b-button>
    </footer>
  </Popup>
</template>

<script>
import Popup from '@/components/layout/popup/Popup'

import { HIDE_ALERT_ACTION } from '@/store/modules/alert/action'

export default {
  components: {
    Popup,
  },
  props: {
    isYN: Boolean,
    popAlertText: String,
    popAlertTitle: {
      type: String,
      default: 'Alert',
    },
    popAlertBtnPrimaryText: {
      type: String,
      default: 'Ok',
    },
    popAlertBtnSecondaryText: {
      type: String,
      default: 'Cancel',
    },
    funcClickPrimary: Function,
    funcClickSecondary: Function,
  },
  methods: {
    onClickPrimary() {
      this.$store.dispatch( HIDE_ALERT_ACTION );

      if( this.funcClickPrimary ) this.funcClickPrimary();
    },
    onClickSecondary() {
      this.$store.dispatch( HIDE_ALERT_ACTION );

      if( this.funcClickSecondary ) this.funcClickSecondary();
    },
  }
}
</script>

<style scoped>
header {
  padding: 10px;
}
footer {
  padding: 10px;
  display: flex;
  justify-content: center;
}
.content {
  padding: 10px;
}
button {
  margin: 2px;
}
</style>