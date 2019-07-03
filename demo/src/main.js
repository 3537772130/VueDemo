// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//导入iview
import iView from 'iview'
import 'iview/dist/styles/iview.css' // 使用 CSS
Vue.use(iView)
//导入axios异步请求
import axios from 'axios'
Vue.prototype.$axios = axios
//导入自定义全局变量
import global_ from './components/tool/Global'
Vue.prototype.GLOBAL = global_

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
