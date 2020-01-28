<template>
  <PageLayout>
    <div class="container">
      <BidsFilterBar
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
        </template>
        <template v-slot:tr>
          <th>id</th>
          <th>userId</th>
          <th>title</th>
        </template>
        <template v-slot:rows>
          <BidsLine v-for="item in dataList" :key="item.id" :rowData="item" />
        </template>
        <template v-slot:empty>
          <div>No Data</div>
        </template>
      </Table>
    </div>
  </PageLayout>
</template>

<script>
import BidsLine from '@/components/admin/bid/BidsLine';
import BidsFilterBar from '@/components/admin/bid/BidsFilterBar';

import ListPageMixin from '@/mixins/ListPageMixin';

export default {
  mixins: [ListPageMixin],
  components: {
    BidsLine,
    BidsFilterBar,
  },
  data() {
    return {
      apiPath: this.$apiPath.BIDS,
      radioDatas: [{ id: 'id' }, { id: 'userId' }, { id: 'title' }],
      defaultRadioId: 'userId',
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
