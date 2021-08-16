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
            name="現在のパスワード"
            label="Current Password"
            mode="eager"
            v-model="password"
          ></TextFieldPassword>

          <TextFieldPassword
            name="新しいパスワード"
            label="New Password"
            vid="new_password"
            v-model="newPassword"
          ></TextFieldPassword>

          <v-card-actions class="justify-center">
            <ButtonOk
              :loading="btnLoading"
              :disabled="invalid"
              @click="updatePassword"
            ></ButtonOk>
          </v-card-actions>
        </validation-observer>
      </div>
    </v-card>

    <BaseDialog
      ref="baseDialog"
      defaultButtonType="ok"
      :text="true"
      :divider="true"
      textClass="text-center"
    >
      <template #title>Done</template>
      <template #text>パスワードを変更しました</template>
    </BaseDialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidationObserver } from 'vee-validate'
import BaseDialog from '../components/BaseDialog.vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'

interface DataType {
  password: string
  newPassword: string
  btnLoading: boolean
}

interface MethodType {
  updatePassword(): Promise<void>
  baseDialog(): any
  observer(): any
}

interface ComputedType {}

interface PropsType {}

export default Vue.extend({
  data() {
    return {
      password: '',
      newPassword: '',
      btnLoading: false,
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
        this.baseDialog().openDialog()
        this.password = this.newPassword = ''
        this.$nextTick(() => {
          this.observer().reset()
        })
        this.btnLoading = false
      } catch (error) {
        this.$nextTick(() => {
          this.observer().setErrors(error.response.data.errors)
        })
        this.btnLoading = false
      }
    },

    baseDialog() {
      return this.$refs.baseDialog as InstanceType<typeof BaseDialog>
    },

    observer() {
      return this.$refs.observer as InstanceType<typeof ValidationObserver>
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>
