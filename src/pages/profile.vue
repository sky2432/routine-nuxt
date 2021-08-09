<template>
  <div>
    <HeaderDrawer headerTitle="プロフィール" :serach="false"></HeaderDrawer>

    <v-main>
      <v-container>
        <div class="d-flex justify-center">
          <div class="mt-4">
            <v-avatar size="128" color="grey">
              <v-img :src="imageUrl" v-if="imageUrl"></v-img>
            </v-avatar>
            <p class="mt-4 text-center">{{ $auth.user.name }}</p>
            <v-divider></v-divider>
            <div class="mt-4">
              <v-row
                class="align-center mt-0"
                v-for="rankCount in rankCounts"
                :key="rankCount.name"
              >
                <v-col
                  ><v-chip :color="rankCount.color">{{
                    rankCount.name
                  }}</v-chip></v-col
                >
                <v-col><p class="mb-0">×</p></v-col>
                <v-col
                  ><p class="mb-0">{{ rankCount.count }}</p></v-col
                >
              </v-row>
            </div>
          </div>
        </div>
      </v-container>
    </v-main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { $axios } from '@/util/axios'

export interface rankCounts {
  name: string
  count: number
  color: string
}

export default Vue.extend({
  data() {
    return {
      rankCounts: [] as rankCounts[],
    }
  },

  computed: {
    imageUrl(): string {
      return this.$auth.user.image_url
    },
  },

  created() {
    this.getUserRankCount()
  },

  methods: {
    async getUserRankCount() {
      const response = await this.$axios.$get(
        `users/${this.$auth.user.id}/routines/rank/count`
      )
      this.rankCounts = this.insertColor(response.data)
    },

    insertColor(rankCounts: rankCounts[]): rankCounts[] {
      const rankColor = [
        { name: 'SS', color: 'yellow accent-2' },
        { name: 'S', color: 'red lighten-1' },
        { name: 'A', color: 'purple lighten-3' },
        { name: 'B', color: 'cyan lighten-3' },
        { name: 'C', color: 'yellow lighten-2' },
        { name: 'D', color: 'grey lighten-3' },
        { name: 'E', color: 'brown lighten-3' },
        { name: 'F', color: 'grey lighten-1' },
      ]
      for (let i in rankCounts) {
        for (let i in rankColor) {
          if (rankCounts[i].name === rankColor[i].name) {
            rankCounts[i].color = rankColor[i].color
          }
        }
      }
      return rankCounts
    },
  },
})
</script>

<style></style>
