<template>
  <li>
    <router-link :to='link'>{{ text }}</router-link>
  </li>
</template>

<script>
export default {
  props: {
    text: String,
    link: String,
  },
}
</script>
