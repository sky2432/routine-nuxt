<template>
  <div>
    <HeaderDrawer
      v-model="keywordForSearch"
      header-title="ホーム"
    ></HeaderDrawer>

    <v-main>
      <v-container>
        <RoutineCards
          v-bind="{
            loaded: loaded,
            routines: routines,
            keyword: keywordForSearch,
            isHome: true,
          }"
          @clickRoutine="showRoutineDetail"
          @clickCheckbox="createOrDeleteRecord"
        >
        </RoutineCards>

        <v-btn
          class="add-btn"
          color="indigo"
          fab
          dark
          large
          @click="openAddDialog"
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </v-container>
    </v-main>

    <RoutineDetailDrawer
      ref="routineDetailDrawer"
      @reloadRoutines="fetchUserRoutines"
      @startLoading="loaded = false"
    ></RoutineDetailDrawer>

    <DialogRoutine ref="addDialog" v-model="name" @click="addRoutine">
      <template #title>Register</template>
    </DialogRoutine>

    <BaseDialog
      ref="rankUpDialog"
      :text="true"
      :divider="true"
      text-class="text-center pb-0 px-16"
      default-button-type="ok"
    >
      <template #title>Congratulations!!</template>
      <template #text>
        <p>「{{ rankUpRoutineName }}」ランクアップ</p>
        <v-row v-for="rank in rankUpData" :key="rank.name" class="ma-0">
          <v-col>
            {{ rank.name }}
          </v-col>
          <v-col cols="1"> → </v-col>
          <v-col>
            <v-chip :color="rankColor(rank.rank_name)">{{
              rank.rank_name
            }}</v-chip>
          </v-col>
        </v-row>
      </template>
    </BaseDialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import { $$returnColor } from '../plugins/helper'
import { routineType, rankUpData } from '../lib/interface'
import { windowWidthMixin } from '../mixins/windowWidthMixin'
import BaseDialog from '../components/BaseDialog.vue'
import DialogRoutine from '../components/DialogRoutine.vue'
import RoutineDetailDrawer from '../components/RoutineDetailDrawer.vue'

interface DataType {
  width: number
  loaded: boolean
  name: string
  keywordForSearch: string
  routines: routineType[]
  selectedRoutine: routineType
  rankUpRoutineName: string
  rankUpData: rankUpData[]
}

interface MethodType {
  fetchUserRoutines(): Promise<void>
  showRoutineDetail(routine: routineType): void
  createOrDeleteRecord(routine: routineType): void
  createRecord(routineId: number): Promise<void>
  notifyRankUp(rankUpData: rankUpData[]): void
  deleteRecord(routine: routineType): Promise<void>
  reloadRoutineDetail(routineId: number): void
  openAddDialog(): void
  resetNameTextField(): void
  addRoutine(): Promise<void>
  refsRankUpDialog(): any
  refsRoutineDetailDrawer(): any
  refsAddDialog(): any
}

interface ComputedType {
  rankColor(rank: string): string
}

interface PropsType {}

export default Vue.extend({
  mixins: [windowWidthMixin],

  middleware: 'auth',

  data() {
    return {
      width: window.innerWidth as number, // windowWidthMixinの変数
      loaded: false,
      name: '',
      keywordForSearch: '',
      routines: [] as routineType[],
      selectedRoutine: {} as routineType,
      rankUpRoutineName: '',
      rankUpData: {} as rankUpData[],
    }
  },

  computed: {
    rankColor() {
      return (rank: string): string => {
        return $$returnColor(rank)
      }
    },
  },

  created() {
    this.fetchUserRoutines()
  },

  methods: {
    async fetchUserRoutines() {
      const response = await this.$axios.$get(
        `users/${this.$auth.user.id}/routines`
      )
      this.routines = response.data
      this.loaded = true
    },

    showRoutineDetail(routine: routineType): void {
      this.selectedRoutine = routine
      // 子コンポーネントのメソッドを発火
      this.refsRoutineDetailDrawer().setRoutine(routine)
    },

    // 習慣の履歴 begin
    //
    createOrDeleteRecord(routine: routineType) {
      if (routine.today_record === null) {
        this.createRecord(routine.id)
      } else {
        this.deleteRecord(routine)
      }
    },

    async createRecord(routineId: number) {
      const sendData = {
        routine_id: routineId,
      }
      const response = await this.$axios.$post('routines/records', sendData)
      await this.fetchUserRoutines()
      this.reloadRoutineDetail(routineId)
      this.notifyRankUp(response.rank_up_data)
      this.rankUpRoutineName = response.routine_name
    },

    notifyRankUp(rankUpData: rankUpData[]) {
      if (rankUpData.length !== 0) {
        this.rankUpData = rankUpData
        this.refsRankUpDialog().openDialog()
      }
    },

    async deleteRecord(routine: routineType) {
      await this.$axios.$delete(`routines/records/${routine.today_record?.id}`)
      await this.fetchUserRoutines()
      this.reloadRoutineDetail(routine.id)
    },

    reloadRoutineDetail(routineId: number) {
      if (this.selectedRoutine.id === routineId) {
        for (const i in this.routines) {
          const routine = this.routines[i]
          if (routine.id === routineId && this.width >= 600) {
            this.showRoutineDetail(routine)
          }
        }
      }
    },
    //
    // end

    // 習慣の追加 begin
    //
    openAddDialog() {
      this.refsAddDialog().openDialog()
      this.resetNameTextField()
    },

    resetNameTextField() {
      this.name = ''
      this.refsAddDialog().resetForm()
    },

    async addRoutine() {
      this.refsAddDialog().startLoading()
      const sendData = {
        name: this.name,
        user_id: this.$auth.user.id,
      }
      await this.$axios.$post('users/routines', sendData)
      await this.fetchUserRoutines()
      this.refsAddDialog().closeDialog()
      this.refsAddDialog().stopLoading()
    },
    //
    // end

    // コンポーネント要素の型定義 begin
    //
    refsRankUpDialog() {
      return this.$refs.rankUpDialog as InstanceType<typeof BaseDialog>
    },

    refsRoutineDetailDrawer() {
      return this.$refs.routineDetailDrawer as InstanceType<
        typeof RoutineDetailDrawer
      >
    },

    refsAddDialog() {
      return this.$refs.addDialog as InstanceType<typeof DialogRoutine>
    },
    //
    // end
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>

<style scoped>
.add-btn {
  position: fixed;
  bottom: 10px;
  right: 1%;
}

@media screen and (min-width: 600px) {
  .add-btn {
    right: 51%;
  }
}

@media screen and (min-width: 960px) {
  .add-btn {
    right: 31%;
  }
}
</style>
