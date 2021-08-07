<template>
  <v-btn
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
export default Vue.extend({
  props: {
    btnClass: {
      type: String,
    },
    loading: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
  },
})
</script>
