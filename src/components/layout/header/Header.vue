<template>
  <div>
    header
    <ul>
      <MenuItem v-for="item in menuDataList" :key="item.menuId"
        :text="item.text"
        :link="item.link" />
    </ul>
  </div>
</template>

<script>
import MenuItem from './MenuItem'

import { menu as adminMenu } from '@/constants/admin/menu'

export default {
  components: {
    MenuItem,
  },
  data() {
    return {
      menuDataList: [],
    }
  },
  beforeMount() {
    this.menuDataList = adminMenu;
  }
}
</script>
