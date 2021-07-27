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
              <v-btn :disabled="invalid"> 更新 </v-btn>
            </v-card-actions>
          </v-form>
        </validation-observer>

        <BaseDialog ref="baseDialog">
          <template #title>名前・メールアドレスを更新しました</template>
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
      name: '',
      email: '',
      formValid: false,
    }
  },
})
</script>
