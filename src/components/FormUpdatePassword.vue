<template>
  <div>
    <v-card class="setting-card" tile>
      <div class="setting-content">
        <validation-observer
          ref="observer"
          v-slot="{ invalid }"
          style="width: 80%"
        >
          <v-form v-model="formValid">
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
              <v-btn :disabled="invalid" @click="updatePassword"> 更新 </v-btn>
            </v-card-actions>
          </v-form>
        </validation-observer>

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
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidationObserver } from 'vee-validate'

export default Vue.extend({
  data() {
    return {
      password: '',
      newPassword: '',
      formValid: false,
    }
  },

  methods: {
    async updatePassword() {
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
      } catch (error) {
        this.$nextTick(() => {
          this.observer().setErrors(error.response.data.errors)
        })
      }
    },

    baseDialog() {
      return this.$refs.baseDialog as InstanceType<typeof BaseDialog>
    },

    observer() {
      return this.$refs.observer as InstanceType<typeof ValidationObserver>
    },
  },
})
</script>
