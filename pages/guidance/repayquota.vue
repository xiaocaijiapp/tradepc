<template>
  <div class="container">
    <p class="title">支付限额</p>
    <div class="contentBox">
      <p class="smallTitle">1.银行卡支付限额</p>
      <img src="https://static.qmwm777.com/web/Novice%20guide/1_16.png" alt="" class="smallPic" style="width:1000px;height:2725px">
      <p class="middleTitle">感谢您对全民外贸的支持，如有疑问请致电全民外贸客服热线“400-808-8399”。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Repayquata'
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
