<template>
  <div>
    <HeaderDrawer v-model="keyword" header-title="アーカイブ" ></HeaderDrawer>

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
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import { routineType } from '../lib/interface'
import RoutineDetailDrawer from '../components/RoutineDetailDrawer.vue'

interface DataType {
  loaded: boolean
  routines: routineType[]
  name: string
  keyword: string
}

interface MethodType {
  getUserRoutines(): Promise<void>
  showRoutineDetail(): void
  refsRoutineDetailDrawer(): any
}

interface ComputedType {}

interface PropsType {}

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
      this.refsRoutineDetailDrawer().setRoutine(routine)
    },

    // コンポーネント要素の型定義
    refsRoutineDetailDrawer() {
      return this.$refs.routineDetailDrawer as InstanceType<
        typeof RoutineDetailDrawer
      >
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>
