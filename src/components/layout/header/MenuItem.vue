<template>
  <li :class="{ selected: isSelected }">
    <router-link :to='link'>{{ text }}</router-link>
  </li>
</template>

<script>
export default {
  props: {
    text: String,
    link: String,
    isSelected: Boolean,
  },
}
</script>

<style scoped>
  .selected {
    color: orange;
  }

  a {
    color:inherit;
    text-decoration: none;
  }
</style>