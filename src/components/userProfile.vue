<template>
  <div class="user-profile-component">
    <div class="d-flex align-items-center">
      <img :src="user.avatar.url ? user.avatar.url + '?x-oss-process=image/resize,m_pad,h_50,w_50' : require('@/assets/avatar.jpg')" :alt="user.nickName" class="rounded-circle img-thumbnail">
      <div class="detail ml-2">
        <h6 class="d-block mb-0">{{user.nickName}}</h6>
        <span class="text-truncate text-muted d-block">{{user.description}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    user: {
      required: true,
      type: Object
    }
  }
})
</script>
