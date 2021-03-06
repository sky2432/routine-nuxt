import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
  setInteractionMode,
} from 'vee-validate'
/* eslint import/namespace: ['error', { allowComputed: true }] */
import * as originalRules from 'vee-validate/dist/rules'
import ja from 'vee-validate/dist/locale/ja.json'

setInteractionMode('aggressive')

let rule
for (rule in originalRules) {
  extend(rule, {
    ...originalRules[rule],
  })
}

localize('ja', ja)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

