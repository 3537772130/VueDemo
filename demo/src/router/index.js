import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Login from '@/views/login'
import Main from '@/views/main-info'
import BottomMenu from '@/views/common/bottom-menu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Index' // 默认路径
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main-info',
      name: 'main-info',
      component: Main
    },
    {
      path: '/bottom-menu',
      name: 'bottom-menu',
      component: BottomMenu
    }
  ]
})
