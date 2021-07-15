import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
  setInteractionMode,
} from 'vee-validate'
import * as originalRules from 'vee-validate/dist/rules'
import ja from 'vee-validate/dist/locale/ja.json'

setInteractionMode('eager')

let rule
for (rule in originalRules) {
  extend(rule, {
    ...originalRules[rule],
  })
}

localize('ja', ja)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// extend('required', {
//   ...required,
//   message: '{_field_}を入力してください',
// })

// extend('selectRequired', {
//   ...required,
//   message: '{_field_}を選択してください',
// })

// extend('max', {
//   ...max,
//   message: '{_field_}は{length}文字以下で入力してください',
// })

// extend('min', {
//   ...min,
//   message: '{_field_}は{length}文字以上で入力してください',
// })

// extend('email', {
//   ...email,
//   message: '{_field_}を正しい形式で入力してください',
// })

// extend('image', {
//   ...image,
//   message: '画像ファイルを選択してください',
// })

// extend('alpha_num', {
//   ...alpha_num,
//   message: '{_field_}は半角英数字で入力してください',
// })

// extend('postCodeRegex', {
//   ...regex,
//   message: 'ハイフンなしの数字のみで入力してください',
// })

// extend('length', {
//   ...length,
//   message: '{_field_}は{length}文字で入力してください',
// })
