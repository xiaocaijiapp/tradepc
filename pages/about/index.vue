<template>
  <div class="container">
    <!-- 了解我们 -->
    <div class="aboutUS">
      <div class="titleTop">
        <p class="title">
          了解我们
        </p>
        <span class="smallTitle">About us</span>
      </div>
      <div class="explainBox">
        <div class="explainList">
          <div class="explainText">
            <p class="explainTitle">
              全民外贸是什么？
            </p>
            <div class="explainContent">
              全民外贸是三益供应链集团有限公司旗下的外贸交易 代购电商平台。
            </div>
          </div>
        </div>
        <div class="explainList">
          <div class="explainText">
            <p class="explainTitle">
              全民外贸的使命？
            </p>
            <div class="explainContent">
              助力中国制造走出国门，带国人一起做外贸，使国人 通过“代购利润”实现财富增值。
            </div>
          </div>
        </div>
        <div class="explainList">
          <div class="explainText">
            <p class="explainTitle">
              全民外贸的模式？
            </p>
            <div class="explainContent">
              平台采用出口“代购”模式，给外国人代购中国商品赚外国人的钱。
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  background-color: #ffffff;
  .aboutUS {
    text-align: center;
    width: 100%;
    padding: 40px 360px;
    .title {
      font-size: 24px;
      line-height: 33px;
      color: #666;
      margin-bottom: 10px;
    }
    .smallTitle {
      font-size: 14px;
      line-height: 20px;
      color: #dedede;
    }
    .explainBox {
      margin-top: 40px;
      width: 100%;
      height: 648px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      .explainList:first-child {
        display: inline-block;
        background-image: url("https://static.qmwm777.com/web/know%20about%20us/about-dai.png");
        background-size: 100% 100%;
        .explainText {
          bottom: 40px;
          left: 0px;
        }
      }
      .explainList:nth-child(2) {
        display: inline-block;
        background-image: url("https://static.qmwm777.com/web/know%20about%20us/about-zuan.png");
        background-size: 100% 100%;
        .explainText {
          top: 40px;
          left: 0px;
        }
      }
      .explainList:last-child {
        display: inline-block;
        background-image: url("https://static.qmwm777.com/web/know%20about%20us/about-chu.png ");
        background-size: 100% 100%;
        .explainText {
          bottom: 40px;
          left: 0px;
        }
      }
      .explainList {
        position: relative;
        margin: 5px;
        flex: 1;
        height: 100%;
        padding: 30px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        background-color: #ffffff;
        .explainText {
          position: absolute;
          padding: 30px;
          .explainTitle {
            font-size: 18px;
            line-height: 25px;
            color: #fff;
            text-align: left;
          }
          .explainContent {
            font-size: 14px;
            line-height: 24px;
            color: #fff;
            margin-top: 15px;
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
