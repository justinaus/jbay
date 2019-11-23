<template>
  <li :class="{ selected: isSelected && !hasSubMenu }">
    <router-link :to='link'>{{ text }}</router-link>
    <ul v-if="hasSubMenu">
      <MenuItem v-for="item in arrSub" :key="item.id"
        :text="item.text"
        :link="item.link"
        :isSelected="item.id === selectedSubMenuId" />
    </ul>
  </li>
</template>

<script>
import MenuItem from './MenuItem'

export default {
  name: 'MenuItem',
  components: {
    MenuItem
  },
  props: {
    text: String,
    link: String,
    isSelected: Boolean,
    arrSub: Array,
    selectedSubMenuId: String,
  },
  computed: {
    hasSubMenu() {
      return this.arrSub && this.arrSub.length > 0;
    }
  }
}
</script>

<style scoped>

a {
  color: inherit;
  text-decoration: none;
}

.selected a {
  color: orange;
}
</style>