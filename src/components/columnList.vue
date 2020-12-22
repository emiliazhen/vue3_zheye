<template>
  <div class="row">
    <div v-for="item in list" :key="item.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="item.avatar || require('@/assets/default-avatar.png')" :alt="item.title" class="rounded-circle border border-light w-25 my-3">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text text-left">{{ item.description }}</p>
          <a href="#" class="btn btn-outline-primary">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export interface ColumnItemInterface {
  id: number;
  title: string;
  description: string;
  avatar?: string;
}
export default defineComponent({
  name: 'columnList',
  props: {
    list: {
      type: Array as PropType<ColumnItemInterface[]>,
      required: true
    }
  }
})
</script>
