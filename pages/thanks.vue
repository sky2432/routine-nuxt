<template>
  <v-main>
    <v-container>
      <div class="wrapper">
        <v-card width="500" tile>
          <v-card-title class="justify-center"> Thanks!!</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="text-center py-5">
            会員登録ありがとうございます!
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-center">
            <ButtonOk @click="$router.push('/login')"></ButtonOk>
          </v-card-actions>
        </v-card>
      </div>
    </v-container>
  </v-main>
</template>
