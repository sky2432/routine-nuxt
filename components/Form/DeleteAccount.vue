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
            <v-btn
              class="mt-2"
              color="red white--text"
              :disabled="isGuestUser"
              @click="openDialog"
            >
              アカウントを削除
            </v-btn>
          </div>
        </div>
      </div>

      <BaseDialog
        ref="deleteDialog"
        :text="true"
        :divider="true"
        text-class="text-center"
        default-button-type="cancel"
      >
        <template #title>Caution</template>
        <template #text>本当にアカウントを削除しますか？</template>
        <template #leftButton>
          <ButtonOk
            btn-class="mr-16"
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
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import BaseDialog from '@/components/Base/Dialog.vue'
import { GUEST_USER_EMAIL } from '@/config/const'

interface DataType {
  loading: boolean
}

interface MethodType {
  openDialog(): void
  closeDialog(): void
  deleteAccount(): Promise<void>
  refsDeleteDialog(): any
}

interface ComputedType {
  isGuestUser(): boolean
}

interface PropsType {}

export default Vue.extend({
  data() {
    return {
      loading: false,
    }
  },

  computed: {
    isGuestUser () :boolean {
      if (this.$auth.user.email === GUEST_USER_EMAIL) {
        return true
      }
      return false
    }
  },

  methods: {
    openDialog() {
      this.refsDeleteDialog().openDialog()
    },

    async deleteAccount() {
      this.loading = true
      await this.$axios.$delete(`users/${this.$auth.user.id}`)
      this.closeDialog()
      this.loading = false
      this.$router.push('/deleted')
    },

    closeDialog() {
      this.refsDeleteDialog().closeDialog()
    },

    // コンポーネント要素の型定義
    refsDeleteDialog() {
      return this.$refs.deleteDialog as InstanceType<typeof BaseDialog>
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>
