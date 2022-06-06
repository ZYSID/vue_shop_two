import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    addN (state, n) {
      state.count += n
    },
  },
  actions: {
    increment (context, n) {
      setTimeout(() => {
        context.commit('addN', n)
      }, 1000)
    }
  },
  getters: {
    showNum (state) {
      return '当前数量：' + state.count
    }
  }
})