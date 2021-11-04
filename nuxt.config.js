import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Mastering Nuxt: %s',
    title: 'nuxt-bnb',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  router: {
    prefetchLinks: false
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/base.js',
    '@/plugins/auth.client.js',
    '@/plugins/vCalendar.client.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxt/image'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-leaflet',
    '@/modules/auth',
    '@/modules/algolia',
    '@/modules/cloudinary',
    '@nuxtjs/cloudinary',
    '@/modules/stripe'
  ],

  cloudinary: {
    cloudName: process.env.CLOUDINARY_NAME
  },

  image: {
    cloudinary: {
      baseURL: `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/`
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
  },

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
          'text-color': '#88a2d2'
        },
        light: {
          'text-color': '#3e5786'
        }
      }
    }
  },

  env: {
    baseUrl: process.env.BASE_URL,
    appId: process.env.ALGOLIA_APP_ID,
    apiKey: process.env.API_KEY,
    auth: {
      cookieName: 'idToken',
      clientId: process.env.GOOGLE_CLIENT_ID
    },
    hereAppId: process.env.DEVELOPER_HERE_APP_ID,
    hereApiKey: process.env.DEVELOPER_HERE_API_KEY,
    hereUrl: process.env.HERE_URL,
    cloudinary: {
      apiKey: process.env.CLOUDINARY_API_KEY
    },
    stripe: {
      key: process.env.STRIPE_PUBLISHABLE_KEY
    }
  },

  privateRuntimeConfig: {
    algolia: {
      appId: process.env.ALGOLIA_APP_ID,
      key: process.env.PRIVATE_API_KEY
    },
    cloudinary: {
      apiSecret: process.env.CLOUDINARY_API_SECRET
    },
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true
  }
}
