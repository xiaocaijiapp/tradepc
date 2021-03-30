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
            修改登录密码
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="content">
        <div class="title">
          修改登录密码
        </div>
        <div class="from-box">
          <Form ref="regPhone" :model="passwordInfo" :rules="phoneRule">
            <FormItem prop="password">
              <Input v-model="passwordInfo.password" type="password" placeholder="请输入您的原密码" />
            </FormItem>
            <FormItem prop="newPassword">
              <Input v-model="passwordInfo.newPassword" type="password" placeholder="请输入您的新密码" />
            </FormItem>
            <FormItem prop="repeatPassword">
              <Input v-model="passwordInfo.repeatPassword" type="password" placeholder="请确认您的密码" />
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
      const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/
      if (!reg.test(value)) {
        callback(new Error('6-20位数字、字母组合'))
      } else if (this.passwordInfo.newPassword && this.passwordInfo.repeatPassword) {
        if (this.passwordInfo.newPassword === this.passwordInfo.repeatPassword) {
          callback()
        } else {
          callback(new Error('密码不一致'))
        }
      } else {
        callback()
      }
    }
    const validPassword = (rule, value, callback) => {
      const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/
      if (!reg.test(value)) {
        callback(new Error('6-20位数字、字母组合'))
      } else {
        callback()
      }
    }
    return {
      passwordInfo: {
        repeatPassword: '',
        newPassword: '',
        password: ''
      },
      phoneRule: {
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validPassword, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        repeatPassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    sureChangePwd () {
      this.$refs.regPhone.validate((valid) => {
        if (valid) {
          this.$axios.put('/delegate/my/pwd/byOld', {
            newPassword: this.passwordInfo.newPassword,
            oldPassword: this.passwordInfo.password
          }).then((res) => {
            console.log(res)
            if (res.data.code === 200) {
              this.$Message.success({
                content: '密码修改成功',
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
        padding: 40px 100px;
        margin: 0 auto;
        margin-top: 60px;
        box-shadow: 0px 2px 5px 2px rgba(17,16,255,0.05);
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
