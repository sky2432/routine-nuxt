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
        <v-col
          :style="colWidth"
          v-for="routine in filterdRoutines"
          :key="routine.id"
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
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'

interface DataType {
  cardWidth: number
}

interface MethodType {
  refs(): any
  getTargetWidth(): void
}

interface ComputedType {
  chipColor(rank: string): string
  doneRoutine(routine: routineType): string
  colWidth(): string
  filterdRoutines(): routineType[]
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
    },
  },

  data() {
    return {
      cardWidth: 0,
    }
  },

  computed: {
    filterdRoutines(): routineType[] {
      if (this.keyword) {
        let filterdRoutines = []
        for (let i in this.routines) {
          let routine = this.routines[i]
          if (routine.name.indexOf(this.keyword) !== -1) {
            filterdRoutines.push(routine)
          }
        }
        return filterdRoutines
      }
      return this.routines
    },

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
