import { createStore, Store, useStore as useVuxStore } from 'vuex'
import { IRootstate, IStoreType } from './roottype'
import login from './login/login'

const store = createStore<IRootstate>({
  state() {
    return {
      name: 'lang',
      age: 18
    }
  },
  mutations: {},
  actions: {},
  modules: {
    login
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
