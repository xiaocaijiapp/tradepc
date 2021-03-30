<template>
  <div class="container">
    <p class="title">网银教程</p>
    <div class="contentBox">
      <p class="smallTitle">1.使用网银支付功能功能需要先阅读并同意银行卡支付协议，在个人中心-安全设置-银行卡支付协议中进行开户。</p>
      <img src="https://static.qmwm777.com/web/Novice%20guide/1_12.png" alt="" class="smallPic" style="width:1000px;height:488px">
      <p class="smallTitle">2.挑选好商品，在选择支付方式页面选择网银支付,并输入全民外贸支付密码。</p>
      <img src="https://static.qmwm777.com/web/Novice%20guide/1_13.png" alt="" class="bigPic" style="width:1000px;height:450px">
      <p class="smallTitle">3.选择您已开通的网银。</p>
      <img src="https://static.qmwm777.com/web/Novice%20guide/1_14.png" alt="" class="bigPic" style="width:1000px;height:738px">
      <p class="smallTitle">4.根据您选择的银行输入相关信息即可，每个银行所要求的的信息都是不一致的哦，具体信息已页面最终显示为准。</p>
      <img src="https://static.qmwm777.com/web/Novice%20guide/1_15.png" alt="" class="middlePic" style="width:1000px;height:836px">
      <p class="middleTitle">感谢您对全民外贸的支持，如有疑问请致电全民外贸客服热线“400-808-8399”。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Internetbank'
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: auto;
  background-color: #fff;
  margin-top: 30px;
  padding: 30px;
  .title {
    font-size: 24px;
    color: #333;
    text-align: left;
    font-size: 700;
  }
  .contentBox {
    padding: 30px 70px;
    text-align: center;
    .smallTitle {
      font-size: 12px;
      color: #333;
      text-align: left;
      font-weight: 600;
    }
    .xsTitle {
      font-size: 12px;
      color: #333;
      text-align: center;
      font-weight: 600;
    }
    .xxsTitle {
      font-size: 12px;
      color: #999;
      text-align: center;
    }
    .gap {
      margin-bottom: 30px;
    }
    .middleTitle {
      font-size: 14px;
      color: #333;
      text-align: center;
    }
    img {
      margin: 20px 0 30px 0;
      box-shadow: 0px 2px 5px 2px rgba(17, 16, 255, 0.05);
    }
  }
}
</style>
