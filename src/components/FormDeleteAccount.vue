<template>
  <div>
    <v-card class="setting-card" tile>
      <div class="setting-content">
        <div>
          <v-alert
            class="text-center mx-auto mb-0"
            type="error"
            width="85%"
            text
          >
            <h3>必ずご確認ください</h3>
            <p class="mb-0 mt-1">
              アカウントを削除すると、これまでのデータはすべて削除されます。
            </p>
          </v-alert>
          <div class="text-center">
            <v-btn class="mt-2" color="red white--text" @click="openDialog">
              アカウントを削除
            </v-btn>
          </div>
        </div>
      </div>

      <BaseDialog
        ref="deleteDialog"
        :body="true"
        :divider="true"
        textClass="text-center"
        defaultButtonType="cancel"
      >
        <template #title>Confirm</template>
        <template #body>本当にアカウントを削除しますか？</template>
        <template #leftButton>
          <ButtonOk
            btnClass="mr-16"
            :loading="loading"
            @click="deleteAccount"
          ></ButtonOk>
        </template>
      </BaseDialog>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      loading: false,
    }
  },

  methods: {
    async deleteAccount() {
      this.loading = true
      await this.$axios.$delete(`users/${this.$auth.user.id}`)
      this.closeDialog()
      this.loading = false
      this.$router.push('/deleted')
    },

    deleteDialog() {
      return this.$refs.deleteDialog as InstanceType<typeof BaseDialog>
    },

    openDialog() {
      this.deleteDialog().openDialog()
    },

    closeDialog() {
      this.deleteDialog().closeDialog()
    },
  },
})
</script>
