<template>
  <div>
    <v-card class="setting-card" tile>
      <div class="setting-content">
        <validation-observer
          style="width: 80%"
          ref="observer"
          v-slot="{ invalid }"
        >
          <v-form v-model="formValid">
            <TextFieldName v-model="name"></TextFieldName>

            <TextFieldEmail v-model="email"></TextFieldEmail>

            <v-card-actions class="justify-center">
              <v-btn :disabled="invalid" @click="updateNameEmail"> 更新 </v-btn>
            </v-card-actions>
          </v-form>
        </validation-observer>
      </div>
    </v-card>

    <BaseDialog ref="baseDialog">
      <template #title>名前・メールアドレスを更新しました</template>
    </BaseDialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      name: '',
      email: '',
      formValid: false,
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
      } catch (error) {
        alert(error)
      }
    },
  },
})
</script>
