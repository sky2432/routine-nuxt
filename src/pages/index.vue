<template>
  <div>
    <v-app-bar fixed app>
      <v-toolbar-title>RoutineQuest</v-toolbar-title>
      <v-spacer></v-spacer>

      <NuxtLink to="/other" class="mr-4">サインアップ</NuxtLink>

      <NuxtLink to="/other">ログイン</NuxtLink>
    </v-app-bar>
    <v-main class="main">
      <div class="top-message">
        <h1>ゲームのように習慣を身につけよう</h1>
        <h1>習慣が人生を作る</h1>
        <v-btn class="mt-4 top-btn" large>はじめる</v-btn>
      </div>
    </v-main>
    <v-footer>
      <a href="https://storyset.com/marketing"
        >Marketing illustrations by Storyset</a
      >
    </v-footer>
  </div>
</template>

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
</style>
