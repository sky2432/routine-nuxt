<template>
  <div>
    <HeaderDrawer
      headerTitle="ホーム"
      v-model="keywordForSearch"
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
      textClass="text-center pb-0 px-16"
      defaultButtonType="ok"
    >
      <template #title>Congratulations!!</template>
      <template #text>
        <p>「{{ rankUpRoutineName }}」ランクアップ</p>
        <v-row class="ma-0" v-for="rank in rankUpData" :key="rank.name">
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
import { $axios } from '@/util/axios'
import { routineType, rankUpData } from '../lib/interface'
import { $_returnColor } from '../plugins/helper'
import DialogRoutine from '../components/DialogRoutine.vue'
import BaseDialog from '../components/BaseDialog.vue'
import RoutineDetailDrawer from '../components/RoutineDetailDrawer.vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'

interface DataType {
  loaded: boolean
  routines: routineType[]
  selectedRoutine: routineType
  name: string
  keywordForSearch: string
  rankUpData: rankUpData[]
  rankUpRoutineName: string
}

interface MethodType {
  fetchUserRoutines(): Promise<void>
  showRoutineDetail(routine: routineType): void
  createOrDeleteRecord(routine: routineType): void
  createRecord(routineId: number): Promise<void>
  notifyRankUp(rankUpData: rankUpData[]): void
  deleteRecord(routine: routineType): Promise<void>
  reloadRoutineDetail(routine_id: number): void
  openAddDialog(): void
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
  middleware: 'auth',

  data() {
    return {
      loaded: false,
      routines: [] as routineType[],
      selectedRoutine: {} as routineType,
      name: '',
      keywordForSearch: '',
      rankUpData: {} as rankUpData[],
      rankUpRoutineName: '' as string,
    }
  },

  computed: {
    rankColor() {
      return (rank: string): string => {
        return $_returnColor(rank)
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
      this.refsRoutineDetailDrawer().setRoutine(routine)
    },

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

    reloadRoutineDetail(routine_id: number) {
      if (this.selectedRoutine.id === routine_id) {
        for (let i in this.routines) {
          const routine = this.routines[i]
          if (routine.id === routine_id) {
            this.showRoutineDetail(routine)
          }
        }
      }
    },

    // 習慣の追加
    openAddDialog() {
      this.refsAddDialog().openDialog()
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
    right: 41%;
  }
}

@media screen and (min-width: 960px) {
  .add-btn {
    right: 31%;
  }
}
</style>
