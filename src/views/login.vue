<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到者也</h5>
    <validate-form @form-submit="onFormSubmit">
      <validate-input :rules="emailRules" type="email" placeholder="请输入邮箱" v-model="emailValue"></validate-input>
      <validate-input :rules="passwordRules" type="password" placeholder="请输入密码" v-model="passwordValue"></validate-input>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import validateInput, { RulesProp } from '@/components/validateInput.vue'
import ValidateForm from '@/components/validateForm.vue'
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
const passwordRules: RulesProp = [
  {
    type: 'required',
    message: '密码不能为空'
  }
]
const emailValue = ref('')
const passwordValue = ref('')
export default defineComponent({
  components: {
    validateInput,
    ValidateForm
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const onFormSubmit = (validate: boolean) => {
      if (validate) {
        router.push('/')
        store.commit('LOGIN')
      }
    }
    return {
      emailRules,
      emailValue,
      passwordRules,
      passwordValue,
      onFormSubmit
    }
  }
})
</script>
