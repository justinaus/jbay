<template>
  <li>
    <td>{{ rowData.userId }}</td>
    <td>{{ rowData.id }}</td>
    <td>
      <router-link :to="toPath">
        <span v-html="rowData.title"></span>
      </router-link>
    </td>
    <td>{{ rowData.completed }}</td>
  </li>
</template>

<script>
import ListLineMixin from "@/mixins/ListLineMixin";

import { makeQueryStringByObject } from "jodash";

export default {
  mixins: [ListLineMixin],
  props: {
    rowData: Object
  },
  computed: {
    toPath() {
      const { id } = this.rowData;
      return this.getDetailPagePath(this.$routerPath.BID, id);
    }
  }
};
</script>
