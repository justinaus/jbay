<template>
  <PageLayout>
    <div class="container">User products</div>
  </PageLayout>
</template>

<script>
import ListPageMixin from '@/mixins/ListPageMixin';

export default {
  mixins: [ListPageMixin],
  methods: {
    checkByQuery() {},
  },
};
</script>

<style scoped>
.container {
  width: 600px;
}
</style>
