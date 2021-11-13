import colors from 'vuetify/es5/util/colors'
const environment = process.env.NODE_ENV

// 環境変数の設定
let apiBaseUrl = ''
if (environment === 'dev') {
  apiBaseUrl = 'http://127.0.0.1:8000'
}
if (environment === 'prod') {
  apiBaseUrl = 'http://127.0.0.1:8000'
}

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - routine-nuxt',
    title: 'routine-nuxt',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '@/plugins/vee-validate.js' }, '@/plugins/axios-accessor'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  auth: {
    plugins: ['./plugins/axios.js'],
    redirect: {
      login: '/login',
      logout: '/',
      callback: false,
      home: '/home',
    },
    strategies: {
      laravelJWT: {
        provider: 'laravel/jwt',
        url: 'http://localhost:80',
        token: {
          maxAge: 60 * 60,
        },
        refreshToken: {
          maxAge: 20160 * 60,
        },
      },
      local: {
        endpoints: {
          user: {
            url: '/api/auth/me',
            method: 'get',
            propertyName: 'user',
          },
        },
      },
    },
  },

  axios: {
    baseURL: `${apiBaseUrl}/api`,
  },
}
