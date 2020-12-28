<template>
  <div class="file-upload">
    <button class="btn btn-primary" @click.prevent="clickUpload">
      <span v-if="fileStatus === 'loading'">Loading...</span>
      <span v-else-if="fileStatus === 'success'">上传成功</span>
      <span v-else-if="fileStatus === 'error'">上传失败</span>
      <span v-else>上传</span>
    </button>
    <input type="file" @change="fileChange" class="file-input d-none" ref="fileInput">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { API_FILE_UPLOAD } from '@/api'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
export default defineComponent({
  setup () {
    const fileStatus = ref<UploadStatus>('ready')
    const fileInput = ref<null | HTMLInputElement>(null)
    const clickUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const fileChange = (e: Event) => {
      const taget = e.target as HTMLInputElement
      if (taget.files) {
        fileStatus.value = 'loading'
        const files = Array.from(taget.files)
        const formData = new FormData()
        formData.append('file', files[0])
        API_FILE_UPLOAD(formData).then(res => {
          if (res.status === 200) {
            fileStatus.value = 'success'
          }
        }).catch(() => {
          fileStatus.value = 'error'
        }).finally(() => {
          if (fileInput.value) {
            fileInput.value.value = ''
          }
        })
      }
    }
    return {
      fileChange,
      clickUpload,
      fileInput,
      fileStatus
    }
  }
})
</script>
