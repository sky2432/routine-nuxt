<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card tile>
      <v-card-title class="justify-center">
        <slot name="title"></slot>
      </v-card-title>
      <v-divider></v-divider>
      <validation-observer ref="addobserver" v-slot="{ invalid }">
        <v-card-text>
          <TextFieldRoutine
            :value="value"
            @input="$emit('input', $event)"
          ></TextFieldRoutine>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-center">
          <ButtonOk
            :loading="loading"
            :disabled="invalid"
            @click="$emit('click')"
          ></ButtonOk>
          <ButtonCancel btn-class="ml-16" @click="dialog = false"></ButtonCancel>
        </v-card-actions>
      </validation-observer>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import { ValidationObserver } from 'vee-validate'

interface DataType {
  dialog: boolean
  loading: boolean
}

interface MethodType {
  resetForm(): void
  openDialog(): void
  closeDialog(): void
  startLoading(): void
  stopLoading(): void
  refsAddObserver(): any
}

interface ComputedType {}

interface PropsType {
  value: string
}

export default Vue.extend({
  props: {
    value: {
      type: String,
      required: true,
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

    resetForm() {
      this.$nextTick(() => {
        this.refsAddObserver().reset()
      })
    },

    // コンポーネント要素の型定義
    refsAddObserver() {
      return this.$refs.addobserver as InstanceType<typeof ValidationObserver>
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>

<style scoped>
::v-deep .v-dialog {
  border-radius: 0px;
}
</style>
