import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import routerPath from './router/routerPath';
import store from './store';
import apiPath from './services/apiPath';

import jvc from '@justinaus/vue-components';
import '@justinaus/vue-components/dist/justinaus.css';

import * as filters from './filters/filters';

import VScrollLock from 'v-scroll-lock';

Vue.config.productionTip = false;

Vue.prototype.$routerPath = routerPath;
Vue.prototype.$apiPath = apiPath;

Vue.use(jvc.Plugin);
Vue.use(VScrollLock);

Object.keys(filters).forEach(function(key) {
  Vue.filter(key, filters[key]);
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
