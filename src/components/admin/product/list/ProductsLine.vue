<template>
  <tr>
    <td>{{ rowData.id }}</td>
    <td>{{ rowData.userId }}</td>
    <td class="ellipsis">
      <router-link :to="toPath">{{ rowData.title }}</router-link>
    </td>
    <td>{{ rowData.completed ? 'Y' : 'N' }}</td>
  </tr>
</template>

<script>
import ListLineMixin from '@/mixins/ListLineMixin';

import { makePathWithQuery } from '@/utils/urlUtils';

export default {
  mixins: [ListLineMixin],
  components: {},
  props: {
    rowData: {
      id: Number,
      userId: Number,
      title: String,
      completed: Boolean,
    },
  },
  computed: {
    toPath() {
      const { id } = this.rowData;
      if (!id) return '';

      const ret = makePathWithQuery(
        this.$routerPath.PRODUCT,
        id,
        this.$route.query,
      );
      return ret;
    },
  },
};
</script>
