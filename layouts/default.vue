<template>
  <div class="default-content">
    <div class="head-area">
      <!--侧边栏-->
      <div class="sidebar-area">
        <div class="nav-item" @mousemove="userMouseEvent(1)" @mouseleave="userMouseLeave">
          <img v-if="cursorPosition == 1" src="../assets/images/index/slide-app-hover.png" class="app-ico">
          <img v-else src="../assets/images/index/slide-app.png" class="app-ico">
          <span class="nav-title">下载APP</span>
          <div v-if="cursorPosition == 1" class="down-app">
            <p class="app-img-title">
              更多精彩尽在手机APP
            </p>
            <img src="~/assets/images/index/down-app.png" class="down-app-qrcode">
            <span class="desc">快来扫码下载吧</span>
          </div>
        </div>
        <div class="nav-item" @mousemove="cursorPosition = 2" @mouseleave="cursorPosition = null">
          <img v-if="cursorPosition == 2" src="../assets/images/index/kefu-hover.png" class="app-ico">
          <img v-else src="../assets/images/index/kefu.png" class="app-ico">
          <span class="nav-title">官方客服</span>
          <div v-if="cursorPosition == 2" class="customer-service">
            <p class="one-title">
              微信在线客服
            </p>
            <p class="one-title">
              您可以扫描下方二维码添加客服微信，与客服在线交谈
            </p>
            <div class="kefu-qrcode">
              <img src="~/assets/images/index/kefu1.png" class="kefu">
              <span>或</span>
              <img src="~/assets/images/index/kefu2.png" class="kefu">
            </div>
            <p class="one-title">
              客服热线(服务时间：工作日9:00-17:00)
            </p>
            <p class="one-title">
              400-808-8399
            </p>
          </div>
        </div>
        <div class="nav-item" @mousemove="cursorPosition = 3" @mouseleave="cursorPosition = null">
          <img v-if="cursorPosition == 3" src="../assets/images/index/wechat-hover.png" class="app-ico">
          <img v-else src="../assets/images/index/wechat.png" class="app-ico">
          <span class="nav-title">关注微信</span>
          <div v-if="cursorPosition == 3" class="qmwm-gzh">
            <p class="t-title">
              扫码关注公众号
            </p>
            <img src="../assets/images/index/qmww-gzh.png" class="gzh-icon">
            <p class="b-title">
              公众号会不定期发布到货视频哦～
            </p>
          </div>
        </div>
        <div class="nav-item" @mousemove="cursorPosition = 4" @mouseleave="cursorPosition = null" @click="$router.push('/problem')">
          <img v-if="cursorPosition == 4" src="../assets/images/index/yijian-hover.png" class="app-ico">
          <img v-else src="../assets/images/index/yijian.png" class="app-ico">
          <span class="nav-title">意见反馈</span>
        </div>
        <div class="nav-item" @mousemove="cursorPosition = 5" @mouseleave="cursorPosition = null" @click="scrollTop">
          <img v-if="cursorPosition == 5" src="../assets/images/index/calltop-hover.png" class="app-ico">
          <img v-else src="../assets/images/index/calltop.png" class="app-ico">
          <span class="nav-title">返回顶部</span>
        </div>
      </div>
      <!--功能引导区-->
      <div class="function-guiding">
        <div class="content">
          <p class="text">
            客服热线: 400-808-8399 (服务时间: 工作日9:00-17:00)
          </p>
          <div class="login-block">
            <div v-if="loginStatus" class="menu">
              <div class="left" @click="$router.push('/personal')">
                <span style="color: #1491ff">{{ userPhone | handleMobile }}</span>
              </div>
              <div class="right" @click="userLogout">
                退出
              </div>
            </div>
            <div v-else class="menu">
              <nuxt-link to="/login">
                登录
              </nuxt-link>
              <nuxt-link to="/registeredProtocol">
                注册
              </nuxt-link>
            </div>
            <div class="menu">
              <nuxt-link to="/guidance">
                新手引导
              </nuxt-link>
            </div>
            <div class="menu">
              <nuxt-link to="/problem/problemList">
                常见问题
              </nuxt-link>
              <nuxt-link to="/orderManagement">
                我的订单
              </nuxt-link>
            </div>
            <div class="menu" @click="$router.push('/stationLetter')">
              <nuxt-link to="/stationLetter">
                <img src="~/assets/images/index/_mail.png" style="margin-top:5px;">
              </nuxt-link>
              <span :style="{opacity: (loginStatus && mailCount > 0) ? '1' : '0'}" class="mail-count" />
            </div>
          </div>
        </div>
      </div>
      <!--导航-->
      <div class="nav-guiding">
        <div class="nav-content">
          <img src="~/assets/images/index/logo.png" class="logo" @click="$router.push('/')">
          <div class="default-nav">
            <layout-nav />
          </div>
        </div>
      </div>
    </div>
    <div class="main-view-area">
      <Nuxt />
    </div>
    <layout-footer />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import layoutFooter from '../components/layoutFooter'
import layoutNav from '../components/layoutNav'
export default {
  comments: {
    layoutFooter,
    layoutNav
  },
  filters: {
    handleMobile (phone) {
      const reg = /^(\d{3})\d{4}(\d{4})$/
      phone = phone.replace(reg, '$1****$2')
      return phone
    }
  },
  data () {
    return {
      cursorPosition: null
    }
  },
  computed: {
    ...mapGetters(['loginStatus', 'mobile', 'mailCount']),
    userPhone () {
      return this.mobile + ''
    }
  },
  methods: {
    ...mapActions(['logout']),
    scrollTop () {
      // 回到顶部
      const fromTopDistance = document.documentElement.scrollTop || document.body.scrollTop
      if (fromTopDistance > 0) {
        window.requestAnimationFrame(this.scrollTop)
        window.scrollTo(0, fromTopDistance - fromTopDistance / 8)
      }
    },
    userMouseEvent (e) {
      this.cursorPosition = e
    },
    userMouseLeave () {
      this.cursorPosition = null
    },
    userLogout () {
      this.logout().then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.default-content {
  width: 100%;
  min-height: 100vh;
  background-color: #f3f4f6;
  position: relative;
  .sidebar-area {
    width: 77px;
    height: 414px;
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    // background: #ffffff;
    background: rgba(255, 255, 255, 0.8);
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    box-shadow: -1px 0px 3px 1px rgba(0, 0, 0, 0.05);
    z-index: 100;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    .nav-item:hover {
      .nav-title {
        color: #0083ff !important;
      }
    }
    .nav-item:nth-of-type(1) {
      width: 48px;
      height: 90px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-bottom: 1px solid #f0f0f0;
      .nav-title {
        width: 26px;
        font-size: 13px;
        font-weight: 600;
        text-align: center;
        color: #333333;
        line-height: 18px;
        .app-ico {
          width: 32px;
          height: 35px;
        }
      }
      .down-app {
        position: absolute;
        width: 200px;
        height: 226px;
        // background: #ffffff;
        background: rgba(255, 255, 255, 0.8);
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        box-shadow: -1px 0px 3px 1px rgba(0, 0, 0, 0.05);
        left: -200px;
        top: 0;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        .app-img-title {
          font-size: 14px;
          font-weight: 400;
          text-align: center;
          color: #333333;
          line-height: 50px;
        }
        .down-app-qrcode {
          width: 130px;
          height: 130px;
        }
        .desc {
          font-size: 12px;
          font-weight: 400;
          text-align: center;
          color: #333333;
          line-height: 42px;
        }
      }
    }
    .nav-item:nth-of-type(2) {
      .customer-service {
        position: absolute;
        left: -328px;
        top: 106px;
        width: 328px;
        height: 278px;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        box-shadow: -1px 0px 3px 1px rgba(0, 0, 0, 0.05);
        // background-color: #ffffff;
        background: rgba(255, 255, 255, 0.8);
        padding: 0 20px;
        .one-title {
          font-size: 12px;
          font-weight: 400;
          text-align: left;
          color: #333333;
          line-height: 24px;
          margin-top: 8px;
        }
        .one-title:nth-of-type(2) {
          margin-top: 0;
        }
        .kefu-qrcode {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-top: 10px;
        }
      }
    }
    .nav-item:nth-of-type(3) {
      .qmwm-gzh {
        position: absolute;
        left: -220px;
        top: 179px;
        width: 220px;
        height: 226px;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        // background-color: #ffffff;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
        .t-title {
          font-size: 14px;
          font-weight: 400;
          text-align: center;
          color: #333333;
          line-height: 49px;
        }
        .gzh-icon {
          width: 130px;
          height: 130px;
        }
        .b-title {
          font-size: 12px;
          font-weight: 400;
          text-align: center;
          color: #333333;
          line-height: 46px;
        }
      }
    }
    .nav-item:nth-of-type(5) {
      border-bottom: none !important;
    }
    .nav-item:not(.nav-item:nth-of-type(1)) {
      width: 48px;
      height: 72px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-bottom: 1px solid #f0f0f0;
      .nav-title {
        font-size: 11px;
        font-weight: 400;
        text-align: center;
        color: #333333;
        line-height: 16px;
        .app-ico {
          width: 32px;
          height: 32px;
        }
      }
    }
  }
  .head-area {
    .function-guiding {
      height: 35px;
      width: 100%;
      background-color: #f5f5f5;
      .content {
        margin: 0 auto;
        width: 1200px;
        height: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        .text {
          font-size: 12px;
          color: #6c6c6c;
        }
        .login-block {
          height: 100%;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;
          .menu {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            position: relative;
            .mail-count{
              position: absolute;
              display: block;
              right: 17px;
              top: 5px;
              width: 10px;
              height: 7px;
              background-color: red;
              border-radius: 50%;
              color: #FFFFFF;
              font-size: 12px;
              transform:scale(0.6,1);
              cursor: pointer;
            }
            .left {
              cursor: pointer;
            }
            .right {
              margin: 0 20px;
              cursor: pointer;
            }
            a {
              margin: 0 20px;
            }
          }
          .menu:not(.menu:last-child) {
            border-right: 1px solid #dddddd;
          }
          .menu a:nth-of-type(2) {
            margin-left: 0;
          }
        }
      }
    }
    .nav-guiding {
      width: 100%;
      height: 96px;
      background-color: #ffffff;
      .nav-content {
        width: 1200px;
        height: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        margin: 0 auto;
        .logo {
          width: 343px;
          height: 64px;
          object-fit: contain;
          cursor: pointer;
        }
        .default-nav {
          height: 100%;
          flex: 1;
        }
        .title {
          font-size: 24px;
          font-weight: 500;
          color: #333333;
          line-height: 33px;
          margin-left: 30px;
        }
      }
    }
  }
  .main-view-area {
    width: 100%;
    min-height: calc(100vh - 457px);
  }
}
</style>
