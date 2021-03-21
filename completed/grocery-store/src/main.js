import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mock from './mock-data.js'

// keep?
Vue.config.productionTip = false

let data = {
  products: mock,
  cart: [],
  cartSize: 0,
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
