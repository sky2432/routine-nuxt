<template>
  <div>
    <v-row class="ma-0">
      <v-col cols="12" sm="6" v-for="routine in routines" :key="routine.name">
        <v-card
          class="routine"
          height="150"
          @click="showRoutineDetail(routine)"
          hover
        >
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
      </div>
      <div class="wrapper" v-if="!detail">
        <div>習慣を選択してください</div>
      </div>
      <div v-if="detail">
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
  </div>
</template>

<script lang="ts">
import windowWidthMixin from '../mixins/windowWidthMixin'

export interface routineType {
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
      if (this.width >= 960) {
        return '30%'
      }
      if (this.width >= 600) {
        return '40%'
      }
      return '100%'
    },
  },

  methods: {
    showRoutineDetail(routine: routineType): void {
      this.detail = true
      this.target = routine
      this.drawer = true
    },
  },
})
</script>

<style scoped>
.right-drawer {
  width: 100%;
}

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
</style>
