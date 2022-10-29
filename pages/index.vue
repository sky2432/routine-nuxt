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
        <v-btn class="mt-4 top-btn" :loading="loading" large @click="guestlogin">試してみる</v-btn>
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
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'

interface DataType {
  loading: boolean
}

interface MethodType {
  guestlogin(): Promise<void>
}

interface ComputedType {}

interface PropsType {}

export default Vue.extend({
  data() {
    return {
      loading: false
    }
  },

  methods: {
    async guestlogin() {
      try {
        this.loading = true
        const guestUserEmail = 'guest@user.com'
        const guestUserPassword = 1234

        await this.$auth.loginWith('laravelJWT', {
          data: {
            email: guestUserEmail,
            password: guestUserPassword,
          },
        })
        this.$router.push('/home')
      } catch(error) {
        alert('エラーが発生しました')
      } finally {
        this.loading = false
      }
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>

<style scoped>
.main {
  margin-top: 64px;
  height: 100vh;
  background-image: url('@/static/top-page-image.png');
  background-size: cover;
  background-position: right center;
  background-repeat: no-repeat;
}

.top-message {
  margin-top: 7%;
  margin-left: 5%;
}

.top-message h1 {
  font-size: 24px;
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

@media screen and (min-width: 600px) {
  .top-message h1 {
    font-size: 32px
  }
}
</style>
