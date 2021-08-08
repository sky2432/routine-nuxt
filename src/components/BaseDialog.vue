<template>
  <v-dialog :max-width="maxWidth" v-model="dialog" :persistent="persistent">
    <v-card>
      <v-card-title :class="titleClass">
        <slot name="title"></slot>
      </v-card-title>
      <v-divider v-if="divider" class="pb-5"></v-divider>
      <v-card-text v-if="text" :class="textClass">
        <slot name="text"></slot>
      </v-card-text>
      <v-divider v-if="divider"></v-divider>
      <v-card-actions :class="actionsClass" v-if="actions">
        <slot name="leftButton"></slot>
        <slot name="defaultButton">
          <ButtonOk v-if="defaultButtonType === 'ok'" @click="dialog = false">
          </ButtonOk>
          <ButtonCancel
            v-if="defaultButtonType === 'cancel'"
            @click="dialog = false"
          >
          </ButtonCancel>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    defaultButtonType: {
      type: String,
    },
    text: {
      type: Boolean,
      default: false,
    },
    actions: {
      type: Boolean,
      default: true,
    },
    titleClass: {
      type: String,
      default: 'justify-center',
    },
    textClass: {
      type: String,
    },
    actionsClass: {
      type: String,
      default: 'justify-center',
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: String,
      default: '500px',
    },
    divider: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      dialog: false,
    }
  },

  methods: {
    openDialog() {
      this.dialog = true
    },

    closeDialog() {
      this.dialog = false
    },
  },
})
</script>
