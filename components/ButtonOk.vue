<template>
  <v-btn
    :class="btnClass"
    color="primary"
    :loading="loading"
    :disabled="disabled"
    icon
    x-large
    @click="$emit('click')"
  >
    <v-icon>mdi-circle-double</v-icon>
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
  loading: boolean
  disabled: boolean
}

export default Vue.extend({
  props: {
    btnClass: {
      type: String,
      default: null,
    },
    loading: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>
