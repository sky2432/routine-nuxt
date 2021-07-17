<template>
  <div>
    <div>
      <v-card
        class="pa-2 mb-3"
        hover
        v-for="notification in notifications"
        :key="notification.id"
        @click="showNotificationDetail(notification)"
      >
        <v-row class="ma-0">
          <v-icon>{{ icon(notification.type) }}</v-icon>
          <p class="mb-0 ml-2">
            {{ message(notification.type, notification.userName) }}
          </p>
        </v-row>
        <div class="text-right">
          <p class="mb-0">{{ notification.created_at }}</p>
        </div>
      </v-card>
    </div>

    <v-navigation-drawer
      v-model="drawer"
      mobile-breakpoint="540"
      app
      right
      :width="drawerWidth"
    >
      <div class="wrapper" v-if="!target.id">
        <div>お知らせを選択してください</div>
      </div>

      <div v-if="target.id">
        <div class="detail-header">
          <v-btn class="close-btn" icon @click="drawer = !drawer">
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
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import windowWidthMixin from '../mixins/windowWidthMixin'

export interface postType {
  id: number
  type: string
  userName: string
  created_at: string
}

export default windowWidthMixin.extend({
  layout: 'home',

  mixins: [windowWidthMixin],

  data() {
    return {
      drawer: null as boolean | null,
      notifications: [
        {
          id: 1,
          type: 'like',
          userName: 'みみ',
          created_at: '2021-07-17',
        },
        {
          id: 2,
          type: 'comment',
          userName: 'すい',
          created_at: '2021-07-16',
        },
        {
          id: 3,
          type: 'like',
          userName: 'けい',
          created_at: '2021-07-15',
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

    icon() {
      return function (type: string): string {
        if (type === 'like') return 'mdi-thumb-up'
        return 'mdi-chat'
      }
    },

    message() {
      return function (type: string, name: string): string {
        if (type === 'like') {
          return `${name}さんがあたなの記録にいいねをしました`
        }
        return `${name}さんがあたなの記録にコメントををしました`
      }
    },
  },

  methods: {
    showNotificationDetail(post: postType): void {
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
