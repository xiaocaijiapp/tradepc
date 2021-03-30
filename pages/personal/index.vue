<template>
  <div class="personal-container">
    <div class="bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">
          首页
        </BreadcrumbItem>
        <BreadcrumbItem>个人中心</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="content">
      <div class="title">
        个人中心
      </div>
      <div class="top">
        <div class="top-left">
          <div class="user-info">
            <img v-if="headImg" :src="baseImageUrl + headImg" class="user-img" @click="upLoadUserImage">
            <img v-else src="~/assets/images/index/mz-user-img.png" class="user-img" @click="upLoadUserImage">
            <span class="phone">{{ personalInfo.phone | handlePhone }}</span>
            <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :headers="userHeaders"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :on-error="imageError"
            type="select"
            action="/api/delegate/file/uploadImage">
              <div style="width: 90px;height:90px;" />
            </Upload>
          </div>
          <div class="fun-area">
            <div class="area" @click="authorization('微信', 'wx', personalInfo.wxAuthFlag)">
              <img src="~/assets/images/index/sqwx.png" class="u-icon" alt="">
              <span class="txt">授权微信</span>
            </div>
            <div class="area" @click="authorization('支付宝', 'ali', personalInfo.aliPayAuthFlag)">
              <img src="~/assets/images/index/sqzfb.png" class="u-icon" alt="">
              <span class="txt" v-if="personalInfo.aliPayAuthFlag == 0">授权支付宝</span>
              <span class="txt" v-else style="width: 60px;height:22px;border-radius: 2px;text-align:center;line-height:22px;color:#fff;background: rgba(23,120,254,0.5);">已授权</span>
            </div>
            <div class="area" @click="realName(personalInfo.realNameFlag)">
              <img src="~/assets/images/index/smrz.png" class="u-icon" alt="">
              <span class="txt">实名认证</span>
            </div>
            <div class="area" @click="$router.push('/personal/changePayment')">
              <img src="~/assets/images/index/zfmm.png" class="u-icon" alt="">
              <span class="txt">支付密码</span>
            </div>
          </div>
        </div>
        <div class="top-right">
          <div class="account">
            <div class="acc-l">
              <img src="~/assets/images/index/jine.png" class="icon" alt="">
              <span>账户余额</span>
            </div>
            <div class="acc-r">
              <span>{{ personalInfo.availableMoney + '元' }}</span>
              <div class="withdrawal" @click="$router.push('/personal/withdrawal')">
                提现
              </div>
            </div>
          </div>
          <div class="account">
            <div class="acc-l">
              收益中代购金额
            </div>
            <div class="acc-r">
              {{ personalInfo.yieldingPurchasingMoney + '元' }}
            </div>
          </div>
          <div class="account">
            <div class="acc-l">
              收益中代购利润
            </div>
            <div class="acc-r">
              {{ personalInfo.yieldingPurchasingProfit + '元' }}
            </div>
          </div>
          <div class="account">
            <div class="acc-l">
              已收益代购金额
            </div>
            <div class="acc-r">
              {{ personalInfo.yieldedPurchasingMoney + '元' }}
            </div>
          </div>
          <div class="account">
            <div class="acc-l">
              已收益代购利润
            </div>
            <div class="acc-r">
              {{ personalInfo.yieldedPurchasingProfit + '元' }}
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="card-nav" :class="active == 0 ? 'active' : ''" @mousemove="active = 0" @mouseleave="active = null" @click="$router.push('/orderManagement')">
          <img v-if="active == 0" src="~/assets/images/index/order-active.png" alt="">
          <img v-else src="~/assets/images/index/order.png" alt="">
          <span>订单管理</span>
        </div>
        <div class="card-nav" :class="active == 1 ? 'active' : ''" @mousemove="active = 1" @mouseleave="active = null" @click="$router.push('/transactionDetail')">
          <img v-if="active == 1" src="~/assets/images/index/currency-active.png" alt="">
          <img v-else src="~/assets/images/index/currency.png" alt="">
          <span>交易明细</span>
        </div>
        <div class="card-nav" :class="active == 2 ? 'active' : ''" @mousemove="active = 2" @mouseleave="active = null" @click="$router.push('/personal/inviteFriends')">
          <img v-if="active == 2" src="~/assets/images/index/people-active.png" alt="">
          <img v-else src="~/assets/images/index/people.png" alt="">
          <span>邀请好友</span>
        </div>
        <div class="card-nav" :class="active == 3 ? 'active' : ''" @mousemove="active = 3" @mouseleave="active = null" @click="$router.push('/personal/securitySettings')">
          <img v-if="active == 3" src="~/assets/images/index/setting-active.png" alt="">
          <img v-else src="~/assets/images/index/setting.png" alt="">
          <span>安全设置</span>
        </div>
        <div class="card-nav" :class="active == 4 ? 'active' : ''" @mousemove="active = 4" @mouseleave="active = null" @click="$router.push('/personal/bankmanage')">
          <img v-if="active == 4" src="~/assets/images/index/bank-card-active.png" alt="">
          <img v-else src="~/assets/images/index/bank-card.png" alt="">
          <span>银行卡管理</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { abnormalPrompt } from '~/assets/tools/tool'
import { setCookie } from '~/assets/tools/cookie'
export default {
  name: 'Personal',
  middleware: 'auth',
  async asyncData ({ $axios, error, query }) {
    try {
      const authCode = query.auth_code || null
      let personalInfo
      await $axios.get('/delegate/my/info').then((res) => {
        if (res.data.code === 200) {
          personalInfo = res.data.data
        }
      })
      return {
        personalInfo,
        authCode
      }
    } catch (err) {
      return error(err)
    }
  },
  data () {
    return {
      active: null,
      userHeaders: {}
    }
  },
  async fetch ({ $axios, store }) {
    await $axios.get('/delegate/my/info').then((res) => {
      if (res.data.code === 200) {
        store.commit('setUserInfo', res.data.data)
      }
    })
  },
  computed: {
    ...mapGetters(['baseImageUrl', 'token', 'headImg'])
  },
  created () {
    this.userHeaders.Authorization = this.token
  },
  mounted () {
    if (this.authCode) {
      this.aliPay()
    }
  },
  methods: {
    ...mapMutations(['setUserHeadImage']),
    // 支付宝授权
    aliPay () {
      this.$axios.get('/delegate/oauth/1', {
        params: {
          code: this.authCode,
          data: ''
        }
      }).then((res) => {
        if (res.data.code === 200) {
          this.$Message.success({
            content: '授权成功',
            duration: 1
          })
          this.$router.push('/personal')
        }
      })
    },
    authorization (name, type, flag) {
      switch (flag) {
        case 0:
          if (type === 'wx') {
            // 跳转微信授权
            this.$Message.warning({
              content: '请在APP操作',
              duration: 2
            })
          } else {
            // 跳转支付宝授权
            // https://openauth.alipaydev.com/oauth2/publicAppAuthorize.htm
            // https://openauth.alipay.com/oauth2/publicAppAuthorize.htm
            const href = `${process.env.ali_url}?app_id=${process.env.app_id}&scope=auth_user,auth_base&redirect_uri=${encodeURIComponent(process.env.back_url)}&state=`
            this.a_href(href)
          }
          break
        case 1:
          abnormalPrompt('info', `您已授权过${name},无需重复操作`)
          break
      }
    },
    // 去授权
    a_href (href) {
      const a = document.createElement('a')
      a.setAttribute('href', href)
      a.setAttribute('target', '_self')
      a.setAttribute('id', 'js_a')
      // 防止反复添加
      if (document.getElementById('js_a')) {
        document.body.removeChild(document.getElementById('js_a'))
      }
      document.body.appendChild(a)
      a.click()
    },
    // 实名认证
    realName (flag) {
      switch (flag) {
        case 0:
          this.$router.push('/personal/authentication')
          break
        case 1:
          abnormalPrompt('info', '您已通过实名认证,无需重复操作', 2)
          break
      }
    },
    // 头像上传
    upLoadUserImage (url) {
      this.$axios.get('/delegate/my/headImage', {
        params: {
          headImage: url
        }
      }).then((res) => {
        if (res.data.code === 200) {
          this.$Message.success({
            content: '头像设置成功',
            duration: 1
          })
          this.setUserHeadImage(url)
          setCookie('headImg', url)
        }
      })
    },
    handleSuccess (e) {
      this.upLoadUserImage(e.data)
    },
    handleFormatError () {
      this.$Message.warning({
        content: '请选择正确图片文件',
        duration: 1
      })
    },
    imageError () {
      this.$Message.warning({
        content: '文件上传失败,请重新上传',
        duration: 1
      })
    },
    handleMaxSize () {
      this.$Message.warning({
        content: '最大文件支持2M,请选择合适图片',
        duration: 1
      })
    }
  }
}
</script>

<style lang="less" scoped>
.personal-container {
  width: 1200px;
  min-height: calc(100vh - 457px);
  margin: 0 auto;
  .bread {
    margin: 8px 0;
  }
  .content {
    width: 1200px;
    height: 585px;
    border-radius: 1px;
    background-color: #ffffff;
    margin-bottom: 20px;
    padding: 0 30px;
    .title {
      font-size: 24px;
      font-weight: 500;
      text-align: left;
      color: #333333;
      line-height: 24px;
      padding: 30px 0;
    }
    .top {
      width: 100%;
      height: 344px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      .top-left {
        width: 480px;
        height: 344px;
        border-radius: 10px;
        box-shadow: 0px 2px 10px 2px rgba(20, 145, 255, 0.08);
        .user-info {
          width: 100%;
          height: 144px;
          background: url("~/assets/images/index/user-bg.png") no-repeat 100%
            100%;
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          align-items: center;
          position: relative;
          .ivu-upload {
            position: absolute;
            left: 35px;
            opacity: 0;
            cursor: pointer;
            z-index: 10;
          }
          .user-img {
            width: 90px;
            height: 90px;
            border: 2px solid #ffffff;
            border-radius: 50%;
            margin-left: 35px;
          }
          .phone {
            font-size: 16px;
            font-weight: 600;
            text-align: left;
            color: #ffffff;
            line-height: 22px;
            margin-left: 24px;
          }
        }
        .fun-area {
          width: 100%;
          height: 200px;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-around;
          align-items: center;
          .area {
            border-radius: 4px;
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;
            align-items: center;
            padding: 25px 0;
            width: 90px;
            height: 140px;
            cursor: pointer;
            .u-icon {
              width: 30px;
              height: 30px;
            }
            .txt {
              font-size: 14px;
              font-weight: 400;
              text-align: left;
              color: #ffffff;
              line-height: 14px;
            }
          }
          .area:nth-of-type(1) {
            background-color: rgba(6, 212, 108, 0.3);
          }
          .area:nth-of-type(2) {
            background-color: rgba(23, 120, 254, 0.3);
          }
          .area:nth-of-type(3) {
            background-color: rgba(24, 202, 198, 0.3);
          }
          .area:nth-of-type(4) {
            background-color: rgba(250, 100, 0, 0.3);
          }
        }
      }
      .top-right {
        flex: 1;
        height: 304px;
        background: #f0f8ff;
        border-radius: 4px;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
        padding: 15px 30px;
        .account:nth-of-type(1) {
          background-color: #ff9636;
          width: 100%;
        }
        .account {
          width: 285px;
          height: 66px;
          border-radius: 4px;
          background-color: #ffffff;
          padding: 0px 15px;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;
          .acc-l {
            display: flex;
            align-items: center;
            font-size: 14px;
            font-weight: 400;
            line-height: 14px;
            .icon {
              width: 22px;
              height: 22px;
              margin-left: 10px;
            }
            span {
              font-size: 14px;
              font-weight: 400;
              text-align: left;
              color: #ffffff;
              line-height: 14px;
              margin-left: 10px;
            }
          }
          .acc-r {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 18px;
            font-weight: 500;
            line-height: 18px;
            span {
              font-size: 18px;
              font-weight: 500;
              text-align: left;
              color: #ffffff;
              line-height: 18px;
            }
            .withdrawal {
              width: 48px;
              height: 30px;
              background-color: #ffffff;
              font-size: 14px;
              font-weight: 500;
              text-align: center;
              color: #ff9636;
              line-height: 30px;
              margin-left: 10px;
              border-radius: 4px;
              cursor: pointer;
            }
          }
        }
      }
    }
    .bottom {
      width: 100%;
      height: 60px;
      margin-top: 40px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      .active {
        background-color: #1491ff !important;
        border-radius: 4px;
        box-shadow: 0px 2px 5px 2px rgba(17, 16, 255, 0.05);
        span {
          font-size: 14px;
          font-weight: 400;
          line-height: 16px;
          color: #ffffff;
          margin-left: 14px;
        }
      }
      .card-nav {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        width: 180px;
        height: 50px;
        background-color: #ffffff;
        border-radius: 4px;
        box-shadow: 0px 2px 5px 2px rgba(17, 16, 255, 0.05);
        cursor: pointer;
        img {
          width: 20px;
          height: 20px;
        }
        span {
          font-size: 14px;
          font-weight: 400;
          line-height: 16px;
          margin-left: 14px;
        }
      }
    }
  }
}
</style>
