<template>
  <v-row class="ma-0">
    <v-col cols="12" sm="6" v-for="routine in routines" :key="routine.id">
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
        <div class="d-flex justify-center align-center" style="height: 100%">
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
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { routineType } from '../lib/interface'

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
  },

  computed: {
    chipColor() {
      return function (rank: string): string {
        if (rank === '初級') return 'blue-grey lighten-3'
        if (rank === '中級') return 'brown lighten-3'
        if (rank === '上級') return 'deep-orange lighten-3'
        if (rank === '聖級') return 'yellow lighten-3'
        if (rank === '王級') return 'indigo lighten-3'
        if (rank === '帝級') return 'deep-purple lighten-3'
        if (rank === '神級') return 'pink lighten-3'
        if (rank === '復活') return 'green lighten-3'
        if (rank === '不屈') return 'purple lighten-3'
        if (rank === '蘇生') return 'lime lighten-3'
        if (rank === '転生') return 'light-blue lighten-3'
        if (rank === '不死') return 'red lighten-3'
        return 'grey lighten-2'
      }
    },

    doneRoutine() {
      return function (routine: routineType): string {
        if ((this as any).isHome) {
          if (routine.today_record !== null) {
            return 'grey lighten-3'
          }
          return ''
        } else {
          return ''
        }
      }
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
</style>
