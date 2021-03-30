<template>
  <div class="container">
    <div class="opinionBox">
      <p class="title">
        意见建议
      </p>
      <Form ref="formTextarea" :model="formText" :rules="formTextRules">
        <FormItem prop="text">
          <Input v-model="formText.text" maxlength="200" type="textarea" placeholder="请尽量详细描述您遇到的问题或建议，有助于我们快速给到您反馈。（评价内容不能超过200字）" />
        </FormItem>
      </Form>
      <p class="title concat">
        联系方式
      </p>
      <Form ref="formPhone" :model="formPhone" :rules="formPhoneRules">
        <FormItem prop="phone">
          <Input v-model="formPhone.phone" type="text" placeholder="请填写您的手机号，以助于我们快速与您取得联系" />
        </FormItem>
      </Form>
      <p class="tips">
        你也可以拨打<span class="phone">400-808-8399</span>客服热线（服务时间：工作日9:00-17:00）
      </p>
      <div class="btnBox">
        <Button class="submitOpinion" @click="submitOpinion">
          提交
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  middleware: 'auth',
  data () {
    return {
      formText: {
        text: ''
      },
      formPhone: {
        phone: ''
      },
      formTextRules: {
        text: [
          { required: true, message: '您描述的信息不能为空', trigger: 'blur' }
        ]
      },
      formPhoneRules: {
        phone: [
          { required: true, message: '联系方式不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitOpinion () {
      let textRule = false; let phoneRule = false
      this.$refs.formTextarea.validate((valid) => {
        if (valid) {
          textRule = true
        }
      })
      this.$refs.formPhone.validate((valid) => {
        if (valid) {
          phoneRule = true
        }
      })
      if (textRule && phoneRule) {
        this.$axios.post('/delegate/feedback/save', {
          content: this.formText.text,
          phone: this.formPhone.phone
        }).then((res) => {
          if (res.data.code === 200) {
            this.$Message.success({
              content: '反馈成功',
              duration: 1
            })
            this.formText.text = ''
            this.formPhone.phone = ''
            this.$refs.formTextarea.resetFields()
            this.$refs.formPhone.resetFields()
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 1200px;
  margin: 0 auto 30px;
  background-color: #fff;
  .opinionBox {
    padding: 30px;
    .title {
      font-size: 24px;
      color: #333;
      font-weight: 700;
      text-align: left;
    }
    textarea {
      width: 100%;
      height: 150px;
      resize: none;
      padding: 10px;
      font-size: 14px;
      color: #333;
      line-height: 12px;
      border: 1px solid #eaeaea;
      margin-top: 20px;
    }
    /deep/ textarea.ivu-input {
      height: 150px;
      width: 100%;
      resize: none;
    }
    .concat {
      margin: 30px 0 20px 0;
    }
    input {
      width: 100%;
      height: 52px;
      line-height: 52px;
      border: 1px solid #eaeaea;
      font-size: 14px;
      color: #333;
      line-height: 12px;
      padding: 0 10px;
    }
    .tips {
      font-size: 12px;
      margin-top: 20px;
      color: #333;
      .phone {
        color: #0083ff;
      }
    }
    .btnBox {
      width: 100%;
      text-align: center;
      .submitOpinion {
        width: 200px;
        height: 50px;
        background: #0083ff;
        border-radius: 2px;
        color: #fff;
        outline: none;
        border: none;
        font-size: 14px;
        margin-top: 30px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>
