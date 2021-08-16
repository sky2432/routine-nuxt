<template>
  <div>
    <HeaderDrawer headerTitle="設定" :serach="false"></HeaderDrawer>

    <v-main>
      <v-container>
        <v-row class="ma-0">
          <v-col cols="12" sm="3">
            <v-card tile>
              <v-list>
                <v-list-item @click="currentComponent = 'FormUpdateImage'">
                  <v-list-item-action>
                    <v-icon>mdi-image-size-select-actual</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>プロフィール画像</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="currentComponent = 'FormUpdateNameEmail'">
                  <v-list-item-action>
                    <v-icon>mdi-email</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>名前・メールアドレス</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="currentComponent = 'FormUpdatePassword'">
                  <v-list-item-action>
                    <v-icon>mdi-key</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>パスワード</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="currentComponent = 'FormDeleteAccount'">
                  <v-list-item-action>
                    <v-icon>mdi-delete</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>アカウント削除</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" sm="9" class="pl-0">
            <component :is="currentComponent"></component>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'

interface DataType {
  currentComponent: string
}

interface MethodType {}

interface ComputedType {}

interface PropsType {}

export default Vue.extend({
  middleware: 'auth',

  data() {
    return {
      currentComponent: 'FormUpdateImage',
    }
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>
