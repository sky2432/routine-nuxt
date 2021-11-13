import Vue from 'vue'
import Vuetify from 'vuetify'
import { config, RouterLinkStub } from '@vue/test-utils'

Vue.use(Vuetify)
config.stubs['NuxtLink'] = RouterLinkStub

