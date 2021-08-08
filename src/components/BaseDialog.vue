<template>
  <v-dialog :max-width="maxWidth" v-model="dialog" :persistent="persistent">
    <v-card :loading="loading">
      <v-card-title :class="titleClass">
        <slot name="title"></slot>
        <template v-if="closeIcon">
          <v-spacer></v-spacer>
          <slot name="closeIcon">
            <v-btn icon @click="dialog = false"
              ><v-icon>mdi-window-close</v-icon></v-btn
            >
          </slot>
        </template>
      </v-card-title>
      <v-divider v-if="divider" class="pb-5"></v-divider>
      <v-card-text v-if="body" :class="textClass">
        <slot name="body"></slot>
      </v-card-text>
      <v-divider v-if="divider"></v-divider>
      <v-card-actions :class="actionsClass" v-if="button">
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
        <slot name="rightButton"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    body: {
      type: Boolean,
      default: false,
    },
    button: {
      type: Boolean,
      default: true,
    },
    defaultButtonType: {
      type: String,
    },
    titleClass: {
      type: String,
      default: 'justify-center',
    },
    actionsClass: {
      type: String,
      default: 'justify-center',
    },
    textClass: {
      type: String,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    maxWidth: {
      type: String,
      default: '500px',
    },
    closeIcon: {
      type: Boolean,
      default: false,
    },
    divider: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      dialog: false,
      loading: false,
    }
  },

  methods: {
    openDialog() {
      this.dialog = true
    },

    closeDialog() {
      this.dialog = false
    },

    startLoading() {
      this.loading = true
    },

    stopLoading() {
      this.loading = false
    },
  },
})
</script>
