import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Login from '@/views/home/login'
import Main from '@/views/home/main-info'
import Register from '@/views/home/register'
import Test from '@/views/home/test'
import Echarts from '@/views/home/echarts'
import PageDefault from '@/views/applet/page/page-default.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/echarts',
      name: 'echarts',
      component: Echarts
    },
    {
      path: '/page-default',
      name: 'page-default',
      component: PageDefault
    }
  ]
})
