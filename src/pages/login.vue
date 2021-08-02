<template>
  <div class="wrapper">
    <div>
      <div class="text-center">
        <v-avatar class="mb-4" color="grey" size="100"></v-avatar>
      </div>
      <v-card class="pa-5" elevation="2" width="400px" outlined shaped tile>
        <v-card-text>
          <validation-observer ref="observer" v-slot="{ invalid }">
            <v-form v-model="formValid">
              <TextFieldEmail v-model="email"></TextFieldEmail>

              <TextFieldPassword v-model="password"></TextFieldPassword>
              <v-card-actions class="justify-center">
                <v-btn @click="guestlogin"> ゲストログイン </v-btn>
                <v-btn :disabled="invalid" @click="login"> ログイン </v-btn>
              </v-card-actions>
            </v-form>
          </validation-observer>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      formValid: false,
      email: '',
      password: '',
    }
  },

  methods: {
    async guestlogin() {
      try {
        await this.$auth.loginWith('laravelJWT', {
          data: {
            email: 'guest@user.com',
            password: 1234,
          },
        })
        this.$router.push('/home')
      } catch {
        alert('エラーが発生しました')
      }
    },

    async login() {
      try {
        await this.$auth.loginWith('laravelJWT', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
      } catch (error) {
        this.$nextTick(() => {
          this.$refs.observer.setErrors(error.response.data.errors)
        })
      }
    },
  },
})
</script>
