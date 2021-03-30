<template>
  <div class="amount-container">
    <div class="bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">
          首页
        </BreadcrumbItem>
        <BreadcrumbItem to="/personal">
          个人中心
        </BreadcrumbItem>
        <BreadcrumbItem>{{ titleText }}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="content">
      <div class="tx-title">
        <img v-if="type === 'ali'" src="~/assets/images/index/sqzfb.png" class="icon" alt="">
        <img v-else src="~/assets/images/index/sqzfb.png" class="icon" alt="">
        <span class="title-desc">{{ titleText }}</span>
      </div>
      <div class="form">
        <p class="title">
          提现
        </p>
        <div class="all-get">
          <div class="get-l">
            可提现余额: {{ userInfo.availableMoney }}元
          </div>
        </div>
        <Form ref="getMoney" :model="getMoney" :rules="getMoneyRules">
          <FormItem prop="amount">
            <Input v-model="getMoney.amount" size="large" placeholder="请输入提现金额" />
          </FormItem>
        </Form>
        <div class="menu">
          <span class="all-get-l" @click="allGet">全部提现</span>
          <div class="all-get-r">
            支付宝未授权?
            <span class="now-sq" @click="toAliAuth">立即授权</span>
          </div>
        </div>
        <div class="pwd-title">
          支付密码
        </div>
        <div class="password">
          <input v-model="outPwd" type="password" class="outInput" readonly="readonly" @click="handleFocus">
          <input ref="userPwd" v-model="userInto" maxlength="6" type="text" class="innerInput">
          <div v-if="pwdWarning" class="tip">
            请输入6位支付密码
          </div>
        </div>
        <div class="btn">
          <span class="txt" @click="withdrawOperation">立即提现</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Amount',
  asyncData ({ query }) {
    const { type } = query
    return {
      type
    }
  },
  watch: {
    userInto (val) {
      if (val.length === 6) { this.pwdWarning = false }
      this.outPwd = val
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    titleText () {
      if (this.type === 'ali') {
        return '提现到支付宝'
      } else {
        return '提现到微信'
      }
    }
  },
  data () {
    const checkUserInto = (rule, value, callback) => {
      if ((value * 1) <= 0) {
        callback(new Error('提现金额必须大于0'))
      } else {
        callback()
      }
    }
    return {
      pwdWarning: false,
      outPwd: '',
      userInto: '',
      getMoney: {
        amount: '' // 提现金额
      },
      getMoneyRules: {
        amount: [
          { required: true, message: '提现金额不能为空', trigger: 'blur' },
          { validator: checkUserInto, trigger: 'blur' }
        ]
      },
      code: ''
    }
  },
  methods: {
    handleFocus () {
      this.$refs.userPwd.focus()
    },
    allGet () {
      this.getMoney.amount = this.userInfo.availableMoney
    },
    toAliAuth () {
      if (this.userInfo.aliPayAuthFlag === 1) {
        this.$Message.warning({
          content: '您已经授权支付宝,无需重复操作!',
          duration: 2
        })
      } else {
        const href = `${process.env.ali_url}?app_id=${process.env.app_id}&scope=auth_user,auth_base&redirect_uri=${encodeURIComponent(process.env.back_url)}&state=`
        this.a_href(href)
      }
    },
    // 支付宝授权
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
    withdrawOperation () {
      this.$refs.getMoney.validate((valid) => {
        if (valid) {
          if (this.userInto.length >= 6) {
            this.$axios.post('/delegate/withdraw/applyWithdraw', {
              payPwd: this.userInto,
              price: this.getMoney.amount
            }).then((res) => {
              if (res.data.code === 200) {
                this.$Message.success({
                  content: '提现成功',
                  duration: 1
                })
                this.$router.push('/personal')
              }
            })
          } else {
            this.pwdWarning = true
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.amount-container {
  width: 1200px;
  margin: 0 auto;
  .bread {
    margin: 8px 0;
  }
  .content {
    width: 1200px;
    height: 585px;
    background-color: #FFFFFF;
    border-radius: 1px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
    .tx-title {
      width: 100%;
      height: 90px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      padding-left: 30px;
      .icon {
        width: 30px;
        height: 30px;
      }
      .title-desc {
        font-size: 24px;
        font-weight: 500;
        text-align: left;
        color: #333333;
        line-height: 90px;
        margin-left: 10px;
      }
    }
    .form {
      width: 500px;
      height: 380px;
      border-radius: 2px;
      box-shadow: 0px 2px 5px 2px rgba(17,16,255,0.05);
      padding: 40px 100px 0px;
      .title {
        font-size: 18px;
        font-weight: 400;
        text-align: center;
        color: #333333;
        line-height: 25px;
      }
      .all-get {
        width: 100%;
        height: 40px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        font-weight: 500;
        color: #1491ff;
        line-height: 14px;
        .get-r {
          cursor: pointer;
        }
      }
      .pwd-title {
        font-size: 18px;
        font-weight: 400;
        text-align: left;
        color: #333333;
        line-height: 25px;
      }
      .menu {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 40px;
        font-size: 12px;
        font-weight: 400;
        color: #1491ff;
        line-height: 17px;
        .all-get-l {
          cursor: pointer;
        }
        .all-get-r {
          color: #888888;
          .now-sq {
            color: #1491ff;
            cursor: pointer;
          }
        }
      }
      .password {
        width: 100%;
        height: 60px;
        margin-top: 5px;
        position: relative;
        .tip {
          font-size: 14px;
          color: #ed4014;
          line-height: 30px;
        }
        .outInput {
          width: 240px;
          height: 40px;
          border: 1px solid #d7d7d7;
          border-radius: 7px;
          font-size: 22px;
          outline: 0;
          background-color: transparent;
          background-image: url("~/assets/images/index/pwd-bg.png");
          padding-left: 15px;
          letter-spacing: 30px;
        }
        .innerInput {
          position: absolute;
          z-index: -10;
          width: 240px;
          height: 40px;
          left: 0;
          top: 0;
          background-color: transparent;
          outline: 0;
          border: none;
          color: transparent;
        }
      }
      .btn {
        width: 100%;
        height: 40px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        .txt {
          width: 168px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          font-size: 14px;
          font-weight: 500;
          color: #FFFFFF;
          background-color: rgba(0,131,255,1);
          border-radius: 2px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
