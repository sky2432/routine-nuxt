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

        <BaseDialog ref="baseDialog">
          <template #title>パスワードを更新しました</template>
        </BaseDialog>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
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
      } catch (error) {
        alert(error)
      }
    },
  },
})
</script>
