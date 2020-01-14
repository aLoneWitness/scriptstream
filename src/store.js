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
      state.status = 'success'
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
      return new Promise((resolve, reject) => {
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
          /*eslint no-console: ["error", { allow: ["warn", "error"] }] */
          localStorage.setItem('token', response.data)
          commit('auth_success', response.data, user)
          resolve(response)
        }).catch(err => {
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout({commit}){
      commit('logout')
      localStorage.removeItem('token')
    },
  },
  getters : {
    isLoggedIn: state => {
      return !!state.token
    },

    getToken: state => {
      return state.token
    }
  }
})