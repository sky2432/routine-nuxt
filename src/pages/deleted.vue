<template>
  <v-main>
    <v-container>
      <div class="wrapper">
        <v-card width="500" tile>
          <v-card-title class="justify-center">Deleted</v-card-title>
          <v-card-text class="text-center">
            アカウントは削除されました<br>
            またのご利用お待ちしております
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn @click="$router.push('/')">トップページへ</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-container>
  </v-main>
</template>
