<template>
  <v-dialog v-model="dialog" :max-width="maxWidth"  :persistent="persistent">
    <v-card tile>
      <v-card-title :class="titleClass">
        <slot name="title"></slot>
      </v-card-title>
      <v-divider v-if="divider" class="pb-5"></v-divider>
      <v-card-text v-if="text" :class="textClass">
        <slot name="text"></slot>
      </v-card-text>
      <v-divider v-if="divider"></v-divider>
      <v-card-actions v-if="actions" :class="actionsClass">
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
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'

interface DataType {
  dialog: boolean
}

interface MethodType {
  openDialog(): void
  closeDialog(): void
}

interface ComputedType {}

interface PropsType {
  defaultButtonType: string
  text: boolean
  actions: boolean
  titleClass: string
  textClass: string
  actionsClass: string
  persistent: boolean
  maxWidth: string
  divider: boolean
}

export default Vue.extend({
  props: {
    // 'ok' or 'cancel'
    defaultButtonType: {
      type: String,
      required: true,
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
      required: true,
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
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>

<style scoped>
::v-deep .v-dialog {
  border-radius: 0px;
}
</style>
