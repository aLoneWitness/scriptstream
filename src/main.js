import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'prismjs'
import 'prismjs/themes/prism.css'
// import { defineCustomElements } from 'snippet-highlight/dist/loader';

Vue.config.productionTip = false

// defineCustomElements(window);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
