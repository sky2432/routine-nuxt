<template>
  <v-btn :class="btnClass" color="red" icon x-large @click="$emit('click')">
    <v-icon>mdi-close-circle-outline</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    btnClass: {
      type: String,
    },
  },
})
</script>
