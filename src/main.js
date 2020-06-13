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
// 树形菜单展开行
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

require('./tool/filter')
Vue.mixin(base)
Vue.use(ElementUI)

Vue.component('tree-table', TreeTable)
// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)

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
