<template>
  <div>
    <v-app-bar fixed app>
      <v-toolbar-title>RoutineQuest</v-toolbar-title>
      <v-spacer></v-spacer>
      <NuxtLink to="/signup" class="mr-6 nav-link">サインアップ</NuxtLink>
      <NuxtLink to="/login" class="nav-link">ログイン</NuxtLink>
    </v-app-bar>

    <v-main class="main">
      <div class="top-message">
        <h1>ゲームのように習慣を身につけよう</h1>
        <h1>習慣が人生を作る</h1>
        <v-btn class="mt-4 top-btn" large @click="guestlogin">試してみる</v-btn>
      </div>
    </v-main>
    <v-footer>
      <a
        href="https://storyset.com/marketing"
        target="_blank"
        rel="noopener noreferrer"
        >Marketing illustrations by Storyset</a
      >
    </v-footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    async guestlogin() {
      try {
        await this.$auth.loginWith('laravelJWT', {
          data: {
            email: 'guest@user.com',
            password: 1234,
          },
        })
        this.$router.push('/home')
      } catch {
        alert('エラーが発生しました')
      }
    },
  },
})
</script>

<style scoped>
.main {
  height: 100vh;
  background-image: url('@/static/top-page-image.png');
  background-size: cover;
  background-position: 0px 64px;
  background-repeat: no-repeat;
}

.top-message {
  margin-top: 7%;
  margin-left: 5%;
}

.top-btn {
  margin-left: 13%;
}

.nav-link {
  text-decoration: none;
}

.nav-link:hover {
  opacity: 0.5;
}
</style>
