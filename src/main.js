import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'prismjs'
import 'prismjs/themes/prism.css'
// import { defineCustomElements } from 'snippet-highlight/dist/loader';

Vue.config.productionTip = false
// defineCustomElements(window);

import Loading from 'vue-loading-overlay'
import "vue-loading-overlay/dist/vue-loading.css";

Vue.use(Loading)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
