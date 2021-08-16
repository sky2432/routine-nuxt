<template>
  <div class="wrapper">
    <div>
      <div class="text-center">
        <v-avatar class="mb-4" color="grey" size="100"></v-avatar>
      </div>
      <v-card class="pa-5" elevation="2" width="400px" outlined shaped tile>
        <v-card-title class="justify-center">SignUp</v-card-title>
        <v-divider></v-divider>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <v-card-text>
            <TextFieldName v-model="name"></TextFieldName>

            <TextFieldEmail v-model="email"></TextFieldEmail>

            <TextFieldPassword v-model="password"></TextFieldPassword>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-center">
            <ButtonOk
              :loading="confirmLoading"
              :disabled="invalid"
              @click="confirm"
            ></ButtonOk>
          </v-card-actions>
        </validation-observer>
        <v-card-text class="pt-0">
          すでにアカウントをお持ちですか？
          <NuxtLink to="/login">ログイン</NuxtLink>
        </v-card-text>
      </v-card>

      <BaseDialog
        ref="confirmDialog"
        :text="true"
        :divider="true"
        textClass="text-center"
        defaultButtonType="cancel"
      >
        <template #title>Confirm</template>
        <template #text>
          <v-row>
            <v-col>Name:</v-col>
            <v-col>{{ name }}</v-col>
          </v-row>
          <v-row>
            <v-col>E-mail:</v-col>
            <v-col>{{ email }}</v-col>
          </v-row>
          <v-row>
            <v-col>Password:</v-col>
            <v-col>{{ maskPassword }}</v-col>
          </v-row>
        </template>
        <template #leftButton>
          <ButtonOk
            :loading="signupLoading"
            btnClass="mr-16"
            @click="signup"
          ></ButtonOk>
        </template>
      </BaseDialog>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidationObserver } from 'vee-validate'
import BaseDialog from '../components/BaseDialog.vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'

interface DataType {
  name: string
  email: string
  password: string
  confirmLoading: boolean
  signupLoading: boolean
}

interface MethodType {
  createSendData(): {
    name: string
    email: string
    password: string
  }
  confirm(): Promise<void>
  confirmDialog(): any
  observer(): any
  signup(): Promise<void>
}

interface ComputedType {
  maskPassword(): string
}

interface PropsType {}

export default Vue.extend({
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmLoading: false,
      signupLoading: false,
    }
  },

  computed: {
    maskPassword() {
      let mask = ''
      for (let i = 0; i < this.password.length; i++) {
        mask = mask + '*'
      }
      return mask
    },
  },

  methods: {
    createSendData() {
      return {
        name: this.name,
        email: this.email,
        password: this.password,
      }
    },

    async confirm() {
      this.confirmLoading = true
      try {
        const response = await this.$axios.$post(
          'users/confirm',
          this.createSendData()
        )
        this.confirmDialog().openDialog()
        this.confirmLoading = false
      } catch (error) {
        this.$nextTick(() => {
          this.observer().setErrors(error.response.data.errors)
        })
        this.confirmLoading = false
      }
    },

    confirmDialog() {
      return this.$refs.confirmDialog as InstanceType<typeof BaseDialog>
    },

    observer() {
      return this.$refs.observer as InstanceType<typeof ValidationObserver>
    },

    async signup() {
      this.signupLoading = true
      try {
        await this.$axios.$post('users', this.createSendData())
        this.$router.push('/thanks')
        this.signupLoading = false
      } catch (error) {
        alert(error)
        this.signupLoading = false
      }
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>
