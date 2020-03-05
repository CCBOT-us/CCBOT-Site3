import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import Vuex from 'vuex';
import BootstrapVue from "bootstrap-vue";

import userpage_page_layout from './components/layout/user/page.vue';
import userpage_base_layout from './components/layout/user/base.vue';

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(Vuex)

Vue.component('userpage_page_layout', userpage_page_layout)
Vue.component('userpage_base_layout', userpage_base_layout)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
