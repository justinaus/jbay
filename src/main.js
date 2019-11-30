import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import routerPath from './router/routerPath'
import store from './store'
import apiPath from './services/apiPath'

import jvc from '@justinaus/vue-components'
import '@justinaus/vue-components/dist/justinaus.css'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VScrollLock from 'v-scroll-lock'

Vue.config.productionTip = false

Vue.prototype.$routerPath = routerPath;
Vue.prototype.$apiPath = apiPath;

Vue.use(jvc.Plugin)
Vue.use(BootstrapVue)
Vue.use(VScrollLock)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
