import { IloginState } from './type'
import { IRootstate } from '../roottype'
import { IAccount } from '@/service/login/type'

import router from '@/router' //拿到router对象
import { Module } from 'vuex'
import localCache from '@/utils/cache'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'
// <模块类型，根组件类型>
const loginMoudle: Module<IloginState, IRootstate> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      //userMenus => routes
      const routes = mapMenusToRoutes(userMenus)
      // console.log(routes)

      //将routes => router.main.children
      routes.forEach((route) => {
        // 这个方法会 找到 name 为 main 的路由 然后添加到他的 children
        router.addRoute('Main', route)
      })

      // 获取用户权限
      const permission = mapMenusToPermissions(userMenus)
      state.permissions = permission
    }
  },
  actions: {
    async acountLoginAction({ commit, dispatch }, payload: IAccount) {
      //1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload) // 调用这个函数 请求post
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token) // 本地保存
      // 发送初始化请求
      // 添加 null, { root: true } 表示调根的 action
      dispatch('getInitialDataAction', null, { root: true })

      //2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      //3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      //4.获取完信息跳转首页
      router.push('/main')
    },
    // 重置 store数据 避免用户刷新后 vuex 的数据 消失
    loadLoaclLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 添加 null, { root: true } 表示调根的 action
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')

      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginMoudle
