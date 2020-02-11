import {
  GET_PRODUCT_STATUS_LIST,
  GET_PRODUCT_TYPE_LIST,
  PRODUCT_LIST_ACTION,
} from './action';
import {
  PRODUCT_STATUS_LIST_MUTAION,
  PRODUCT_TYPE_LIST_MUTAION,
} from './mutation';

export default {
  state: {
    statusList: [],
    typeList: [],
  },
  actions: {
    async [GET_PRODUCT_STATUS_LIST](context) {
      if (context.state.statusList.length > 0) return; // 한번만 호출.

      await new Promise(resolve => setTimeout(resolve, 500));

      const arr = [
        { id: 0, text: 'status0' },
        { id: 1, text: 'status1' },
        { id: 2, text: 'status2' },
      ];

      this.commit({
        type: PRODUCT_STATUS_LIST_MUTAION,
        items: arr,
      });
    },
    async [GET_PRODUCT_TYPE_LIST](context) {
      if (context.state.typeList.length > 0) return; // 한번만 호출.

      await new Promise(resolve => setTimeout(resolve, 500));

      const arr = [
        { id: 0, text: 'type0' },
        { id: 1, text: 'type1' },
        { id: 2, text: 'type2' },
        { id: 3, text: 'type3' },
      ];

      this.commit({
        type: PRODUCT_TYPE_LIST_MUTAION,
        items: arr,
      });
    },
    async [PRODUCT_LIST_ACTION](context) {
      await context.dispatch(GET_PRODUCT_STATUS_LIST);

      await context.dispatch(GET_PRODUCT_TYPE_LIST);
    },
  },
  mutations: {
    [PRODUCT_STATUS_LIST_MUTAION](state, payload) {
      state.statusList = payload.items;
    },
    [PRODUCT_TYPE_LIST_MUTAION](state, payload) {
      state.typeList = payload.items;
    },
  },
};

export { GET_PRODUCT_STATUS_LIST, GET_PRODUCT_TYPE_LIST, PRODUCT_LIST_ACTION };
