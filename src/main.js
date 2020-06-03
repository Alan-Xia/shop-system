import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Router from 'vue-router'
import store from './store';
import axios from './plugins/request';
import base from './plugins/base'
import './assets/scss/public.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

require('./tool/filter')
Vue.mixin(base)
Vue.use(ElementUI)
const routepush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routepush.call(this,location).catch(error => error)
}
Vue.prototype.$api = axios

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
