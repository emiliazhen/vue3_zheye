import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import fetch from '@/utils/fetch'
import home from '@/views/home.vue'
import login from '@/views/login.vue'
import signUp from '@/views/signUp.vue'
import columnDetail from '@/views/columnDetail.vue'
import createPost from '@/views/createPost.vue'
import postDetail from '@/views/postDetail.vue'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        redirectAlreadyLogin: true
      }
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/columnDetail/:id',
      name: 'columnDetail',
      component: columnDetail
    },
    {
      path: '/createPost',
      name: 'createPost',
      component: createPost,
      meta: {
        requiredLogin: true
      }
    },
    {
      path: '/postDetail/:id',
      name: 'postDetail',
      component: postDetail
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!user.isLogin) {
    if (token) {
      fetch.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchUserInfo').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(() => {
        store.commit('logout')
        next('login')
      })
    } else {
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
