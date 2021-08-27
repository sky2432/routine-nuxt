import Vue from 'vue'
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'

interface DataType {
  width: number
}

interface MethodType {
  handleResize(): void
}

interface ComputedType {}

interface PropsType {}

export const windowWidthMixin = Vue.extend({
  data() {
    return {
      width: window.innerWidth as number,
    }
  },

  mounted() {
    window.addEventListener('resize', this.handleResize)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    handleResize(): void {
      this.width = window.innerWidth
    },
  },
}as ThisTypedComponentOptionsWithRecordProps<Vue, DataType, MethodType, ComputedType, PropsType>)
