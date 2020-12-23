<template>
  <global-header :user="user"></global-header>
  <div class="container">
    <column-list :list="list"></column-list>
    <validate-input :rules="emailRules" type="email" placeholder="请输入邮箱" v-model="emailValue"></validate-input>
    <validate-input type="password" placeholder="请输入密码" v-model="passwordValue"></validate-input>
    <button @click="printValue">val</button>
  </div>
</template>

<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import { defineComponent, ref } from 'vue'
import columnList, { ColumnItemInterface } from './components/columnList.vue'
import globalHeader, { HeaderPropInterface } from './components/globalHeader.vue'
import validateInput, { RulesProp } from './components/validateInput.vue'
const testDataList: ColumnItemInterface[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 5,
    title: 'test5的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧'
  },
  {
    id: 6,
    title: 'test6的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
]
const user: HeaderPropInterface = {
  id: 0,
  name: 'xxxx',
  isLogined: true
}
const emailRules: RulesProp = [
  {
    type: 'required',
    message: '电子邮箱地址不能为空'
  },
  {
    type: 'email',
    message: '请输入正确的邮箱地址'
  }
]
const emailValue = ref('')
const passwordValue = ref('')
const printValue = () => {
  console.log(emailValue.value)
  console.log(passwordValue.value)
}
export default defineComponent({
  name: 'App',
  components: {
    columnList,
    globalHeader,
    validateInput
  },
  setup () {
    return {
      user,
      list: testDataList,
      emailRules,
      emailValue,
      passwordValue,
      printValue
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
