<template>
  <div class="registered-container">
    <div class="reg-b">
      <div class="nav">
        <div class="item one">
          <img class="icon-img" src="~/assets/images/registered/into-phone-active.png">
          <img class="current-icon" src="~/assets/images/registered/current.png">
          <span class="desc desc-active">填写手机号</span>
        </div>
        <div class="one-line" :style="{ backgroundColor: oneLineColor}" />
        <div class="item two">
          <img v-if="initRegistered === 2 || initRegistered === 3" class="icon-img" src="~/assets/images/registered/id-card-active.png">
          <img v-else class="icon-img" src="~/assets/images/registered/id-card.png">
          <img v-if="initRegistered === 2 || initRegistered === 3" class="current-icon" src="~/assets/images/registered/current.png">
          <img v-else class="current-icon" src="~/assets/images/registered/no-curr.png">
          <span class="desc" :class="initRegistered == 2 || initRegistered == 3 ? 'desc-active' : ''">实名认证</span>
        </div>
        <div class="two-line" :style="{ backgroundColor: twoLineColor}" />
        <div class="item three">
          <img v-if="initRegistered === 3" class="icon-img" src="~/assets/images/registered/password-active.png">
          <img v-else class="icon-img" src="~/assets/images/registered/password.png">
          <img v-if="initRegistered === 3" class="current-icon" src="~/assets/images/registered/current.png">
          <img v-else class="current-icon" src="~/assets/images/registered/no-curr.png">
          <span class="desc" :class="initRegistered == 3 ? 'desc-active' : ''">支付密码</span>
        </div>
      </div>
      <div v-if="initRegistered == 1" class="from-container">
        <div class="title">
          <span class="title-name">填写手机号</span>
        </div>
        <div class="from-box">
          <Form ref="regPhone" :model="phoneInfo" :rules="phoneRule">
            <FormItem prop="phone">
              <Input v-model="phoneInfo.phone" size="large" placeholder="请输入手机号" />
            </FormItem>
            <FormItem prop="verificationCode">
              <Input
                v-model="phoneInfo.verificationCode"
                search
                :enter-button="btnText"
                size="large"
                placeholder="请输入验证码"
                @on-search="getVerificationCode"
              />
            </FormItem>
            <FormItem prop="password">
              <Input v-model="phoneInfo.password" size="large" password type="password" placeholder="请输入密码" />
            </FormItem>
            <FormItem prop="repeatPassword">
              <Input v-model="phoneInfo.repeatPassword" size="large" password type="password" placeholder="请再次输入密码" />
            </FormItem>
          </Form>
        </div>
        <div class="reg-btn" @click="register">
          下一步
        </div>
      </div>
      <div v-else-if="initRegistered == 2" class="from-container">
        <div class="title">
          <span class="title-name">实名认证</span>
          <span class="next" @click="initRegistered = 3">跳过</span>
        </div>
        <div class="from-box">
          <Form ref="realName" :model="realNameInfo" :rules="realNameRule">
            <FormItem prop="name">
              <Input v-model="realNameInfo.name" size="large" placeholder="请输入真实姓名" />
            </FormItem>
            <FormItem prop="idCode">
              <Input v-model="realNameInfo.idCode" size="large" placeholder="请输入身份证号" />
            </FormItem>
          </Form>
        </div>
        <div class="reg-btn" @click="toSetPayPassword">
          下一步
        </div>
      </div>
      <div v-else class="from-container">
        <div class="title">
          <span class="title-name">支付密码</span>
          <span class="next" @click="$router.push('/login')">跳过</span>
        </div>
        <div class="from-box">
          <Form ref="payPassword" :model="payPasswordInfo" :rules="payPasswordRule">
            <FormItem prop="payPassword">
              <Input v-model="payPasswordInfo.payPassword" size="large" password type="password" placeholder="请输入支付密码" />
            </FormItem>
            <FormItem prop="payPassword">
              <Input v-model="payPasswordInfo.repeatPayPassword" size="large" password type="password" placeholder="请再次输入支付密码" />
            </FormItem>
          </Form>
        </div>
        <div class="reg-btn" @click="setPayPwdSure">
          确定
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { setCookie } from '~/assets/tools/cookie'
export default {
  name: 'Registered',
  layout: 'common',
  data () {
    const userPhoneCheck = (rule, value, callback) => {
      const reg = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[8,9]\d{8}$/
      if (!reg.test(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }
    const checkPassword = (rule, value, callback) => {
      const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/
      if (!reg.test(value)) {
        callback(new Error('6-20位数字、字母组合'))
      } else if (this.phoneInfo.password && this.phoneInfo.repeatPassword) {
        if (this.phoneInfo.password === this.phoneInfo.repeatPassword) {
          callback()
        } else {
          callback(new Error('密码不一致'))
        }
      } else {
        callback()
      }
    }
    const checkPayCode = (rule, value, callback) => {
      const reg = /^\d{6}$/
      if (!reg.test(value)) {
        callback(new Error('6位纯数字'))
      } else if (this.payPasswordInfo.payPassword && this.payPasswordInfo.repeatPayPassword) {
        if (this.payPasswordInfo.payPassword === this.payPasswordInfo.repeatPayPassword) {
          callback()
        } else {
          callback(new Error('密码不一致'))
        }
      }
    }
    const idCardCheck = (rule, value, callback) => {
      const reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确身份证号'))
      }
    }
    return {
      initRegistered: 1,
      phoneInfo: {
        phone: '',
        verificationCode: '',
        password: '',
        repeatPassword: ''
      },
      phoneRule: {
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: userPhoneCheck, trigger: 'blur' }
        ],
        verificationCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        repeatPassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ]
      },
      realNameInfo: {
        name: '',
        idCode: ''
      },
      realNameRule: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        idCode: [
          { required: true, message: '身份证不能为空', trigger: 'blur' },
          { validator: idCardCheck, trigger: 'blur' }
        ]
      },
      payPasswordInfo: {
        payPassword: '',
        repeatPayPassword: ''
      },
      payPasswordRule: {
        payPassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: checkPayCode, trigger: 'blur' }
        ],
        repeatPayPassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: checkPayCode, trigger: 'blur' }
        ]
      },
      sendCodeClock: true, // 发送验证码开关
      btnText: '获取验证码',
      Inter: null
    }
  },
  computed: {
    oneLineColor () {
      if (this.initRegistered === 2 || this.initRegistered === 3) {
        return '#0083ff'
      } else {
        return '#dadada'
      }
    },
    twoLineColor () {
      if (this.initRegistered === 3) {
        return '#0083ff'
      } else {
        return '#dadada'
      }
    }
  },
  methods: {
    ...mapMutations(['handleToken', 'handleMobile', 'handName', 'setUserHeadImage']),
    // 注册第一步获取手机验证码
    getVerificationCode () {
      // 对手机号数据表单进行校验
      this.$refs.regPhone.validateField('phone', (err) => {
        if (!err) {
          // 发送验证码
          this.$axios.post(`/delegate/mobile/send/white/${this.phoneInfo.phone}/1`).then((res) => {
            if (res.data.code === 200) {
              this.$Message.success({
                content: '验证码发送成功',
                duration: 1
              })
              let cot = 120
              this.Inter = setInterval(() => {
                if (cot <= 1) {
                  clearInterval(this.Inter)
                  this.btnText = '获取验证码'
                  cot = 120
                } else {
                  this.btnText = `${cot--} S`
                }
              }, 1000)
            }
          })
        }
      })
    },
    setPayPwdSure () {
      this.$refs.payPassword.validate((valid) => {
        if (valid) {
          this.$axios.post('/delegate/my/reset/pay/pwd', {
            payPwd: this.payPasswordInfo.payPassword,
            registerFlag: 1
          }).then((res) => {
            if (res.data.code === 200) {
              this.$router.push('/')
            }
          })
        }
      })
    },
    toSetPayPassword () {
      this.$refs.realName.validate((valid) => {
        if (valid) {
          this.$axios.post('/delegate/my/memberVerified', {
            idCard: this.realNameInfo.idCode,
            name: this.realNameInfo.name
          }).then((res) => {
            if (res.data.code === 200) {
              this.initRegistered = 3
            }
          })
        }
      })
    },
    register () {
      this.$refs.regPhone.validate((vad) => {
        if (vad) {
          this.$axios.post('/delegate/register/mobile', {
            password: this.phoneInfo.password,
            confiremPassword: this.phoneInfo.repeatPassword,
            mobile: this.phoneInfo.phone,
            mobileCode: this.phoneInfo.verificationCode,
            inviteCode: ''
          }).then((res) => {
            if (res.data.code === 200) {
              this.handleToken(res.data.data.token)
              this.handleMobile(res.data.data.mobile)
              this.handName(res.data.data.realName)
              this.setUserHeadImage(res.data.data.headImg)
              setCookie('token', res.data.data.token)
              setCookie('mobile', res.data.data.mobile)
              setCookie('headImg', res.data.data.realName)
              this.initRegistered = 2
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.registered-container {
  width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6;
  margin: 0 auto;
  .reg-b {
    width: 1200px;
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 46px 0;
    margin: 18px 0;
    .nav {
      width: 709px;
      height: 114px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      position: relative;
      .one-line {
        position: absolute;
        left: 70px;
        bottom: 38px;
        width: 250px;
        height: 2px;
        background-color: #0884ff;
      }
      .two-line {
        position: absolute;
        right: 70px;
        bottom: 38px;
        width: 250px;
        height: 2px;
        background-color: #0884ff;
      }
      .desc {
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        color: #999999;
        line-height: 20px;
      }
      .desc-active {
        color: #333333;
      }
      .one {
      }
      .item {
        width: 70px;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
        .icon-img {
          width: 56px;
          height: 56px;
        }
        .current-icon {
          width: 18px;
          height: 18px;
        }
      }
    }
    .from-container {
      width: 300px;
      flex: 1;
      padding: 30px 20px 0px;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      .title {
        width: 100%;
        height: 40px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        .title-name {
          font-size: 18px;
          font-weight: 400;
          color: #333333;
          line-height: 40px;
          text-align: center;
        }
        .next {
          position: absolute;
          right: 20px;
          top:20px;
          // transform: translateY(-50%);
          font-size: 12px;
          font-weight: 400;
          color: #138cff;
          cursor: pointer;
        }
      }
      .from-box {
        width: 100%;
        margin-top: 30px;
      }
      .reg-btn {
        width: 168px;
        height: 40px;
        border-radius: 20px;
        background-color: #0083ff;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        color: #ffffff;
        line-height: 40px;
        cursor: pointer;
      }
    }
  }
}
</style>
