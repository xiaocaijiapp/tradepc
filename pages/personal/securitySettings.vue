<template>
  <div class="order-container">
    <div class="bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">
          首页
        </BreadcrumbItem>
        <BreadcrumbItem to="/personal">
          个人中心
        </BreadcrumbItem>
        <BreadcrumbItem>
          安全设置
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="orderDetailBox">
      <div class="content">
        <div class="title">
          安全设置
        </div>
        <div class="settingBox">
          <Row>
            <Col span="8">
              绑定手机号
            </Col>
            <Col span="8">
              {{ userInfo.phone | handlePhone }}
            </Col>
            <Col span="8">
              <span class="grayColor">(请联系客服修改)</span>
            </Col>
          </Row>
          <br>
          <Row>
            <Col span="8">
              实名认证
            </Col>
            <Col span="8">
              <span v-if="userInfo.idCard">{{ userInfo.idCard | handleIdCard }}</span>
              <span v-if="!userInfo.idCard" class="blueColor" @click="toaddIdCard">去认证</span>
            </Col>
            <Col span="8">
              <span class="grayColor">(无法修改)</span>
            </Col>
          </Row>
          <br>
          <Row>
            <Col span="8">
              登录密码
            </Col>
            <Col span="8">
              ******
            </Col>
            <Col span="8">
              <span class="blueColor" @click="toChangeLogin">修改</span>
            </Col>
          </Row>
          <br>
          <Row>
            <Col span="8">
              支付密码
            </Col>
            <Col span="8">
              <span v-if="userInfo.payPwdFlag === 1">******</span>
              <span v-else />
            </Col>
            <Col span="8">
              <span v-if="userInfo.payPwdFlag === 1" class="blueColor" @click="toChangePayment">修改</span>
              <span v-else :style="navActiveStyle" @click="toChangePayment">去设置</span>
            </Col>
          </Row>
          <br>
          <Row>
            <Col span="8">
              支付宝授权
            </Col>
            <Col span="8">
              <span v-if="userInfo.aliPayAuthFlag === 1">已授权</span>
              <span v-else :style="navActiveStyle" @click="toAuth">去授权</span>
            </Col>
            <Col span="8" />
          </Row>
          <br>
          <Row>
            <Col span="8">
              微信授权
            </Col>
            <Col span="8">
              <span>暂未开通</span>
            </Col>
            <Col span="8" />
          </Row>
          <br>
          <Row>
            <Col span="8">
              银行卡支付协议
            </Col>
            <Col span="8">
              <span v-if="userInfo.huiFuFlag === 1">已开户</span>
              <span v-else :style="navActiveStyle" @click="toAccount">去开户</span>
            </Col>
            <Col span="8" />
          </Row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Password',
  async asyncData ({ $axios }) {
    let userInfo
    await $axios.get('/delegate/my/info').then((res) => {
      if (res.data.code === 200) {
        userInfo = res.data.data
      }
    })
    return {
      userInfo
    }
  },
  data () {
    return {
      navActiveStyle: {
        color: '#0083ff',
        cursor: 'pointer'
      },
      passwordInfo: {
        verificationCode: ''
      },
      phoneRule: {
        verificationCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      },
      countDown: '120s重新获取',
      btnText: '获取验证码'
    }
  },
  methods: {
    toChangePayment () {
      this.$router.push('/personal/changePayment')
    },
    toaddIdCard () {
      this.$router.push('/personal/authentication')
    },
    toChangeLogin () {
      this.$router.push('/personal/changeLogin')
    },
    toAccount () {
      this.$axios.post('/delegate/huiFu/openAccountAcctPc').then((res) => {
        if (res.data.code === 200) {
          const HFPay = res.data.data
          this.postForm(HFPay)
        }
      })
    },
    // 模拟表单提交
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
    toAuth () {
      const href = `${process.env.ali_url}?app_id=${process.env.app_id}&scope=auth_user,auth_base&redirect_uri=${encodeURIComponent(process.env.back_url)}&state=`
      this.a_href(href)
    },
    // 去授权
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
    }
  }
}
</script>

<style lang="less" scoped>
.order-container {
  width: 1200px;
  margin: 0 auto;
  background-color: #f3f4f6;
  .bread {
    margin: 8px 0;
  }
  .orderDetailBox {
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 20px;
    /deep/ .ivu-breadcrumb {
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
      .settingBox {
        width: 626px;
        margin: 0 auto;
        margin-top: 30px;
        /deep/ .ivu-row {
          height: 50px;
          line-height: 50px;
          box-shadow: 0px 2px 5px 2px rgba(17, 16, 255, 0.05);
          .ivu-col {
            text-align: left;
            padding-left: 30px;
            font-size: 14px;
            .grayColor {
              color: #999;
            }
            .blueColor {
              color: #0083ff;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(51, 51, 51, 0.3);
    z-index: 999;
    top: 0;
    left: 0;
    .dialog {
      width: 600px;
      height: 390px;
      padding: 30px;
      position: absolute;
      background-color: #ffffff;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      border-radius: 4px;
      .dialogTitle {
        font-size: 14px;
        color: #333;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
      }
      .agreementContent {
        font-size: 14px;
        line-height: 20px;
        margin-top: 20px;
        color: #333;
      }
      .btn-group {
        width: 100%;
        height: 40px;
        padding: 0 65px;
        margin-top: 50px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        .btn {
          width: 150px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border-radius: 2px;
          cursor: pointer;
        }
        .btn:nth-of-type(1) {
          font-size: 14px;
          font-weight: 500;
          text-align: center;
          color: #999;
          background: #f1f1f1;
        }
        .btn:nth-of-type(2) {
          font-size: 14px;
          font-weight: 500;
          text-align: center;
          color: #ffffff;
          background-color: #0083ff;
        }
      }
    }
  }
  .codeMask {
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(51, 51, 51, 0.3);
    z-index: 999;
    top: 0;
    left: 0;
    .dialog {
      width: 460px;
      height: 230px;
      padding: 10px 80px 60px;
      position: absolute;
      background-color: #ffffff;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      border-radius: 4px;
      .fetchCode {
        float: right;
        width: 90px;
        height: 40px;
        line-height: 40px;
        background: #f1f1f1;
        border-radius: 2px;
        color: #999;
        text-align: center;
      }
      .from-box {
        /deep/ .ivu-form {
          margin-top: 60px;
        }
      }
      .btn-group {
        width: 100%;
        height: 40px;
        padding: 0 65px;
        margin-top: 40px;
        .btn {
          width: 150px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border-radius: 2px;
          cursor: pointer;
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
