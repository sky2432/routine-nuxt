<template>
  <div>
    <v-card class="setting-card" tile>
      <div class="setting-content">
        <div class="text-center" style="width: 40%">
          <v-avatar size="128" color="grey">
            <v-img :src="imageUrl" v-if="imageUrl"></v-img>
          </v-avatar>
          <validation-observer ref="observer" v-slot="{ invalid }">
            <v-form v-model="formValid">
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
                <v-btn :disabled="invalid" @click="updateImage"> 更新 </v-btn>
              </v-card-actions>
            </v-form>
          </validation-observer>
        </div>

        <BaseDialog ref="baseDialog">
          <template #title>画像を変更しました</template>
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
      image: null as null | any,
      imageUrl: '',
      formValid: false,
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
      this.showImagePreview()
    },

    showImagePreview() {
      if (this.image) {
        this.imageUrl = URL.createObjectURL(this.image)
      }
      if (!this.image) {
        this.imageUrl = this.$auth.user.image_url
      }
    },

    async updateImage() {
      const formData = new FormData()
      formData.append('image', this.image)
      const headers: object = {
        headers: {
          'content-type': 'multipart/form-data',
          'X-HTTP-Method-Override': 'PUT',
        },
      }
      const response = await this.$axios.$post(
        'users/' + this.$auth.user.id + '/image',
        formData,
        headers
      )
      console.log(response)

      this.$store.commit('updateUser', response.data)
    },
  },
})
</script>
