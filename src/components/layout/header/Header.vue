<template>
  <div>
    header
    <ul>
      <MenuItem v-for="item in menuDataList" :key="item.id"
        :text="item.text"
        :link="item.link"
        :isSelected="item.id === selectedMenuId"
        :arrSub="item.arrSub"
        :selectedSubMenuId="selectedSubMenuId" />
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
      selectedMenuId: null,
      selectedSubMenuId: null,
    }
  },
  beforeMount() {
    this.menuDataList = adminMenu;

    const { menuId, subMenuId } = this.$route.meta;
    this.selectedMenuId = menuId;
    if( subMenuId ) this.selectedSubMenuId = subMenuId;
  }
}
</script>
