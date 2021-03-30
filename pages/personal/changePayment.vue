<template>
  <div class="order-container">
    <div class="orderDetailBox">
      <div class="bread">
        <Breadcrumb separator=">">
          <BreadcrumbItem to="/">
            首页
          </BreadcrumbItem>
          <BreadcrumbItem to="/personal">
            个人中心
          </BreadcrumbItem>
          <BreadcrumbItem>
            修改支付密码
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="content">
        <div class="title">
          修改支付密码
        </div>
        <div class="from-box">
          <Form ref="regPhone" :model="passwordInfo" :rules="phoneRule">
            <p class="tipsText">
              请输入您的支付密码
            </p>
            <FormItem prop="password">
              <Input v-model="passwordInfo.password" type="password" maxlength="6" placeholder="支付密码只能是6位数字" />
            </FormItem>
            <FormItem prop="verificationCode">
              <Input
                v-model="passwordInfo.verificationCode"
                search
                :enter-button="btnText"
                size="large"
                placeholder="请输入验证码"
                @on-search="getVerificationCode"
              />
            </FormItem>
            <p class="secrecyInfo">
              全民外贸会严格保密您的信息
            </p>
          </Form>
          <div class="from-btn" @click="sureChangePwd">
            立即修改
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Password',
  data () {
    const checkPassword = (rule, value, callback) => {
      const reg = /^\d{6}$/
      if (!reg.test(value)) {
        callback(new Error('请输入6位数字'))
      } else {
        callback()
      }
    }
    return {
      passwordInfo: {
        verificationCode: '',
        password: ''
      },
      phoneRule: {
        verificationCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ]
      },
      btnText: '获取验证码',
      amount: 120,
      timer: null
    }
  },
  created () {
  },
  methods: {
    getVerificationCode () {
      if (this.timer) { return }
      this.$axios.post('/delegate/mobile/send/4').then((res) => {
        if (res.data.code === 200) {
          this.$Message.success({
            content: '验证码发送成功',
            duration: 1
          })
          this.timer = setInterval(() => {
            if (this.amount <= 0) {
              clearInterval(this.timer)
              this.btnText = '获取验证码'
              this.amount = 120
            } else {
              this.amount--
              this.btnText = `${this.amount}S`
            }
          }, 1000)
        }
      })
    },
    sureChangePwd () {
      this.$refs.regPhone.validate((valid) => {
        if (valid) {
          this.$axios.post('/delegate/my/reset/pay/pwd', {
            mobileCode: this.passwordInfo.verificationCode,
            payPwd: this.passwordInfo.password,
            registerFlag: 0
          }).then((res) => {
            if (res.data.code === 200) {
              this.$Message.success({
                content: '支付密码修改成功',
                duration: 1
              })
              this.$router.push('/personal/securitySettings')
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.order-container {
  width: 100%;
  background-color: #f3f4f6;
  .orderDetailBox{
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 20px;
    /deep/ .ivu-breadcrumb{
      background-color: #f3f4f6;
      height: 45px;
      line-height: 45px;
    }
    .content {
      height: 585px;
      padding: 30px;
      background-color: #ffffff;
      .title {
        font-size: 24px;
        font-weight: 500;
        text-align: left;
        color: #333333;
        line-height: 33px;
      }
      /deep/ .ivu-input{
        height: 40px;
      }
      .from-box {
        width: 500px;
        height: 380px;
        padding: 60px 100px;
        margin: 0 auto;
        margin-top: 60px;
        box-shadow: 0px 2px 5px 2px rgba(17,16,255,0.05);
        .tipsText{
          font-size: 14px;
          color: #333;
          margin-bottom: 15px;
        }
        .secrecyInfo{
          font-size: 12px;
          color: #888;
          margin-top: 15px;
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
          border-radius: 2px;
          margin: 0 auto;
          margin-top: 50px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
