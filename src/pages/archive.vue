<template>
  <div>
    <RoutineCards
      v-bind="{
        loaded: loaded,
        routines: routines,
      }"
      @clickRoutine="showRoutineDetail"
    >
    </RoutineCards>

    <RoutineDetailDrawer
      ref="routineDetailDrawer"
      @reloadRoutines="getUserRoutines"
    >
      <template #archiveButtonText>戻す</template>
    </RoutineDetailDrawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { $axios } from '@/util/axios'
import { routineType } from '../lib/interface'
import RoutineDetailDrawer from '../components/RoutineDetailDrawer.vue'

export default Vue.extend({
  layout: 'home',

  middleware: 'auth',

  data() {
    return {
      loaded: false,
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
      this.loaded = true
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
