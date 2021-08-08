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
          <ButtonCancel btnClass="ml-16" @click="dialog = false"></ButtonCancel>
        </v-card-actions>
      </validation-observer>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidationObserver } from 'vee-validate'

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
    resetForm() {
      this.$nextTick(() => {
        this.addobserver().reset()
      })
    },

    addobserver() {
      return this.$refs.addobserver as InstanceType<typeof ValidationObserver>
    },

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

<style scoped>
/deep/ .v-dialog {
  border-radius: 0px;
}
</style>
