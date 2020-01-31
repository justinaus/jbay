import PageLayout from '@/components/layout/PageLayout';
import Table from '@/components/common/table/Table';
import PageMixin from './PageMixin';
import { SHOW_ALERT_ACTION } from '@/store/modules/alert/action';
import { makeQueryStringByObject } from 'jodash';
import { board } from '@/constants/options';
import http from '@/services/http';

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

      http
        .get(path)
        .then(response => {
          const totalCount = response.headers['x-total-count'];

          if (!totalCount) return;

          const nTotalCount = Number.parseInt(totalCount);

          this.totalPageCount = Math.ceil(nTotalCount / this.maxRowCount);
          this.dataList = response.data;
        })
        .catch(error => {
          this.$store.dispatch(SHOW_ALERT_ACTION, { text: String(error) });
        });
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
