<template>
  <div>
    <HeaderDrawer header-title="ルール" :serach="false"></HeaderDrawer>

    <v-main>
      <v-container>
        <div v-if="isMobileWidth">
          <v-simple-table>
            <template #default>
              <thead>
                <tr>
                  <th></th>
                  <th class="text-left">累計日数</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tableItem in tableItems" :key="tableItem.rank">
                  <th class="text-center">
                    <v-chip :color="tableItem.color">{{
                      tableItem.rank
                    }}</v-chip>
                  </th>
                  <td>{{ tableItem.all }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <v-simple-table>
            <template #default>
              <thead>
                <tr>
                  <th></th>
                  <th class="text-left">最高連続日数</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tableItem in tableItems" :key="tableItem.rank">
                  <th class="text-center">
                    <v-chip :color="tableItem.color">{{
                      tableItem.rank
                    }}</v-chip>
                  </th>
                  <td>{{ tableItem.highestContinuous }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <v-simple-table>
            <template #default>
              <thead>
                <tr>
                  <th></th>
                  <th class="text-left">リカバリー</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tableItem in tableItems" :key="tableItem.rank">
                  <th class="text-center">
                    <v-chip :color="tableItem.color">{{
                      tableItem.rank
                    }}</v-chip>
                  </th>
                  <td>{{ tableItem.recovery }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>

        <v-simple-table v-if="!isMobileWidth">
          <template #default>
            <thead>
              <tr>
                <th></th>
                <th class="text-left">累計日数</th>
                <th class="text-left">最高連続日数</th>
                <th class="text-left">リカバリー</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tableItem in tableItems" :key="tableItem.rank">
                <td class="text-center">
                  <v-chip :color="tableItem.color">{{ tableItem.rank }}</v-chip>
                </td>
                <td>{{ tableItem.all }}</td>
                <td>{{ tableItem.highestContinuous }}</td>
                <td>{{ tableItem.recovery }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </v-main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import { RANK_COLOR } from '../config/const'
import { windowWidthMixin } from '../mixins/windowWidthMixin'

export interface tableItems {
  rank: string
  all: string
  highestContinuous: string
  recovery: string
  color: string
}

interface DataType {
  width: number
  isMobileWidth: boolean
  tableItems: tableItems[]
}

interface MethodType {
  switchTableType(): void
}

interface ComputedType {}

interface PropsType {}


export default Vue.extend({
  mixins: [windowWidthMixin],

  data() {
    return {
      width: window.innerWidth as number, // windowWidthMixinの変数
      isMobileWidth: false,
      tableItems: [
        {
          rank: 'SS',
          all: '6ヶ月（180日）〜',
          highestContinuous: '3ヶ月（90日）〜',
          recovery: '18回〜',
          color: RANK_COLOR.SS,
        },
        {
          rank: 'S',
          all: '4ヶ月（120日）〜',
          highestContinuous: '2ヶ月（60日）〜',
          recovery: '15回〜',
          color: RANK_COLOR.S,
        },
        {
          rank: 'A',
          all: '3ヶ月（90日）〜',
          highestContinuous: '1ヶ月（30日）〜',
          recovery: '12回〜',
          color: RANK_COLOR.A,
        },
        {
          rank: 'B',
          all: '2ヶ月（60日）〜',
          highestContinuous: '3週間（21日）〜',
          recovery: '9回〜',
          color: RANK_COLOR.B,
        },
        {
          rank: 'C',
          all: '1ヶ月（30日）〜',
          highestContinuous: '2週間（14日）〜',
          recovery: '6回〜',
          color: RANK_COLOR.C,
        },
        {
          rank: 'D',
          all: '2週間（14日）〜',
          highestContinuous: '1週間（7日）〜',
          recovery: '3回〜',
          color: RANK_COLOR.D,
        },
        {
          rank: 'E',
          all: '1週間（7日）〜',
          highestContinuous: '3日〜',
          recovery: '1回〜',
          color: RANK_COLOR.E,
        },
        {
          rank: 'F',
          all: '0日〜',
          highestContinuous: '0日〜',
          recovery: '0回〜',
          color: RANK_COLOR.F,
        },
      ] as tableItems[],
    }
  },

   watch: {
    width() {
      this.switchTableType()
    },
  },

  created() {
    this.switchTableType()
  },

  methods: {
    switchTableType() {
      // 画面横幅500px未満がスマホサイズ
      if (this.width < 500) {
        this.isMobileWidth = true
      } else {
        this.isMobileWidth = false
      }
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>
