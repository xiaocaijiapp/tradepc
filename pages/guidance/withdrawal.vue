<template>
  <div class="container">
    <p class="title">提现流程</p>
    <div class="contentBox">
      <p class="smallTitle">1.使用提现到卡功能需要先阅读并同意银行卡支付协议，在个人中心-安全设置-银行卡支付协议中进行开户。</p>
      <img src="https://static.qmwm777.com/web/Novice%20guide/1_8.png" alt="" class="smallPic" style="width:1000px;height:488px">
      <p class="smallTitle">2.依次点击在个人中心-银行卡管理，点击“添加提现卡”按钮，如图所示。</p>
      <img src="https://static.qmwm777.com/web/Novice%20guide/1_9.png" alt="" class="bigPic" style="width:1000px;height:488px">
      <p class="smallTitle">3.绑定过提现卡之后，在账户管理-提现页面选择银行卡提现。</p>
      <img src="https://static.qmwm777.com/web/Novice%20guide/image_3.png" alt="" class="bigPic" style="width:1000px;height:488px">
      <p class="smallTitle">4.提现到卡需要两步，第一步需要先将全民外贸账户余额转入至汇付天下。</p>
      <img src="https://static.qmwm777.com/web/Novice%20guide/1_11.png" alt="" class="middlePic" style="width:1000px;height:488px">
      <p class="smallTitle">5.第二步，将汇付天下账户中的余额提现至银行卡即可，您可以自行选择当日到账或次日到账。</p>
      <img src="https://static.qmwm777.com/web/Novice%20guide/1_10.png" alt="" class="bigPic" style="width:1000px;height:536px">
      <p class="middleTitle">感谢您对全民外贸的支持，如有疑问请致电全民外贸客服热线“400-808-8399”。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Withdrawal'
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
