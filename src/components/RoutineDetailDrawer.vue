<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      mobile-breakpoint="540"
      app
      right
      :width="drawerWidth"
    >
      <div class="detail-header">
        <v-btn class="close-btn" icon @click="drawer = !drawer">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-menu offset-y v-if="routine.id">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon>
              <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="archiveRoutine">
              <v-list-item-title
                ><slot name="archiveButtonText"
                  >アーカイブ</slot
                ></v-list-item-title
              >
            </v-list-item>
            <v-list-item @click="openEditDialog">
              <v-list-item-title>編集</v-list-item-title>
            </v-list-item>
            <v-list-item @click="openDeleteDialog">
              <v-list-item-title>削除</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <div class="wrapper" v-if="!loaded">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>

      <div v-if="loaded">
        <div class="wrapper" v-if="!routine.id">
          <div>習慣を選択してください</div>
        </div>

        <div v-if="routine.id">
          <h2 class="ml-2 mt-4">{{ routine.name }}</h2>
          <div class="px-2">
            <v-card class="mt-4">
              <v-row class="ma-0 align-center">
                <v-col>連続日数</v-col>
                <v-col
                  >{{ routine.continuous_days
                  }}<span class="attach">日</span></v-col
                >
                <v-col></v-col>
              </v-row>
            </v-card>
            <v-card class="mt-4">
              <v-row class="ma-0 align-center">
                <v-col>累計日数</v-col>
                <v-col
                  >{{ routine.total_days }}<span class="attach">日</span></v-col
                >
                <v-col
                  ><v-chip :color="chipColor(routine.total_rank.name)">{{
                    routine.total_rank.name
                  }}</v-chip></v-col
                >
              </v-row>
            </v-card>
            <v-card class="mt-4">
              <v-row class="ma-0 align-center">
                <v-col>最高連続日数</v-col>
                <v-col
                  >{{ routine.highest_continuous_days
                  }}<span class="attach">日</span></v-col
                >
                <v-col
                  ><v-chip
                    :color="chipColor(routine.highest_continuous_rank.name)"
                    >{{ routine.highest_continuous_rank.name }}</v-chip
                  ></v-col
                >
              </v-row>
            </v-card>
            <v-card class="mt-4">
              <v-row class="ma-0 align-center">
                <v-col>リカバリー</v-col>
                <v-col
                  >{{ routine.recovery_count
                  }}<span class="attach">回</span></v-col
                >
                <v-col
                  ><v-chip :color="chipColor(routine.recovery_rank.name)">{{
                    routine.recovery_rank.name
                  }}</v-chip></v-col
                >
              </v-row>
            </v-card>
            <v-sheet class="mt-4 mb-2" tile>
              <div class="d-flex align-center">
                <div>
                  <v-btn outlined small @click="setToday">今日</v-btn>
                </div>
                <div>
                  <v-btn icon :disabled="desiablePrevButton" @click="prev">
                    <v-icon>mdi-chevron-left</v-icon>
                  </v-btn>
                  <span>{{ calendarTitle }}</span>
                  <v-btn icon :disabled="desiableNextButton" @click="next">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-sheet>
            <v-sheet>
              <v-calendar ref="calendar" locale="ja-jp" v-model="value">
                <template v-slot:day-label="{ date, day, month, present }">
                  <v-btn
                    class="calendar-day"
                    :color="isPresent(present)"
                    :style="doneDate(date)"
                    icon
                  >
                    <span v-if="day === 1">{{ month }}/</span>
                    {{ day }}</v-btn
                  >
                </template>
              </v-calendar>
            </v-sheet>
          </div>
        </div>
      </div>
    </v-navigation-drawer>

    <BaseDialog ref="editDialog" v-bind="{ body: true, button: false }">
      <template #title>Edit</template>
      <template #body>
        <validation-observer ref="editObserver" v-slot="{ invalid }">
          <TextFieldRoutine v-model="updatedName"></TextFieldRoutine>
          <v-card-actions class="justify-center">
            <ButtonCancel
              btnClass="mr-16"
              @click="closeEditDialog"
            ></ButtonCancel>

            <ButtonOk
              :loading="editBtnLoading"
              :disabled="invalid"
              @click="editRoutine"
            ></ButtonOk>
          </v-card-actions>
        </validation-observer>
      </template>
    </BaseDialog>

    <BaseDialog
      ref="deleteDialog"
      :body="true"
      textClass="text-center"
    >
      <template #title>Confirm</template>
      <template #body>この習慣を削除しますか？</template>
      <template #leftButton>
        <ButtonOk
          :loading="deleteBtnLoading"
          @click="deleteRoutine"
        ></ButtonOk>
      </template>
      <template #defaultButton>
        <ButtonCancel
          btnClass="ml-16"
          @click="closeDeleteDialog"
        ></ButtonCancel>
      </template>
    </BaseDialog>
  </div>
</template>

<script lang="ts">
import windowWidthMixin from '../mixins/windowWidthMixin'
import BaseDialog from './BaseDialog.vue'
import { routineType, record, VCalendar } from '../lib/interface'
import { $_returnColor } from '../plugins/helper'

export default windowWidthMixin.extend({
  data() {
    return {
      routine: {} as routineType,
      drawer: null as boolean | null,
      updatedName: '',
      value: this.$dayjs().format('YYYY-MM-DD') as string,
      loaded: true,
      editBtnLoading: false,
      deleteBtnLoading: false,
    }
  },

  computed: {
    chipColor() {
      return (rank: string): string => {
        return $_returnColor(rank)
      }
    },

    calendarTitle(): string {
      return this.$dayjs(this.value).format('YYYY-MM')
    },

    doneDate() {
      return (date: number): string => {
        const calendarDate = this.$dayjs(date)
        for (let i in this.routine.records) {
          const record = this.routine.records[i]
          const recordDate = this.$dayjs(record.created_at).format('YYYY-MM-DD')
          if (calendarDate.isSame(recordDate)) {
            return 'background-color: lightblue'
          }
        }
        return ''
      }
    },

    desiableNextButton(): boolean {
      return this.isSameMonth()
    },

    desiablePrevButton(): boolean {
      return this.isSameMonth(this.routine.created_at)
    },

    isPresent() {
      return (present: boolean): string => {
        if (present) return 'blue'
        return 'grey darken-1'
      }
    },

    drawerWidth(): string {
      if (this.width >= 960) return '30%'
      if (this.width >= 600) return '40%'
      this.drawer = false
      return '100%'
    },
  },

  watch: {
    width() {
      this.drawer = false
    },
  },

  methods: {
    isSameMonth(created_at?: string) {
      const month = this.$dayjs(this.value.substring(0, 7))
      const date = this.$dayjs(created_at).format('YYYY-MM')
      if (month.isSame(date)) {
        return true
      }
      return false
    },

    setData(routine: routineType) {
      this.routine = routine
      this.drawer = true
      this.setToday()
    },

    async archiveRoutine() {
      const sendData = {
        routine_id: this.routine.id,
      }
      await this.$axios.$post('users/routines/archive', sendData)
      this.routine = {} as routineType
      this.$emit('startLoading')
      this.$emit('reloadRoutines')
    },

    // カレンダー
    setToday() {
      this.value = this.$dayjs().format('YYYY-MM-DD')
    },

    prev() {
      const calendar = this.$refs.calendar as VCalendar
      calendar.prev()
    },

    next() {
      const calendar = this.$refs.calendar as VCalendar
      calendar.next()
    },

    // 習慣の編集
    openEditDialog() {
      ;(this.$refs.editDialog as InstanceType<typeof BaseDialog>).openDialog()
      this.updatedName = this.routine.name
    },

    async editRoutine() {
      this.editBtnLoading = true
      const sendData = {
        name: this.updatedName,
      }
      const response = await this.$axios.$put(
        `users/routines/${this.routine.id}`,
        sendData
      )
      this.routine.name = response.data.name
      this.$emit('reloadRoutines')
      // ;(this.$refs.editDialog as InstanceType<typeof BaseDialog>).closeDialog()
      this.closeEditDialog()
      this.editBtnLoading = false
    },

    closeEditDialog() {
      ;(this.$refs.editDialog as InstanceType<typeof BaseDialog>).closeDialog()
    },

    // 習慣の削除
    openDeleteDialog() {
      ;(this.$refs.deleteDialog as InstanceType<typeof BaseDialog>).openDialog()
    },

    async deleteRoutine() {
      this.deleteBtnLoading = true
      await this.$axios.$delete(`users/routines/${this.routine.id}`)
      this.$emit('reloadRoutines')
      this.routine = {} as routineType
      this.closeDeleteDialog()
      this.deleteBtnLoading = false
    },

    closeDeleteDialog() {
      ;(
        this.$refs.deleteDialog as InstanceType<typeof BaseDialog>
      ).closeDialog()
    },
  },
})
</script>

<style scoped>
.wrapper {
  height: calc(100vh - 64px);
}

.close-btn {
  line-height: 64px;
}

.detail-header {
  height: 64px;
  display: flex;
  align-items: center;
}

.attach {
  font-size: 0.7rem;
  margin-left: 2px;
}

.calendar-day {
  font-size: 12px;
  color: #000000de;
  margin: 6px 0 6px 0;
}
</style>
