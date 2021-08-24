<template>
  <div>
    <HeaderDrawer headerTitle="プロフィール" :serach="false"></HeaderDrawer>

    <v-main>
      <v-container>
        <div class="d-flex justify-center">
          <div class="mt-4">
            <v-avatar size="150" color="grey">
              <v-img :src="imageUrl" v-if="imageUrl"></v-img>
            </v-avatar>
            <p class="mt-4 text-center">{{ $auth.user.name }}</p>
            <v-divider></v-divider>
            <div class="mt-4">
              <v-row
                class="align-center mt-0"
                v-for="rankCount in ranksCount"
                :key="rankCount.name"
              >
                <v-col>
                  <v-chip :color="rankCount.color">
                    {{ rankCount.name }}
                  </v-chip>
                </v-col>
                <v-col class="text-center"><p class="mb-0">×</p></v-col>
                <v-col class="text-center">
                  <p class="mb-0">{{ rankCount.count }}</p>
                </v-col>
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
import { RANK_COLOR } from '../config/const'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'

interface DataType {
  ranksCount: ranksCount[]
}

interface MethodType {
  fetchUserRanksCount(): Promise<void>
  insertColor(ranksCount: ranksCount[]): ranksCount[]
}

interface ComputedType {
  imageUrl(): string
}

interface PropsType {}

export interface ranksCount {
  name: string
  count: number
  color: string
}

export default Vue.extend({
  data() {
    return {
      ranksCount: [] as ranksCount[],
    }
  },

  computed: {
    imageUrl(): string {
      return this.$auth.user.image_url
    },
  },

  created() {
    this.fetchUserRanksCount()
  },

  methods: {
    async fetchUserRanksCount() {
      const response = await this.$axios.$get(
        `users/${this.$auth.user.id}/routines/rank/count`
      )
      this.ranksCount = this.insertColor(response.data)
    },

    insertColor(ranksCount: ranksCount[]): ranksCount[] {
      const rankColors: {
        name: string
        color: string
      }[] = [
        { name: 'SS', color: RANK_COLOR.SS },
        { name: 'S', color: RANK_COLOR.S },
        { name: 'A', color: RANK_COLOR.A },
        { name: 'B', color: RANK_COLOR.B },
        { name: 'C', color: RANK_COLOR.C },
        { name: 'D', color: RANK_COLOR.D },
        { name: 'E', color: RANK_COLOR.E },
        { name: 'F', color: RANK_COLOR.F },
      ]

      for (let i in ranksCount) {
        for (let j in rankColors) {
          if (ranksCount[i].name === rankColors[j].name) {
            ranksCount[i].color = rankColors[j].color
          }
        }
      }
      return ranksCount
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>

