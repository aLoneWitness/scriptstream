import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user) {
      state.status = 'sucess'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    login({commit}, googleUser){
      var token = googleUser.getAuthResponse().id_token
      var user = googleUser.getBasicProfile()
      localStorage.setItem('token', token)
      commit('auth_success', token, user)
    },
    logout({commit}){
      commit('logout')
      localStorage.removeItem('token')
    }
  },
  getters : {
    isLoggedIn: state => !!state.token
  }
})