<template>
  <PageLayout>
    <div class="container">
      <ProductFilterBar
        :radioDatas="radioDatas"
        :defaultRadioId="defaultRadioId"
        :defaultInputValue="defaultInputValue"
        @onSearch="onSearch"
      />
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
        <template v-slot:empty>
          <div>No Data</div>
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
      radioDatas: [
        { id: 'id', text: 'id' },
        { id: 'userId', text: 'userId' },
        { id: 'title', text: 'title' },
        { id: 'completed', text: 'completed' },
      ],
      defaultRadioId: 'title',
      defaultInputValue: '',
    };
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    checkByQuery() {
      const query = this.$route.query;

      if (query.id) {
        this.defaultRadioId = 'id';
        this.defaultInputValue = query.id;
      } else if (query.userId) {
        this.defaultRadioId = 'userId';
        this.defaultInputValue = query.userId;
      } else if (query.title) {
        this.defaultRadioId = 'title';
        this.defaultInputValue = query.title;
      } else if (query.completed) {
        this.defaultRadioId = 'completed';
        this.defaultInputValue = query.completed;
      }
    },
    getSearchParams(obj) {
      const { radioId, inputValue } = obj;

      let params = {};

      params[radioId] = inputValue;

      return params;
    },
  },
};
</script>

<style scoped>
.container {
  width: 600px;
}
</style>
