<template>
  <div class="validate-input-container pb-3">
    <input class="form-control" :class="{'is-invalid': inputRef.error}" :value="inputRef.val" @blur="validateInput" v-bind="$attrs" @input="updateValue">
    <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue'
interface RuleInterface {
  type: 'required' | 'email';
  message: string;
}
export type RulesProp = RuleInterface[]
export default defineComponent({
  inheritAttrs: false,
  props: {
    rules: {
      type: Array as PropType<RulesProp>
    },
    modelValue: {
      type: String
    }
  },
  setup (props, ctx) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    const validateInput = () => {
      if (props.rules) {
        inputRef.error = props.rules.some(r => {
          let isError = false
          switch (r.type) {
            case 'required':
              isError = inputRef.val.trim() === ''
              break
            case 'email':
              isError = !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputRef.val)
              break
            default:
              break
          }
          inputRef.message = r.message
          return isError
        })
      }
    }
    const updateValue = (e: KeyboardEvent) => {
      const v = (e.target as HTMLInputElement).value
      inputRef.val = v
      ctx.emit('update:modelValue', v)
    }
    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>
