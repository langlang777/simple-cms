import { Module } from 'vuex'
import { ISystemState } from './type'
import { IRootstate } from '@/store/roottype'

import { getPageListData } from '@/service/main/system/system'
const systemModule: Module<ISystemState, IRootstate> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  mutations: {
    changeUserList(state, List: any[]) {
      state.userList = List
    },
    changeUserCount(state, Count: number) {
      state.userCount = Count
    },
    changeRoleList(state, List: any[]) {
      state.userList = List
    },
    changeRoleCount(state, Count: number) {
      state.userCount = Count
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName
      // const pageUrl = `/${pageName}/list` 如果api 写的好可以直接拼接
      let pageUrl = ''
      switch (pageName) {
        case 'User':
          pageUrl = '/users/list'
          break
        case 'Role':
          pageUrl = '/role/list'
          break
      }
      //1.对页面进行请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      console.log(pageResult)
      const { list, totalCount } = pageResult.data
      commit(`change${pageName}List`, list)
      commit(`change${pageName}Count`, totalCount)
    }
  }
}

export default systemModule
