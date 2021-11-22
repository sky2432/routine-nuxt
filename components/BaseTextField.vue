<template>
  <validation-provider
    v-slot="{ errors }"
    :name="name"
    :rules="rules"
    :vid="vid"
  >
    <v-text-field
      :counter="counter"
      :error-messages="errors"
      :label="label"
      :prepend-icon="icon"
      required
      :value="value"
      :hide-details="details"
      @input="$emit('input', $event)"
    ></v-text-field>
  </validation-provider>
</template>

<script lang="ts">
import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'

interface DataType {}

interface MethodType {}

interface ComputedType {}

interface PropsType {
  name: string
  rules: string
  vid: string
  counter: number
  label: string
  icon: string
  value: string
  details: boolean
}

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
    },
    rules: {
      type: String,
      required: true,
    },
    vid: {
      type: String,
      required: true,
    },
    counter: {
      type: Number,
      default: null,
    },
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: ''
    },
    details: {
      type: Boolean,
      default: false,
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>
