<template>
  <div class="order-pay-container">
    <div class="bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">
          首页
        </BreadcrumbItem>
        <BreadcrumbItem to="/shopping">
          商城
        </BreadcrumbItem>
        <BreadcrumbItem to="/shopping">
          订单详情
        </BreadcrumbItem>
        <BreadcrumbItem>订单支付</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="pay-list-container">
      <div class="left">
        <div class="title">
          1.请选择支付方式
        </div>
        <div class="pay-list">
          <div v-if="channelList.includes('platform')" class="pay-item" @click="changePayMethods('platform')">
            <img v-if="payName == 'platform'" src="~/assets/images/index/radio-check.png" class="check-icon">
            <img v-else src="~/assets/images/index/no-check.png" class="check-icon">
            <div class="pay-info">
              <img src="~/assets/images/index/balance.png" class="bank-icon">
              <div class="name">
                余额支付
              </div>
              <div class="desc">
                账户余额
                <span style="color: #F78C2E">{{ userInfo.availableMoney }}</span>
                元
              </div>
            </div>
          </div>
          <div v-if="channelList.includes('huifupay')" class="pay-item" @click="changePayMethods('huifupay')">
            <img v-if="payName == 'huifupay'" src="~/assets/images/index/radio-check.png" class="check-icon">
            <img v-else src="~/assets/images/index/no-check.png" class="check-icon">
            <div class="pay-info">
              <img src="~/assets/images/index/balance.png" class="bank-icon">
              <div class="name">
                汇付天下支付
              </div>
              <div class="desc">
                使用绑定的储蓄卡进行支付
              </div>
            </div>
          </div>
          <div v-if="payName == 'huifupay'" class="bank-card-list">
            <div class="card-box">
              <div class="list-item" @click="changeBankList('yl')">
                <img v-if="bank == 'yl'" src="~/assets/images/index/radio-check.png" class="check-icon">
                <img v-else src="~/assets/images/index/no-check.png" class="check-icon">
                <div class="pay-info">
                  <img src="~/assets/images/index/yl.png" class="bank-icon">
                  <div class="name">
                    网银支付
                  </div>
                  <div class="desc">
                    请确定您已开通网银，若未开通请联系发卡行
                  </div>
                </div>
              </div>
              <div v-for="(item,index) in zhilist" :key="item.bindCardId" class="list-item" @click="changeBankList(item.cardNo, index)">
                <img v-if="bank == item.cardNo" src="~/assets/images/index/radio-check.png" class="check-icon">
                <img v-else src="~/assets/images/index/no-check.png" class="check-icon">
                <div class="pay-info">
                  <img :src="item.cardIco" class="bank-icon-for">
                  <div class="name">
                    {{ item.bankName }}
                  </div>
                </div>
              </div>
            </div>
            <div class="add-card">
              <div class="list-item">
                <div class="add-info" @click="addPayCard">
                  <img src="~/assets/images/index/add-card.png" class="bank-icon">
                  <div class="name">
                    添加储蓄卡
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="channelList.includes('alipay')" class="pay-item" @click="changePayMethods('alipay')">
            <img v-if="payName == 'alipay'" src="~/assets/images/index/radio-check.png" class="check-icon">
            <img v-else src="~/assets/images/index/no-check.png" class="check-icon">
            <div class="pay-info">
              <img src="~/assets/images/index/zfb.png" class="bank-icon">
              <div class="name">
                支付宝
              </div>
              <div class="desc">
                使用绑定的支付宝账户支付
              </div>
            </div>
          </div>
          <div v-if="channelList.includes('wxpay')" class="pay-item" @click="changePayMethods('wxpay')">
            <img v-if="payName == 'wxpay'" src="~/assets/images/index/radio-check.png" class="check-icon">
            <img v-else src="~/assets/images/index/no-check.png" class="check-icon">
            <div class="pay-info">
              <img src="~/assets/images/index/wx.png" class="bank-icon">
              <div class="name">
                微信支付
              </div>
              <div class="desc">
                使用微信绑定的微信账户支付
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">
          2.请输入支付密码
        </div>
        <div class="password-input">
          <div class="forget">
            <span class="txt" @click="$router.push('/personal/securitySettings')">忘记密码</span>
          </div>
          <span class="title">请输入支付密码</span>
          <span class="price">￥{{ price + '.00' }}</span>
          <div class="password">
            <input v-model="passwordCode" type="password" class="outInput" readonly="readonly" @click="handleFocus">
            <input ref="userPwd" v-model="userInto" type="text" maxlength="6" class="innerInput">
            <div v-if="pwdWarning" class="tip">
              请输入6位支付密码
            </div>
          </div>
          <div class="pay-btn" @click="pay">
            确认支付
          </div>
        </div>
      </div>
    </div>
    <div v-if="maskShow" class="mask" @click.self="maskShow = false">
      <div class="mask-content">
        <div class="close">
          <img class="ico" src="~/assets/images/index/close-dialog.png" @click="maskShow = false">
        </div>
        <div class="qrcode-title">
          请扫描二维码支付
        </div>
        <div id="qrcode" ref="qrCodeDiv" class="qr-code" />
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
            <input v-model="getPhone.one" type="text" maxlength="1" class="pwd">
            <input v-model="getPhone.two" type="text" maxlength="1" class="pwd">
            <input v-model="getPhone.three" type="text" maxlength="1" class="pwd">
            <input v-model="getPhone.four" type="text" maxlength="1" class="pwd">
            <input v-model="getPhone.five" type="text" maxlength="1" class="pwd">
            <input v-model="getPhone.six" type="text" maxlength="1" class="pwd">
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
// import passwordInput from '~/components/passwordInput'
export default {
  name: 'Orderpay',
  components: {
    // passwordInput
  },
  layout: 'shopping',
  async asyncData ({ $axios, error, query }) {
    try {
      const { id, price } = query
      let channelList, zhilist, memberId
      await $axios.post('/delegate/appHuiFu/getPayConfig', {
        orderId: id
      }).then((res) => {
        if (res.data.code === 200) {
          channelList = res.data.data.channelList
          zhilist = res.data.data.zhilist
          memberId = res.data.data.memberId
        }
      })
      return {
        channelList,
        zhilist,
        memberId,
        price,
        id
      }
    } catch (err) {
      return error(err)
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    codeValue (val) {
      const myInputPass = val
      const arr = myInputPass.split('')
      const obj = this.getPhone
      let index = 0
      for (const i in obj) {
        obj[i] = arr[index]
        index++
      }
    },
    userInto (val) {
      if (val.length === 6) { this.pwdWarning = false }
      this.passwordCode = val
    }
  },
  data () {
    return {
      pwdWarning: false,
      getPhone: {
        one: '',
        two: '',
        three: '',
        four: '',
        five: '',
        six: ''
      },
      userInto: '', // 用户输入密码
      codeValue: '',
      mesNum: 30,
      phoneVerification: false,
      payMethods: '',
      payName: 'platform',
      bank: 'yl',
      passwordCode: '',
      maskShow: false,
      QrCodeObj: {},
      timer: null,
      bankCurrent: 0
    }
  },
  created () {
    console.log(this.zhilist)
  },
  methods: {
    handleFocus () {
      this.$refs.userPwd.focus()
    },
    addPayCard () {
      // 添加支付卡
      this.$router.push('/addpaycard')
    },
    changePayMethods (name) {
      this.payName = name
    },
    changeBankList (code, index) {
      this.bank = code
      this.bankCurrent = index
    },
    pay () {
      if (this.passwordCode.length < 6) {
        this.pwdWarning = true
        return
      }
      switch (this.payName) {
        case 'platform':
          // 余额支付
          this.$axios.post('/delegate/orders/pcPay', {
            orderId: this.id,
            payMode: 2,
            payPwd: this.passwordCode
          }).then((res) => {
            if (res.data.code === 200) {
              this.$Message.success({
                content: '支付成功',
                duration: 1
              })
              this.$store.dispatch('getUserInfo')
              this.passwordCode = ''
              this.userInto = ''
              this.$router.push({ path: '/paystate', query: { state: true } })
            } else if (res.data.code === 500) {
              this.passwordCode = ''
              this.userInto = ''
            }
          })
          break
        case 'alipay':
          // 支付宝支付
          this.$axios.post('/delegate/orders/pcPay', {
            orderId: this.id,
            payMode: 1,
            payPwd: this.passwordCode
          }).then((res) => {
            if (res.data.code === 200) {
              const html = res.data.data.form
              const div = document.createElement('div')
              div.innerHTML = html
              document.body.appendChild(div)
              document.forms[1].submit()
            } else if (res.data.code === 500) {
              this.passwordCode = ''
              this.userInto = ''
            }
          })
          break
        case 'wxpay':
          // 微信支付
          this.$axios.post('/delegate/orders/pcWxPay', {
            orderId: this.id,
            payMode: 4,
            payPwd: this.passwordCode
          }).then((res) => {
            if (res.data.code === 200) {
              this.maskShow = true
              const timer = setTimeout(() => {
                // eslint-disable-next-line no-undef
                this.QrCodeObj = new QRCode('qrcode', {
                  text: res.data.data,
                  width: 240,
                  height: 240,
                  colorDark: '#000',
                  colorLight: '#fff',
                  // eslint-disable-next-line no-undef
                  correctLevel: QRCode.CorrectLevel.H
                })
                clearTimeout(timer)
                this.getCheckResult()
              }, 200)
            }
          })
          break
        case 'huifupay':
          // 汇付支付
          if (this.bank === 'yl') {
            this.$axios.post('/delegate/huiFu/webPay', {
              orderId: this.id,
              payPwd: this.passwordCode
            }).then((res) => {
              if (res.data.code === 200) {
                this.postForm(res.data.data)
              } else {
                this.passwordCode = ''
                this.userInto = ''
              }
            })
          } else {
            this.getSmsNum()
          }
          break
      }
    },
    handleForm () {
      this.$refs.codeInput.focus()
    },
    getSmsNum () {
      this.$axios.post('/delegate/appHuiFu/canUsedSms').then((res) => {
        if (res.data.code === 200) {
          this.mesNum = res.data.data.smsNum
          this.getBankCode()
        }
      })
    },
    getBankCode () {
      this.$axios.post('/delegate/appHuiFu/trans', {
        bankNo: this.zhilist[this.bankCurrent].bankNo,
        cardNo: this.zhilist[this.bankCurrent].cardNo,
        mobile: this.zhilist[this.bankCurrent].mobile,
        orderId: this.id,
        payPwd: this.passwordCode
      }).then((res) => {
        if (res.data.code === 200 && res.data.data.status === 'OK') {
          this.phoneVerification = true
        } else {
          this.passwordCode = ''
          this.userInto = ''
          this.$Message.error({
            content: '短信发送失败，请稍后重新发送',
            duration: 2
          })
        }
      })
    },
    addPayBankSure () {
      if (this.codeValue.length >= 6) {
        this.$axios.get('/delegate/huiFu/transaAmt', {
          params: {
            orderId: this.id,
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
    },
    getCheckResult () {
      this.timer = setInterval(() => {
        this.$axios.get(`/orders/query/${this.id}`).then((res) => {
          if (res.data.code === 200) {
            clearInterval(this.timer)
            this.$router.push({ path: '/paystate', query: { state: 'true' } })
          } else {
            clearInterval(this.timer)
            this.$router.push({ path: '/paystate', query: { state: 'false' } })
          }
        })
      }, 10000)
      setTimeout(() => {
        this.$router.push({ path: '/paystate', query: { state: 'timeout' } })
        clearInterval(this.timer)
      }, 60000)
    }
  }
}
</script>

<style lang="less" scoped>
.order-pay-container {
  width: 1200px;
  min-height: calc(100vh - 501px);
  margin: 0 auto;
  position: relative;
  .phone-mask {
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(51, 51, 51, 0.3);
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
      background-color: #ffffff;
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
      .title {
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
          z-index: 10;
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
        .l-btn,
        .r-btn {
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
  .bread {
    margin: 8px 0;
  }
  .pay-list-container {
    width: 100%;
    min-height: 541px;
    margin-bottom: 20px;
    background-color: #ffffff;
    border-radius: 1px;
    padding: 40px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    .left,
    .right {
      .title {
        font-size: 18px;
        font-weight: 500;
        text-align: left;
        color: #333333;
        line-height: 25px;
      }
    }
    .left {
      .pay-list {
        padding-left: 32px;
        padding-top: 25px;
        width: 630px;
        min-height: 405px;
        border-radius: 5px;
        box-shadow: 0px 2px 6px 2px rgba(17, 16, 255, 0.05);
        margin-top: 30px;
        .pay-item {
          width: 100%;
        }
        .pay-item,
        .card-list {
          cursor: pointer;
          display: flex;
          height: 60px;
          flex-flow: row nowrap;
          justify-content: flex-start;
          align-items: center;
          .check-icon {
            width: 20px;
            height: 20px;
          }
          .pay-info {
            height: 100%;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            margin-left: 20px;
            .bank-icon {
              width: 47px;
              height: 47px;
            }
            .name {
              font-size: 16px;
              font-weight: 500;
              text-align: left;
              color: #333333;
              line-height: 22px;
              letter-spacing: 0px;
              margin-left: 10px;
            }
            .desc {
              font-size: 12px;
              font-weight: 400;
              text-align: left;
              color: #999999;
              line-height: 17px;
              margin-left: 14px;
            }
          }
        }
        .bank-card-list {
          margin-left: 40px;
          height: auto;
          .card-box,
          .add-card {
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: flex-start;
            .list-item {
              display: flex;
              flex-flow: row nowrap;
              justify-content: flex-start;
              align-items: center;
              height: 60px;
              cursor: pointer;
              .check-icon {
                width: 20px;
                height: 20px;
              }
              .pay-info,
              .add-info {
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                align-items: center;
                margin-left: 20px;
                .bank-icon-for {
                  width: 30px;
                  height: 30px;
                }
                .name {
                  font-size: 15px;
                  font-weight: 500;
                  text-align: left;
                  color: #333333;
                  line-height: 21px;
                  letter-spacing: 0px;
                  margin-left: 10px;
                }
                .desc {
                  font-size: 12px;
                  font-weight: 400;
                  text-align: left;
                  color: #999999;
                  line-height: 17px;
                  margin-left: 14px;
                }
              }
              .add-info {
                margin-left: 30px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    .right {
      .password-input {
        width: 450px;
        height: 405px;
        border-radius: 5px;
        box-shadow: 0px 2px 6px 2px rgba(17, 16, 255, 0.05);
        margin-top: 30px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        .forget {
          font-size: 14px;
          font-weight: 400;
          text-align: right;
          color: #666666;
          line-height: 20px;
          padding-top: 22px;
          width: 100%;
          .txt {
            margin-right: 22px;
          }
        }
        .title {
          font-size: 16px;
          font-weight: 500;
          text-align: center;
          color: #1491ff;
          line-height: 22px;
          margin-top: 40px;
        }
        .price {
          font-size: 35px;
          font-weight: 500;
          text-align: center;
          color: #333333;
          line-height: 49px;
          margin-top: 16px;
        }
        .password {
          width: 260px;
          height: 60px;
          margin-top: 5px;
          position: relative;
          display: flex;
          flex-flow: column nowrap;
          justify-content: flex-start;
          align-items: center;
          .tip {
            font-size: 14px;
            color: #ed4014;
            line-height: 20px;
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
        .pay-btn {
          width: 194px;
          height: 50px;
          font-size: 16px;
          font-weight: 400;
          text-align: center;
          color: #ffffff;
          line-height: 50px;
          background: #1491ff;
          border-radius: 2px;
          margin-top: 25px;
          cursor: pointer;
        }
      }
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    .mask-content {
      width: 660px;
      height: 440px;
      position: absolute;
      left: 50%;
      top: 50%;
      background-color: #ffffff;
      border-radius: 6px;
      transform: translateX(-50%) translateY(-50%);
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: center;
      .close {
        width: 100%;
        height: 40px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        align-items: center;
        padding: 0 10px;
        .ico {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      }
      .qrcode-title {
        width: 100%;
        text-align: center;
        line-height: 100px;
        font-size: 18px;
        font-weight: 500;
        color: #333333;
      }
      .qr-code {
        width: 240px;
        height: 240px;
      }
    }
  }
}
</style>
