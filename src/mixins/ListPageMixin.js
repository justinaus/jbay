import PageMixin from './PageMixin';

import ApiService from '@/services/ApiService';

import { makeQueryStringByObject } from 'jodash';

import { SHOW_ALERT_ACTION } from '@/store/modules/alert/action';

import { board } from '@/constants/options';

const ListPageMixin = {
  mixins: [PageMixin],
  data() {
    return {
      list: [],
      maxRowCount: board.DEFAULT_ROW_COUNT,
      maxPaginationCount: board.DEFAULT_PAGINATION_COUNT,
      totalPageCount: 0,
      currentPageIndex: 0,
    };
  },
  methods: {
    async getData() {
      // 임시.
      const path = `/todos`;

      const queryCloned = Object.assign({}, this.$route.query);

      if (!queryCloned._start)
        queryCloned._start = this.currentPageIndex * this.maxRowCount;
      if (!queryCloned._limit) queryCloned._limit = this.maxRowCount;

      const strQuery = makeQueryStringByObject(queryCloned);

      const result = await ApiService.shared.getData(path + strQuery);

      const { list, totalCount } = result;

      if (!list || !totalCount) {
        this.$store.dispatch(SHOW_ALERT_ACTION, { text: String(result) });
        return;
      }

      this.totalPageCount = Math.ceil(totalCount / this.maxRowCount);
      this.list = list;
    },
  },
};

export default ListPageMixin;
