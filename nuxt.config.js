import { resolve } from 'path'
import envCustom from './assets/tools/env.custom'
const customEnv = envCustom[process.env.custom_mode || 'pro']
const TerserPlugin = require('terser-webpack-plugin')
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '全民外贸官网—秉承“惠及全民”的理念，致力于让中国制造走出国门。',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: '三益供应链集团有限公司旗下跨境电商出口代购平台,跟进“一带一路”让华人制造走向全球；“全民外贸”一键代购托管营销，模式安全让您更省心，紧跟时代步伐，带您一起跨境赚钱' },
      { hid: 'keywords', name: 'keywords', content: '全民外贸,全民,外贸,出口,代购,电商,日本,一带一路' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.png' }
    ],
    script: [
      {
        src: '/qrcode.min.js',
        async: true,
        defer: true
      },
      {
        src: '/echarts.min.js',
        async: true,
        defer: true
      }
    ]
  },
  server: {
    port: 9002
  },
  env: {
    BASE: customEnv.BASE_URL,
    app_id: customEnv.app_id,
    back_url: customEnv.back_url,
    ali_url: customEnv.ali_url
  },
  alias: {
    tools: resolve(__dirname, './assets/tools')
  },
  router: {
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'view-design/dist/styles/iview.css',
    '@/assets/css/reset.css'
  ],
  render: {
    resourceHints: false
  },
  components: true,
  loading: false,
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/iview',
    '@/plugins/axios',
    { src: '~/plugins/router', ssr: false },
    { src: '~/plugins/heartbeat', ssr: false },
    { src: '~/plugins/vuex-persistedstate', ssr: false },
    { src: '~/plugins/vue-clipboard2', ssr: false }
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'cookie-universal-nuxt'
  ],
  axios: {
    proxy: true,
    prefix: '/api',
    credentials: false
  },
  proxy: {
    '/api': {
      target: customEnv.PROXY_URL,
      pathRewrite: { '^/api': '' }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    allChunks: true,
    extractCSS: false,
    analyze: false,
    cssSourceMap: true,
    devtools: true,
    transpile: [/^view-design/],
    loaders: {
      imgUrl: { limit: 10000 },
      file: {
        publicPath: 'assets'
      }
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            warnings: false,
            compress: {
              drop_console: true, // 可选：false,生产移除 console.log
              pure_funcs: ['console.log']
            },
            output: {
              // 是否保留代码注释
              comments: false
            },
            cache: true,
            parallel: true,
            // Must be set to true if using source-maps in production
            sourceMap: process.env.NODE_ENV !== 'production'
          }
        })
      ]
    }
  }
}
