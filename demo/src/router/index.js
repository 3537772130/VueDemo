import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Login from '@/views/login'
import Main from '@/views/main-info'
import userInfo from '@/views/personal/user-info'
import Register from '@/views/register'
import Test from '@/views/test'
import Echarts from '@/views/echarts'

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
      path: '/user-info',
      name: 'user-info',
      component: userInfo
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
    }
  ]
})
