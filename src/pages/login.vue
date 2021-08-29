<template>
  <div>
    <v-app-bar app>
      <v-toolbar-title class="header-title" @click="$router.push('/')"
        >RoutineQuest</v-toolbar-title
      >
    </v-app-bar>

    <v-main>
      <v-container>
        <div class="wrapper">
          <v-card
            class="pa-5"
            elevation="2"
            max-width="400px"
            outlined
            shaped
            tile
          >
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
      </v-container>
    </v-main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import { ValidationObserver } from 'vee-validate'

interface DataType {
  email: string
  password: string
  btnLoading: boolean
}

interface MethodType {
  login(): Promise<void>
  refsObserver(): any
}

interface ComputedType {}

interface PropsType {}

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
          this.refsObserver().setErrors(error.response.data.errors)
        })
        this.btnLoading = false
      }
    },

    // コンポーネント要素の型定義
    refsObserver() {
      return this.$refs.observer as InstanceType<typeof ValidationObserver>
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>

<style scoped>
.wrapper {
  height: calc(100vh - 88px);
}

.header-title {
  cursor: pointer;
}
</style>
