<template>
  <div class="file-upload">
    <div class="w-100 text-center file-upload-content" @click.prevent="clickUpload">
      <slot name="loading" v-if="fileStatus === 'loading'">
        Loading...
      </slot>
      <slot name="success" v-else-if="fileStatus === 'success'">
        上传成功
      </slot>
      <slot name="error" v-else-if="fileStatus === 'error'">
        上传失败
      </slot>
      <slot name="default" v-else>
        点击上传
      </slot>
    </div>
    <input type="file" @change="fileChange" class="file-input d-none" ref="fileInput">
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { API_FILE_UPLOAD } from '@/api'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
export default defineComponent({
  props: {
    beforeUpload: {
      type: Function as PropType<(file: File) => boolean>
    }
  },
  emits: ['success'],
  setup (props, content) {
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
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0])
          if (!result) {
            fileStatus.value = 'ready'
            return
          }
        }
        const formData = new FormData()
        formData.append('file', files[0])
        API_FILE_UPLOAD(formData).then(res => {
          if (res.status === 200) {
            fileStatus.value = 'success'
            content.emit('success', res.data.data.url)
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

<style scoped>
.file-upload-content{
  background-color: #f5f5f5;
  height: 240px;
  color: #999;
}
</style>
