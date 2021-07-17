<template>
  <div>
    <v-row class="ma-0">
      <v-col cols="12" sm="3">
        <v-card tile>
          <v-list>
            <v-list-item @click="currentComponent = 'FormUpdateImage'">
              <v-list-item-content>
                <v-list-item-title>画像</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="currentComponent = 'FormUpdateNameEmail'">
              <v-list-item-content>
                <v-list-item-title>名前・メールアドレス</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="currentComponent = 'FormUpdatePassword'">
              <v-list-item-content>
                <v-list-item-title>パスワード</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="9" class="pl-0">
        <component :is="currentComponent"></component>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'home',
  data() {
    return {
      currentComponent: 'FormUpdateImage',
    }
  },
})
</script>

<style></style>
