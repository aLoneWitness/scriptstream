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
import axios from 'axios';

axios.interceptors.request.use(function(config) {
  const token = store.state.token;
  config.headers.Authorization = "Bearer" + token
  return config;
})

Vue.use(Loading)


// BOOTSTRAP STUFF

// app.js
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
