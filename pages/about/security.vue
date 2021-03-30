<template>
  <div class="container">
    <!-- 三重保障 -->
    <div class="safeguard">
      <div class="titleTop">
        <p class="title">
          安全保障
        </p>
        <span class="smallTitle">Triple guarantee</span>
      </div>
      <div class="safeguardBox">
        <div class="safeguardList">
          <div class="safeguardText">
            <img src="~/assets/images/about/about-jiaoyi.png" alt="">
            <p class="explainTitle">
              交易安全
            </p>
            <div class="explainContent">
              平台依据“STARDAY”境外商城产生的实际销售订单上架商品，用户只需参与商品代购，无需承担商品运输、销售、售后的风险，坐等商品销售周期结束即可赚取利润收益并拿回代购成本。
            </div>
          </div>
        </div>
        <div class="safeguardList">
          <div class="safeguardText">
            <img src="~/assets/images/about/about-anquan.png" alt="">
            <p class="explainTitle">
              支付安全
            </p>
            <div class="explainContent">
              平台与国内安全支付领先的“汇付天下”签订合作，保障平台用户资金安全，共创外贸新风口。
            </div>
          </div>
        </div>
        <div class="safeguardList">
          <div class="safeguardText">
            <img src="~/assets/images/about/about-support.png" alt="">
            <p class="explainTitle">
              政策支持
            </p>
            <div class="explainContent">
              华人在日创立的三益贸易株式会社受“两策一法”支持将子公司三益供应链集团有限公司落地中国·中原郑州，在“一带一路”和“大众创业，万众创新”政策的支持下，严格依照《电子商务法》合规经营，旨在通过外贸发展国民经济。
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Security'
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  background-color: #ffffff;
  .safeguard {
    text-align: center;
    width: 1200px;
    margin: 0 auto;
    padding: 40px 0;
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
    .safeguardBox {
      margin-top: 40px;
      width: 100%;
      height: 274px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      .safeguardList:first-child {
        display: inline-block;
        background-color: #f8b625;
      }
      .safeguardList:nth-child(2) {
        display: inline-block;
        background-color: #33aef5;
      }
      .safeguardList:last-child {
        display: inline-block;
        background-color: #29d79b;
      }
      .safeguardList {
        margin: 5px;
        flex: 1;
        height: 100%;
        padding: 35px 40px 10px 40px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        .safeguardText {
          text-align: left;
          img {
            width: 50px;
            height: 50px;
          }
          .explainTitle {
            font-size: 24px;
            line-height: 33px;
            color: #fff;
            margin: 10px 0;
          }
          .explainContent {
            font-size: 12px;
            line-height: 24px;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
