<template>
  <v-btn :class="btnClass" color="red" icon x-large @click="$emit('click')">
    <v-icon>mdi-close-circle-outline</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'

interface DataType {}

interface MethodType {}

interface ComputedType {}

interface PropsType {
  btnClass: string
}

export default Vue.extend({
  props: {
    btnClass: {
      type: String,
      default: null,
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>
