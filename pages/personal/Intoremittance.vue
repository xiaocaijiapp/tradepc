<template>
  <div class="into-hf-container">
    <div class="bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">
          首页
        </BreadcrumbItem>
        <BreadcrumbItem to="/personal">
          个人中心
        </BreadcrumbItem>
        <BreadcrumbItem to="/personal/withdrawal">
          提现管理
        </BreadcrumbItem>
        <BreadcrumbItem>转入汇付天下</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="content">
      <img src="~/assets/images/index/hf_logo.png" class="logo">
      <div class="into-hf-form">
        <p class="title">
          转入到汇付天下账户
        </p>
        <p class="money-input-title">
          <span class="form-title">转入金额</span>
          <span class="form-desc" @click="allInto">全部转入</span>
        </p>
        <div class="form-money-input">
          <Form ref="userMoney" :model="userMoney" :rules="userMoneyRules">
            <FormItem prop="amount">
              <Input v-model="userMoney.amount" size="large" placeholder="请输入转入金额" />
            </FormItem>
          </Form>
          <p class="wx-tip">
            温馨提示：汇付天下账户没有余额是无法提现的
          </p>
        </div>
        <p class="money-input-title">
          <span class="form-title">支付密码</span>
        </p>
        <div class="password">
          <input v-model="outPwd" type="password" class="outInput" readonly="readonly" @click="handleFocus">
          <input ref="userPwd" v-model="userInto" maxlength="6" type="text" class="innerInput">
          <div v-if="pwdWarning" class="tip">
            请输入6位支付密码
          </div>
        </div>
        <p class="pwd-tip">
          温馨提示：汇付天下账户可用余额
          <span class="user-money">{{ usableBalance }}元</span>
          <span class="to-get" @click="$router.push('/personal/bankcardwithdrawal')">去提现></span>
        </p>
        <div class="btn">
          <span class="get-code-btn" @click="intoGetPhoneCode">获取验证码</span>
        </div>
      </div>
    </div>
    <div v-if="phoneVerification" class="phone-mask" @click.self="phoneVerification = false">
      <div class="phone-code">
        <div class="col">
          <img src="~/assets/images/index/close-dialog.png" class="close" @click="phoneVerification = false">
        </div>
        <p class="title">
          我们已将验证码发送至您的手机
        </p>
        <p class="phone-number">
          {{ userInfo.phone }}
        </p>
        <div class="phone-code-area">
          <input ref="codeInput" v-model="codeValue" type="text" maxlength="6" class="code-input">
          <form class="input-form" @click="handleForm">
            <input v-model="getPhone.one" type="text" maxlength="1" readonly="readonly" class="pwd">
            <input v-model="getPhone.two" type="text" maxlength="1" readonly="readonly" class="pwd">
            <input v-model="getPhone.three" type="text" maxlength="1" readonly="readonly" class="pwd">
            <input v-model="getPhone.four" type="text" maxlength="1" readonly="readonly" class="pwd">
            <input v-model="getPhone.five" type="text" maxlength="1" readonly="readonly" class="pwd">
            <input v-model="getPhone.six" type="text" maxlength="1" readonly="readonly" class="pwd">
          </form>
        </div>
        <p class="code-desc">
          60秒后重新发送，今日短信接收条数剩余{{ mesNum }}条
        </p>
        <div class="sure-btn">
          <span class="l-btn" @click="phoneVerification = false">取消</span>
          <span class="r-btn" @click="addPayBankSure">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Intoremittance',
  async asyncData ({ $axios, error }) {
    try {
      let usableBalance
      await $axios.post('/delegate/appHuiFu/queryUserHuiFuBalance').then((res) => {
        if (res.data.code === 200) {
          usableBalance = res.data.data.usableBalance
        }
      })
      return { usableBalance }
    } catch (err) {
      return error(err)
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
      userInto: '',
      outPwd: '',
      phoneVerification: false,
      codeValue: '',
      getPhone: {
        one: '',
        two: '',
        three: '',
        four: '',
        five: '',
        six: ''
      },
      mesNum: 30,
      userMoney: {
        amount: ''
      },
      orderId: '',
      dateStr: '',
      memberId: '',
      userMoneyRules: {
        amount: [
          { required: true, message: '金额不能为空', trigger: 'blur' },
          { validator: checkUserInto, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    userInto (val) {
      if (val.length === 6) { this.pwdWarning = false }
      this.outPwd = val
    },
    codeValue (val) {
      const myInputPass = val
      const arr = myInputPass.split('')
      const obj = this.getPhone
      let index = 0
      for (const i in obj) {
        obj[i] = arr[index]
        index++
      }
    }
  },
  methods: {
    intoGetPhoneCode () {
      this.$refs.userMoney.validate((valid) => {
        if (valid) {
          if (this.outPwd.length >= 6) {
            this.getCode()
          } else {
            this.pwdWarning = true
          }
        }
      })
    },
    getSmsNum () {
      this.$axios.post('/delegate/appHuiFu/canUsedSms').then((res) => {
        if (res.data.code === 200) {
          this.mesNum = res.data.data.smsNum
          this.phoneVerification = true
        }
      })
    },
    getCode () {
      this.$axios.post('/delegate/appHuiFu/sms', {
        busiType: 'T11',
        payPwd: this.outPwd,
        phone: this.userInfo.phone,
        amount: this.userMoney.amount
      }).then((res) => {
        if (res.data.code === 200) {
          this.dateStr = res.data.data.dateStr
          this.orderId = res.data.data.orderId
          this.getSmsNum()
        } else {
          this.outPwd = this.userInto = ''
        }
      })
    },
    allInto () {
      this.userMoney.amount = this.userInfo.availableMoney
    },
    handleForm () {
      this.$refs.codeInput.focus()
    },
    handleFocus () {
      this.$refs.userPwd.focus()
    },
    addPayBankSure () {
      if (this.codeValue.length >= 6) {
        this.$axios.post('/delegate/withdraw/huiFuWithdraw', {
          dateStr: this.dateStr,
          orderId: this.orderId,
          payPwd: this.outPwd,
          price: this.userMoney.amount,
          smsCode: this.codeValue
        }).then((res) => {
          if (res.data.code === 200) {
            this.$router.push('/personal/bankcardwithdrawal')
          }
        })
      } else {
        this.$Message.warning({
          content: '请输入6位数验证码',
          duration: 1
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.into-hf-container {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  .bread {
    margin: 8px 0;
  }
  .content {
    width: 1200px;
    height: 585px;
    background-color: #FFFFFF;
    border-radius: 1px;
    position: relative;
    margin-bottom: 20px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    .logo {
      position: absolute;
      left: 30px;
      top: 10px;
      width: 220px;
      height: 100px;
    }
    .into-hf-form {
      width: 500px;
      height: 433px;
      border-radius: 2px;
      box-shadow: 0px 2px 5px 2px rgba(17,16,255,0.05);
      padding: 0 100px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: center;
      .title{
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        color: #333333;
        line-height: 24px;
        margin-top: 40px;
      }
      .money-input-title {
        width: 100%;
        height: 30px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        margin-top: 20px;
        .form-title {
          font-size: 14px;
          font-weight: 400;
          text-align: left;
          color: #333333;
          line-height: 30px;
        }
        .form-desc {
          font-size: 12px;
          font-weight: 400;
          text-align: left;
          color: #1491ff;
          line-height: 30px;
          margin-left: 20px;
          cursor: pointer;
        }
      }
      .form-money-input {
        width: 100%;
        .wx-tip {
          font-size: 12px;
          font-weight: 400;
          text-align: left;
          color: #888888;
          line-height: 12px;
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
    }
    .pwd-tip {
      margin-top: 10px;
      width: 100%;
      font-size: 12px;
      font-weight: 400;
      text-align: left;
      color: #888888;
      line-height: 12px;
      .user-money {
        color: #1491ff;
      }
      .to-get {
        color: #1491ff;
        cursor: pointer;
      }
    }
    .btn {
      width: 100%;
      height: 40px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
      .get-code-btn {
        width: 168px;
        height: 40px;
        line-height: 40px;
        background-color: #0083ff;
        border-radius: 2px;
        color: #ffffff;
        font-weight: 500;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  .phone-mask {
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(51,51,51,.3);
    z-index: 999;
    top: 0;
    left: 0;
    .phone-code {
      width: 469px;
      height: 297px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      background-color: #FFFFFF;
      border-radius: 4px;
      .col {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 40px;
        padding-right: 10px;
        .close {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      }
      .title{
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        color: #333;
        line-height: 14px;
      }
      .phone-number {
        font-size: 18px;
        font-weight: 400;
        text-align: center;
        color: #333333;
        line-height: 14px;
        margin-top: 20px;
      }
      .phone-code-area {
        width: 100%;
        height: 40px;
        padding: 0 52px;
        position: relative;
        margin-top: 30px;
        .input-form {
          width: 100%;
          height: 100%;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;
          .pwd {
            width: 40px;
            height: 40px;
            outline: 0;
            border-left: none;
            border-right: none;
            border-top: none;
            border-bottom: 1px solid #888888;
            cursor: pointer;
            font-size: 18px;
            font-weight: 500;
            padding-left: 15px;
          }
        }
        .code-input {
          position: absolute;
          z-index: -10;
          width: 365px;
          height: 40px;
          left: 52px;
          top: 1px;
          outline: 0;
          border: none;
          background-color: transparent;
          color: transparent;
        }
      }
      .code-desc {
        font-size: 12px;
        font-weight: 400;
        text-align: center;
        color: #888888;
        line-height: 14px;
        margin-top: 20px;
      }
      .sure-btn {
        width: 100%;
        height: 40px;
        padding: 0 65px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        margin-top: 30px;
        .l-btn, .r-btn {
          width: 150px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          cursor: pointer;
        }
        .l-btn {
          border: 1px solid #888888;
          font-size: 14px;
          font-weight: 500;
          color: #888888;
        }
        .r-btn {
          background-color: #0083ff;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
