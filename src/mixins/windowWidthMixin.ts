import Vue from 'vue'
import { $axios } from '@/util/axios'

export default Vue.extend({
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
})
