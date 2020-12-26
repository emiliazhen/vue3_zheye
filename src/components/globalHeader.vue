<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link class="navbar-brand" to="/">ZheYe</router-link>
    <div v-if="user.isLogin">
      <dropdown :title="`你好，${user.name}`">
        <dropdown-item>新建文章</dropdown-item>
        <dropdown-item disabled>编辑文章</dropdown-item>
        <dropdown-item>退出登录</dropdown-item>
      </dropdown>
    </div>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登录</router-link></li>
      <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">注册</router-link></li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import dropdown from './dropdown.vue'
import dropdownItem from './dropdownItem.vue'
export default defineComponent({
  name: 'golbalHeader',
  setup () {
    const store = useStore()
    const user = computed(() => store.state.user)
    console.log(store.state.user)
    return {
      user
    }
  },
  components: {
    dropdown,
    dropdownItem
  }
})
</script>
