<template>
  <div class="add-pay-card">
    <div class="container">
      <div class="content">
        <div class="col">
          <span class="title">真实姓名</span>
          <span class="name">{{ userInfo.realName }}</span>
        </div>
        <div class="col">
          <span class="title">身份证号</span>
          <span class="name">{{ userInfo.idCard }}</span>
        </div>
        <div class="title-container">
          <span class="title-l">
            银行卡号
          </span>
          <span class="title-r" @click="mask=true">
            点击查看支持银行
          </span>
        </div>
        <Form ref="bankCode" :model="bankCodeForm" :rules="bankCodeRule">
          <FormItem prop="bankCode">
            <Input v-model="bankCodeForm.bankCode" placeholder="请输入您的银行卡号" size="large" />
          </FormItem>
        </Form>
        <div class="title-container">
          <span class="title-l">
            该卡银行预留手机号码
          </span>
        </div>
        <Form ref="bankPhone" :model="bankPhone" :rules="bankPhoneRule">
          <FormItem prop="phone">
            <Input v-model="bankPhone.phone" placeholder="请输入银行预留手机号" size="large" />
          </FormItem>
        </Form>
        <div class="title-container">
          <span class="title-l">
            请输入全民外贸支付密码
          </span>
        </div>
        <div class="password">
          <input v-model="outPwd" type="password" class="outInput" readonly="readonly" @click="handleFocus">
          <input ref="userPwd" v-model="userInto" maxlength="6" type="text" class="innerInput">
        </div>
        <span class="forget" @click="$router.push('/personal/changePayment')">忘记密码?</span>
        <div class="btn">
          <span class="btn-text" @click="ImmediatelyBinding">立即绑定</span>
        </div>
      </div>
    </div>
    <div v-if="mask" class="mask" @click.self="mask = false">
      <div class="zc-bank-list">
        <div class="title">
          <span class="tit">银行卡列表</span>
          <img src="~/assets/images/index/close-dialog.png" class="close" @click="mask = false">
        </div>
        <div class="content-area">
          <div v-for="(item, index) in bankList" :key="index" class="recommended-bank">
            <img :src="item.url" class="bank-ico" alt="">
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div class="btn" />
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
  name: 'Addpaycard',
  layout: 'shopping',
  data () {
    const bankCodeCheck = (rule, value, callback) => {
      const reg = /^([0-9]{16}|[0-9]{19})$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确银行卡号'))
      }
    }
    const userPhoneCheck = (rule, value, callback) => {
      const reg = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[8,9]\d{8}$/
      if (!reg.test(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }
    return {
      bankCodeForm: {
        bankCode: ''
      },
      bankCodeRule: {
        bankCode: [
          { required: true, message: '银行卡号不能为空', trigger: 'blur' },
          { validator: bankCodeCheck, trigger: 'blur' }
        ]
      },
      bankPhone: {
        phone: ''
      },
      bankPhoneRule: {
        phone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { validator: userPhoneCheck, trigger: 'blur' }
        ]
      },
      userInto: '',
      outPwd: '',
      mask: false,
      phoneVerification: false,
      codeValue: '',
      mesNum: 30,
      getPhone: {
        one: '',
        two: '',
        three: '',
        four: '',
        five: '',
        six: ''
      },
      bankList: [
        {
          url: require('~/assets/images/bank/bj.png'),
          name: '北京银行'
        },
        {
          url: require('~/assets/images/bank/gd.png'),
          name: '光大银行'
        },
        {
          url: require('~/assets/images/bank/gf.png'),
          name: '广发银行'
        },
        {
          url: require('~/assets/images/bank/gs.png'),
          name: '工商银行'
        },
        {
          url: require('~/assets/images/bank/hx.png'),
          name: '华夏银行'
        },
        {
          url: require('~/assets/images/bank/js.png'),
          name: '建设银行'
        },
        {
          url: require('~/assets/images/bank/jt.png'),
          name: '交通银行'
        },
        {
          url: require('~/assets/images/bank/lz.png'),
          name: '兰州银行'
        },
        {
          url: require('~/assets/images/bank/ms.png'),
          name: '民生银行'
        },
        {
          url: require('~/assets/images/bank/ny.png'),
          name: '农业银行'
        },
        {
          url: require('~/assets/images/bank/pa.png'),
          name: '平安银行'
        },
        {
          url: require('~/assets/images/bank/sh.png'),
          name: '浦发银行'
        },
        {
          url: require('~/assets/images/bank/sh2.png'),
          name: '上海银行'
        },
        {
          url: require('~/assets/images/bank/xx.png'),
          name: '兴业银行'
        },
        {
          url: require('~/assets/images/bank/yz.png'),
          name: '邮政银行'
        },
        {
          url: require('~/assets/images/bank/zx.png'),
          name: '中信银行'
        },
        {
          url: require('~/assets/images/bank/zg.png'),
          name: '中国银行'
        },
        {
          url: require('~/assets/images/bank/zs.png'),
          name: '招商银行'
        }
      ]
    }
  },
  watch: {
    userInto (val) {
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
  computed: {
    ...mapGetters(['userInfo', 'orderInfo'])
  },
  methods: {
    handleFocus () {
      this.$refs.userPwd.focus()
    },
    handleForm () {
      this.$refs.codeInput.focus()
    },
    ImmediatelyBinding () {
      let code, phone
      this.$refs.bankCode.validate((valid) => {
        code = valid
      })
      this.$refs.bankPhone.validate((bool) => {
        phone = bool
      })
      if (code && phone) {
        this.$axios.post('/delegate/appHuiFu/trans', {
          cardNo: this.bankCodeForm.bankCode,
          mobile: this.bankPhone.phone,
          orderId: this.orderInfo.orderId
        }).then((res) => {
          if (res.data.code === 200) {
            this.getSmsNum()
          }
        })
      }
    },
    getSmsNum () {
      this.$axios.post('/delegate/appHuiFu/canUsedSms').then((res) => {
        if (res.data.code === 200) {
          this.mesNum = res.data.data.smsNum
          this.phoneVerification = true
        }
      })
    },
    addPayBankSure () {
      if (this.codeValue.length >= 6) {
        this.$axios.get('/delegate/huiFu/transaAmt', {
          params: {
            orderId: this.orderInfo.orderId,
            smsCode: this.codeValue
          }
        }).then((res) => {
          if (res.data.code === 200) {
            // this.$router.push({ path: '/paystate', query: { state: 'true' } })
            this.postForm(res.data.data)
          }
        })
      } else {
        this.$Message.warning({
          content: '请输入6位数验证码',
          duration: 1
        })
      }
    },
    postForm (HFPay) {
      const { checkValue, cmdId, merCustId, version } = HFPay
      const params = {
        cmd_id: cmdId,
        mer_cust_id: merCustId,
        check_value: checkValue,
        version
      }
      const tempform = document.createElement('form')
      tempform.action = HFPay.url
      tempform.method = 'post'
      tempform.style.display = 'none'
      tempform.target = '_self'

      for (const x in params) {
        const opt = document.createElement('input')
        opt.name = x
        opt.value = params[x]
        tempform.appendChild(opt)
      }
      const opt = document.createElement('input')
      opt.type = 'submit'
      tempform.appendChild(opt)
      document.body.appendChild(tempform)
      tempform.submit()
      document.body.removeChild(tempform)
    }
  }
}
</script>

<style lang="less" scoped>
.add-pay-card {
  width: 1200px;
  height: auto;
  margin: 20px auto;
  .container {
    width: 1200px;
    height: 585px;
    background: #ffffff;
    border-radius: 1px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    .content {
      width: 500px;
      height: 482px;
      background: #ffffff;
      border-radius: 2px;
      box-shadow: 0px 2px 5px 2px rgba(17,16,255,0.05);
      padding: 30px 100px;
      .col {
        width: 100%;
        height: 30px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        .title {
          font-size: 14px;
          font-weight: 400;
          color: #333333;
          line-height: 14px;
        }
        .name {
          font-size: 14px;
          font-weight: 400;
          color: #999999;
          line-height: 14px;
          margin-left: 15px;
        }
      }
      .title-container {
        width: 100%;
        height: 30px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        .title-l {
          font-size: 14px;
          font-weight: 400;
          color: #333333;
          line-height: 14px;
        }
        .title-r {
          font-size: 12px;
          font-weight: 400;
          color: #0083ff;
          line-height: 12px;
          cursor: pointer;
        }
      }
      .password {
        width: 100%;
        height: 40px;
        margin-top: 5px;
        position: relative;
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
      .forget {
        font-size: 12px;
        font-weight: 400;
        color: #0083ff;
        line-height: 12px;
        cursor: pointer;
        margin-top: 10px;
        display: inline-block;
      }
      .btn {
        width: 100%;
        height: 40px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        .btn-text{
          width: 168px;
          height: 40px;
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
          line-height: 40px;
          background: #0083ff;
          border-radius: 2px;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(51,51,51,.3);
    z-index: 999;
    top: 0;
    left: 0;
    .zc-bank-list {
      position: absolute;
      width: 660px;
      min-height: 504px;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      background-color: #FFFFFF;
      border-radius: 6px;
      .title {
        width: 100%;
        height: 60px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px 0 60px;
        .tit {
          font-size: 14px;
          font-weight: 500;
          text-align: left;
          color: #333333;
          line-height: 14px;
        }
        .close {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      }
      .content-area {
        width: 100%;
        height: auto;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
        padding: 0 60px;
        margin-top: 20px;
        .recommended-bank {
          width: 160px;
          height: 40px;
          border-radius: 2px;
          box-shadow: 0px 2px 5px 2px rgba(17,16,255,0.05);
          background: #ffffff;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          margin-bottom: 20px;
          .bank-ico {
            width: 26px;
            height: 26px;
          }
          span{
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            line-height: 14px;
          }
        }
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
