<template>
  <div>
    <v-row class="ma-0">
      <v-col cols="12" sm="6" v-for="routine in routines" :key="routine.name">
        <v-card height="150" @click="showRoutineDetail(routine)" hover>
          <div class="text-left">
            <v-checkbox
              hide-details
              class="ml-2"
              :input-value="routine.check_status"
            ></v-checkbox>
          </div>
          <v-overlay
            absolute
            opacity="0.2"
            :value="routine.check_status"
          ></v-overlay>
          <div class="mt-4 d-flex justify-center align-center">
            <div>
              <div class="text-center">
                <p>{{ routine.name }}</p>
              </div>
              <div>
                <v-chip :color="chipColor(routine.total_rank)">{{
                  routine.total_rank
                }}</v-chip>
                <v-chip :color="chipColor(routine.continuous_rank)">{{
                  routine.continuous_rank
                }}</v-chip>
                <v-chip :color="chipColor(routine.recovery_rank)">{{
                  routine.recovery_rank
                }}</v-chip>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-btn class="add-btn" color="indigo" fab dark large @click="openAddDialog">
      <v-icon dark> mdi-plus </v-icon>
    </v-btn>

    <v-navigation-drawer
      v-model="drawer"
      mobile-breakpoint="540"
      app
      right
      :width="drawerWidth"
    >
      <div class="detail-header">
        <v-btn
          class="close-btn"
          icon
          @click="drawer = !drawer"
          v-if="width < 600"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-menu offset-y v-if="target.id">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon>
              <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="openEditDialog">
              <v-list-item-title>編集</v-list-item-title>
            </v-list-item>
            <v-list-item @click="openDeleteDialog">
              <v-list-item-title>削除</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <div class="wrapper" v-if="!target.id">
        <div>習慣を選択してください</div>
      </div>

      <div v-if="target.id">
        <h2 class="ml-2 mt-4">{{ target.name }}</h2>
        <div class="px-2">
          <v-card class="mt-4">
            <v-row class="ma-0 align-center">
              <v-col>累計日数</v-col>
              <v-col
                >{{ target.total_days }}<span class="attach">日</span></v-col
              >
              <v-col
                ><v-chip :color="chipColor(target.total_rank)">{{
                  target.total_rank
                }}</v-chip></v-col
              >
            </v-row>
          </v-card>
          <v-card class="mt-4">
            <v-row class="ma-0 align-center">
              <v-col>連続日数</v-col>
              <v-col
                >{{ target.continuous_days
                }}<span class="attach">日</span></v-col
              >
              <v-col
                ><v-chip :color="chipColor(target.continuous_rank)">{{
                  target.continuous_rank
                }}</v-chip></v-col
              >
            </v-row>
          </v-card>
          <v-card class="mt-4">
            <v-row class="ma-0 align-center">
              <v-col>リカバリー回数</v-col>
              <v-col
                >{{ target.recovery_count
                }}<span class="attach">回</span></v-col
              >
              <v-col
                ><v-chip :color="chipColor(target.recovery_rank)">{{
                  target.recovery_rank
                }}</v-chip></v-col
              >
            </v-row>
          </v-card>
        </div>
      </div>
    </v-navigation-drawer>

    <BaseDialog
      ref="addDialog"
      v-bind="{ body: true, closeIcon: true, button: false }"
    >
      <template #title>習慣を登録</template>
      <template #body>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <TextFieldName
            v-model="name"
            rules="required"
            :counter="false"
            :icon="false"
          ></TextFieldName>
          <v-card-actions class="justify-center"
            ><v-btn :disabled="invalid">登録</v-btn></v-card-actions
          >
        </validation-observer>
      </template>
    </BaseDialog>

    <BaseDialog
      ref="editDialog"
      v-bind="{ body: true, closeIcon: true, button: false }"
    >
      <template #title>習慣を編集</template>
      <template #body>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <TextFieldName
            v-model="updatedName"
            rules="required"
            :counter="false"
            :icon="false"
          ></TextFieldName>
          <v-card-actions class="justify-center"
            ><v-btn :disabled="invalid">変更</v-btn></v-card-actions
          >
        </validation-observer>
      </template>
    </BaseDialog>

    <BaseDialog ref="deleteDialog" defaultButtonText="キャンセル">
      <template #title> 本当に削除しますか？ </template>
      <template #rightButton>
        <v-btn>削除</v-btn>
      </template>
    </BaseDialog>
  </div>
</template>

<script lang="ts">
import windowWidthMixin from '../mixins/windowWidthMixin'
import BaseDialog from '../components/BaseDialog.vue'
import { $axios } from '@/util/axios'

export interface routineType {
  id: number
  name: string
  total_days: number
  continuous_days: number
  recovery_count: number
  total_rank: string
  continuous_rank: string
  recovery_rank: string
  check_status: boolean
}

export default windowWidthMixin.extend({
  layout: 'home',

  mixins: [windowWidthMixin],

  data() {
    return {
      drawer: null as boolean | null,
      detail: false,
      routines: [
        {
          id: 1,
          name: 'プログラミング',
          total_days: 4,
          continuous_days: 2,
          recovery_count: 1,
          total_rank: '初級',
          continuous_rank: '中級',
          recovery_rank: '復活',
          check_status: true,
        },
        {
          id: 2,
          name: '読書',
          total_days: 10,
          continuous_days: 4,
          recovery_count: 2,
          total_rank: '初級',
          continuous_rank: '中級',
          recovery_rank: '復活',
          check_status: false,
        },
        {
          id: 3,
          name: '瞑想',
          total_days: 4,
          continuous_days: 2,
          recovery_count: 1,
          total_rank: '見習い',
          continuous_rank: '中級',
          recovery_rank: '復活',
          check_status: false,
        },
      ],
      target: {} as routineType,
      name: '' as string,
      updatedName: '' as string,
    }
  },

  computed: {
    chipColor() {
      return function (rank: string): string {
        if (rank === '初級') return 'blue-grey lighten-3'
        if (rank === '中級') return 'brown lighten-3'
        if (rank === '上級') return 'deep-orange lighten-3'
        if (rank === '復活') return 'green lighten-3'
        return 'grey lighten-2'
      }
    },

    drawerWidth(): string {
      if (this.width >= 960) return '30%'
      if (this.width >= 600) return '40%'
      return '100%'
    },
  },

  created() {
    this.getUserRoutines()
  },

  methods: {
    getUserRoutines() {
      const response = this.$axios.$get('routines/' + this.$auth.user.id)
      console.log(response)
    },

    showRoutineDetail(routine: routineType): void {
      this.target = routine
      this.drawer = true
    },

    openAddDialog() {
      ;(this.$refs.addDialog as InstanceType<typeof BaseDialog>).openDialog()
    },

    openEditDialog() {
      ;(this.$refs.editDialog as InstanceType<typeof BaseDialog>).openDialog()
      this.updatedName = this.target.name
    },

    openDeleteDialog() {
      ;(this.$refs.deleteDialog as InstanceType<typeof BaseDialog>).openDialog()
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

.add-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
