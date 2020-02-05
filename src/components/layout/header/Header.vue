<template>
  <div>
    header
    <ul>
      <MenuItem
        v-for="item in menuDataList"
        :key="item.id"
        :text="item.text"
        :link="item.link"
        :isSelected="item.id === selectedMenuId"
        :arrSub="item.arrSub"
        :selectedSubMenuId="selectedSubMenuId"
      />
    </ul>
    <button @click="onClickLogout">Logout</button>
  </div>
</template>

<script>
import MenuItem from './MenuItem';

import { menu as adminMenu } from '@/constants/admin/menu';
import { menu as userMenu } from '@/constants/user/menu';

import LocalStorageManager from '@/LocalStorageManager';

export default {
  components: {
    MenuItem,
  },
  data() {
    return {
      menuDataList: [],
      selectedMenuId: null,
      selectedSubMenuId: null,
    };
  },
  beforeMount() {
    const isAdmin = LocalStorageManager.shared.getIsAdmin();

    this.menuDataList = isAdmin ? adminMenu : userMenu;

    const { menuId, subMenuId } = this.$route.meta;
    this.selectedMenuId = menuId;
    if (subMenuId) this.selectedSubMenuId = subMenuId;
  },
  methods: {
    onClickLogout() {
      const isAdmin = LocalStorageManager.shared.getIsAdmin();

      const path = isAdmin
        ? this.$routerPath.ADMIN_LOGIN
        : this.$routerPath.USER_LOGIN;

      LocalStorageManager.shared.clear();

      this.$router.push({ path });
    },
  },
};
</script>
