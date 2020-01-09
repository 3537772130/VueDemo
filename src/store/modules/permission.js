import { asyncRoutes, constantRoutes } from '@/router'
import { getUserMenu } from '@/api/auth'

/**
 * 判断路由是否与当前用户权限匹配
 *
 * @param route 当前配置的菜单路由
 * @param codes 用户拥有的菜单
 */
function hasPermission(route, codes) {
  if (route.name) {
    return codes.includes(route.name)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 *
 * @param asyncRoutes 当前配置的菜单路由
 * @param userMenu 用户可访问菜单
 * @param codes 用户拥有的菜单
 * @returns {*}
 */
export function filterAsyncRoutes(asyncRoutes, userMenu, codes) {
  return asyncRoutes.filter(route => {
    if (hasPermission(route, codes)) {
      if (route.children) {
        route.children = filterAsyncRoutes(route.children, userMenu, codes)
      }
      return true
    }
    return false
  })
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(async resolve => {
      const { data } = await getUserMenu()
      const codes = []
      const handleMenuCode = menus => {
        if (menus.name) codes.push(menus.name)
        if (menus.children) menus.children.forEach(it => handleMenuCode(it))
      }
      data.forEach(it => handleMenuCode(it))
      // TODO const accessedRoutes = filterAsyncRoutes(asyncRoutes, data, codes)
      commit('SET_ROUTES', asyncRoutes)
      resolve(asyncRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
