<template>
  <div class="forget-container">
    <div class="content">
      <div class="title">
        忘记密码
      </div>
      <div class="from-box">
        <Form ref="regPhone" :model="phoneInfo" :rules="phoneRule">
          <FormItem prop="phone">
            <Input v-model="phoneInfo.phone" placeholder="请输入手机号" />
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
            <Input v-model="phoneInfo.password" password type="password" placeholder="请输入密码" />
          </FormItem>
          <FormItem prop="repeatPassword">
            <Input v-model="phoneInfo.repeatPassword" password type="password" placeholder="请再次输入密码" />
          </FormItem>
        </Form>
      </div>
      <div class="from-btn" @click="sureGetPwd">
        确定
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
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
    return {
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
      btnText: '获取验证码'
    }
  },
  methods: {
    getVerificationCode () {
      // 对手机号数据表单进行校验
      this.$refs.regPhone.validateField('phone', (err) => {
        if (!err) {
          // 发送验证码
          this.$axios.post(`/delegate/mobile/send/white/${this.phoneInfo.phone}/3`).then((res) => {
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
    // 忘记密码
    sureGetPwd () {
      this.$refs.regPhone.validate((valid) => {
        if (valid) {
          this.$axios.post('/delegate/my/forget/password', {
            mobile: this.phoneInfo.phone,
            mobileCode: this.phoneInfo.verificationCode,
            password: this.phoneInfo.password
          }).then((res) => {
            if (res.data.code === 200) {
              this.$Message.success({
                content: '密码重置成功，请重新登录',
                duration: 1
              })
              this.$router.push('/login')
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.forget-container {
  width: 100%;
  min-height: calc(100vh - 422px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f6;
  .content {
    width: 1200px;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    padding: 120px 450px;
    margin: 18px 0;
    background-color: #fff;
    .title {
      font-size: 18px;
      font-weight: 400;
      color: #333333;
      line-height: 25px;
    }
    /deep/ .ivu-input{
      height: 40px;
    }
    .from-box {
      margin-top: 60px;
      width: 100%;
    }
    .from-btn {
      width: 168px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 14px;
      font-weight: 500;
      color: #ffffff;
      background-color: #0083ff;
      border-radius: 20px;
      margin-top: 30px;
      cursor: pointer;
    }
  }
}
</style>
