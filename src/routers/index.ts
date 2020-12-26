import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import home from '@/views/home.vue'
import login from '@/views/login.vue'
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
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next('/login')
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next('/')
  } else {
    next()
  }
})

export default router
