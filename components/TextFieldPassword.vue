<template>
  <validation-provider
    v-slot="{ errors }"
    :name="name"
    rules="required|min:4|max:255"
    :mode="mode"
    :vid="vid"
  >
    <v-text-field
      :error-messages="errors"
      :label="label"
      prepend-icon="mdi-key"
      :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      :type="showPassword ? 'text' : 'password'"
      :value="value"
      required
      @input="$emit('input', $event)"
      @click:append="showPassword = !showPassword"
    ></v-text-field>
  </validation-provider>
</template>

<script lang="ts">
import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'

interface DataType {
  showPassword: boolean
}

interface MethodType {}

interface ComputedType {}

interface PropsType {
  value: string
  name: string
  label: string
  vid: string
  mode: string
}

export default Vue.extend({
  props: {
    value: {
      type: String,
    },
    name: {
      type: String,
      default: 'パスワード',
    },
    label: {
      type: String,
      default: 'Password',
    },
    vid: {
      type: String,
      default: 'password',
    },
    mode: {
      type: String,
    },
  },

  data() {
    return {
      showPassword: false,
    }
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>
