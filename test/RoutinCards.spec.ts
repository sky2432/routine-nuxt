import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import CardRoutine from '@/components/Card/Routine.vue'
import { routineType } from '@/lib/interface'

describe('CardRoutine component', () => {
  const localVue = createLocalVue()
  let vuetify: Vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const mountFunction = (options?: any) => {
    return mount(CardRoutine, {
      localVue,
      vuetify,
      ...options,
    })
  }

  test('is home and no routines', () => {
    const wrapper = mountFunction({
      propsData: {
        loaded: true,
        isHome: true,
        routines: [],
      }
    })
    expect(wrapper.text()).toBe(
      '習慣を登録しましょう!'
    )
  })

  test('is archive and no routines', () => {
    const wrapper = mountFunction({
      propsData: {
        loaded: true,
        isHome: false,
        routines: [],
      }
    })
    expect(wrapper.text()).toBe(
      'アーカイブされた習慣はありません'
    )
  })

  const routines: routineType[] = [
      {
        id: 6,
        name: '読書',
        user_id: 1,
        total_days: 14,
        continuous_days: 0,
        highest_continuous_days: 1,
        recovery_count: 0,
        total_rank: {
          id: 3,
          name: "D",
          created_at: "2021-01-12T23:41:59.000000Z",
          updated_at: "2021-01-12T23:41:59.000000Z",
        },
        highest_continuous_rank: {
          id: 1,
          name: "F",
          created_at: "2021-01-12T23:41:59.000000Z",
          updated_at: "2021-01-12T23:41:59.000000Z",
        },
        recovery_rank: {
          id: 1,
          name: "F",
          created_at: "2021-01-12T23:41:59.000000Z",
          updated_at: "2021-01-12T23:41:59.000000Z",
        },
        today_record: null,
        created_at: "2021-01-12T23:41:59.000000Z",
        updated_at: "2021-08-13T08:42:08.000000Z",
        records: [],
      },
      {
        id: 5,
        name: '日記',
        user_id: 1,
        total_days: 96,
        continuous_days: 2,
        highest_continuous_days: 4,
        recovery_count: 23,
        total_rank: {
          id: 6,
          name: "A",
          created_at: "2021-01-12T23:41:59.000000Z",
          updated_at: "2021-01-12T23:41:59.000000Z",
        },
        highest_continuous_rank: {
          id: 2,
          name: "E",
          created_at: "2021-01-12T23:41:59.000000Z",
          updated_at: "2021-01-12T23:41:59.000000Z",
        },
        recovery_rank: {
          id: 8,
          name: "SS",
          created_at: "2021-01-12T23:41:59.000000Z",
          updated_at: "2021-01-12T23:41:59.000000Z",
        },
        today_record: null,
        created_at: "2021-01-12T23:41:59.000000Z",
        updated_at: "2021-08-13T08:42:08.000000Z",
        records: [],
      }
    ]

  test('exists routines', () => {
    const wrapper = mountFunction({
      propsData: {
        loaded: true,
        isHome: true,
        routines,
      }
    })
    expect(wrapper.find('.v-card').exists()).toBe(true)
    expect(wrapper.text()).toBe(
      '読書 D F F 日記 A E SS'
    )
  })

  test('search routine', () => {
    const wrapper = mountFunction({
      propsData: {
        loaded: true,
        isHome: true,
        routines,
        keyword: '日記'
      }
    })
    expect(wrapper.find('.v-card').exists()).toBe(true)
    expect(wrapper.text()).toBe(
      '日記 A E SS'
    )
  })
})
