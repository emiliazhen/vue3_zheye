<template>
  <div class="validate-input-container pb-3">
    <input v-model="inputRef.val" class="form-control" :class="{'is-invalid': inputRef.error}" v-bind="$attrs" v-if="tag !== 'textarea'">
    <textarea v-model="inputRef.val" class="form-control" :class="{'is-invalid': inputRef.error}"  v-bind="$attrs" v-else/>
    <span v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted, computed } from 'vue'
import { emitter } from '@/components/validateForm.vue'
interface RuleInterface {
  type: 'required' | 'email' | 'custom';
  message: string;
  validator?: () => boolean;
}
export type RulesProp = RuleInterface[]
export type TagType = 'input' | 'textarea'
export default defineComponent({
  inheritAttrs: false,
  props: {
    rules: {
      type: Array as PropType<RulesProp>
    },
    modelValue: {
      type: String
    },
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  setup (props, ctx) {
    const inputRef = reactive({
      val: computed({
        get: () => props.modelValue || '',
        set: val => {
          ctx.emit('update:modelValue', val)
        }
      }),
      error: false,
      message: ''
    })
    const validateInput = () => {
      let validate = true
      if (props.rules) {
        validate = props.rules.every(r => {
          let noError = true
          switch (r.type) {
            case 'required':
              noError = inputRef.val.trim() !== ''
              break
            case 'email':
              noError = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputRef.val)
              break
            case 'custom':
              noError = r.validator ? r.validator() : true
              break
            default:
              break
          }
          inputRef.message = r.message
          return noError
        })
      }
      inputRef.error = !validate
      return validate
    }
    const updateValue = (e: KeyboardEvent) => {
      const v = (e.target as HTMLInputElement).value
      inputRef.val = v
      ctx.emit('update:modelValue', v)
    }
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>
