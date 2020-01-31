import Vue from 'vue';
import Vuex from 'vuex';

import alert from './modules/alert/alert';
import product from './modules/product/product';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    alert,
    product,
  },
});
