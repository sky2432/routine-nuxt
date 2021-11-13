<template>
  <validation-provider
    v-slot="{ errors }"
    :name="name"
    :rules="rules"
    :vid="vid"
    :mode="mode"
  >
    <v-text-field
      :counter="counter"
      :error-messages="errors"
      :hint="hint"
      :label="label"
      :prepend-icon="icon"
      :prepend-inner-icon="innerIcon"
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
  hint: string
  label: string
  icon: string
  innerIcon: string
  value: string
  mode: string
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
    },
    vid: {
      type: String,
    },
    counter: {
      type: Number,
    },
    hint: {
      type: String,
    },
    label: {
      type: String,
    },
    icon: {
      type: String,
    },
    innerIcon: {
      type: String,
    },
    value: {
      type: String,
    },
    mode: {
      type: String,
    },
    details: {
      type: Boolean,
      default: false,
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>
