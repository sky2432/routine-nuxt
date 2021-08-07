<template>
  <v-main>
    <v-container>
      <div class="wrapper">
        <v-card width="500" tile>
          <v-card-title class="justify-center"> Thanks!!</v-card-title>
          <v-card-text class="text-center">
            会員登録ありがとうございます！
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn @click="$router.push('/login')">Login</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-container>
  </v-main>
</template>
