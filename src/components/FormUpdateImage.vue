<template>
  <div>
    <v-card class="setting-card" tile>
      <div class="setting-content">
        <div class="text-center" style="width: 40%">
          <v-avatar size="128" color="grey">
            <v-img :src="imageUrl" v-if="imageUrl"></v-img>
          </v-avatar>
          <validation-observer ref="observer" v-slot="{ invalid }">
            <validation-provider
              v-slot="{ errors }"
              ref="fileProvider"
              rules="required|image"
              name="画像"
            >
              <v-file-input
                accept="image/*"
                :error-messages="errors"
                label="画像を選択"
                chips
                :value="image"
                @change="setImage($event)"
              ></v-file-input>
            </validation-provider>
            <v-card-actions class="justify-center">
              <ButtonOk
                :loading="btnLoading"
                :disabled="invalid"
                @click="updateImage"
              ></ButtonOk>
            </v-card-actions>
          </validation-observer>
        </div>
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
      <template #text>画像を変更しました</template>
    </BaseDialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ValidationObserver } from 'vee-validate'
import BaseDialog from '../components/BaseDialog.vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'

interface DataType {
  image: null | any
  imageUrl: string
  btnLoading: boolean
}

interface MethodType {
  setCurrentImage(): void
  setImage(event: any): void
  displayImagePreview(): void
  updateImage(): Promise<void>
  resetFileInput(): void
  refsBaseDialog(): any
  refsObserver(): any
}

interface ComputedType {}

interface PropsType {}

export default Vue.extend({
  data() {
    return {
      btnLoading: false,
      image: null as null | any,
      imageUrl: '',
    }
  },

  created() {
    this.setCurrentImage()
  },

  methods: {
    setCurrentImage() {
      this.imageUrl = this.$auth.user.image_url
    },

    setImage(event: any) {
      this.image = event
      this.displayImagePreview()
    },

    displayImagePreview() {
      if (this.image) {
        this.imageUrl = URL.createObjectURL(this.image)
      }
      if (!this.image) {
        this.imageUrl = this.$auth.user.image_url
      }
    },

    async updateImage() {
      this.btnLoading = true
      // imageをバックエンドに送るためにformDataを使用
      const formData = new FormData()
      formData.append('image', this.image)
      // putでformDataを送ると空になってしまうのでpostで送ってからputに上書きする
      const config: object = {
        headers: {
          'X-HTTP-Method-Override': 'PUT',
        },
      }
      try {
        const response = await this.$axios.$post(
          'users/' + this.$auth.user.id + '/image',
          formData,
          config
        )
        this.refsBaseDialog().openDialog()
        this.resetFileInput()
        this.$auth.setUser(response.data)
        this.btnLoading = false
      } catch (error) {
        alert(error)
        this.btnLoading = false
      }
    },

    resetFileInput() {
      this.image = null
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
