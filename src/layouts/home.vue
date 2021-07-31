<template>
  <v-app>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" mobile-breakpoint="960" fixed app>
      <v-sheet color="grey">
        <v-row class="align-center ma-0 pt-4 pl-4">
          <v-avatar color="white" size="64">
            <v-img :src="userImage"></v-img>
          </v-avatar>
          <div class="pl-4">
            <span v-if="$auth.loggedIn">{{ userName }}</span>
          </div>
        </v-row>
        <div class="d-flex pt-4 pl-4">
          <p class="mr-4">フォロー<a href="#">8</a></p>
          <p>フォロワー<a href="#">10</a></p>
        </div>
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
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
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
          icon: 'mdi-chart-bubble',
          title: '投稿',
          to: '/post',
        },
        {
          icon: 'mdi-chart-bar',
          title: 'レポート',
          to: '/report',
        },
        {
          icon: 'mdi-bell-outline',
          title: 'お知らせ',
          to: '/notification',
        },
      ],
      items2: [
        {
          icon: 'mdi-cog',
          title: '設定',
          to: '/setting',
        },
        {
          icon: 'mdi-logout',
          title: 'ログアウト',
          to: '/',
        },
      ],
      title: 'RoutineQuest',
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
        console.log(error)
      }
    },
  },
})
</script>
