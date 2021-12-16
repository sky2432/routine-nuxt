<template>
  <div>
    <TheHeaderDrawer v-model="keyword" header-title="アーカイブ" ></TheHeaderDrawer>

    <v-main>
      <v-container>
        <CardRoutine
          v-bind="{
            loaded: loaded,
            routines: routines,
            keyword: keyword,
          }"
          @clickRoutine="showRoutineDetail"
        >
        </CardRoutine>
      </v-container>
    </v-main>

    <DrawerRoutineDetail
      ref="routineDetailDrawer"
      @reloadRoutines="getUserRoutines"
      @startLoading="loaded = false"
    >
      <template #archiveButtonText>戻す</template>
    </DrawerRoutineDetail>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import { routineType } from '@/lib/interface'
import DrawerRoutineDetail from '@/components/Drawer/RoutineDetail.vue'

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
        typeof DrawerRoutineDetail
      >
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>
