import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import RoutineDetailDrawer from '../components/RoutineDetailDrawer.vue'
import Vuetify from 'vuetify'
import { routineType } from '../lib/interface'

describe('RoutineDetailDrawer component', () => {
  const localVue = createLocalVue()
  let vuetify: Vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const mountFunction = (options?: any) => {
    return mount(RoutineDetailDrawer, {
      localVue,
      vuetify,
      ...options,
    })
  }

  test('no routine', async () => {
    const wrapper = mountFunction()
    await wrapper.setData({
      routine: {},
    })
    expect(wrapper.text()).toBe('習慣を選択してください')
  })

  const routine: routineType = {
    id: 6,
    name: '読書',
    user_id: 1,
    total_days: 14,
    continuous_days: 0,
    highest_continuous_days: 1,
    recovery_count: 0,
    total_rank: {
      id: 3,
      name: 'D',
      created_at: '2021-01-12T23:41:59.000000Z',
      updated_at: '2021-01-12T23:41:59.000000Z',
    },
    highest_continuous_rank: {
      id: 1,
      name: 'F',
      created_at: '2021-01-12T23:41:59.000000Z',
      updated_at: '2021-01-12T23:41:59.000000Z',
    },
    recovery_rank: {
      id: 1,
      name: 'F',
      created_at: '2021-01-12T23:41:59.000000Z',
      updated_at: '2021-01-12T23:41:59.000000Z',
    },
    today_record: null,
    created_at: '2021-01-12T23:41:59.000000Z',
    updated_at: '2021-08-13T08:42:08.000000Z',
    records: [],
  }

  test('exists routine', async () => {
    const wrapper = mountFunction()
    await wrapper.setData({
      routine: routine,
    })
    expect(wrapper.text()).toContain(
      '読書 連続日数 0日  累計日数 14日 D 最高連続日数 1日 F リカバリー 0回 F'
    )
  })
})
