<template>
  <div class="d-flex justify-content-center" v-if="isLoading">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div class="column-detail-page w-75 mx-auto" v-else>
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar.fitUrl || require('@/assets/avatar.jpg')" :alt="column.title" class="rounded-circle border">
      </div>
      <div class="col-9">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, computed } from 'vue'
import store, { PostProps } from '@/store'
import postList from '@/components/postList.vue'
import { useRoute } from 'vue-router'
import {
  API_COLUMN_GET,
  API_POST_COLUMNS_GETS
} from '@/api'
interface DataInterface {
  column: {
    avatar: string;
  };
  list: PostProps[];
}
export default defineComponent({
  components: {
    postList
  },
  setup () {
    const data: DataInterface = reactive({
      column: {
        avatar: ''
      },
      list: []
    })
    const route = useRoute()
    onMounted(() => {
      API_COLUMN_GET({ id: route.params.id as string }).then(res => {
        const obj = res.data.data
        if (obj.avatar && obj.avatar.url) {
          obj.avatar.fitUrl = `${obj.avatar.url}?x-oss-process=image/resize,m_pad,h_100,w_100`
        }
        data.column = obj
      })
      API_POST_COLUMNS_GETS({ id: route.params.id as string }).then(res => {
        data.list = res.data.data.list
      })
    })
    const isLoading = computed(() => store.state.isLoading)
    const refData = toRefs(data)
    return {
      ...refData,
      isLoading
    }
  }
})
</script>

<style scoped>
.text-center img{
  width: 100px;
  height: 100px;
}
</style>
