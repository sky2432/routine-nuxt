<template>
  <div>
    <HeaderDrawer headerTitle="ルール" :serach="false"></HeaderDrawer>

    <v-main>
      <v-container>
        <v-simple-table v-if="allTables">
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
              <tr v-for="item in items" :key="item.rank">
                <th class="text-center">
                  <v-chip :color="item.color">{{ item.rank }}</v-chip>
                </th>
                <td>{{ item.all }}</td>
                <td>{{ item.highest_continuous }}</td>
                <td>{{ item.recovery }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <div v-if="unitTable">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th></th>
                  <th class="text-left">累計日数</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in items" :key="item.rank">
                  <th class="text-center">
                    <v-chip :color="item.color">{{ item.rank }}</v-chip>
                  </th>
                  <td>{{ item.all }}</td>
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
                <tr v-for="item in items" :key="item.rank">
                  <th class="text-center">
                    <v-chip :color="item.color">{{ item.rank }}</v-chip>
                  </th>
                  <td>{{ item.highest_continuous }}</td>
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
                <tr v-for="item in items" :key="item.rank">
                  <th class="text-center">
                    <v-chip :color="item.color">{{ item.rank }}</v-chip>
                  </th>
                  <td>{{ item.recovery }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-container>
    </v-main>
  </div>
</template>

<script lang="ts">
import windowWidthMixin from '../mixins/windowWidthMixin'

export default windowWidthMixin.extend({
  data() {
    return {
      allTables: true,
      unitTable: false,
      color: 'red',
      items: [
        {
          rank: 'SS',
          all: '6ヶ月（180日）〜',
          highest_continuous: '3ヶ月（90日）〜',
          recovery: '18回〜',
          color: 'yellow accent-2',
        },
        {
          rank: 'S',
          all: '4ヶ月（120日）〜',
          highest_continuous: '2ヶ月（60日）〜',
          recovery: '15回〜',
          color: 'red lighten-1',
        },
        {
          rank: 'A',
          all: '3ヶ月（90日）〜',
          highest_continuous: '1ヶ月（30日）〜',
          recovery: '12回〜',
          color: 'purple lighten-3',
        },
        {
          rank: 'B',
          all: '2ヶ月（60日）〜',
          highest_continuous: '3週間（21日）〜',
          recovery: '9回〜',
          color: 'cyan lighten-3',
        },
        {
          rank: 'C',
          all: '1ヶ月（30日）〜',
          highest_continuous: '2週間（14日）〜',
          recovery: '6回〜',
          color: 'yellow lighten-2',
        },
        {
          rank: 'D',
          all: '2週間（14日）〜',
          highest_continuous: '1週間（7日）〜',
          recovery: '3回〜',
          color: 'grey lighten-3',
        },
        {
          rank: 'E',
          all: '1週間（7日）〜',
          highest_continuous: '3日〜',
          recovery: '1回〜',
          color: 'brown lighten-3',
        },
        {
          rank: 'F',
          all: '0日〜',
          highest_continuous: '0日〜',
          recovery: '0回〜',
          color: 'grey lighten-1',
        },
      ],
    }
  },

  created() {
    this.changeTable()
  },

  watch: {
    width() {
      this.changeTable()
    },
  },

  methods: {
    changeTable() {
      if (this.width < 500) {
        this.allTables = false
        this.unitTable = true
      } else {
        this.allTables = true
        this.unitTable = false
      }
    },
  },
})
</script>
