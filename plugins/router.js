const routeUrl = ['login', 'registered', 'forgetpwd'] // 个人中心显示导航
const cateUrl = ['shopping', 'shopInfo-page', 'store-id', 'store-sale-id', 'details-id', 'order', 'orderpay', 'paystate', 'addpaycard', 'list-page']
export default function ({ app, store }) {
  app.router.beforeEach((to, from, next) => {
    if (routeUrl.includes(to.name)) {
      store.commit('setFunctionGuiding', true)
    } else {
      store.commit('setFunctionGuiding', false)
    }
    if (cateUrl.includes(to.name)) {
      store.commit('setCate', true)
    } else {
      store.commit('setCate', false)
    }
    next()
  })
}
