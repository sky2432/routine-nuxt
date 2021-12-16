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
        <v-menu v-if="routine.id" offset-y>
          <template #activator="{ on, attrs }">
            <v-btn v-bind="attrs" icon v-on="on">
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

      <div v-if="!loaded" class="wrapper">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>

      <div v-if="loaded">
        <div v-if="!routine.id" class="wrapper">
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
                  ><v-chip :color="rankColor(routine.total_rank.name)">{{
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
                    :color="rankColor(routine.highest_continuous_rank.name)"
                    >{{ routine.highest_continuous_rank.name }}</v-chip
                  ></v-col
                >
              </v-row>
            </v-card>
            <v-tooltip top>
              <template #activator="{ on, attrs }">
                <v-card class="mt-4" v-bind="attrs" v-on="on">
                  <v-row class="ma-0 align-center">
                    <v-col>リカバリー</v-col>
                    <v-col
                      >{{ routine.recovery_count
                      }}<span class="attach">回</span></v-col
                    >
                    <v-col
                      ><v-chip :color="rankColor(routine.recovery_rank.name)">{{
                        routine.recovery_rank.name
                      }}</v-chip></v-col
                    >
                  </v-row>
                </v-card>
              </template>
              <span>連続日数が途切れてから2日連続で達成してプラス1回</span>
            </v-tooltip>
            <v-sheet class="mt-4 mb-2" tile>
              <div class="d-flex align-center">
                <div>
                  <v-btn outlined small @click="setToday">今日</v-btn>
                </div>
                <div>
                  <v-btn icon :disabled="desiableCalenderPrevBtn" @click="prev">
                    <v-icon>mdi-chevron-left</v-icon>
                  </v-btn>
                  <span>{{ calendarTitle }}</span>
                  <v-btn icon :disabled="desiableCalenderNextBtn" @click="next">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-sheet>
            <v-sheet class="calender-sheet">
              <v-calendar ref="calendar" v-model="calendarDate" locale="ja-jp">
                <template #day-label="{ date, day, month, present }">
                  <v-btn
                    class="calendar-day"
                    :color="calenderDayColor(present)"
                    :style="calendarDayBackgroundColor(date)"
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

    <DialogRoutine ref="editDialog" v-model="updatedName" @click="editRoutine">
      <template #title>Edit</template>
    </DialogRoutine>

    <BaseDialog
      ref="deleteDialog"
      :text="true"
      :divider="true"
      text-class="text-center"
      default-button-type="cancel"
    >
      <template #title>Confirm</template>
      <template #text>この習慣を削除しますか？</template>
      <template #leftButton>
        <ButtonOk
          :loading="deleteBtnLoading"
          btn-class="mr-16"
          @click="deleteRoutine"
        ></ButtonOk>
      </template>
    </BaseDialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import dayjs from 'dayjs'
import BaseDialog from '@/components/Base/Dialog.vue'
import DialogRoutine from '@/components/Dialog/Routine.vue'
import { windowWidthMixin } from '@/mixins/windowWidthMixin'
import { $$returnColor } from '@/plugins/helper'
import { routineType, VCalendar } from '@/lib/interface'

interface DataType {
  width: number
  loaded: boolean
  deleteBtnLoading: boolean
  drawer: boolean | null
  routine: routineType
  updatedName: string
  calendarDate: string
}

interface MethodType {
  setRoutine(routine: routineType): void
  showDrawer(): void
  setToday(): void
  prev(): void
  next(): void
  isSameMonth(createdAt?: string | undefined): boolean
  isDoneRoutineDate(date: number): boolean
  archiveRoutine(): Promise<void>
  openEditDialog(): void
  setRoutineName(): void
  editRoutine(): Promise<void>
  openDeleteDialog(): void
  deleteRoutine(): Promise<void>
  reloadParentRoutines(): void
  refsCalendar(): VCalendar
  refsEditDialog(): any
  refsDeleteDialog(): any
}

interface ComputedType {
  rankColor(rank: string): string
  calendarTitle(): string
  calendarDayBackgroundColor(date: number): string
  desiableCalenderNextBtn(): boolean
  desiableCalenderPrevBtn(): boolean
  calenderDayColor(present: boolean): string
  drawerWidth(): string
}

interface PropsType {}

export default Vue.extend({
  components: {
    BaseDialog,
    DialogRoutine,
  },

  mixins: [windowWidthMixin],

  data() {
    return {
      width: window.innerWidth as number, // windowWidthMixinの変数
      loaded: true,
      deleteBtnLoading: false,
      drawer: null as boolean | null,
      routine: {} as routineType,
      updatedName: '',
      calendarDate: dayjs().format('YYYY-MM-DD') as string,
    }
  },

  computed: {
    rankColor() {
      return (rank: string): string => {
        return $$returnColor(rank)
      }
    },

    calendarTitle(): string {
      return dayjs(this.calendarDate).format('YYYY-MM')
    },

    calendarDayBackgroundColor() {
      return (date: number): string => {
        const isDone = this.isDoneRoutineDate(date)
        if (isDone === true) {
          return 'background-color: lightblue'
        }
        return ''
      }
    },

    desiableCalenderNextBtn(): boolean {
      return this.isSameMonth()
    },

    desiableCalenderPrevBtn(): boolean {
      return this.isSameMonth(this.routine.created_at)
    },

    calenderDayColor() {
      return (present: boolean): string => {
        if (present) return 'blue'
        return 'grey darken-1'
      }
    },

    // 画面幅によってdrawerの幅を変更
    drawerWidth(): string {
      if (this.width >= 960) return '30%'
      if (this.width >= 600) return '50%'
      return '100%'
    },
  },

  watch: {
    width() {
      this.drawer = false
    },
  },

  created() {
    this.setToday()
  },

  methods: {
    setRoutine(routine: routineType) {
      this.routine = routine
      this.showDrawer()
    },

    showDrawer() {
      this.drawer = true
    },

    // カレンダー関連 begin
    //
    setToday() {
      this.calendarDate = dayjs().format('YYYY-MM-DD')
    },

    prev() {
      this.refsCalendar().prev()
    },

    next() {
      this.refsCalendar().next()
    },

    isSameMonth(createdAt?: string) {
      const month = dayjs(this.calendarDate.substring(0, 7))
      const date = dayjs(createdAt).format('YYYY-MM')
      if (month.isSame(date)) {
        return true
      }
      return false
    },

    isDoneRoutineDate(date: number): boolean {
      const calendarDate = dayjs(date)
      for (const i in this.routine.records) {
        const record = this.routine.records[i]
        const recordDate = dayjs(record.created_at).format('YYYY-MM-DD')
        if (calendarDate.isSame(recordDate)) {
          return true
        }
      }
      return false
    },
    //
    // end

    async archiveRoutine() {
      const sendData = {
        routine_id: this.routine.id,
      }
      await this.$axios.$post('users/routines/archive', sendData)
      this.routine = {} as routineType
      this.reloadParentRoutines()
    },

    // 習慣の編集 begin
    //
    openEditDialog() {
      this.refsEditDialog().openDialog()
      this.setRoutineName()
    },

    setRoutineName() {
      this.updatedName = this.routine.name
    },

    async editRoutine() {
      this.refsEditDialog().startLoading()
      const sendData = {
        name: this.updatedName,
      }
      const response = await this.$axios.$put(
        `users/routines/${this.routine.id}`,
        sendData
      )
      this.routine.name = response.data.name
      this.$emit('reloadRoutines')
      this.refsEditDialog().closeDialog()
      this.refsEditDialog().stopLoading()
    },
    //
    // end

    // 習慣の削除
    //
    openDeleteDialog() {
      this.refsDeleteDialog().openDialog()
    },

    async deleteRoutine() {
      this.deleteBtnLoading = true
      await this.$axios.$delete(`users/routines/${this.routine.id}`)
      this.reloadParentRoutines()
      this.routine = {} as routineType
      this.refsDeleteDialog().closeDialog()
      this.deleteBtnLoading = false
    },
    //
    // end

    reloadParentRoutines() {
      this.$emit('startLoading')
      this.$emit('reloadRoutines')
    },

    // コンポーネント要素の型定義 begin
    //
    refsCalendar() {
      return this.$refs.calendar as VCalendar
    },

    refsEditDialog() {
      return this.$refs.editDialog as InstanceType<typeof DialogRoutine>
    },

    refsDeleteDialog() {
      return this.$refs.deleteDialog as InstanceType<typeof BaseDialog>
    },
    //
    // end
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
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

.calender-sheet {
  margin-bottom: 150px;
}

@media screen and (min-width: 600px) {
  .calender-sheet {
    margin-bottom: 0px;
  }
}
</style>
