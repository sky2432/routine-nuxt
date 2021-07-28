<template>
  <div>
    <v-row class="ma-0">
      <v-col cols="12" sm="6" v-for="routine in routines" :key="routine.id">
        <v-card height="150" @click="showRoutineDetail(routine)" hover>
          <div class="text-left">
            <v-checkbox
              hide-details
              class="ml-2"
              :input-value="false"
            ></v-checkbox>
          </div>
          <v-overlay absolute opacity="0.2" :value="false"></v-overlay>
          <div class="mt-4 d-flex justify-center align-center">
            <div>
              <div class="text-center">
                <p>{{ routine.name }}</p>
              </div>
              <div>
                <v-chip :color="chipColor(routine.total_rank.name)">{{
                  routine.total_rank.name
                }}</v-chip>
                <v-chip :color="chipColor(routine.continuous_rank.name)">{{
                  routine.continuous_rank.name
                }}</v-chip>
                <v-chip :color="chipColor(routine.recovery_rank.name)">{{
                  routine.recovery_rank.name
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
                ><v-chip :color="chipColor(target.total_rank.name)">{{
                  target.total_rank.name
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
                ><v-chip :color="chipColor(target.continuous_rank.name)">{{
                  target.continuous_rank.name
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
                ><v-chip :color="chipColor(target.recovery_rank.name)">{{
                  target.recovery_rank.name
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
          <TextFieldName v-model="name" rules="required"></TextFieldName>
          <v-card-actions class="justify-center"
            ><v-btn :disabled="invalid" @click="addRoutine"
              >登録</v-btn
            ></v-card-actions
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
  user_id: number
  total_days: number
  continuous_days: number
  recovery_count: number
  total_rank: rank
  continuous_rank: rank
  recovery_rank: rank
  created_at: string
  updated_at: string
}

interface rank {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export default windowWidthMixin.extend({
  layout: 'home',

  mixins: [windowWidthMixin],

  data() {
    return {
      drawer: null as boolean | null,
      detail: false,
      routines: [] as routineType[],
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
        if (rank === '聖級') return 'yellow lighten-3'
        if (rank === '王級') return 'indigo lighten-3'
        if (rank === '帝級') return 'deep-purple lighten-3'
        if (rank === '神級') return 'pink lighten-3'
        if (rank === '復活') return 'green lighten-3'
        if (rank === '不屈') return 'purple lighten-3'
        if (rank === '蘇生') return 'lime lighten-3'
        if (rank === '転生') return 'light-blue lighten-3'
        if (rank === '不死') return 'red lighten-3'
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
    async getUserRoutines() {
      const response = await this.$axios.$get('routines/' + this.$auth.user.id)
      this.routines = response.data
      console.log(response.data)
    },

    showRoutineDetail(routine: routineType): void {
      this.target = routine
      this.drawer = true
    },

    openAddDialog() {
      ;(this.$refs.addDialog as InstanceType<typeof BaseDialog>).openDialog()
    },

    async addRoutine() {
      const sendData = {
        name: this.name,
        user_id: this.$auth.user.id,
      }
      await this.$axios.$post('routines', sendData)
      this.getUserRoutines()
      ;(this.$refs.addDialog as InstanceType<typeof BaseDialog>).closeDialog()
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
