import { cacheAdapterEnhancer } from 'axios-extensions'
import LRUCache from 'lru-cache' // 为了自定义缓存配置，如果不需要，可以不使用
import { getServerCookie, getClientCookie } from '../assets/tools/cookie'
import { abnormalPrompt } from '~/assets/tools/tool'
export default function ({ $axios, error, next, req, store }) {
  $axios.setHeader('platform', 'PC')
  $axios.timeout = 10000
  // 请求中使用了useCache: true的话，会被缓存起来以便下次直接返回从而减少服务器压力
  const defaultAdapter = $axios.defaults.adapter
  const cacheCfg = new LRUCache({
    maxAge: 1000 * 60 * 5, // 有效期5min
    max: 1000 // 最大缓存数量
  })
  $axios.defaults.adapter = cacheAdapterEnhancer(defaultAdapter, { enabledByDefault: false, cacheFlag: 'useCache', defaultCache: cacheCfg })
  $axios.onRequest((config) => {
    if (process.client) {
      config.headers.Authorization = getClientCookie('token') || null
    }
    if (process.server) {
      config.headers.Authorization = getServerCookie(req).token || null
    }
  })
  $axios.onResponse((response) => {
    const { data: { code, message } } = response
    if (!response.data) {
      return error(response)
    }
    if (code === 500 || code === 400) {
      abnormalPrompt('error', message)
    } else if (code === 401) {
      abnormalPrompt('error', '登录已过期，请重新登录')
      store.dispatch('logout')
      next('/login')
    } else if (code !== 200) {
      abnormalPrompt('error', message)
    }
  })
  $axios.onError((err) => {
    return error(err)
  })
}
