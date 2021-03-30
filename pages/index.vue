<template>
  <div class="container">
    <!--banner区域-->
    <div class="banner">
      <Carousel autoplay loop :autoplay-speed="3000" @on-click="toNextPage">
        <CarouselItem v-for="(item, index) in carouselList" :key="index">
          <div class="demo-carousel">
            <img :src="baseImageUrl + item.img" class="carouse-image">
          </div>
        </CarouselItem>
      </Carousel>
    </div>
    <!--新闻中心-->
    <div class="news">
      <div class="top">
        <div class="title-l">
          <h3 class="title-name">
            新闻中心
          </h3>
          <span class="small-title">News center</span>
        </div>
        <div class="title-r" @click="$router.push('/newsinformation')">
          更多
        </div>
      </div>
      <div class="bottom">
        <div class="news-a" @click="nextPage(newsList[0].id)">
          <div class="news-date" />
          <div class="news-content">
            <div class="news-title">
              <span class="title-text">{{newsList[0].title}}</span>
              <span class="title-date">{{newsList[0].updateTime.slice(0,10)}}</span>
            </div>
            <!-- <div class="news-desc" v-html="newsList[0].content">{{newsList[0].content}}</div> -->
            <div class="news-image">
              <img :src="baseImageUrl + newsList[0].img" class="news-img">
            </div>
          </div>
        </div>
        <div class="news-b">
          <div class="advert-layer" v-for="item in newsListMore" :key="item.id" @click="nextPage(item.id)">
            <div class="title">
              <span class="text l-text">{{item.title}}</span>
              <span class="text r-text">{{item.updateTime.slice(5,10)}}</span>
            </div>
            <!-- <div class="desc" v-html="item.content">{{item.content}}</div> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 走进三益供应链集团 -->
    <div class="aboutCompany">
      <img src="https://static.qmwm777.com/web/company%20introduction/lALPDhmOvH9ibh7NAcLNB4A_1920_450.png" alt="" class="bg-image">
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
    <!--项目介绍-->
    <div class="company-container">
      <div class="projectIntr">
        <div class="titleTop bigTips">
          <p class="title">
            项目介绍
          </p>
          <p class="smallTitle">
            Project Introduction
          </p>
        </div>
        <div class="cardBox">
          <div class="cardList">
            <p class="imgSplain">
              <img src="~/assets/images/index/blockchain.png" alt="">
              <span>新机会 新风口</span>
            </p>
            <div class="whiteLine"></div>
            <img src="https://static.qmwm777.com/web/project%20introduction/cubes.png" alt="">
            <div class="cardContent">
              <p class="textContent">
                习近平主席在“一带一路”政策明确指出：出口外贸跨境电商能促进中国经济新常态发展。国家相关出口外贸政策支持国人以“代购”“代销”形式参与外贸发展外贸。三益供应链集团有限公司紧跟国家“一带一路”和“大众创业、万众创新”战略政策步伐，成立“全民外贸”平台。
              </p>
              <p class="textContent">
                “全民外贸”是国人参与中国商品“一站式卖全球”的外贸交易平台，是中国跨境电商国际经济发展战略时代与中国外贸出口政策“一带一路”双重推动下形成的“全民类出口电商”新风口、新机会。“全民外贸”带领国人完成“一带一路”政策“通过出口外贸提升中国经济的新常态发展”的中心战略思想。
              </p>
            </div>
          </div>
          <div class="cardList">
            <p class="imgSplain">
              <img src="~/assets/images/index/future.png" alt="">
              <span>项目成立背景</span>
            </p>
            <div class="whiteLine"></div>
            <img src="https://static.qmwm777.com/web/project%20introduction/skyscraper.png" alt="">
            <div class="cardContent">
              <p class="textContent">
                一是公司在日本有华人创建的三益贸易株式会社拥有4000平方自有产权仓库，有日本规模较大的“STARDAY”跨境电商平台，自建物流配送体系，与日本政府合作实体商超及快递柜系统；二是有多年的外贸运营经验、以及与全球数十个国家的国际战略合作计划；三是国家“一带一路”政策明确规定：出口外贸跨境电商能促进中国经济发展新常态。国家外贸政策支持国人以“代购”形式参与外贸、发展外贸。
              </p>
              <p class="textContent">
                基于上述几点，公司审时度势、抢抓机遇、大胆创新成立平台，旨在为国人提供专业化、便捷化的外贸交易平台，让中国制造走出国门，使国人可以足不出户做外贸，获得丰厚的代购利润收益，实现财富增值。
              </p>
            </div>
          </div>
          <div class="cardList">
            <p class="imgSplain">
              <img src="~/assets/images/index/relational.png" alt="">
              <span>全民外贸“三益”使命</span>
            </p>
            <div class="whiteLine"></div>
            <img src="https://static.qmwm777.com/web/project%20introduction/satellit.png" alt="">
            <div class="cardContent">
              <p class="textContent">
                一是“全民外贸”益为强国，通过用户参与中国商品出口代购，提升中国优质商品在海外市场的发展空间，使中国制造品牌口碑覆盖全球，为国家增加贸易税收。
              </p>
              <p class="textContent">
                二是“全民外贸”益为润商，通过用户参与中国商品出口代购，提高中国出口。
              </p>
              <p class="textContent">
                三是“全民外贸”益为富民，通过用户参与中国商品出口代购，带国人一起做外贸、一起去赚外国人的钱，使国人通过“代购利润”实现财富增值。
              </p>
            </div>
          </div>
        </div>
        <div class="getToUs">
          <div class="titleTop">
            <p class="title">
              了解“全民外贸”
            </p>
            <p class="smallTitle">
              Get To Know Us
            </p>
          </div>
          <div class="intrduceTips">
            <p class="tips">
              我司三益供应链集团有限公司旗下的“全民外贸”平台拥有优质专业的外贸团队
            </p>
            <p class="tips">
              每个成员都拥有五年以上独立运营出口贸易的经验，对“全民外贸”每个环节都制定了严格的标准
            </p>
          </div>
          <div class="tabBox">
            <div class="imgBox">
              <div class="imgList">
                <img src="~/assets/images/about/_workbench.png" alt="">
              </div>
              <div class="imgList">
                <img src="~/assets/images/about/_mall-bag.png" alt="">
              </div>
              <div class="imgList">
                <img src="~/assets/images/about/_world.png" alt="">
              </div>
              <div class="imgList">
                <img src="~/assets/images/about/_timer.png" alt="">
              </div>
              <div class="imgList">
                <img src="~/assets/images/about/_financing-two.png" alt="">
              </div>
              <div class="imgList">
                <img src="~/assets/images/about/_expenses-one.png" alt="">
              </div>
            </div>
            <Tabs value="name1">
              <TabPane label="平台服务模式" name="name1">
                <p class="tabContent">
                  平台采用出口“代购”模式，让国人参与外贸，给外国人代购中国商品赚外国人的钱。平台依据“STARDAY”境外商城产生的实际销售订单上架商品，用户只需参与商品代购，无需承担商品在境外的销售风险，订单商品的中国报关、国际海运、目的国清关、海外仓储、营销配送及售后服务等流程均由“STARDAY”跨境商城负责，期间所产生的关税、运输、仓储及商品损失等费用均由公司承担，用户只需坐等商品销售周期结束即可赚取利润收益并拿回代购成本
                </p>
                <p class="tabContent">
                  平台始终秉承“惠及全民”的理念，让国人皆能在参与代购的过程中享受到“一带一路”政策带来的红利。
                </p>
              </TabPane>
              <TabPane label="平台代购商品的上架" name="name2">
                <p class="tabContent">
                  根据公司旗下“STARDAY”境外商城产生的实际销售订单数据，平台进行一对一数据核实，确认无误后在平台发布对应数量的出口商品，用户即可参与“代购”。
                </p>
              </TabPane>
              <TabPane label="平台商品出口国家" name="name3">
                <p class="tabContent">
                  目前平台商品出口国家为日本，主要原因如下：日本毗邻我国，海运交通便利，且日本是发达国家，人均消费水平高，但是国土面积小、原材料匮乏、人工成本高、对中国商品需求量大。
                </p>
                <p class="tabContent">
                  公司跨境业务开展以日本为第一站，其他国家业务会相继开通，届时平台会发布公告请用户留意关注。
                </p>
              </TabPane>
              <TabPane label="代购商品销售周期的设定" name="name4">
                <p class="tabContent">
                  基于外贸行业的特殊性，出口商品需要经过中国报关、国际海运、目的国清关、海外仓储、营销配送及售后服务等流程,平台根据出口目的国日本的情况，估算出30天为商品销售周期。
                </p>
              </TabPane>
              <TabPane label="代购商品利润的设定" name="name5">
                <p class="tabContent">
                  公司通过对人民币国际汇率换算的分析，以及对境内外物流、报关清关、海外仓储、营销配送及售后服务等流程所需成本的计算。
                </p>
                <p class="tabContent">
                  设定：30天周期商品单价的1.2%作为代购利润例：参与代购商品每1万元，30天周期可获得120元的利润。）
                </p>
              </TabPane>
              <TabPane label="平台代购支付与回款" name="name6">
                <p class="tabContent">
                  平台与国内安全支付领先的“汇付天下”签订合作，用户实名注册完成后绑定个人平台账户，即可通过“汇付天下”进行购买。
                </p>
                <p class="tabContent">
                  销售周期内公司完成人民币国际汇率换算后，将用户的代购成本和代购利润回款至平台用户的个人“账户余额”，即完成整个代购流程，用户操作提现后需先将“账户余额”转入至“汇付天下账户”，再从“汇付天下账户”提现至“银行卡”即到所绑定的个人银行账户中。
                </p>
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div class="accordingBox">
          <img src="https://static.qmwm777.com/web/banner/lALPDgQ9xKLnI_zNAcLNB4A_1920_450.png" alt="" class="bg-image">
          <div class="ProjectContain">
            <div class="ProjectBox">
              <div class="titleTop">
                <p class="title colorBlue">
                  平台安全及经营依据
                </p>
                <span class="smallTitle">Platform Safety And Operation Basis</span>
              </div>
              <div class="ProjectText">
                <div class="ProjectTextList">
                  <p class="textTips">
                    1.平台安全
                  </p>
                  <div class="textContent">
                    平台作为中国至出口目的国（目前有日本）贸易业务的中间桥梁，基于公司旗下专业化、规范化的海外跨境电子商城，所有出口商品均为批量报关、清关、配船运输，除海检外不得私自拆封；待到达目的国后由本公司旗下STARDAY跨境电商平台配送至日本终端消费用户手中。 平台依照2019年新出台的《中华人民共和国电子商务法》对出口代购的商品进行海关申报、纳税，把实物商品配送至境外目的国终端消费用户手中，将实物商品交易后产生的售额利差作为参与“代购”的利润回报给平台用户，平台所有出口商品代购均为实物商品交易，公司始终秉承“惠及全民”的理念，旨在与国人携手共创中国梦，实现国、商、民三赢，模式安全无风险。公司平台为您实现财富增值提供了一次千载难逢的机会。
                  </div>
                </div>
                <div class="ProjectTextList">
                  <p class="textTips">
                    2.平台合规经营依据
                  </p>
                  <div class="textContent">
                    公司旗下的“全民外贸”平台一贯遵从国家相关政策法规，以合法、合规、合理为标准成立运营，严禁任何欺诈行为发生。 公司有工商管理部门颁发的营业执照经营许可证，并由工业和信息化部门批准的域名（www.qmwm777.com）信息备案号，即ICP备案号（豫ICP备17049564号-2）。公司严格按照相关法规和流程经营，力求打造一个国人信得过的电商平台。
                  </div>
                </div>
              </div>
            </div>
            <div class="fileBox">
              <img src="https://static.qmwm777.com/web/project%20introduction/b_z1.jpg" alt="" class="file-image">
              <img src="https://static.qmwm777.com/web/project%20introduction/b_z2.jpg" alt="" class="file-image">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--合作单位-->
    <div class="cooperation-unit">
      <div class="unit-title-box">
        <span class="title-name">合作单位</span>
        <span class="title-desc">The cooperation unit</span>
      </div>
      <div class="unit-list">
        <img src="~/assets/images/index/saneki.png" class="unit-img">
        <img src="~/assets/images/index/sanekijt.png" class="unit-img">
        <img src="~/assets/images/index/starday-logo.png" class="unit-img">
        <img src="~/assets/images/index/huifu-logo.png" class="unit-img">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  layout: 'shopping',
  async asyncData ({ $axios, error }) {
    try {
      // 获取首页轮播图
      let carouselList = []; let newsList; let newsListMore
      await $axios.post('/delegate/notice/v1', {
        carouselType: 0,
        map: { 7: 5 },
        terminals: 0,
        state: true
      }).then((res) => {
        if (res.data.code === 200) {
          carouselList = res.data.data.carouselList
          newsList = res.data.data.newsList
          newsListMore = newsList.slice(1, 5)
        }
      })
      return {
        carouselList,
        newsList,
        newsListMore
      }
    } catch (err) {
      return error(err)
    }
  },
  computed: {
    ...mapGetters(['baseImageUrl'])
  },
  methods: {
    toNextPage (e) {
      const current = this.carouselList[e]
      switch (current.linkType) {
        case 0:
          // 不可以跳转
          break
        case 1:
          // 跳转外部
          this.a_href('http://' + current.link)
          break
        case 2:
          // 跳转商品详情
          this.$router.push({ name: 'details-id', params: { id: current.id } })
          break
        case 3:
          // 跳转资讯详情
          this.$router.push({ name: 'newsdetail-id', params: { id: current.id } })
          break
        case 4:
          // 跳转活动详情
          this.$router.push({ name: 'activity-details-id', params: { id: current.id } })
          break
        case 5:
          // 跳转公告详情
          this.$router.push({ name: 'newsdetail-id', params: { id: current.id } })
          break
        case 6:
          // 跳转新闻详情
          this.$router.push({ name: 'newsdetail-id', params: { id: current.id } })
          break
        case 7:
          // 跳转攻略详情
          this.$router.push({ name: 'activity-operating-id', params: { id: current.id } })
          break
        default:
          break
      }
    },
    a_href (href) {
      const a = document.createElement('a')
      a.setAttribute('href', href)
      a.setAttribute('target', '_blank')
      a.setAttribute('id', 'js_a')
      // 防止反复添加
      if (document.getElementById('js_a')) {
        document.body.removeChild(document.getElementById('js_a'))
      }
      document.body.appendChild(a)
      a.click()
    },
    // 跳转资讯详情
    nextPage (item) {
      this.$router.push({ name: 'newsdetail-id', params: { id: item } })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  background-color: #ffffff;
  .banner {
    width: 100%;
    height: 500px;
    .demo-carousel {
      width: 100%;
      height: 500px;
      cursor: pointer;
      font-size: 0;
      .carouse-image {
        width: 100%;
        height: 500px;
      }
    }
  }
  .news {
    width: 100%;
    height: 650px;
    background: url("~/assets/images/index/news-bg.png") no-repeat 100% 100%;
    padding: 50px 0;
    .top {
      width: 1200px;
      height: 63px;
      margin: 0px auto;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      .title-l {
        .title-name {
          font-size: 24px;
          font-weight: 400;
          text-align: left;
          color: #666666;
          line-height: 33px;
        }
      }
      .title-r {
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
        cursor: pointer;
      }
      .small-title {
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        color: #dedede;
        line-height: 20px;
      }
    }
    .bottom {
      width: 1200px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      margin: 0 auto;
      .news-a,
      .news-b {
        width: 560px;
        height: auto;
        cursor: pointer;
        .news-date {
          width: 100%;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          border-bottom: 2px solid #0782ff;
          .date,
          .more {
            font-size: 16px;
            font-weight: 500;
            color: #0782ff;
            line-height: 22px;
          }
        }
        .news-content {
          .news-title {
            width: 100%;
            margin: 10px 0 20px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            .title-text {
              font-size: 24px;
              font-weight: 500;
              text-align: left;
              color: #333333;
              line-height: 33px;
              flex: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .title-date {
              width: 100px;
              font-size: 16px;
              font-weight: 500;
              text-align: right;
              color: #0782ff;
              line-height: 16px;
            }
          }
          .news-desc {
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            color: #999999;
            line-height: 24px;
            margin-bottom: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .news-image {
            .news-img {
              width: 560px;
              height: 320px;
            }
          }
        }
      }
      .news-b {
        margin-top: 30px;
        .advert-layer {
          width: 100%;
          height: 105px;
          border-top: 2px solid #f0f0f0;
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          align-items: flex-start;
          cursor: pointer;
          .title {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .l-text {
              width: 450px;
              font-size: 16px;
              font-weight: 700;
              text-align: left;
              color: #333333;
              line-height: 22px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .r-text {
              font-size: 16px;
              font-weight: 500;
              text-align: left;
              color: #999999;
              line-height: 22px;
            }
          }
          .desc {
            width: 100%;
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            color: #666;
            line-height: 22px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-top: 10px;
          }
        }
      }
    }
  }
  .aboutCompany {
    width: 100%;
    position: relative;
    height: 1030px;
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
      height: 450px;
    }
    .companyContain {
      position: absolute;
      top: 330px;
      background-color: #fff;
      width: 1200px;
      left: 50%;
      transform: translate(-50%, 0);
      .companyBox {
        padding: 40px 60px 20px 60px;
        .titleTop {
          text-align: center;
          .title {
            font-size: 36px;
          }
          .smallTitle {
            font-size: 16px;
            color: #c9c9c9;
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
  .company-container {
    width: 100%;
    height: auto;
    background-color: #f3f4f6;
    .projectIntr {
      text-align: center;
      .bigTips {
        padding-bottom: 20px;
      }
      .titleTop {
        background-color: #ffffff;
      }
      .title {
        font-size: 24px;
        line-height: 33px;
        color: #333;
        text-align: center;
        margin-bottom: 10px;
      }
      .smallTitle {
        font-size: 14px;
        line-height: 20px;
        color: #dedede;
        text-align: center;
      }
    }
    .cardBox {
      width: 1200px;
      margin: 0 auto 30px;
      .cardList {
        width: 100%;
        height: 240px;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        position: relative;
        .imgSplain {
          position: absolute;
          top: 30px;
          left: 30px;
          img {
            width: 22px;
            height: 22px;
            display: inline-block;
            box-sizing: border-box;
            vertical-align: middle;
          }
          span {
            color: #fff;
            font-size: 22px;
            margin-left: 15px;
            display: inline-block;
            box-sizing: border-box;
            vertical-align: middle;
          }
        }
        .whiteLine{
          background-color: #fff;
          width: 44px;
          height: 4px;
          position: absolute;
          top: 206px;
          left: 326px;
        }
        img {
          width: 400px;
          height: 240px;
        }
        .cardContent {
          padding: 40px 30px;
          .textContent {
            font-size: 14px;
            text-align: left;
            color: #333;
            line-height: 24px;
            text-indent: 2em;
            margin-top: 15px;
          }
          .textContent:first-child {
            margin-top: 0;
          }
        }
      }
    }
    .getToUs {
      background-color: #fff;
      width: 100%;
      text-align: center;
      .titleTop {
        padding-top: 20px;
      }
      .intrduceTips {
        margin-top: 30px;
        .tips {
          font-size: 14px;
          color: #333;
          line-height: 24px;
        }
        .tips:last-child {
          margin-top: 15px;
        }
      }
      .tabBox {
        margin: 0 auto;
        width: 100%;
        margin-top: 40px;
        position: relative;
        // background-color: #f3f4f6;
        .imgBox {
          display: flex;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, 0);
          background-color: #fff;
          .imgList {
            width: 180px;
            margin-right: 16px;
            img {
              width: 44px;
              height: 44px;
            }
          }
        }
        .tabContent {
          font-size: 14px;
          color: #333;
          margin-top: 15px;
          line-height: 24px;
          text-align: left;
        }
        .tabContent:first-child {
          margin-top: 0;
        }
        /deep/ .ivu-tabs-nav .ivu-tabs-tab {
          width: 180px;
          padding-top: 45px;
          margin-top: 20px;
          font-size: 16px;
          color: #333;
          font-weight: 700;
        }
        /deep/ .ivu-tabs-nav .ivu-tabs-tab-active {
          color: #138cff;
        }
        /deep/ .ivu-tabs-ink-bar {
          height: 5px;
          width: 120px !important;
          left: 35px;
          top: 110px;
        }
        /deep/ .ivu-tabs-bar {
          border-bottom: none;
          height: 120px;
          width: 1200px;
          margin: 0 auto;
          margin-bottom: 0;
        }
        /deep/ .ivu-tabs-nav {
          height: 120px;
        }
        /deep/ .ivu-tabs .ivu-tabs-tabpane {
          padding: 95px 360px;
          background-color: #f3f4f6;
        }
      }
    }
    .accordingBox {
      position: relative;
      height: 1480px;
      .bg-image {
        width: 100%;
        height: 450px;
      }
      .ProjectContain {
        position: absolute;
        top: 200px;
        width: 1200px;
        left: 50%;
        transform: translate(-50%, 0);
        .ProjectBox {
          padding: 40px 60px;
          background-color: #fff;
          .titleTop {
            text-align: center;
            padding-top: 0;
            .title {
              line-height: 36px;
              margin-bottom: 10px;
            }
            .colorBlue {
              font-size: 36px;
              color: #178eff;
            }
            .smallTitle {
              font-size: 16px;
              line-height: 15px;
              color: #c9c9c9;
            }
          }
          .ProjectText {
            .ProjectTextList {
              .textTips {
                font-size: 16px;
                color: #000;
                text-align: left;
                font-weight: 600;
              }
              .textContent {
                font-size: 16px;
                color: #333;
                line-height: 24px;
                text-indent: 2em;
                text-align: left;
              }
            }
            .ProjectTextList:last-child {
              margin-top: 20px;
            }
          }
        }
        .fileBox {
          display: flex;
          justify-content: space-between;
          margin-top: 40px;
          .file-image {
            width: 580px;
            height: 800px;
            border-radius: 5px;
          }
        }
      }
    }
  }
  .cooperation-unit {
    width: 100%;
    height: 340px;
    background: url("https://static.qmwm777.com/web/banner/lALPDgQ9xJnzTzDNAVTNB4A_1920_340.png")
      no-repeat 100% 100%;
    .unit-title-box {
      width: 1200px;
      height: 150px;
      margin: 0 auto;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      .title-name {
        font-size: 24px;
        font-weight: 500;
        color: #ffffff;
        line-height: 33px;
      }
      .title-desc {
        font-size: 16px;
        font-weight: 500;
        color: #c9c9c9;
        line-height: 16px;
        margin-top: 8px;
      }
    }
    .unit-list {
      width: 1200px;
      margin: 0 auto;
      height: 160px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      .unit-img {
        width: 270px;
        height: 140px;
      }
    }
  }
  .colorBlue {
    font-size: 36px;
    color: #178eff;
  }
}
</style>
