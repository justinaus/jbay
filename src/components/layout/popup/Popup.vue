<template>
  <div class="modal" v-scroll-lock="isModalMode">
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isModalMode: true
    };
  },
  beforeDestroy() {
    this.isModalMode = false;
  }
};
</script>

<style scoped>
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
</style>
