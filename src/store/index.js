import Vue from "vue";
import Vuex from "vuex";

import alert from "./modules/alert/alert";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    alert
  }
});
