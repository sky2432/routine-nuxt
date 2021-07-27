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
              <TextFieldName v-model="name"></TextFieldName>

              <TextFieldEmail v-model="email"></TextFieldEmail>

              <TextFieldPassword v-model="password"></TextFieldPassword>
              <v-card-actions class="justify-center">
                <v-btn :disabled="invalid"> サインアップ </v-btn>
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
      name: '',
      email: '',
      password: '',
    }
  },
})
</script>
