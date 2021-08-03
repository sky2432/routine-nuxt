<template>
  <div>
    <RoutineCards
      :routines="routines"
      :isHome="true"
      @clickRoutine="showRoutineDetail"
      @clickCheckbox="changeRecord"
    >
    </RoutineCards>

    <v-btn class="add-btn" color="indigo" fab dark large @click="openAddDialog">
      <v-icon dark> mdi-plus </v-icon>
    </v-btn>

    <RoutineDetailDrawer
      ref="routineDetailDrawer"
      @reloadRoutines="getUserRoutines"
    ></RoutineDetailDrawer>

    <BaseDialog
      ref="addDialog"
      v-bind="{ body: true, closeIcon: true, button: false }"
    >
      <template #title>習慣を登録</template>
      <template #body>
        <validation-observer ref="addobserver" v-slot="{ invalid }">
          <TextFieldRoutine v-model="name"></TextFieldRoutine>
          <v-card-actions class="justify-center"
            ><v-btn :disabled="invalid" @click="addRoutine"
              >登録</v-btn
            ></v-card-actions
          >
        </validation-observer>
      </template>
    </BaseDialog>

    <BaseDialog ref="rankUpDialog">
      <template #title>ランクアップ</template>
    </BaseDialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseDialog from '../components/BaseDialog.vue'
import RoutineDetailDrawer from '../components/RoutineDetailDrawer.vue'
import { ValidationObserver } from 'vee-validate'
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

export interface rankUp {
  total_rank: boolean
  highest_continuous_rank: boolean
  recovery_rank: boolean
}

export interface VCalendar extends Vue {
  prev(): void
  next(): void
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
        `users/${this.$auth.user.id}/routines`
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
    },

    notifyRankUp(rank_up: rankUp) {
      if (
        rank_up.total_rank ||
        rank_up.highest_continuous_rank ||
        rank_up.recovery_rank
      ) {
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
      for (let i in this.routines) {
        const routine = this.routines[i]
        if (routine.id === routine_id) {
          this.showRoutineDetail(routine)
        }
      }
    },

    // 習慣の追加
    openAddDialog() {
      ;(this.$refs.addDialog as InstanceType<typeof BaseDialog>).openDialog()
      this.name = ''
      this.$nextTick(() => {
        ;(
          this.$refs.addobserver as InstanceType<typeof ValidationObserver>
        ).reset()
      })
    },

    async addRoutine() {
      const sendData = {
        name: this.name,
        user_id: this.$auth.user.id,
      }
      await this.$axios.$post('users/routines', sendData)
      this.getUserRoutines()
      this.name = ''
      ;(this.$refs.addDialog as InstanceType<typeof BaseDialog>).closeDialog()
    },
  },
})
</script>

<style scoped>
.add-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
