// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from 'store'
import ElementUI from 'element-ui'
import axios from 'axios'
import global_ from '@/components/tool/Global'
import VueJsDialog from "vuejs-dialog"
import 'element-ui/lib/theme-chalk/index.css'
import 'lib-flexible'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(VueJsDialog)

Vue.prototype.$axios = axios
Vue.prototype.GLOBAL = global_
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前,格式化参数，增加token
  let data = config.data
  let params = new URLSearchParams()
  for (var key in config.data) {
    params.append(key, data[key])
  }
  // params.append("tokenStr", getTimes())
  config.data = params
  return config
}, function (error) {
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
