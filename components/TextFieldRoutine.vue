<template>
  <BaseTextField
    name="習慣名"
    rules="required"
    vid="name"
    label="Name"
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
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>
