import Vue from 'vue';
import Vuex from 'vuex';

import alert from './modules/alert/alert';
import progressbar from './modules/progressbar/progressbar';
import product, {
  GET_PRODUCT_STATUS_LIST,
  GET_PRODUCT_TYPE_LIST,
  PRODUCT_LIST_ACTION,
} from './modules/product/product';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    alert,
    progressbar,
    product,
  },
});

export { GET_PRODUCT_STATUS_LIST, GET_PRODUCT_TYPE_LIST, PRODUCT_LIST_ACTION };
