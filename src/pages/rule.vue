<template>
  <div>
    <HeaderDrawer headerTitle="ルール" :serach="false"></HeaderDrawer>

    <v-main>
      <v-container>
        <div v-if="isMobileWidth">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th></th>
                  <th class="text-left">累計日数</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tableItem in tableItems" :key="tableItem.rank">
                  <th class="text-center">
                    <v-chip :color="tableItem.color">{{ tableItem.rank }}</v-chip>
                  </th>
                  <td>{{ tableItem.all }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th></th>
                  <th class="text-left">最高連続日数</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tableItem in tableItems" :key="tableItem.rank">
                  <th class="text-center">
                    <v-chip :color="tableItem.color">{{ tableItem.rank }}</v-chip>
                  </th>
                  <td>{{ tableItem.highest_continuous }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th></th>
                  <th class="text-left">リカバリー</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tableItem in tableItems" :key="tableItem.rank">
                  <th class="text-center">
                    <v-chip :color="tableItem.color">{{ tableItem.rank }}</v-chip>
                  </th>
                  <td>{{ tableItem.recovery }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>

        <v-simple-table v-if="!isMobileWidth">
          <template v-slot:default>
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
                <td>{{ tableItem.highest_continuous }}</td>
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
import { windowWidthMixin } from '../mixins/windowWidthMixin'
import { RANK_COLOR } from '../config/const'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'

interface DataType {
  isMobileWidth: boolean
  tableItems: tableItems[]
}

interface MethodType {
  switchTableType(): void
}

interface ComputedType {}

interface PropsType {}

export interface tableItems {
  rank: string
  all: string
  highest_continuous: string
  recovery: string
  color: string
}

export default windowWidthMixin.extend({
  data() {
    return {
      isMobileWidth: false,
      tableItems: [
        {
          rank: 'SS',
          all: '6ヶ月（180日）〜',
          highest_continuous: '3ヶ月（90日）〜',
          recovery: '18回〜',
          color: RANK_COLOR.SS,
        },
        {
          rank: 'S',
          all: '4ヶ月（120日）〜',
          highest_continuous: '2ヶ月（60日）〜',
          recovery: '15回〜',
          color: RANK_COLOR.S,
        },
        {
          rank: 'A',
          all: '3ヶ月（90日）〜',
          highest_continuous: '1ヶ月（30日）〜',
          recovery: '12回〜',
          color: RANK_COLOR.A,
        },
        {
          rank: 'B',
          all: '2ヶ月（60日）〜',
          highest_continuous: '3週間（21日）〜',
          recovery: '9回〜',
          color: RANK_COLOR.B,
        },
        {
          rank: 'C',
          all: '1ヶ月（30日）〜',
          highest_continuous: '2週間（14日）〜',
          recovery: '6回〜',
          color: RANK_COLOR.C,
        },
        {
          rank: 'D',
          all: '2週間（14日）〜',
          highest_continuous: '1週間（7日）〜',
          recovery: '3回〜',
          color: RANK_COLOR.D,
        },
        {
          rank: 'E',
          all: '1週間（7日）〜',
          highest_continuous: '3日〜',
          recovery: '1回〜',
          color: RANK_COLOR.E,
        },
        {
          rank: 'F',
          all: '0日〜',
          highest_continuous: '0日〜',
          recovery: '0回〜',
          color: RANK_COLOR.F,
        },
      ] as tableItems[],
    }
  },

  created() {
    this.switchTableType()
  },

  watch: {
    width() {
      this.switchTableType()
    },
  },

  methods: {
    switchTableType() {
      if (this.width < 500) {
        this.isMobileWidth = true;
      } else {
        this.isMobileWidth = false;
      }
    },
  },
} as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
</script>
