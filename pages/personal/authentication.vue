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
            实名认证
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="content">
        <div class="title">
          实名认证
        </div>
        <div class="from-box">
          <Form ref="realName" :model="nameInfo" :rules="nameRule">
            <FormItem prop="name">
              <img src="~/assets/images/registered/edit-name.png" alt="">
              <Input v-model="nameInfo.name" placeholder="请输入真实姓名" />
            </FormItem>
            <FormItem prop="IDCard">
              <img src="~/assets/images/registered/id-card-h.png" alt="">
              <Input v-model="nameInfo.IDCard" placeholder="请输入身份证号" />
            </FormItem>
          </Form>
          <div class="from-btn" @click="sureChangePwd">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Password',
  asyncData ({ query }) {
    return {
      ref: query.ref || '/'
    }
  },
  data () {
    const checkIDCard = (rule, value, callback) => {
      const reg = /^(\d{18,18}|\d{15,15}|\d{17,17}X)$/
      if (!reg.test(value)) {
        callback(new Error('18位数字或数字、字母X'))
      } else {
        callback()
      }
    }
    return {
      nameInfo: {
        name: '',
        IDCard: ''
      },
      nameRule: {
        name: [
          { required: true, message: '真实姓名不能为空', trigger: 'blur' }
        ],
        IDCard: [
          { required: true, message: '身份证不能为空', trigger: 'blur' },
          { validator: checkIDCard, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    sureChangePwd () {
      this.$refs.realName.validate((valid) => {
        if (valid) {
          this.$axios.post('/delegate/my/memberVerified', {
            name: this.nameInfo.name,
            idCard: this.nameInfo.IDCard
          }).then((res) => {
            if (res.data.code === 200) {
              this.$Message.success({
                content: '实名认证成功',
                duration: 1
              })
              setTimeout(() => {
                if (this.ref) {
                  this.$router.push(this.ref)
                } else {
                  this.$router.push('/personal')
                }
              }, 1000)
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
      /deep/ .ivu-input {
        height: 40px;
      }
      .from-box {
        width: 500px;
        height: 326px;
        padding: 60px 100px;
        box-shadow: 0px 2px 5px 2px rgba(17, 16, 255, 0.05);
        margin: 0 auto;
        margin-top: 60px;
        /deep/ .ivu-input {
          position: relative;
          padding-left: 40px;
        }
        img {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 999;
        }
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
</style>
