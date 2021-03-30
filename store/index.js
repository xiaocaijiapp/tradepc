import { setCookie, removeCookie } from '~/assets/tools/cookie'
export const state = () => ({
  // 首页头部导航 功能区域显隐控制按钮
  functionGuiding: false, // 默认隐藏
  cateShow: false,
  baseImageUrl: 'https://static.qmwm777.com',
  userInfo: {},
  headImg: null,
  token: null,
  mobile: null,
  realName: null,
  loginStatus: false,
  orderInfo: {},
  currentStoreId: '',
  userBuyGoodsInfo: {},
  maskLayer: false, // 弹窗遮罩层
  richText: {
    eBay: [],
    starDay: [],
    amazon: []
  },
  mailCount: 0
})

export const mutations = {
  setFunctionGuiding (state, value) {
    state.functionGuiding = value
  },
  handleToken (state, secret) {
    state.token = secret
  },
  handleMobile (state, mobile) {
    state.mobile = mobile
  },
  handName (state, name) {
    state.realName = name
  },
  handleLoginStatus (state, bool) {
    state.loginStatus = bool
  },
  setUserInfo (state, data) {
    state.userInfo = data
  },
  setUserHeadImage (state, url) {
    state.headImg = url
  },
  setGoodsInfo (state, obj) {
    state.userBuyGoodsInfo = obj
  },
  setOrderInfo (state, obj) {
    state.orderInfo = obj
  },
  setStoreId (state, num) {
    state.currentStoreId = num
  },
  setRich (state, data) {
    state.richText = data
  },
  setCate (state, bool) {
    state.cateShow = bool
  },
  handleMail (state, count) {
    state.mailCount = count
  }
}
export const getters = {
  functionGuiding: state => state.functionGuiding,
  token: state => state.token,
  mobile: state => state.mobile,
  realName: state => state.realName,
  loginStatus: state => state.loginStatus,
  baseImageUrl: state => state.baseImageUrl,
  userInfo: state => state.userInfo,
  headImg: state => state.headImg,
  userBuyGoodsInfo: state => state.userBuyGoodsInfo,
  orderInfo: state => state.orderInfo,
  currentStoreId: state => state.currentStoreId,
  richText: state => state.richText,
  cateShow: state => state.cateShow,
  mailCount: state => state.mailCount
}
export const actions = {
  nuxtServerInit ({ commit }, { app }) {
    const token = app.$cookies.get('token')
    const mobile = app.$cookies.get('mobile')
    const headImg = app.$cookies.get('headImg')
    // 更新 vuex 状态树
    commit('handleToken', token || null)
    commit('handleMobile', mobile || null)
    commit('setUserHeadImage', headImg || null)
    commit('handleLoginStatus', !!token)
  },
  // 账号密码登录
  userPasswordLogin ({ commit }, loginData) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/delegate/login/pwd', loginData).then((res) => {
        if (res.data.code === 200) {
          const { mobile, realName, token, headImg } = res.data.data
          commit('handleToken', token)
          commit('handleMobile', mobile)
          commit('handName', realName)
          commit('setUserHeadImage', headImg)
          commit('handleLoginStatus', true)
          setCookie('token', token)
          setCookie('mobile', mobile)
          setCookie('headImg', headImg)
          resolve(res.data)
        } else {
          reject(res.data)
        }
      })
    })
  },
  // 获取个人信息
  getUserInfo ({ commit }) {
    this.$axios.get('/delegate/my/info').then((res) => {
      if (res.data.code === 200) {
        commit('setUserInfo', res.data.data)
      }
    })
  },
  // 退出登录
  logout ({ commit }) {
    return new Promise((resolve) => {
      this.$axios.get('/delegate/login/out').then((res) => {
        if (res.data.code === 200) {
          commit('handleToken', null)
          commit('handleMobile', null)
          commit('handName', null)
          commit('handleLoginStatus', false)
          commit('setUserInfo', {})
          commit('setOrderInfo', {})
          removeCookie('token')
          removeCookie('mobile')
          removeCookie('headImg')
          resolve()
        }
      })
    })
  },
  // 获取站内信未读消息数量
  getMailCount ({ commit }) {
    this.$axios.get('/delegate/mail/getMailCount').then((res) => {
      if (res.data.code === 200) {
        commit('handleMail', res.data.data.count)
      }
    })
  }
}
