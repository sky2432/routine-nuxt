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
      default: 'required|min:2|max:10'
    },
    counter: {
      default: 10,
    }
  },
})
</script>
