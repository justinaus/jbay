import PageLayout from '@/components/layout/PageLayout';
import Table from '@/components/common/table/Table';
import PageMixin from './PageMixin';
import ApiService from '@/services/ApiService';
import { SHOW_ALERT_ACTION } from '@/store/modules/alert/action';
import { makeQueryStringByObject } from 'jodash';
import { board } from '@/constants/options';

const ListPageMixin = {
  mixins: [PageMixin],
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
    this.checkByQuery();
  },
  methods: {
    getParams() {
      const queryCloned = Object.assign({}, this.$route.query);

      // 필수 값.
      if (!queryCloned._start) {
        queryCloned._start = this.currentPageIndex * this.maxRowCount;
      }
      if (!queryCloned._limit) {
        queryCloned._limit = this.maxRowCount;
      }

      const ret = makeQueryStringByObject(queryCloned);
      return ret;
    },
    async getData() {
      const params = this.getParams();
      const path = `${this.apiPath}${params}`;

      const result = await ApiService.shared.getData(path);

      const { list, totalCount } = result;

      // if (!list || !totalCount) {
      //   this.$store.dispatch(SHOW_ALERT_ACTION, { text: String(result) });
      //   return;
      // }

      this.totalPageCount = Math.ceil(totalCount / this.maxRowCount);
      this.dataList = list;
    },
    onSearch(obj) {
      this.reset();

      const params = this.getSearchParams(obj);

      params._start = 0;

      // navigationduplicated 에러 때문에 catch.
      this.$router.replace({ query: params }).catch(err => {});

      this.getData();
    },
    reset() {
      // this.dataList = [];
      this.currentPageIndex = 0;
      // this.totalPageCount = 0;
    },
    onChangePage(pageIndex) {
      const params = {
        _start: pageIndex * this.maxRowCount,
      };

      let query = Object.assign({}, this.$route.query, params);

      this.$router.replace({ query: query });

      this.currentPageIndex = pageIndex;

      this.getData();
    },
  },
};

export default ListPageMixin;
