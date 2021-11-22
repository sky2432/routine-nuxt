<template>
  <div>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ headerTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="serach">
        <v-text-field
          name="serach"
          prepend-inner-icon="mdi-magnify"
          hide-details="true"
          :value="value"
          clearable
          @input="$emit('input', $event)"
        >
        </v-text-field>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" mobile-breakpoint="1264" fixed app>
      <v-sheet color="grey lighten-2">
        <v-row class="align-center ma-0 pt-4 pl-4 pb-4">
          <v-avatar color="white" size="64">
            <v-img :src="userImage"></v-img>
          </v-avatar>
          <div class="pl-4">
            <span v-if="$auth.loggedIn">{{ userName }}</span>
          </div>
        </v-row>
      </v-sheet>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item to="/setting" exact>
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>設定</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item exact @click="logout">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ログアウト</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'

interface navitem {
  icon: string
  title: string
  to: string
}

interface DataType {
  drawer: boolean | null
  items: navitem[]
}

interface MethodType {
  logout(): void
}

interface ComputedType {
  userName(): string
  userImage(): string
}

interface PropsType {
  headerTitle: string
  value: string
  serach: boolean
}

export default Vue.extend({
  props: {
    headerTitle: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    serach: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      drawer: null as boolean | null,
      items: [
        {
          icon: 'mdi-apps',
          title: 'ホーム',
          to: '/home',
        },
        {
          icon: 'mdi-archive',
          title: 'アーカイブ',
          to: '/archive',
        },
        {
          icon: 'mdi-pencil-ruler',
          title: 'ルール',
          to: '/rule',
        },
        {
          icon: 'mdi-account',
          title: 'プロフィール',
          to: '/profile',
        },
      ],
    }
  },

  computed: {
    userName() {
      return this.$auth.user.name
    },

    userImage() {
      return this.$auth.user.image_url
    },
  },

  methods: {
    async logout() {
      try {
        await this.$auth.logout()
      } catch (error) {
        alert(error)
      }
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>
