<template>
  <div>
    <HeaderDrawer headerTitle="設定" :serach="false"></HeaderDrawer>

    <v-main>
      <v-container>
        <v-row class="ma-0">
          <v-col cols="12" sm="3">
            <v-card tile>
              <v-list>
                <v-list-item
                  v-for="listItem in listItems"
                  :key="listItem.title"
                  @click="currentComponent = listItem.componentName"
                >
                  <v-list-item-action>
                    <v-icon>{{ listItem.icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ listItem.title }}</v-list-item-title>
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
  listItems: {
    componentName: string
    icon: string
    title: string
  }[]
}

interface MethodType {}

interface ComputedType {}

interface PropsType {}

export default Vue.extend({
  middleware: 'auth',

  data() {
    return {
      currentComponent: 'FormUpdateImage',
      listItems: [
        {
          componentName: 'FormUpdateImage',
          icon: 'mdi-image-size-select-actual',
          title: 'プロフィール画像',
        },
        {
          componentName: 'FormUpdateNameEmail',
          icon: 'mdi-email',
          title: '名前・メールアドレス',
        },
        {
          componentName: 'FormUpdatePassword',
          icon: 'mdi-key',
          title: 'パスワード',
        },
        {
          componentName: 'FormDeleteAccount',
          icon: 'mdi-delete',
          title: 'アカウント削除',
        },
      ],
    }
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>
