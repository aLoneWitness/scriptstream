import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
  },
  mutations: {
    // AUTH
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
    },
  },
  actions: {
    login({commit}, googleUser){
      var token = googleUser.getAuthResponse().id_token
      var user = googleUser.getBasicProfile()

      var postData = {
        gToken: token
      }

      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
      };

      axios.post('http://localhost:2000/rest/auth/login', postData, axiosConfig)
      .then(response => {
        localStorage.setItem('token', response.data)

        commit('auth_success', token, user)
      })
    },
    logout({commit}){
      commit('logout')
      localStorage.removeItem('token')
    },
  },
  getters : {
    isLoggedIn: state => !!state.token,
    getToken: state => {
      return state.token
    }
  }
})