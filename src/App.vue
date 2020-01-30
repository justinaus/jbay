<template>
  <div id="app">
    <router-view></router-view>
    <!-- 여기 공용 팝업.
    pagelayout을 안타는 페이지도 있다. ex) login, join.
    -->
    <PopAlert
      v-if="isPopAlertVisible"
      :isYN="false"
      :popAlertText="popAlertText"
      :popAlertTitle="popAlertTitle"
      :popAlertBtnPrimaryText="popAlertBtnPrimaryText"
      :popAlertBtnSecondaryText="popAlertBtnSecondaryText"
    />
  </div>
</template>

<script>
import PopAlert from '@/components/common/PopAlert';

import { mapState } from 'vuex';

export default {
  name: 'app',
  components: {
    PopAlert,
  },
  computed: {
    ...mapState({
      isPopAlertVisible: state => state.alert.isVisible,
      popAlertTitle: state => state.alert.title,
      popAlertText: state => state.alert.text,
      popAlertBtnPrimaryText: state => state.alert.btnPrimaryText,
      popAlertBtnSecondaryText: state => state.alert.btnSecondaryText,
      onClickPopAlertPrimary: state => state.alert.onClickPrimary,
      onClickPopAlertSecondary: state => state.alert.onClickSecondary,
    }),
  },
};
</script>

<style>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

table {
  width: 100%;
  min-width: 100%;
  table-layout: fixed;
}

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
  /* word-break:break-all; */
}
</style>
