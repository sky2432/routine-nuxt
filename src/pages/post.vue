<template>
  <div>
    <v-row class="ma-0">
      <v-col cols="12" v-for="post in posts" :key="post.id">
        <v-card hover @click="showPostDetail(post)">
          <v-row class="ma-0">
            <v-col cols="8">
              <v-row class="align-center ma-0">
                <v-avatar color="grey" size="30"> </v-avatar>
                <div class="pl-4">{{ post.userName }}</div>
              </v-row>
              <p class="mt-6">{{ post.name }}を達成！</p>
              <div class="d-flex">
                <div class="d-flex align-center mr-3">
                  <v-btn icon><v-icon>mdi-chat</v-icon></v-btn>
                  <p class="mb-0">2</p>
                </div>
                <div class="d-flex align-center">
                  <v-btn icon><v-icon>mdi-thumb-up</v-icon></v-btn>
                  <p class="mb-0">2</p>
                </div>
              </div>
            </v-col>
            <v-col cols="4">
              <div class="text-right">
                <p style="font-size: 0.7rem">{{ post.created_at }}</p>
              </div>
              <v-row class="ma-0 flex-column">
                <div class="text-right"><v-chip small>見習い</v-chip></div>
                <div class="text-right">
                  <v-chip class="mt-1" small>中級</v-chip>
                </div>
                <div class="text-right">
                  <v-chip class="mt-1" small>上級</v-chip>
                </div>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-navigation-drawer
      v-model="drawer"
      mobile-breakpoint="540"
      app
      right
      :width="drawerWidth"
    >
      <div class="detail-header">
        <v-btn class="close-btn" icon @click="drawer = !drawer">
          <!-- v-if="width < 600" -->
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-menu offset-y v-if="target.id">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon>
              <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>編集</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>削除</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <div class="wrapper" v-if="!target.id">
        <div>投稿を選択してください</div>
      </div>

      <div v-if="target.id">
        <div class="pa-2">
          <v-row class="ma-0">
            <v-col cols="8">
              <v-row class="align-center ma-0">
                <v-avatar color="grey" size="30"> </v-avatar>
                <div class="pl-4">{{ target.userName }}</div>
              </v-row>
              <p class="mt-6">{{ target.name }}を達成！</p>
              <div class="d-flex">
                <div class="d-flex align-center mr-3">
                  <v-btn icon><v-icon>mdi-chat</v-icon></v-btn>
                  <p class="mb-0">2</p>
                </div>
                <div class="d-flex align-center">
                  <v-btn icon><v-icon>mdi-thumb-up</v-icon></v-btn>
                  <p class="mb-0">2</p>
                </div>
              </div>
            </v-col>
            <v-col cols="4">
              <div class="text-right">
                <p style="font-size: 0.7rem">{{ target.created_at }}</p>
              </div>
              <v-row class="ma-0 flex-column">
                <div class="text-right"><v-chip small>見習い</v-chip></div>
                <div class="text-right">
                  <v-chip class="mt-1" small>中級</v-chip>
                </div>
                <div class="text-right">
                  <v-chip class="mt-1" small>上級</v-chip>
                </div>
              </v-row>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <div v-if="true" class="mt-2">
            <p class="mb-2">いいね：2件</p>
            <v-avatar color="grey" size="30"> </v-avatar>
          </div>
          <v-divider class="mt-2"></v-divider>
          <div v-if="true" class="mt-2">
            <div class="d-flex align-center">
              <v-row class="align-center ma-0">
                <v-avatar color="grey" size="30"> </v-avatar>
                <div class="pl-4">けい</div>
              </v-row>
              <p class="mb-0">17:22</p>
            </div>
            <div class="mt-4">
              <p>ナイスです！</p>
            </div>
            <v-divider></v-divider>
          </div>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import windowWidthMixin from '../mixins/windowWidthMixin'

export interface postType {
  id: number
  name: string
  created_at: string
  userName: string
}

export default windowWidthMixin.extend({
  layout: 'home',

  mixins: [windowWidthMixin],

  data() {
    return {
      drawer: null as boolean | null,
      posts: [
        {
          id: 1,
          name: 'プログラミング',
          created_at: '2021-07-16',
          userName: 'sky',
        },
        {
          id: 2,
          name: '読書',
          created_at: '2021-07-16',
          userName: 'みみ',
        },
        {
          id: 3,
          name: '瞑想',
          created_at: '2021-07-16',
          userName: 'すい',
        },
      ],
      target: {} as postType,
    }
  },

  computed: {
    drawerWidth(): string {
      if (this.width >= 960) return '30%'
      if (this.width >= 600) return '40%'
      return '100%'
    },
  },

  methods: {
    showPostDetail(post: postType): void {
      this.drawer = true
      this.target = post
    },
  },
})
</script>

<style scoped>
.detail-header {
  height: 64px;
  display: flex;
  align-items: center;
}

.close-btn {
  line-height: 64px;
}

.wrapper {
  height: calc(100vh - 64px);
}
</style>
