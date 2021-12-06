<template>
  <div>
    <HeaderDrawer header-title="プロフィール" :serach="false"></HeaderDrawer>

    <v-main>
      <v-container>
        <div class="d-flex justify-center">
          <div class="mt-4">
            <v-avatar size="150" color="grey">
              <v-img v-if="imageUrl" :src="imageUrl"></v-img>
            </v-avatar>
            <p class="mt-4 text-center">{{ $auth.user.name }}</p>
            <v-divider></v-divider>
            <div class="mt-4">
              <v-row
                v-for="rankCount in ranksCount"
                :key="rankCount.name"
                class="align-center mt-0"
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
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import { RANK_COLORS } from '../config/const'

export interface ranksCount {
  name: string
  count: number
  color: string
}

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

    // ランクの色情報をオブジェクトに追加する
    insertColor(ranksCount: ranksCount[]): ranksCount[] {
      const rankColors: {
        name: string
        color: string
      }[] = [
        { name: 'SS', color: RANK_COLORS.SS },
        { name: 'S', color: RANK_COLORS.S },
        { name: 'A', color: RANK_COLORS.A },
        { name: 'B', color: RANK_COLORS.B },
        { name: 'C', color: RANK_COLORS.C },
        { name: 'D', color: RANK_COLORS.D },
        { name: 'E', color: RANK_COLORS.E },
        { name: 'F', color: RANK_COLORS.F },
      ]

      for (const i in ranksCount) {
        for (const j in rankColors) {
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

