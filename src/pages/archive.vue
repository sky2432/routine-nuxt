<template>
  <div>
    <RoutineCards :routines="routines" @clickRoutine="showRoutineDetail">
    </RoutineCards>

    <RoutineDetailDrawer
      ref="routineDetailDrawer"
      @reloadRoutines="getUserRoutines"
    ></RoutineDetailDrawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RoutineDetailDrawer from '../components/RoutineDetailDrawer.vue'
import { $axios } from '@/util/axios'

export interface routineType {
  id: number
  name: string
  user_id: number
  total_days: number
  continuous_days: number
  highest_continuous_days: number
  recovery_count: number
  total_rank: rank
  highest_continuous_rank: rank
  recovery_rank: rank
  today_record: record | null
  created_at: string
  updated_at: string
}

interface rank {
  id: number
  name: string
  created_at: string
  updated_at: string
}

interface record {
  id: number
  routine_id: number
  created_at: string
  updated_at: string
}

export interface records {
  id: number
  routine_id: number
  created_at: string
  updated_at: string
}

export default Vue.extend({
  layout: 'home',

  middleware: 'auth',

  data() {
    return {
      routines: [] as routineType[],
      name: '',
    }
  },

  created() {
    this.getUserRoutines()
  },

  methods: {
    async getUserRoutines() {
      const response = await this.$axios.$get(
        `users/${this.$auth.user.id}/routines/archive`
      )
      this.routines = response.data
    },

    showRoutineDetail(routine: routineType): void {
      ;(
        this.$refs.routineDetailDrawer as InstanceType<
          typeof RoutineDetailDrawer
        >
      ).setData(routine)
    },
  },
})
</script>
