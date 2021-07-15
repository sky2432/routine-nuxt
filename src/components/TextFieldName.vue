<template>
  <BaseTextField
    :name="name"
    rules="required|min:2|max:10"
    vid="name"
    :counter="10"
    :icon="icon"
    :label="label"
    :value="value"
    @input="$emit('input', $event)"
  ></BaseTextField>
</template>

<script lang="ts">
import Vue from 'vue'

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
  },
})
</script>
