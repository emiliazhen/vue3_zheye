<template>
  <div class="create-post-page">
    <h4>{{isEditMode ? '编辑文章' : '新建文章'}}</h4>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" type="text"/>
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input rows="10" tag="textarea" placeholder="请输入文章详情" :rules="contentRules" v-model="contentVal"/>
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">{{isEditMode ? '更新文章' : '发表文章'}}</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import validateInput, { RulesProp } from '@/components/validateInput.vue'
import validateForm from '@/components/validateForm.vue'

export default defineComponent({
  components: {
    validateInput,
    validateForm
  },
  setup () {
    const route = useRoute()
    const isEditMode = !!route.params.id
    const onFormSubmit = () => {
      console.log('submit')
    }
    const titleRules: RulesProp = [
      {
        type: 'required',
        message: '请输入文章标题'
      }
    ]
    const contentRules: RulesProp = [
      {
        type: 'required',
        message: '请输入文章内容'
      }
    ]
    const titleVal = ref('')
    const contentVal = ref('')
    return {
      isEditMode,
      onFormSubmit,
      titleRules,
      contentRules,
      titleVal,
      contentVal
    }
  }
})
</script>
