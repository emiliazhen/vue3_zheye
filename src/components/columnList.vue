<template>
  <div class="row">
    <div v-for="item in list" :key="item._id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="item.avatar.url ? item.avatar.url + '?x-oss-process=image/resize,m_pad,h_50,w_50' : require('@/assets/avatar.jpg')" :alt="item.title" class="rounded-circle border border-light my-3">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text text-left">{{ item.description }}</p>
          <router-link :to="`/columnDetail/${item._id}`" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ColumnProps } from '@/store'
export default defineComponent({
  name: 'columnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  }
})
</script>

<style scoped>
.card-body img{
  height: 50px;
  width: 50px;
}
</style>
