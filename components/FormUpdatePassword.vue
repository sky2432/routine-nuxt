<template>
  <div>
    <v-card class="setting-card" tile>
      <div class="setting-content">
        <validation-observer
          ref="observer"
          v-slot="{ invalid }"
          style="width: 80%"
        >
          <TextFieldPassword
            v-model="password"
            name="現在のパスワード"
            label="Current Password"
          ></TextFieldPassword>

          <TextFieldPassword
            v-model="newPassword"
            name="新しいパスワード"
            label="New Password"
            vid="new_password"
          ></TextFieldPassword>

          <v-card-actions class="justify-center">
            <ButtonOk
              :loading="btnLoading"
              :disabled="isGuestUser(invalid)"
              @click="updatePassword"
            ></ButtonOk>
          </v-card-actions>
        </validation-observer>
      </div>
    </v-card>

    <BaseDialog
      ref="baseDialog"
      default-button-type="ok"
      :text="true"
      :divider="true"
      text-class="text-center"
    >
      <template #title>Done</template>
      <template #text>パスワードを変更しました</template>
    </BaseDialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import { ValidationObserver } from 'vee-validate'
import BaseDialog from '../components/BaseDialog.vue'
import { GUEST_USER_EMAIL } from '../config/const'

interface DataType {
  password: string
  newPassword: string
  btnLoading: boolean
}

interface MethodType {
  updatePassword(): Promise<void>
  resetPasswordTextField(): void
  refsBaseDialog(): any
  refsObserver(): any
}

interface ComputedType {
  isGuestUser(invalid: boolean): boolean
}

interface PropsType {}

export default Vue.extend({
  data() {
    return {
      btnLoading: false,
      password: '',
      newPassword: '',
    }
  },

  computed: {
    isGuestUser () {
      return (invalid: boolean) :boolean => {
        if (this.$auth.user.email === GUEST_USER_EMAIL) {
          return true
        }
        return invalid
      }
    }
  },

  methods: {
    async updatePassword() {
      this.btnLoading = true
      const sendData = {
        password: this.password,
        new_password: this.newPassword,
      }
      try {
        await this.$axios.$put(
          'users/' + this.$auth.user.id + '/password',
          sendData
        )
        this.refsBaseDialog().openDialog()
        this.resetPasswordTextField()
        this.btnLoading = false
      } catch (error) {
        this.$nextTick(() => {
          this.refsObserver().setErrors(error.response.data.errors)
        })
        this.btnLoading = false
      }
    },

    resetPasswordTextField() {
      this.password = this.newPassword = ''
      this.$nextTick(() => {
        this.refsObserver().reset()
      })
    },

    // コンポーネント要素の型定義 begin
    //
    refsBaseDialog() {
      return this.$refs.baseDialog as InstanceType<typeof BaseDialog>
    },

    refsObserver() {
      return this.$refs.observer as InstanceType<typeof ValidationObserver>
    },
    //
    // end
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>
