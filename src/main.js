import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueResource);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
