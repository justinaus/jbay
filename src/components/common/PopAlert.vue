<template>
  <Popup>
    <div class="container">
      <div>{{ popAlertTitle }}</div>
      <div>{{ popAlertText }}</div>
      <button @click="onClickPrimary">{{ popAlertBtnPrimaryText }}</button>
      <button v-if="isYN" @click="onClickSecondary">{{ popAlertBtnSecondaryText }}</button>
    </div>
  </Popup>
</template>

<script>
import Popup from '@/components/layout/popup/Popup'

export default {
  components: {
    Popup,
  },
  props: {
    isYN: Boolean,
    popAlertTitle: String,
    popAlertText: String,
    popAlertBtnPrimaryText: String,
    popAlertBtnSecondaryText: String,
  },
  methods: {
    onClickPrimary() {
      this.$emit( 'onClickPrimary' );
    },
    onClickSecondary() {
      this.$emit( 'onClickSecondary' );
    },
  }
}
</script>

<style scoped>
  .container {
    background-color: white;
  }
</style>