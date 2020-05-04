
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  html: {
    lang: 'en'
  },
  head: {
    title: 'Power inverter, MPPT controller, off-grid solar system, MILESOLAR',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: 'manufacturing solar inverters, MPPT solar controllers,off grid solar system' },
      { hid: 'description', name: 'description', content: 'MILESOLAR specializes in the manufacturing of power inverters, solar inverters, MPPT solar controllers, solar lights, and more. We provide professional off-grid solar powered solutions' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/normalize.css',
    '@/assets/css/custom.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/http'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  env: {
    baseUrl: process.env.NODE_ENV === 'production' ? 'https://milesolar.com/' : 'http://mile.com/'
  }
}
