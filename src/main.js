// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from 'store'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import VueJsDialog from 'vuejs-dialog'
import Global from '@/components/tool/global'
import PagePart from '@/components/tool/page-part'
import 'element-ui/lib/theme-chalk/index.css'
import 'lib-flexible'
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'

Vue.use(ElementUI, {size: 'small', zIndex: 3000})
Vue.use(VueCookies)
Vue.use(VueJsDialog)
Vue.use(VideoPlayer)
Vue.filter('addZero', function (value) {
  try {
    return parseFloat(value).toFixed(2)
  } catch (e) {
    return 0.00
  }
})

Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.prototype.$global = Global
Vue.prototype.$part = PagePart

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前,格式化参数，增加token
  let data = config.data
  let params = new URLSearchParams()
  for (let key in config.data) {
    params.append(key, data[key])
  }
  // params.append("tokenStr", getTimes())
  config.data = params
  // config.headers['ipAddress'] = VueCookies.get('ip_address')
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
