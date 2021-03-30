import createPersistedState from 'vuex-persistedstate'
export default ({ store }) => {
  createPersistedState({
    storage: window.localStorage,
    reducer (vuexState) {
      return {
        functionGuiding: vuexState.functionGuiding,
        baseImageUrl: vuexState.baseImageUrl,
        userInfo: vuexState.userInfo,
        userBuyGoodsInfo: vuexState.userBuyGoodsInfo,
        orderInfo: vuexState.orderInfo,
        currentStoreId: vuexState.currentStoreId,
        richText: vuexState.richText,
        cateShow: vuexState.cateShow,
        mailCount: vuexState.mailCount,
        loginStatus: vuexState.loginStatus
      }
    }
  })(store)
}
