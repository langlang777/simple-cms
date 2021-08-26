import { Module } from 'vuex'
import { ISystemState } from './type'
import { IRootstate } from '@/store/roottype'

import {
  deletePageData,
  getPageListData,
  createPageData,
  editPageData
} from '@/service/main/system/system'
const systemModule: Module<ISystemState, IRootstate> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuCount: 0,
      menuList: []
    }
  },
  mutations: {
    changeUsersList(state, List: any[]) {
      state.usersList = List
    },
    changeUsersCount(state, Count: number) {
      state.usersCount = Count
    },
    changeRoleList(state, List: any[]) {
      state.roleList = List
    },
    changeRoleCount(state, Count: number) {
      state.roleCount = Count
    },
    changeGoodsList(state, List: any[]) {
      state.goodsList = List
    },
    changeGoodsCount(state, Count: number) {
      state.goodsCount = Count
    },
    changeMenuList(state, List: any[]) {
      state.menuList = List
    },
    changeMenuCount(state, Count: number) {
      state.menuCount = Count
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName
      console.log(payload)

      // 如果api 写的好可以直接拼接
      const pageUrl = `/${pageName}/list`
      // let pageUrl = ''
      // switch (pageName) {
      //   case 'User':
      //     pageUrl = '/users/list'
      //     break
      //   case 'Role':
      //     pageUrl = '/role/list'
      //     break
      // }

      //1.对页面进行请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageResult.data
      console.log(pageResult.data)

      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },
    async deletePageDataAction(context, payload: any) {
      // context 拥有state、getters、commit、dispatch
      // https://segmentfault.com/q/1010000021401719
      // 1.获取pagename 和 id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      // 2.调用网络请求
      await deletePageData(pageUrl)
      // 3.重新请求最新数据
      context.dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async createPageDataAction({ dispatch }, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload
      console.log(newData)

      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)

      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async editPageDataAction({ dispatch }, payload: any) {
      // 1.编辑数据的请求
      const { pageName, editData, id } = payload
      console.log(editData)
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)

      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
