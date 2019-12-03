<template>
  <PageLayout>
    bids
    <Table 
      :dataList="list"
      :maxRowCount="maxRowCount"
      :maxPaginationCount="maxPaginationCount"
      :currentPageIndex="currentPageIndex"
      :totalPageCount="totalPageCount"
      :showPagination="false">
      <template v-slot:rows >
        <BidsLine v-for="item in list" :key="item.id" :rowData="item" />
      </template>
    </Table>
  </PageLayout>
</template>

<script>
import PageLayout from '@/components/layout/PageLayout'
import Table from '@/components/common/table/Table'
import BidsLine from '@/components/admin/bid/BidsLine'

import ListPageMixin from '@/mixins/ListPageMixin'

export default {
  mixins: [
    ListPageMixin,
  ],
  components: {
    PageLayout,
    Table,
    BidsLine,
  },
  beforeMount() {
    this.getData();
  }
}
</script>