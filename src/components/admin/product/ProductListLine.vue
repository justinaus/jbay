<template>
  <tr>
    <td>{{ rowData.id }}</td>
    <td>{{ rowData.userId }}</td>
    <!-- 링크, 말줄임. -->
    <td class="ellipsis">{{ rowData.title }}</td>
    <td>{{ rowData.completed ? 'Y' : 'N' }}</td>
  </tr>
</template>

<script>
import ListLineMixin from '@/mixins/ListLineMixin';

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
};
</script>
