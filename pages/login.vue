<template>
  <div class="login">
    <div class="login-container">
      <div class="login-form">
        <div class="title">
          登录
        </div>
        <div class="form-b">
          <Form ref="userLoginFrom" :model="userLoginInfo" :rules="loginRule">
            <FormItem prop="userPhone">
              <img src="~/assets/images/login/phone.png" alt="">
              <Input v-model="userLoginInfo.userPhone" size="large" placeholder="请输入手机号" />
            </FormItem>
            <FormItem prop="password">
              <img src="~/assets/images/login/password.png" alt="">
              <Input
              v-model="userLoginInfo.password"
              clearable
              password
              type="password"
              size="large"
              placeholder="请输入密码" />
            </FormItem>
          </Form>
        </div>
        <div class="forgot-password">
          <span class="register" @click="$router.push('/registered')">没有账号？立即注册</span>
          <span class="forgot" @click="$router.push('/forgetpwd')">忘记密码？</span>
        </div>
        <div class="login-btn" @click="login">
          登录
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  layout: 'common',
  asyncData ({ query }) {
    return {
      ref: query.ref || '/'
    }
  },
  data () {
    const userPhoneCheck = (rule, value, callback) => {
      const reg = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[8,9]\d{8}$/
      if (!reg.test(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }
    return {
      userLoginInfo: {
        userPhone: '',
        password: ''
      },
      loginRule: {
        userPhone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: userPhoneCheck, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['userPasswordLogin', 'getUserInfo', 'getMailCount']),
    login () {
      // 点击登录按钮前 校验所有表单
      this.$refs.userLoginFrom.validate((valid) => {
        if (valid) {
          this.userPasswordLogin({
            account: this.userLoginInfo.userPhone,
            password: this.userLoginInfo.password
          }).then(async () => {
            this.$Message.success({
              content: '登录成功',
              duration: 1
            })
            await this.getUserInfo()
            await this.getMailCount()
            this.$router.push(this.ref)
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  min-height: calc(100vh - 422px);
  background: url("https://static.qmwm777.com/web/login/lALPDhYBPc4zeajNAzDNB4E_1921_816.png")
    100% 100% no-repeat;
  .login-container {
    width: 1200px;
    min-height: calc(100vh - 422px);
    padding: 60px 0;
    display: flex;
    justify-content: flex-end;
    margin: 0 auto;
    .login-form {
      width: 380px;
      height: 427px;
      background-color: rgba(255, 255, 255, 0.95);
      padding: 60px 50px;
      border-radius: 14px;
      .title {
        font-size: 24px;
        font-weight: 500;
        text-align: left;
        color: #333333;
        line-height: 33px;
      }
      .form-b {
        width: 100%;
        height: 115px;
        margin-top: 35px;
        /deep/ .ivu-input {
          position: relative;
          padding-left: 40px;
        }
        img {
          position: absolute;
          top: 10px;
          left: 10px;
          // transform: translate(-50%.0);
          z-index: 999;
        }
      }
      .forgot-password {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin-top: 12px;
        .register {
          font-size: 12px;
          font-weight: 400;
          text-align: left;
          color: #333333;
          line-height: 17px;
          cursor: pointer;
        }
        .forgot {
          font-size: 12px;
          font-weight: 400;
          text-align: left;
          color: #999999;
          line-height: 17px;
          cursor: pointer;
        }
      }
      .login-btn {
        width: 100%;
        height: 40px;
        border-radius: 4px;
        background-color: #0083ff;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;
        margin-top: 60px;
        cursor: pointer;
      }
    }
  }
}
</style>
