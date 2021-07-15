<template>
  <BaseTextField
    name="メールアドレス"
    rules="required|email|max:255"
    vid="email"
    icon="mdi-email"
    label="E-mail"
    :mode="mode"
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
    mode: {
      type: String,
    },
  },
})
</script>
