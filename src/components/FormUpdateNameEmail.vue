<template>
  <div>
    <v-card class="setting-card" tile>
      <div class="setting-content">
        <validation-observer
          style="width: 80%"
          ref="observer"
          v-slot="{ invalid }"
        >
          <TextFieldName v-model="name"></TextFieldName>

          <TextFieldEmail v-model="email"></TextFieldEmail>

          <v-card-actions class="justify-center">
            <ButtonOk
              :loading="btnLoading"
              :disabled="invalid"
              @click="updateNameEmail"
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
      <template #text>名前・メールアドレスを変更しました</template>
    </BaseDialog>
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
  btnLoading: boolean
}

interface MethodType {
  setUserNameEmail(): void
  updateNameEmail(): Promise<void>
  refsBaseDialog(): any
  refsObserver(): any
}

interface ComputedType {}

interface PropsType {}

export default Vue.extend({
  data() {
    return {
      btnLoading: false,
      name: '',
      email: '',
    }
  },

  created() {
    this.setUserNameEmail()
  },

  methods: {
    setUserNameEmail() {
      this.name = this.$auth.user.name
      this.email = this.$auth.user.email
    },

    async updateNameEmail() {
      this.btnLoading = true
      const sendData = {
        name: this.name,
        email: this.email,
      }
      try {
        const response = await this.$axios.$put(
          'users/' + this.$auth.user.id,
          sendData
        )
        this.$auth.setUser(response.data)
        this.refsBaseDialog().openDialog()
        this.btnLoading = false
      } catch (error) {
        this.$nextTick(() => {
          this.refsObserver().setErrors(error.response.data.errors)
        })
        this.btnLoading = false
      }
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
