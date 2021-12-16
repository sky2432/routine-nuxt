import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import index from '@/pages/index.vue'

describe('index page', () => {
  const localVue = createLocalVue()
  let vuetify: Vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const mountFunction = (options?: any) => {
    return mount(index, {
      localVue,
      vuetify,
      ...options,
    })
  }

  test('is a text', () => {
    const wrapper = mountFunction()
    expect(wrapper.text()).toBe(
      'RoutineQuest  サインアップ ログイン ゲームのように習慣を身につけよう 習慣が人生を作る 試してみる Marketing illustrations by Storyset'
    )
  })
})
