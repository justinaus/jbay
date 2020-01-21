<template>
  <PageLayout>
    products
    <div class="container">
      <Table
        :dataList="dataList"
        :currentPageIndex="currentPageIndex"
        :maxRowCount="maxRowCount"
        :maxPaginationCount="maxPaginationCount"
        :totalPageCount="totalPageCount"
      >
        <template v-slot:colgroup>
          <col style="width: 40px;" />
          <col style="width: 40px;" />
          <col style="width: 100px;" />
          <col style="width: 40px;" />
        </template>
        <template v-slot:tr>
          <th>id</th>
          <th>userId</th>
          <th>title</th>
          <th>completed</th>
        </template>
        <template v-slot:rows>
          <ProductListLine
            v-for="item in dataList"
            :key="item.id"
            :rowData="item"
          />
        </template>
      </Table>
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from '@/components/layout/PageLayout';
import Table from '@/components/common/table/Table';
import ProductListLine from '@/components/admin/product/ProductListLine';

import ListPageMixin from '@/mixins/ListPageMixin';

import ApiService from '@/services/ApiService';

import { board } from '@/constants/options';

import { SHOW_ALERT_ACTION } from '@/store/modules/alert/action';

export default {
  mixins: [ListPageMixin],
  components: {
    PageLayout,
    Table,
    ProductListLine,
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
      // this.currentPageIndex = 1;

      const startIndex = this.currentPageIndex * this.maxRowCount;
      const path = `${this.$apiPath.PRODUCTS}?_start=${startIndex}&_limit=${
        this.maxRowCount
      }`;

      const result = await ApiService.shared.getData(path);

      this.totalPageCount = result.totalCount;
      this.dataList = result.list;
    },
  },
};
</script>

<style scoped>
.container {
  width: 600px;
}
</style>
