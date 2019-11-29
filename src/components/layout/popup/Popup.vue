<template>
  <div class="pop_layer">
    <slot />
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
  .pop_layer {
    background-color:rgba(0, 0, 0, .5);
    position: fixed;
    top:0;bottom:0;left:0;right:0;
    /* width: 100%;
    height: 100%;
    z-index: 100;
    display: inline-block; */
  }
</style>