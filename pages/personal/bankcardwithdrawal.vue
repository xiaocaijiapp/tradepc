<template>
  <div class="bank-card-withdrawal-container">
    <div class="bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">
          首页
        </BreadcrumbItem>
        <BreadcrumbItem to="/personal">
          个人中心
        </BreadcrumbItem>
        <BreadcrumbItem>银行卡提现</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="content">
      <div class="title">
        <p class="main-title">
          银行卡提现
        </p>
        <p class="small-title">
          需要将全民外贸账户余额转入至汇付天下才可以提现到卡哦
        </p>
      </div>
      <div class="withdrawal-amount-area">
        <div class="left">
          <p class="prompt">
            温馨提示：汇付天下账户没有余额是无法提现的
          </p>
          <div class="from-box" style="width: 100%">
            <Form ref="intoMoney" :model="intoMoney" :rules="intoMoneyRules">
              <FormItem prop="amount">
                <Input v-model="intoMoney.amount" size="large" placeholder="请输入提现金额" />
              </FormItem>
            </Form>
          </div>
          <div class="menu">
            汇付天下账户余额{{ usableBalance }}元
            <span class="tointo" @click="$router.push('/personal/intoremittance')">去转入</span>
          </div>
        </div>
        <div class="right">
          <div class="desc">
            请输入支付密码
          </div>
          <div class="password">
            <input
              id="input"
              ref="myInput"
              v-model="inputPass"
              type="password"
              maxlength="6"
              autocomplete="new-password"
              autofocus
              class="inputPass"
            >
            <form class="input-form">
              <input v-model="password.one" type="password" maxlength="1" readonly="readonly" class="pwd">
              <input v-model="password.two" type="password" maxlength="1" readonly="readonly" class="pwd">
              <input v-model="password.three" type="password" maxlength="1" readonly="readonly" class="pwd">
              <input v-model="password.four" type="password" maxlength="1" readonly="readonly" class="pwd">
              <input v-model="password.five" type="password" maxlength="1" readonly="readonly" class="pwd">
              <input v-model="password.six" type="password" maxlength="1" readonly="readonly" class="pwd">
            </form>
            <div v-if="psdWrong" class="tip">
              支付密码错误，请输入6位数字支付密码
            </div>
          </div>
        </div>
      </div>
      <div class="change-pay-methods">
        <div class="pay-desc">
          请选择到账银行卡
        </div>
        <div class="get-bank-list">
          <div v-for="(item, index) in qulist" :key="item.bindCardId" class="bank-item" :class="bankCurrent == index ? 'bank-item-active' : ''" @click="changeTxCode(index)">
            <img :src="item.cardIco" class="bank-ico">
            <span class="bank-name">{{ item.bankName }}</span>
            <span class="bank-code">({{ item.cardNo }})</span>
          </div>
        </div>
      </div>
      <div class="change-pay-methods">
        <div class="pay-desc">
          请选择一种到账方式
        </div>
        <div class="change-box">
          <div class="chang-item" :class="changetype == 1 ? 'chang-item-active' : ''" @click="changetype = 1">
            <div class="icon-title">
              <img src="~/assets/images/index/nowday.png">
              <span>当日到账</span>
            </div>
            <div class="details">
              <p class="text">
                当日到账
              </p>
              <p class="text">
                该方式提现日限额
                <span style="color: #0083ff">不限</span>
              </p>
              <p class="text">
                该方式提现手续费为
                <span style="color: #0083ff">1元=0.02%/笔</span>
              </p>
            </div>
          </div>
          <div class="chang-item" :class="changetype == 2 ? 'chang-item-active' : ''" @click="changetype = 2">
            <div class="icon-title">
              <img src="~/assets/images/index/next-day.png">
              <span>次日到账</span>
            </div>
            <div class="details">
              <p class="text">
                工作日为次日到账,休息日为下周一到账
              </p>
              <p class="text">
                该方式提现日限额
                <span style="color: #0083ff">不限</span>
              </p>
              <p class="text">
                该方式提现手续费为
                <span style="color: #0083ff">0.5/笔</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="button">
        <span class="text" @click="immediateWithdrawal">立即提现</span>
      </div>
    </div>
    <div v-if="mask" class="mask" @click.self="mask = false">
      <div class="dialog">
        <p class="title">
          我们已将验证码发送至您的手机
        </p>
        <div class="user-phone">
          {{ userInfo.phone }}
        </div>
        <div class="valid-code">
          <input
            ref="phoneCode"
            v-model="codeInput"
            maxlength="6"
            autocomplete="new-password"
            type="text"
            class="hiddenInput"
          >
          <form class="input-form" @click="$refs.phoneCode.focus()">
            <input v-model="code.one" type="text" maxlength="1" readonly="readonly" class="code">
            <input v-model="code.two" type="text" maxlength="1" readonly="readonly" class="code">
            <input v-model="code.three" type="text" maxlength="1" readonly="readonly" class="code">
            <input v-model="code.four" type="text" maxlength="1" readonly="readonly" class="code">
            <input v-model="code.five" type="text" maxlength="1" readonly="readonly" class="code">
            <input v-model="code.six" type="text" maxlength="1" readonly="readonly" class="code">
          </form>
        </div>
        <p class="code-message">
          60秒后重新发送,今日短信接收条数剩余{{ mesNum }}条
        </p>
        <div class="btn-group">
          <div class="btn" @click="mask = false">
            取消
          </div>
          <div class="btn" @click="sure">
            确认
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Bankcardwithdrawal',
  async asyncData ({ $axios, error }) {
    try {
      let usableBalance, qulist
      await $axios.post('/delegate/appHuiFu/queryUserHuiFuBalance').then((res) => {
        if (res.data.code === 200) {
          usableBalance = res.data.data.usableBalance
        }
      })
      // 获取用户可用取现银行卡
      await $axios.post('/delegate/appHuiFu/findUserCard').then((res) => {
        if (res.data.code === 200) {
          qulist = res.data.data.qulist
        }
      })
      return {
        usableBalance,
        qulist
      }
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
      bankCurrent: 0,
      intoMoney: {
        amount: ''
      },
      intoMoneyRules: {
        amount: [
          { required: true, message: '提现金额不能为空', trigger: 'blur' },
          { validator: checkUserInto, trigger: 'blur' }
        ]
      },
      codeInput: '',
      password: {
        one: '',
        two: '',
        three: '',
        four: '',
        five: '',
        six: ''
      },
      code: {
        one: '',
        two: '',
        three: '',
        four: '',
        five: '',
        six: ''
      },
      mesNum: 30,
      inputPass: '',
      psdWrong: false,
      changetype: 1,
      mask: false,
      orderId: '',
      dateStr: ''
    }
  },
  watch: {
    inputPass () {
      this.show()
      const patt = /^[0-9]*$/g
      this.psdWrong = !patt.test(this.inputPass)// 表单校验，输入错误时给出提示
    },
    codeInput () {
      this.handleCode()
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    changeTxCode (_index) {
      this.bankCurrent = _index
    },
    show () { // 用户输入显示
      const myInputPass = this.inputPass
      const arr = myInputPass.split('')
      const obj = this.password
      let index = 0
      for (const i in obj) {
        obj[i] = arr[index]
        index++
      }
    },
    handleCode () {
      const myInputPass = this.codeInput
      const arr = myInputPass.split('')
      const obj = this.code
      let index = 0
      for (const i in obj) {
        obj[i] = arr[index]
        index++
      }
    },
    // 立即提现
    immediateWithdrawal () {
      this.$refs.intoMoney.validate((valid) => {
        if (valid) {
          if (this.inputPass.length >= 6) {
            this.psdWrong = false
            this.$axios.post('/delegate/appHuiFu/sms', {
              busiType: 'T07',
              payPwd: this.inputPass,
              phone: this.userInfo.phone
            }).then((res) => {
              if (res.data.code === 200) {
                this.dateStr = res.data.data.dateStr
                this.orderId = res.data.data.orderId
                this.getSmsNum()
              }
            })
          } else {
            this.psdWrong = true
          }
        }
      })
    },
    getSmsNum () {
      this.$axios.post('/delegate/appHuiFu/canUsedSms').then((res) => {
        if (res.data.code === 200) {
          this.mesNum = res.data.data.smsNum
          this.mask = true
        }
      })
    },
    sure () {
      console.log('1111')
      this.$axios.post('/delegate/appHuiFu/withdraw', {
        cashBindCardId: this.qulist[this.bankCurrent].bindCardId,
        cashType: this.changetype === 1 ? 'T0' : 'T1',
        orderId: this.orderId,
        payPwd: this.inputPass,
        price: this.intoMoney.amount,
        smsCode: this.codeInput
      }).then((res) => {
        if (res.data.code === 200) {
          this.$Message.success({
            content: '提现成功',
            duration: 1
          })
          this.$router.push('/personal')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.bank-card-withdrawal-container {
  width: 1200px;
  margin: 0 auto;
  .bread {
    margin: 8px 0;
  }
  .content {
    width: 1200px;
    height: auto;
    background-color: #FFFFFF;
    border-radius: 1px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 30px;
    .title {
      padding-left: 30px;
      padding-top: 30px;
      width: 100%;
      .main-title {
        font-size: 24px;
        font-weight: 500;
        text-align: left;
        color: #333333;
        line-height: 24px;
      }
      .small-title {
        font-size: 16px;
        font-weight: 500;
        text-align: left;
        color: #333333;
        line-height: 40px;
      }
    }
    .withdrawal-amount-area {
      width: 640px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      .left, .right {
        width: 300px;
        height: 147px;
        border-radius: 4px;
        box-shadow: 0px 2px 5px 2px rgba(17,16,255,0.05);
        margin-top: 40px;
      }
      .left {
        width: 300px;
        padding: 26px 20px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: flex-start;
        .prompt {
          font-size: 12px;
          font-weight: 400;
          text-align: left;
          color: #888888;
          line-height: 12px;
        }
        .from-box {
          width: 100%;
          margin-top: 10px;
        }
        .menu {
          font-size: 12px;
          font-weight: 400;
          text-align: left;
          color: #333333;
          line-height: 12px;
          .tointo {
            color: #1491ff;
            margin-left: 6px;
            cursor: pointer;
          }
          .tointo::after{
            content: '>';
            color: #1491ff;
            font-size: 12px;
            line-height: 12px;
          }
        }
      }
      .right {
        padding: 25px 30px 0px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: flex-start;
        .desc {
          font-size: 14px;
          font-weight: 400;
          text-align: left;
          color: #333333;
          line-height: 14px;
        }
        .password {
          width: 240px;
          height: 40px;
          position: relative;
          margin-top: 10px;
          .inputPass {
            position: absolute;
            z-index: 1;
            background-color: transparent;
            width: 240px;
            height: 40px;
            border: 0;
            outline: 0;
            color: transparent;
          }
          .input-form {
            width: 240px;
            height: 40px;
            border: 1px solid #d7d7d7;
            border-radius: 7px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            .pwd {
              outline: 0;
              border-top: 0;
              border-bottom: 0;
              border-left: 0;
              background-color: transparent;
              width: 40px;
              height: 26px;
              border-color: #d7d7d7;
              font-size: 28px;
              padding-left: 15px;
            }
            .pwd:last-child {
              border: 0;
            }
          }
          .tip {
            margin-top: 8px;
            color: #ed4014;
          }
        }
      }
    }
    .change-pay-methods {
      width: 640px;
      margin-top: 22px;
      .pay-desc {
        width: 100%;
        height: 28px;
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        color: #333333;
        line-height: 28px;
      }
      .get-bank-list {
        width: 100%;
        height: auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        .bank-item-active {
          background: url("~/assets/images/index/bank-list.png") no-repeat 100% 100%;
          box-shadow: none;
          background-clip: padding-box;
        }
        .bank-item {
          cursor: pointer;
          width: 302px;
          height: 48px;
          border-radius: 4px;
          box-shadow: 0px 2px 5px 2px rgba(17,16,255,0.05);
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          align-items: center;
          padding-left: 20px;
          .bank-ico {
            width: 26px;
            height: 26px;
          }
          span {
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            line-height: 14px;
          }
          .bank-name{
            margin-left: 20px;
          }
        }
      }
      .change-box {
        width: 100%;
        height: 150px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        margin-top: 14px;
        .chang-item-active {
          background: url("~/assets/images/index/border-bg.png") no-repeat 100% 100%;
          box-shadow: none;
        }
        .chang-item{
          width: 302px;
          height: 149px;
          border-radius: 4px;
          box-shadow: 0px 2px 5px 2px rgba(17,16,255,0.05);
          cursor: pointer;
          .icon-title {
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            img {
              width: 42px;
              height: 42px;
            }
            span {
              font-size: 16px;
              font-family: PingFangSC, PingFangSC-Regular;
              font-weight: 400;
              text-align: left;
              color: #333333;
              line-height: 16px;
            }
          }
          .details {
            padding: 20px 30px 15px;
            width: 100%;
            height: 100px;
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            .text {
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
    .button {
      width: 100%;
      height: 40px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      margin-top: 25px;
      .text {
        width: 168px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        font-weight: 500;
        background-color: #0083ff;
        color: #ffffff;
        border-right: 2px;
        cursor: pointer;
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
    .dialog {
      width: 469px;
      height: 297px;
      position: absolute;
      background-color: #FFFFFF;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      border-radius: 4px;
      .title {
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        line-height: 14px;
        margin-top: 40px;
      }
      .user-phone {
        font-size: 18px;
        font-weight: 400;
        text-align: center;
        color: #333333;
        line-height: 70px;
      }
      .valid-code {
        width: 100%;
        height: 60px;
        padding: 0 52px;
        position: relative;
        .hiddenInput {
          position: absolute;
          z-index: -999;
          border: 0;
          outline: 0;
          color: transparent;
        }
        .input-form {
          width: 100%;
          height: 60px;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;
          .code {
            width: 40px;
            height: 60px;
            border-bottom: 1px solid #888888;
            border-left: none;
            border-right: none;
            border-top: none;
            outline: 0;
            padding-left: 10px;
            font-size: 36px;
            font-weight: 600;
            color: #333333;
          }
        }
      }
      .code-message {
        font-size: 12px;
        font-weight: 400;
        color: #888888;
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
      .btn-group {
        width: 100%;
        height: 40px;
        padding: 0 65px;
        margin-top: 10px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        .btn {
          width: 150px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border-radius: 3px;
          cursor: pointer;
        }
        .btn:nth-of-type(1){
          font-size: 14px;
          font-weight: 500;
          text-align: center;
          color: #888888;
          border: 1px solid #888888;
        }
        .btn:nth-of-type(2){
          font-size: 14px;
          font-weight: 500;
          text-align: center;
          color: #ffffff;
          background-color: #0083ff;
        }
      }
    }
  }
}
</style>
