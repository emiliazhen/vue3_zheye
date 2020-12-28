<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="@/assets/callout.svg" alt="callout" class="w-50"/>
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link to="/createPost" class="btn btn-primary my-2">开始写文章</router-link>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <div class="d-flex justify-content-center" v-if="isLoading">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <column-list :list="list" v-else></column-list>
    <button
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25"
    >
      加载更多
    </button>

  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import columnList from '@/components/columnList.vue'
import { API_COLUMN_GETS } from '@/api'
import store from '@/store'
export default defineComponent({
  components: {
    columnList
  },
  setup () {
    const data = reactive({
      list: []
    })
    const isLoading = computed(() => store.state.isLoading)
    onMounted(() => {
      API_COLUMN_GETS({
        currentPage: 1,
        pageSize: 6
      }).then(res => {
        if (res.status === 200) {
          data.list = res.data.data.list
        }
      })
    })
    const refData = toRefs(data)
    return {
      ...refData,
      isLoading
    }
  }
})
</script>
