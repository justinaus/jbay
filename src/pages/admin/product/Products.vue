<template>
  <PageLayout>
    products
    <Table
      :dataList="dataList"
      :currentPageIndex="currentPageIndex"
      :maxRowCount="maxRowCount"
      :maxPaginationCount="maxPaginationCount"
      :totalPageCount="totalPageCount"
    >
      <template v-slot:rows>
        <div>123</div>
      </template>
    </Table>
  </PageLayout>
</template>

<script>
import PageLayout from '@/components/layout/PageLayout';
import Table from '@/components/common/table/Table';

import ListPageMixin from '@/mixins/ListPageMixin';

import ApiService from '@/services/ApiService';

import { board } from '@/constants/options';

import { SHOW_ALERT_ACTION } from '@/store/modules/alert/action';

export default {
  mixins: [ListPageMixin],
  components: {
    PageLayout,
    Table,
  },
  data() {
    return {
      dataList: [],
      currentPageIndex: 0,
      totalPageCount: 0,
      maxRowCount: board.DEFAULT_ROW_COUNT,
      maxPaginationCount: board.DEFAULT_PAGINATION_COUNT,
    };
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    async getData() {
      this.currentPageIndex = 1;

      const startIndex = this.currentPageIndex * this.maxRowCount;
      const path = `${this.$apiPath.PRODUCTS}?_start=${startIndex + 1}&_limit=${
        this.maxRowCount
      }`;

      const result = await ApiService.shared.getData(path);

      this.totalPageCount = result.totalCount;
      this.dataList = result.list;
    },
  },
};
</script>
