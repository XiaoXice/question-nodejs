// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import vueResource from 'vue-resource';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'

import 'lib-flexible'

import VueWechatTitle from 'vue-wechat-title';  
Vue.use(VueWechatTitle)

import store from'./store';  // 引入全局变量组件

Vue.use(ElementUI);
Vue.use(vueResource);
Vue.http.options.emulateJSON = true;
Vue.config.productionTip = false
Vue.http.options.xhr = { withCredentials: true }
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})

