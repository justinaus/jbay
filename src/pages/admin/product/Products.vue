<template>
  <PageLayout>
    <div class="container">
      <ProductFilterBar />
      <Table
        :dataList="dataList"
        :currentPageIndex="currentPageIndex"
        :maxRowCount="maxRowCount"
        :maxPaginationCount="maxPaginationCount"
        :totalPageCount="totalPageCount"
        @onChangePage="onChangePage"
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
import ProductListLine from '@/components/admin/product/ProductListLine';
import ProductFilterBar from '@/components/admin/product/ProductFilterBar';

import ListPageMixin from '@/mixins/ListPageMixin';

export default {
  mixins: [ListPageMixin],
  components: {
    ProductListLine,
    ProductFilterBar,
  },
  data() {
    return {
      apiPath: this.$apiPath.PRODUCTS,
    };
  },
  beforeMount() {
    this.getData();
  },
};
</script>

<style scoped>
.container {
  width: 600px;
}
</style>
