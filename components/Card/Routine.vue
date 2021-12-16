<template>
  <div ref="root">
    <div v-if="!loaded" class="wrapper">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-if="loaded">
      <div v-if="routines.length === 0" class="wrapper">
        <p v-if="isHome">習慣を登録しましょう!</p>
        <p v-if="!isHome">アーカイブされた習慣はありません</p>
      </div>
      <v-row v-if="routines.length !== 0" class="ma-0">
        <v-col
          v-for="routine in selectedRoutinesByKeyword"
          :key="routine.id"
          :style="colWidth"
        >
          <v-card
            class="routine-card"
            height="150"
            :color="doneRoutine(routine)"
            hover
          >
            <div v-if="isHome" class="routine-checkbox">
              <input
                type="checkbox"
                class="ml-2 mt-2 input-checkbox"
                :checked="routine.today_record !== null"
                @click="$emit('clickCheckbox', routine)"
              />
            </div>
            <div
              class="d-flex justify-center align-center"
              style="height: 100%"
              @click="$emit('clickRoutine', routine)"
            >
              <div>
                <div class="text-center">
                  <p>{{ routine.name }}</p>
                </div>
                <div>
                  <v-chip :color="rankColor(routine.total_rank.name)">{{
                    routine.total_rank.name
                  }}</v-chip>
                  <v-chip
                    :color="rankColor(routine.highest_continuous_rank.name)"
                    >{{ routine.highest_continuous_rank.name }}</v-chip
                  >
                  <v-chip :color="rankColor(routine.recovery_rank.name)">{{
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
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import { $$returnColor } from '@/plugins/helper'
import { routineType } from '@/lib/interface'

interface DataType {
  cardWidth: number
}

interface MethodType {
  selectRoutine(): routineType[]
  refs(): any
  getTargetWidth(): void
}

interface ComputedType {
  selectedRoutinesByKeyword(): routineType[]
  rankColor(rank: string): string
  doneRoutine(routine: routineType): string
  colWidth(): string
}

interface PropsType {
  routines: routineType[]
  isHome: boolean
  loaded: boolean
  keyword: string
}

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
    keyword: {
      type: String,
      default: ''
    },
  },

  data() {
    return {
      cardWidth: 0,
    }
  },

  computed: {
    selectedRoutinesByKeyword(): routineType[] {
      if (!this.keyword) return this.routines
      const selectedRoutines = this.selectRoutine()
      return selectedRoutines
    },

    rankColor() {
      return (rank: string): string => {
        return $$returnColor(rank)
      }
    },

    doneRoutine() {
      return (routine: routineType): string => {
        if (this.isHome === false) return ''
        if (this.isHome === true && routine.today_record !== null) {
          return 'grey lighten-3'
        } else {
          return ''
        }
      }
    },

    // 習慣カードの表示領域幅によって列数を変更
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
    selectRoutine(): routineType[] {
      const selectedRoutines = []
      for (const i in this.routines) {
        const routine = this.routines[i]
        if (routine.name.includes(this.keyword)) {
          selectedRoutines.push(routine)
        }
      }
      return selectedRoutines
    },

    refs(): any {
      return this.$refs
    },

    getTargetWidth() {
      this.cardWidth = this.refs().root.clientWidth
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>

<style scoped>
.routine-card {
  position: relative;
  cursor: default;
}

.routine-checkbox {
  position: absolute;
}

.input-checkbox {
  cursor: pointer;
  transform: scale(1.3);
}

.wrapper {
  height: calc(100vh - 88px);
}
</style>
