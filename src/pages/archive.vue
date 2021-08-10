<template>
  <div>
    <HeaderDrawer headerTitle="アーカイブ" v-model="keyword"></HeaderDrawer>

    <v-main>
      <v-container>
        <RoutineCards
          v-bind="{
            loaded: loaded,
            routines: routines,
            keyword: keyword,
          }"
          @clickRoutine="showRoutineDetail"
        >
        </RoutineCards>
      </v-container>
    </v-main>

    <RoutineDetailDrawer
      ref="routineDetailDrawer"
      @reloadRoutines="getUserRoutines"
      @startLoading="loaded = false"
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
  middleware: 'auth',

  data() {
    return {
      loaded: false,
      routines: [] as routineType[],
      name: '',
      keyword: '',
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
      this.routineDetailDrawer().setData(routine)
    },

    routineDetailDrawer() {
      return this.$refs.routineDetailDrawer as InstanceType<
        typeof RoutineDetailDrawer
      >
    },
  },
})
</script>
