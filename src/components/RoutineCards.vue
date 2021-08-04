<template>
  <div ref="root">
    <div class="wrapper" v-if="!loaded">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-if="loaded">
      <div class="wrapper" v-if="routines.length === 0">
        <p v-if="isHome">習慣を登録しましょう！</p>
        <p v-if="!isHome">アーカイブされた習慣はありません</p>
      </div>
      <v-row class="ma-0" v-if="routines.length !== 0">
        <v-col :style="colWidth" v-for="routine in routines" :key="routine.id">
          <v-card
            class="routine-card"
            height="150"
            :color="doneRoutine(routine)"
            @click="$emit('clickRoutine', routine)"
            hover
          >
            <div v-if="isHome" class="routine-checkbox">
              <input
                type="checkbox"
                class="ml-2 mt-2"
                :checked="routine.today_record !== null"
                @click="$emit('clickCheckbox', routine)"
              />
            </div>
            <div
              class="d-flex justify-center align-center"
              style="height: 100%"
            >
              <div>
                <div class="text-center">
                  <p>{{ routine.name }}</p>
                </div>
                <div>
                  <v-chip :color="chipColor(routine.total_rank.name)">{{
                    routine.total_rank.name
                  }}</v-chip>
                  <v-chip
                    :color="chipColor(routine.highest_continuous_rank.name)"
                    >{{ routine.highest_continuous_rank.name }}</v-chip
                  >
                  <v-chip :color="chipColor(routine.recovery_rank.name)">{{
                    routine.recovery_rank.name
                  }}</v-chip>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { routineType } from '../lib/interface'
import { $_returnColor } from '../plugins/helper'

export default Vue.extend({
  props: {
    routines: {
      type: Array as PropType<routineType[]>,
      required: true,
    },
    isHome: {
      type: Boolean,
      default: false,
    },
    loaded: {
      type: Boolean,
    },
  },

  data() {
    return {
      cardWidth: 0,
    }
  },

  computed: {
    chipColor() {
      return (rank: string): string => {
        return $_returnColor(rank)
      }
    },

    doneRoutine() {
      return (routine: routineType): string => {
        if (this.isHome) {
          if (routine.today_record !== null) {
            return 'grey lighten-3'
          }
          return ''
        } else {
          return ''
        }
      }
    },

    colWidth(): string {
      if (this.cardWidth >= 1700) return 'flex: 0 0 20%'
      if (this.cardWidth >= 1300) return 'flex: 0 0 25%'
      if (this.cardWidth >= 960) return 'flex: 0 0 33.333%'
      if (this.cardWidth >= 540) return 'flex: 0 0 50%'
      return 'flex: 0 0 100%'
    },
  },

  mounted() {
    setTimeout(() => {
      this.getTargetWidth()
    }, 300)
    window.addEventListener('resize', this.getTargetWidth)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.getTargetWidth)
  },

  methods: {
    refs(): any {
      return this.$refs
    },

    getTargetWidth() {
      this.cardWidth = this.refs().root.clientWidth
    },
  },
})
</script>

<style scoped>
.routine-card {
  position: relative;
}

.routine-checkbox {
  position: absolute;
}

.wrapper {
  height: calc(100vh - 88px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
