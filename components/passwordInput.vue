<template>
  <div class="password-input-container">
    <input
      id="input"
      ref="myInput"
      v-model="inputPass"
      type="password"
      maxlength="6"
      autofocus
      class="inputPass"
    >
    <form class="input-form" @click="handleInput">
      <input v-model="password.one" type="password" maxlength="1" readonly="readonly" class="pwd">
      <input v-model="password.two" type="password" maxlength="1" readonly="readonly" class="pwd">
      <input v-model="password.three" type="password" maxlength="1" readonly="readonly" class="pwd">
      <input v-model="password.four" type="password" maxlength="1" readonly="readonly" class="pwd">
      <input v-model="password.five" type="password" maxlength="1" readonly="readonly" class="pwd">
      <input v-model="password.six" type="password" maxlength="1" readonly="readonly" class="pwd">
    </form>
    <div v-if="psdWrong" class="tip">
      请输入6位数字支付密码
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasswordInput',
  data () {
    return {
      inputPass: '',
      psdWrong: false,
      password: {
        one: '',
        two: '',
        three: '',
        four: '',
        five: '',
        six: ''
      }
    }
  },
  watch: {
    inputPass () {
      this.show()
      const patt = /^[0-9]*$/g
      this.psdWrong = !patt.test(this.inputPass)// 表单校验，输入错误时给出提示
    }
  },
  methods: {
    handleInput () {
      this.$refs.myInput.focus()
    },
    errorInfo (bool = false) {
      this.psdWrong = bool
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
      this.$emit('passwordCode', this.inputPass)
    },
    clear () {
      this.inputPass = ''
    }
  }
}
</script>

<style lang="less" scoped>
.password-input-container {
  width: 100%;
  height: 60px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  margin-top: 15px;
  .inputPass {
    position: absolute;
    z-index: -10;
    left: 0;
    top: 0;
    width: 100%;
    height: 35px;
    background: transparent;
    padding-left: 10px;
    font-size: 18px;
    letter-spacing: 38px;
    color: transparent;
    border: none;
    outline: 0;
  }
  .input-form{
    width: 100%;
    height: 35px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    .pwd {
      width: 17px;
      height: 17px;
      border-radius: 5px;
      -webkit-appearance:none;
      -moz-appearance: none;
      border:1px solid #979797;
      color:#6a6f77;
      outline: 0;
      text-align: center;
      font-size: 28px;
      padding: 8px;
      box-sizing: content-box;
      cursor: pointer;
    }
  }
  .tip {
    width: 100%;
    height: 30px;
    text-align: left;
    font-size: 14px;
    color: #ed4014;
  }
}
</style>
