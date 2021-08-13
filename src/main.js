import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import 'es6-promise/auto'
import './assets/tailwind.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
