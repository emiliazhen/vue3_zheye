<template>
  <div class="dropdown" ref="dropdownRef">
    <a class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">{{ title }}</a>
    <ul class="dropdown-menu" :style="{display: 'block'}" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '@/hooks/useClickOutside'
export default defineComponent({
  name: 'dropDown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    const dropdownRef = ref<null | HTMLElement>(null)
    const isOutside = useClickOutside(dropdownRef)
    watch(isOutside, () => {
      if (isOutside.value && isOpen.value) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      toggleOpen,
      dropdownRef
    }
  }
})
</script>
