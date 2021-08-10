import { createStore } from 'vuex'
import { IRootstate } from './roottype'
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

export default store
