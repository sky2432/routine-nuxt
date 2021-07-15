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
      required
      :value="value"
      @input="$emit('input', $event)"
    ></v-text-field>
  </validation-provider>
</template>

<script lang="ts">
import Vue from 'vue'

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
      required: true,
    },
    counter: {
      type: Number,
    },
    hint: {
      type: String,
    },
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    value: {
      type: String,
    },
    mode: {
      type: String,
    }
  }
})
</script>
