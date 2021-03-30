<template>
  <div class="company-container">
    <!-- 走进三益供应链集团 -->
    <div class="aboutCompany">
      <div class="titleTop bigTips">
        <p class="title">
          公司介绍
        </p>
        <p class="smallTitle">Company Introduction</p>
      </div>
      <img src="https://static.qmwm777.com/web/company%20introduction/about-bgc.png" alt="" class="bg-image">
      <div class="companyContain">
        <div class="companyBox">
          <div class="titleTop">
            <p class="title">
              走进<span class="colorBlue">三益供应链集团</span>
            </p>
            <span class="smallTitle">Go into Tribune Supply Chain Group</span>
          </div>
          <div class="companyText">
            <div class="companyTextList">
              三益供应链集团有限公司是日本三益贸易株式会社(成立于2015年）子公司，以国际B2C跨境电商平台模式运营让中国商品走进国外每个家庭，为合作伙伴提供中国报关、海运、目的国清关、海外仓储、目的国物流配送等一站式服务，降低用户的运营成本，提高国际贸易竞争力。公司践行“我为人人、人人为我”的文化理念，深入发掘市场需求，打造全方位的外贸服务，最终实现多方合作共赢。
            </div>
            <div class="companyTextList">
              目前，日本三益贸易株式会社，旗下跨境电商平台“STARDAY”，拥有数百万日本用户；在日本有4000平方自有产权仓库；东京二十三区由公司专车配送，当日下单次日送达；日本第一家无人商超于2018年成立，预计2019年底前覆盖东京。公司致力于让中国零售商通过一个渠道可以接触到日本国家百万名顾客。三益供应链集团有限公司位于河南郑州，团队凝聚了一批充满活力、积极进取的业内精英人士，具备丰富行业实操经验，为用户打造稳健、便捷、高效的外贸交易平台。
            </div>
          </div>
          <div class="businessShow">
            <div class="businessPic">
              <img src="https://static.qmwm777.com/web/company%20introduction/about-1.png" alt="">
              <img src="https://static.qmwm777.com/web/company%20introduction/about-2.png" alt="">
              <img src="https://static.qmwm777.com/web/company%20introduction/about-3.png" alt="">
              <img src="https://static.qmwm777.com/web/company%20introduction/about-4.png" alt="">
              <img src="https://static.qmwm777.com/web/company%20introduction/about-5.png" alt="">
              <img src="https://static.qmwm777.com/web/company%20introduction/about-6.png" alt="">
            </div>
            <div class="licensePic">
              <img src="https://static.qmwm777.com/web/company%20introduction/about-license.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Company'
}
</script>

<style lang="less" scoped>
.company-container {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  .aboutCompany {
    width: 100%;
    position: relative;
    height: 1145px;
    .bigTips {
      padding: 40px 0;
    }
    .title {
      font-size: 24px;
      line-height: 33px;
      color: #666;
      text-align: center;
      margin-bottom: 10px;
    }
    .smallTitle {
      font-size: 14px;
      line-height: 20px;
      color: #dedede;
      text-align: center;
    }
    .bg-image {
      width: 100%;
    }
    .companyContain {
      position: absolute;
      top: 465px;
      // margin: 0px 360px 0px 360px;
      background-color: #fff;
      width: 1200px;
      left: 50%;
      transform: translate(-50%, 0);
      .companyBox {
        padding: 40px 60px 20px 60px;
        .titleTop {
          text-align: center;
          .title {
            font-size: 24px;
            line-height: 33px;
            color: #666;
            margin-bottom: 10px;
            .colorBlue {
              color: #178eff;
            }
          }
          .smallTitle {
            font-size: 14px;
            line-height: 20px;
            color: #dedede;
          }
        }
        .companyText {
          margin-top: 40px;
          .companyTextList {
            font-size: 14px;
            color: #333;
            line-height: 24px;
            text-indent: 2em;
          }
          .companyTextList:last-child {
            margin-top: 20px;
          }
        }
        .businessShow {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          margin-top: 20px;
          .businessPic img {
            width: 188px;
            height: 141px;
            margin: 10px;
          }
          .licensePic {
            width: 424px;
            height: 300px;
          }
        }
      }
    }
  }
}
</style>
