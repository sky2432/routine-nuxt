<template>
  <div class="wrapper">
    <div>
      <div class="text-center">
        <v-avatar class="mb-4" color="grey" size="100"></v-avatar>
      </div>
      <v-card class="pa-5" elevation="2" width="400px" outlined shaped tile>
        <v-card-title class="justify-center">SignUp</v-card-title>
        <v-card-text>
          <validation-observer ref="observer" v-slot="{ invalid }">
            <v-form v-model="formValid">
              <TextFieldName v-model="name"></TextFieldName>

              <TextFieldEmail v-model="email"></TextFieldEmail>

              <TextFieldPassword v-model="password"></TextFieldPassword>
              <v-card-actions class="justify-center">
                <ButtonOk
                  :loading="btnLoading"
                  :disabled="invalid"
                  @click="signup"
                ></ButtonOk>
              </v-card-actions>
            </v-form>
          </validation-observer>
        </v-card-text>
        <v-card-text class="pt-0">
          すでにアカウントをお持ちですか？
          <NuxtLink to="/login">ログイン</NuxtLink>
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
      name: '',
      email: '',
      password: '',
      formValid: false,
      btnLoading: false,
    }
  },

  methods: {
    async signup() {
      this.btnLoading = true
      const sendData = {
        name: this.name,
        email: this.email,
        password: this.password,
      }
      try {
        const response = await this.$axios.$post('users', sendData)
        this.$router.push('/thanks')
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
