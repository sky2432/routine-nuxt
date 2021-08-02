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

export default Vue.extend({
  props: {
    value: {
      type: String,
    },
  },
})
</script>
