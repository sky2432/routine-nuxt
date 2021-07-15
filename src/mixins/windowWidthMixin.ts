import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      width: window.innerWidth,
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
