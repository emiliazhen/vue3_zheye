<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">ZheYe</a>
    <div v-if="user.isLogined">
      <dropdown :title="`你好，${user.name}`">
        <dropdown-item>新建文章</dropdown-item>
        <dropdown-item disabled>编辑文章</dropdown-item>
        <dropdown-item>退出登录</dropdown-item>
      </dropdown>
    </div>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">登录</a></li>
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">注册</a></li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import dropdown from './dropdown.vue'
import dropdownItem from './dropdownItem.vue'
export interface HeaderPropInterface{
  id?: number;
  name?: string;
  isLogined: boolean;
}
export default defineComponent({
  name: 'golbalHeader',
  props: {
    user: {
      type: Object as PropType<HeaderPropInterface>,
      required: true
    }
  },
  setup () {
    return {
    }
  },
  components: {
    dropdown,
    dropdownItem
  }
})
</script>
