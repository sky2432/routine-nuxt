<template>
  <BaseTextField
    name="メールアドレス"
    rules="required|email|max:255"
    vid="email"
    icon="mdi-email"
    label="E-mail"
    :value="value"
    @input="$emit('input', $event)"
  ></BaseTextField>
</template>

<script lang="ts">
import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'

interface DataType {}

interface MethodType {}

interface ComputedType {}

interface PropsType {
  value: string
}

export default Vue.extend({
  props: {
    value: {
      type: String,
      default: ''
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>
