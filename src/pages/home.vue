<template>
  <div>
    <HeaderDrawer headerTitle="ホーム" v-model="keyword"></HeaderDrawer>

    <v-main>
      <v-container>
        <RoutineCards
          v-bind="{
            loaded: loaded,
            routines: routines,
            isHome: true,
            keyword: keyword,
          }"
          @clickRoutine="showRoutineDetail"
          @clickCheckbox="changeRecord"
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
      @reloadRoutines="getUserRoutines"
      @startLoading="loaded = false"
    ></RoutineDetailDrawer>

    <BaseDialog
      ref="addDialog"
      v-bind="{ text: true, actions: false }"
      textClass="pb-0"
    >
      <template #title>Register</template>
      <template #text>
        <validation-observer ref="addobserver" v-slot="{ invalid }">
          <TextFieldRoutine v-model="name"></TextFieldRoutine>
          <v-card-actions class="justify-center">
            <ButtonOk
              :loading="btnLoading"
              :disabled="invalid"
              @click="addRoutine"
            ></ButtonOk>
            <ButtonCancel
              btnClass="ml-16"
              @click="closeAddDialog"
            ></ButtonCancel>
          </v-card-actions>
        </validation-observer>
      </template>
    </BaseDialog>

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
        <v-row v-for="rank in rankUpInfo" :key="rank.name">
          <v-col>
            {{ rank.name }}
          </v-col>
          <v-col cols="1"> → </v-col>
          <v-col>
            <v-chip :color="chipColor(rank.rank_name)">{{
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
import { ValidationObserver } from 'vee-validate'
import { routineType, rankUp } from '../lib/interface'
import { $_returnColor } from '../plugins/helper'
import BaseDialog from '../components/BaseDialog.vue'
import RoutineDetailDrawer from '../components/RoutineDetailDrawer.vue'

export default Vue.extend({
  middleware: 'auth',

  data() {
    return {
      loaded: false,
      btnLoading: false,
      routines: [] as routineType[],
      target: {} as routineType,
      name: '',
      rankUpInfo: {} as rankUp[],
      rankUpRoutineName: '' as string,
      keyword: '',
    }
  },

  computed: {
    chipColor() {
      return (rank: string): string => {
        return $_returnColor(rank)
      }
    },
  },

  created() {
    this.getUserRoutines()
  },

  methods: {
    async getUserRoutines() {
      const response = await this.$axios.$get(
        `users/${this.$auth.user.id}/routines`
      )
      this.routines = response.data
      this.loaded = true
    },

    showRoutineDetail(routine: routineType): void {
      this.target = routine
      ;(
        this.$refs.routineDetailDrawer as InstanceType<
          typeof RoutineDetailDrawer
        >
      ).setData(routine)
    },

    changeRecord(routine: routineType) {
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
      await this.getUserRoutines()
      this.reloadRoutineDetail(routineId)
      this.notifyRankUp(response.rank_up)
      this.rankUpRoutineName = response.routine_name
    },

    notifyRankUp(rank_up: rankUp[]) {
      if (rank_up.length !== 0) {
        this.rankUpInfo = rank_up
        ;(
          this.$refs.rankUpDialog as InstanceType<typeof BaseDialog>
        ).openDialog()
      }
    },

    async deleteRecord(routine: routineType) {
      await this.$axios.$delete(`routines/records/${routine.today_record?.id}`)
      await this.getUserRoutines()
      this.reloadRoutineDetail(routine.id)
    },

    reloadRoutineDetail(routine_id: number) {
      if (this.target.id === routine_id) {
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
      ;(this.$refs.addDialog as InstanceType<typeof BaseDialog>).openDialog()
      this.name = ''
      // ;(this.$refs.rankUpDialog as InstanceType<typeof BaseDialog>).openDialog()
      this.$nextTick(() => {
        ;(
          this.$refs.addobserver as InstanceType<typeof ValidationObserver>
        ).reset()
      })
    },

    async addRoutine() {
      this.btnLoading = true
      const sendData = {
        name: this.name,
        user_id: this.$auth.user.id,
      }
      await this.$axios.$post('users/routines', sendData)
      await this.getUserRoutines()
      this.closeAddDialog()
      this.btnLoading = false
    },

    closeAddDialog() {
      this.addDialog().closeDialog()
    },

    addDialog() {
      return this.$refs.addDialog as InstanceType<typeof BaseDialog>
    },
  },
})
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
