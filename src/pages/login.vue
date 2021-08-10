<template>
  <div class="wrapper">
    <div>
      <div class="text-center">
        <v-avatar class="mb-4" color="grey" size="100"></v-avatar>
      </div>
      <v-card class="pa-5" elevation="2" width="400px" outlined shaped tile>
        <v-card-title class="justify-center">Login</v-card-title>
        <v-divider></v-divider>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <v-card-text>
            <TextFieldEmail v-model="email"></TextFieldEmail>

            <TextFieldPassword v-model="password"></TextFieldPassword>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-center">
            <ButtonOk
              :loading="btnLoading"
              :disabled="invalid"
              @click="login"
            ></ButtonOk>
          </v-card-actions>
        </validation-observer>
        <v-card-text class="pt-0">
          アカウントをお持ちではないですか？
          <NuxtLink to="/signup">サインアップ</NuxtLink>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidationObserver } from 'vee-validate'

export default Vue.extend({
  data() {
    return {
      email: '',
      password: '',
      btnLoading: false,
    }
  },

  methods: {
    async login() {
      this.btnLoading = true
      try {
        await this.$auth.loginWith('laravelJWT', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        this.btnLoading = false
      } catch (error) {
        this.$nextTick(() => {
          this.observer().setErrors(error.response.data.errors)
        })
        this.btnLoading = false
      }
    },

    observer() {
      return this.$refs.observer as InstanceType<typeof ValidationObserver>
    },
  },
})
</script>
