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
import { mapMenusToRoutes } from '@/utils/map-menus'
// <模块类型，根组件类型>
const loginMoudle: Module<IloginState, IRootstate> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
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
      mapMenusToRoutes(userMenus)
      //将routes => router.main.children
    }
  },
  actions: {
    async acountLoginAction({ commit }, payload: IAccount) {
      //1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload) // 调用这个函数 请求post
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token) // 本地保存

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
    loadLoaclLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
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
