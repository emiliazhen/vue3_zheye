<template>
  <div class="post-detail-page">
    <modal title="删除文章" :visible="modalIsVisible"
      @modal-on-close="modalIsVisible = false"
      @modal-on-confirm="hideAndDelete"
    >
      <p>确定要删除这篇文章吗？</p>
    </modal>
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img :src="currentPost.imageUrl" alt="currentPost.title" class="rounded-lg img-fluid my-4" v-if="currentPost.imageUrl">
      <h2 class="mb-4">{{currentPost.title}}</h2>
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <div class="col">
          <user-profile :user="currentPost.author" v-if="typeof currentPost.author === 'object'"></user-profile>
        </div>
        <span class="text-muted col text-right font-italic">发表于：{{currentPost.createdAt}}</span>
      </div>
      <div>{{currentPost.content}}</div>
      <div v-if="showEditArea" class="btn-group mt-5">
        <router-link
          type="button"
          class="btn btn-success"
          :to="{name: 'createPost', query: { id: currentPost._id}}"
        >
          编辑
        </router-link>
        <button type="button" class="btn btn-danger" @click.prevent="modalIsVisible = true">删除</button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { API_POST_GET } from '@/api'
import store from '@/store'
import userProfile from '@/components/userProfile.vue'
import modal from '@/components/modal.vue'

export default defineComponent({
  components: {
    userProfile,
    modal
  },
  setup () {
    const route = useRoute()
    const showEditArea = ref(false)
    const currentPost = reactive({
      _id: '',
      title: '',
      author: {
        avatar: {
          url: ''
        }
      },
      createdAt: '',
      content: '',
      imageUrl: ''
    })
    const modalIsVisible = ref(false)
    const hideAndDelete = () => {
      modalIsVisible.value = false
    }
    onMounted(() => {
      API_POST_GET({ id: route.params.id as string }).then(res => {
        if (res.status === 200) {
          const { _id, title, author, createdAt, content, image } = res.data.data
          currentPost._id = _id
          currentPost.title = title
          currentPost.author = author
          currentPost.createdAt = createdAt
          currentPost.content = content
          currentPost.imageUrl = image ? (image.url || '') : ''
          showEditArea.value = author._id === store.state.user._id
        }
      })
    })
    return {
      currentPost,
      showEditArea,
      modalIsVisible,
      hideAndDelete
    }
  }
})
</script>
