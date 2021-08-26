import { createStore, Store, useStore as useVuxStore } from 'vuex'
import { IRootstate, IStoreType } from './roottype'
import login from './login/login'
import system from './main/system/system'

import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootstate>({
  state() {
    return {
      name: 'lang',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entirMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entirMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 请求数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      // {list:department}  给list 起别名 叫 department
      const { list: department } = departmentResult.data

      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: role } = roleResult.data
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menulist } = menuResult.data
      // 保存数据
      commit('changeEntireDepartment', department)
      commit('changeEntireRole', role)
      commit('changeEntireMenu', menulist)
    }
  },
  modules: {
    login,
    system
  }
})

export function setupStore() {
  store.dispatch('login/loadLoaclLogin')
}

// 这个函数是为了 定义 store 的类型属性
export function useStore(): Store<IStoreType> {
  return useVuxStore()
}

export default store
