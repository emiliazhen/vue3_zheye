<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link class="navbar-brand" to="/">ZheYe</router-link>
    <div v-if="user.isLogin">
      <dropdown :title="`你好，${user.nickName}`">
        <dropdown-item @click="createPost">新建文章</dropdown-item>
        <dropdown-item @click="myCloumn">我的专栏</dropdown-item>
        <dropdown-item disabled>编辑文章</dropdown-item>
        <dropdown-item @click="logout">退出登录</dropdown-item>
      </dropdown>
    </div>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登录</router-link></li>
      <li class="list-inline-item"><router-link to="/signUp" class="btn btn-outline-light my-2">注册</router-link></li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import dropdown from './dropdown.vue'
import dropdownItem from './dropdownItem.vue'
export default defineComponent({
  name: 'golbalHeader',
  setup () {
    const store = useStore()
    const user = computed(() => store.state.user)
    const router = useRouter()
    const logout = () => {
      store.commit('logout')
    }
    const createPost = () => {
      router.push('/createPost')
    }
    const myCloumn = () => {
      router.push(`/columnDetail/${store.state.user.column}`)
    }
    return {
      user,
      logout,
      createPost,
      myCloumn
    }
  },
  components: {
    dropdown,
    dropdownItem
  }
})
</script>
