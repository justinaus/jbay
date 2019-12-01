<template>
  <PageLayout>
    bids
  </PageLayout>
</template>

<script>
import PageLayout from '@/components/layout/PageLayout'

import ListPageMixin from '@/mixins/ListPageMixin'

export default {
  mixins: [
    ListPageMixin,
  ],
  components: {
    PageLayout,
  },
  beforeMount() {
    this.getData();
  }
}
</script>