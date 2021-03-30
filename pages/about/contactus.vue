<template>
  <div class="container">
    <div class="titleTop">
      <p class="title">联系我们</p>
      <p class="smallTitle">Contact Us</p>
    </div>
    <div class="addressBox">
      <img src="https://static.qmwm777.com/web/contact%20us/mapImg.png" alt="" class="mapImg">
      <div class="addressInfo">
        <p class="phone">
          <img src="~/assets/images/about/phone.png" alt="">
          <span class="infoTips">客服热线：400-8088399</span>
        </p>
        <p class="address">
          <img src="~/assets/images/about/local.png" alt="">
          <span class="infoTips">客服热线：400-8088399</span>
        </p>
        <p class="weChat">
          <img src="~/assets/images/about/wechat.png" alt="">
          <span class="infoTips">客服热线：400-8088399</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contactus'
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  background-color: #ffffff;
  padding-bottom: 30px;
  .titleTop {
    padding: 40px 0;
    .title {
      font-size: 24px;
      line-height: 33px;
      color: #666;
      margin-bottom: 10px;
      text-align: center;
    }
    .smallTitle {
      font-size: 14px;
      line-height: 20px;
      color: #dedede;
      text-align: center;
    }
  }
  .addressBox {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .mapImg {
      width: 880px;
      height: 400px;
    }
    .addressInfo {
      padding: 100px 40px;
      width: 320px;
      box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.08);
      p {
        margin-top: 64px;
        img {
          width: 24px;
          height: 24px;
          display: inline-block;
          box-sizing: border-box;
          vertical-align: middle;
        }
        .infoTips {
          font-size: 14px;
          color: #333;
          display: inline-block;
          box-sizing: border-box;
          vertical-align: middle;
          margin-left: 10px;
        }
      }
      p:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
