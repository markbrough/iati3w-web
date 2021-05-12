const routerBase = process.env.DEPLOY_ENV === 'WITH_SUBFOLDER' ? {
  router: {
    base: '/iati3w-web/'
  }
} : {}
export default {
  target: 'static',
  generate: {
    fallback: true
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'IATI/3W explorer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'This prototype throws an international spotlight on the work of local and national aid actors in Somalia, and their relationships with regional and international partners.' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/iati3w-icon.png' }
    ],
    bodyAttrs: {
      class: 'd-flex flex-column h-100'
    },
    htmlAttrs: {
      class: 'h-100'
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~plugins/filters.js'],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  ...routerBase
}
