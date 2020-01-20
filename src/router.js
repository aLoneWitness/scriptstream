import Vue from 'vue'
import Router from 'vue-router'

import Project from './views/Project.vue'
import Login from './views/Login.vue'
import store from './store'
import Dashboard from './views/Dashboard.vue'
import axios from 'axios'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/project/:uuid',
      name: 'project',
      component: Project,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: {
        mounted() {
          this.$store.dispatch('logout')
          this.$router.push('/')
        }
      },
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(store.getters.isLoggedIn) {
      axios.get("http://localhost:2000/rest/auth/verify")
      .then(() => {
        next()
      })
      .catch(() => {
        next('/logout')
      })
      
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
