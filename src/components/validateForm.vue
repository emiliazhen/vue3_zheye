<template>
  <form validate-form-container>
    <slot></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type=submit class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt, { Emitter } from 'mitt'
export const emitter: Emitter = mitt()
type ValidateFunc = () => boolean
export default defineComponent({
  emits: ['form-submit'],
  setup (props, ctx) {
    let funArr: ValidateFunc[] = []
    const callback = (func?: ValidateFunc) => {
      func && funArr.push(func)
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funArr = []
    })
    const submitForm = () => {
      const result = funArr.map((v: ValidateFunc) => v()).every(r => r)
      ctx.emit('form-submit', result)
    }
    return {
      submitForm
    }
  }
})
</script>
