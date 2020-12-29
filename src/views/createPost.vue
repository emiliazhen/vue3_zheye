<template>
  <div class="create-post-page">
    <h4>{{isEditMode ? '编辑文章' : '新建文章'}}</h4>
    <uploader class="mb-3" @success="successUpload" :beforeUpload="beforeUpload">
      <template #loading>
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </template>
      <template #success>
        <img :src="fileUrl" alt="" >
      </template>
    </uploader>
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
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import store from '@/store'
import {
  API_POST_CREATE,
  API_POST_GET,
  API_POST_UPDATE
} from '@/api'
import validateInput, { RulesProp } from '@/components/validateInput.vue'
import validateForm from '@/components/validateForm.vue'
import Uploader from '@/components/uploader.vue'
import createMessage from '@/components/createMessage'
import { beforeUploadCheck } from '@/utils/beforeUploadCheck'

type uploadType = 'image/png' | 'image/jpg'
export default defineComponent({
  components: {
    validateInput,
    validateForm,
    Uploader
  },
  setup () {
    const route = useRoute()
    const currentPostId = route.query.id as string || ''
    const isEditMode = !!currentPostId
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
    const fileUrl = ref('')
    const successUpload = (url: string) => {
      fileUrl.value = url
    }
    const beforeUpload = (file: File) => {
      const res = beforeUploadCheck(file, { format: ['image/png', 'image/jpg', 'image/jpeg'], size: 1 })
      switch (res) {
        case 'format':
          createMessage('上传图片只能是JPG/PNG格式', 'error')
          return false
        case 'size':
          createMessage('上传图片大小不能超过1M', 'error')
          return false
        default:
          return true
      }
    }
    const onFormSubmit = (validate: boolean) => {
      if (validate) {
        API_POST_CREATE({
          title: titleVal.value,
          content: contentVal.value,
          image: fileUrl.value,
          column: store.state.user.column,
          author: store.state.user._id
        }).then(res => {
          console.log(res)
        })
        API_POST_UPDATE({
          id: currentPostId,
          title: titleVal.value,
          content: contentVal.value,
          image: fileUrl.value
        }).then(res => {
          console.log(res)
        })
      }
    }
    onMounted(() => {
      API_POST_GET({ id: currentPostId }).then(res => {
        if (res.status === 200) {
          const { title, content, image } = res.data.data
          titleVal.value = title
          contentVal.value = content
          fileUrl.value = image ? (image.url || '') : ''
        }
      })
    })
    return {
      isEditMode,
      onFormSubmit,
      titleRules,
      contentRules,
      titleVal,
      contentVal,
      fileUrl,
      successUpload,
      beforeUpload
    }
  }
})
</script>

<style scoped>
.file-upload-content img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
