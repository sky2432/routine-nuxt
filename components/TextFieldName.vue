<template>
  <BaseTextField
    :name="name"
    :rules="rules"
    vid="name"
    :counter="counter"
    :icon="icon"
    :label="label"
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
  name: string
  label: string
  icon: string
  rules: string
  counter: number
}

export default Vue.extend({
  props: {
    value: {
      type: String,
    },
    name: {
      type: String,
      default: '名前',
    },
    label: {
      type: String,
      default: 'Name',
    },
    icon: {
      type: String,
      default: 'mdi-account',
    },
    rules: {
      type: String,
      default: 'required|min:2|max:10',
    },
    counter: {
      type: Number,
      default: 10,
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>
