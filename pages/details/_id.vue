<template>
  <div class="goods-container">
    <div class="goodsInformation">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">
          首页
        </BreadcrumbItem>
        <BreadcrumbItem to="/shopping">
          商城
        </BreadcrumbItem>
        <BreadcrumbItem>
          商品详情
        </BreadcrumbItem>
      </Breadcrumb>
      <div class="goodsDetail">
        <div class="content">
          <!-- 商品展示 -->
          <div class="goodsShow">
            <div class="goodsLeft">
              <img src="~/assets/images/index/leftArrow.png" class="leftIcon" @click="leftImg">
              <Carousel loop dots="none" arrow="never">
                <CarouselItem>
                  <div class="demo-carousel">
                    <img v-lazy="baseImageUrl + imgUrl" class="carouselPic">
                  </div>
                </CarouselItem>
              </Carousel>
              <img src="~/assets/images/index/rightArrow.png" class="rightIcon" @click="rightImg">
              <div class="picShowBox">
                <img v-if="carouselList.length > 5" src="~/assets/images/index/leftArrow.png" class="upIcon" @click="upImg">
                <div class="bigBox">
                  <div v-for="(e, i) in carouselList" :key="i" class="showImgBox" :class="leftImgIndex === i? 'activeImg' : 'showImg'" @click="checkImg(e,i,$event)">
                    <img v-lazy="baseImageUrl + e">
                  </div>
                </div>
                <img v-if="carouselList.length > 5" src="~/assets/images/index/rightArrow.png" class="downIcon" @click="downImg">
              </div>
            </div>
            <div class="goodsRight">
              <div class="storeBox">
                <div class="store-l">
                  <img src="~/assets/images/index/dianpufill.png" class="storeIcon">
                  <span class="storeTitle">{{ goodsDetails.storeName }}</span>
                </div>
                <span class="storeBtn" @click="$router.push('/shopInfo/1')">进入店铺</span>
              </div>
              <p class="goodsTitle">
                {{ goodsDetails.title }}
              </p>
              <div class="goodsIntrduce">
                <div class="goodsUse">
                  <span class="item">{{ goodsDetails.goodsCategoryName }}</span>
                </div>
                <div class="period">
                  <p class="periodDetail">
                    周期：<span class="periodDays">{{ goodsDetails.period + '天' }}</span>
                  </p>
                </div>
                <div class="priceBox">
                  <span class="siglePrice">单价￥</span>
                  <div class="price">{{ goodsDetails.outPrice }}</div>
                  <span class="profit">单个利润:{{ goodsDetails.rate }}</span>
                </div>
              </div>
              <div class="kc">
                <div class="kc-txt">
                  {{ '库存:' + goodsDetails.inventory }}
                </div>
                <div class="kc-progress">
                  <Progress stroke-color="#1491ff" :stroke-width="14" :percent="(goodsDetails.sales / goodsDetails.totalInventory) * 100" hide-info />
                </div>
              </div>
              <div class="numberBox">
                数量
                <InputNumber v-model="amount" :max="goodsDetails.inventory" :min="1" @on-change="changeNum" />
              </div>
              <div class="buttonBox">
                <div class="sy-box">
                  <span class="sy">预计总利润: ￥{{ allProfits || goodsDetails.rate }}</span>
                  <div class="com-num">
                    <span class="com">合计:</span>
                    <span class="price">{{ combined || goodsDetails.outPrice }}</span>
                  </div>
                  <button v-if="goodsDetails.goodsType == 4" class="sold-out">
                    已完成
                  </button>
                  <button v-else class="goBuy" @click="nowBuy">
                    立即购买
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- 购买明细 -->
          <div class="buyHistory">
            <p class="title">
              购买明细
            </p>
            <Table :columns="tabConfig" :data="tabData" />
            <Page :total="totalPage" :current="currentIndex" @on-change="changePage" />
          </div>
          <!-- 代购流程 -->
          <div class="buyProcess">
            <div class="process">
              <p class="processTitle">
                商品代购流程：
              </p>
              <div class="processText">
                商品代购完成或到商品购买截止时间后，全民外贸平台负责统计商品订单数量，主体公司三益供应链集团有限公司负责商品的采购、中国报关、海运、目的国清关等一系列流程。 待商品运送到日本后，母公司日本三益贸易株式会社负责代购商品在日本的仓储，并由旗下的STARDAY商城进行营销配送等一系列流程。 待销售周期结束当天，用户即可赚取代购利润，并拿回代购成本。
              </div>
            </div>
            <div class="commitment">
              <p class="processTitle">
                商品代购流程：
              </p>
              <div class="processText">
                1.商品在运输过程中出现损坏，由三益供应链集团有限公司与货代公司协商赔偿，同时在代购周期结束当天由三益供应链集团有限公司先行跟代购用户结算代购成本和代购利润。
              </div>
              <div class="processText">
                2.代购商品在周期内未售出的，由日本三益贸易株式会社旗下的STARDAY商城进行回售，待周期结束当天，由三益供应链集团有限公司正常支付代购金额和代购利润，保障用户代购金额和代购利润的正常回款。
              </div>
            </div>
          </div>
          <!-- 图片详情 -->
          <div class="goodsImgDetail">
            <img src="~/assets/images/index/goodsDetail1.png" class="goodsPic">
            <!--            <img v-lazy="baseImageUrl + goodsDetails.img" class="goodsPic">-->
            <div v-html="goodsDetails.html" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Details',
  layout: 'shopping',
  async asyncData ({ params, $axios, error }) {
    try {
      const { id } = params
      let goodsDetails
      await $axios.post(`/delegate/goods/goodsDetail/${id}`).then((res) => {
        if (res.data.code === 200) {
          goodsDetails = res.data.data
        }
      })
      return {
        id,
        goodsDetails
      }
    } catch (err) {
      return error(err)
    }
  },
  data () {
    return {
      amount: 1,
      leftImgIndex: 0,
      currentIndex: 1,
      imgUrl: '',
      totalPage: 1,
      tabConfig: [
        {
          title: '购买用户',
          align: 'center',
          key: 'buyer'
        },
        {
          title: '购买数量',
          align: 'center',
          key: 'totalBuyNum'
        },
        {
          title: '购买金额',
          align: 'center',
          key: 'totalPrice'
        },
        {
          title: '购买时间',
          align: 'center',
          key: 'createDate'
        }
      ],
      tabData: [],
      allProfits: '',
      combined: ''
    }
  },
  computed: {
    ...mapGetters(['baseImageUrl']),
    carouselList () {
      return this.goodsDetails.lunbo.split(',')
    }
  },
  async beforeMount () {
    await this.priceCalculation()
  },
  mounted () {
    this.imgUrl = this.carouselList[this.leftImgIndex]
    this.PurchaseDetails(1, 5)
  },
  methods: {
    ...mapMutations(['setGoodsInfo']),
    changeNum (num) {
      this.priceCalculation(num)
    },
    priceCalculation (num = 1) {
      this.$axios.post('/delegate/order/calculate', { goodsId: this.id, num }).then((res) => {
        if (res.data.code === 200) {
          this.allProfits = res.data.data.profit
          this.combined = res.data.data.payAmount
        }
      })
    },
    checkImg (e, i, event) {
      this.imgUrl = e
      this.leftImgIndex = i
      const imgLeft = event.clientX - 430
      const scrollBox = document.getElementsByClassName('bigBox')
      const totalWidths = scrollBox[0].clientWidth
      const widths = totalWidths / 2
      const imgRight = totalWidths - imgLeft
      const scrollL = scrollBox[0].scrollLeft
      if (imgLeft > widths || imgRight > widths) {
        scrollBox[0].scrollLeft = scrollL + (imgLeft - widths)
      }
    },
    upImg () {
      const scrollBox = document.getElementsByClassName('bigBox')
      const scrollL = scrollBox[0].scrollLeft
      if (scrollL > 0) {
        scrollBox[0].scrollLeft = scrollL - 84
      }
    },
    downImg () {
      const scrollBox = document.getElementsByClassName('bigBox')
      const scrollL = scrollBox[0].scrollLeft
      if (scrollL >= 0) {
        scrollBox[0].scrollLeft = scrollL + 84
      }
    },
    leftImg () {
      const scrollBox = document.getElementsByClassName('bigBox')
      const scrollBoxLeft = scrollBox[0].scrollLeft
      if (this.leftImgIndex <= this.carouselList.length - 1) {
        scrollBox[0].scrollLeft = scrollBoxLeft - 84
      }
      if (this.leftImgIndex === 0) {
        scrollBox[0].scrollLeft = scrollBox[0].scrollWidth
      }
      if (this.leftImgIndex === 0) {
        this.leftImgIndex = this.carouselList.length - 1
        this.imgUrl = this.carouselList[this.leftImgIndex]
      } else {
        this.leftImgIndex -= 1
        this.imgUrl = this.carouselList[this.leftImgIndex]
      }
    },
    rightImg () {
      const scrollBox = document.getElementsByClassName('bigBox')
      const scrollBoxWidth = scrollBox[0].clientWidth / 2
      const activeImgLeft = (this.leftImgIndex + 1) * 84 + 42 + this.leftImgIndex * 4
      if (activeImgLeft > scrollBoxWidth) {
        scrollBox[0].scrollLeft = activeImgLeft - scrollBoxWidth
      }
      if (this.leftImgIndex === this.carouselList.length - 1) {
        scrollBox[0].scrollLeft = 0
      }
      if (this.leftImgIndex >= this.carouselList.length - 1) {
        this.leftImgIndex = 0
        this.imgUrl = this.carouselList[this.leftImgIndex]
      } else {
        this.leftImgIndex += 1
        this.imgUrl = this.carouselList[this.leftImgIndex]
      }
    },
    // 购买明细
    PurchaseDetails (page = 1, size = 5) {
      this.$axios.post(`/delegate/goods/buyDetails/${this.id}`, {
        pageNo: page,
        pageSize: size
      }).then((res) => {
        if (res.data.code === 200) {
          this.currentIndex = page
          this.tabData = res.data.data.rows
          this.totalPage = res.data.data.totalPage
        }
      })
    },
    changePage (page) {
      this.PurchaseDetails(page)
    },
    nowBuy () {
      this.setGoodsInfo({
        title: this.goodsDetails.title,
        goodsCategory: this.goodsDetails.goodsCategory,
        id: this.goodsDetails.id,
        img: this.goodsDetails.img,
        outPrice: this.goodsDetails.outPrice,
        period: this.goodsDetails.period,
        rate: this.goodsDetails.rate,
        buyNum: this.amount,
        allProfits: this.allProfits || this.goodsDetails.rate,
        combined: this.combined || this.goodsDetails.outPrice
      })
      this.$router.push('/order')
    }
  }
}
</script>

<style lang="less" scoped>
.goods-container {
  width: 100%;
  height: auto;
  background-color: #f3f4f6;
  ::-webkit-scrollbar {
    display: none;
  }
  .goodsInformation {
    width: 1200px;
    margin: 0 auto;
    background-color: #fff;
    /deep/ .ivu-breadcrumb {
      background-color: #f3f4f6;
      height: 45px;
      line-height: 45px;
    }
    .goodsDetail {
      width: 100%;
      padding: 32px 45px 60px;
      margin-top: 14px;
      .content {
        width: 100%;
        text-align: center;
        .goodsShow {
          display: flex;
          justify-content: space-between;
          height: 570px;
          .goodsLeft {
            width: 460px;
            height: 460px;
            position: relative;
            box-shadow: 0px 2px 5px 2px rgba(17, 16, 255, 0.05);
            .leftIcon {
              position: absolute;
              left: 0;
              top: 40%;
              z-index: 999;
              cursor: pointer;
            }
            .rightIcon {
              position: absolute;
              right: 0;
              z-index: 999;
              top: 40%;
              cursor: pointer;
            }
            /deep/ .ivu-carousel-track.higher {
              width: 10000px !important;
              .ivu-carousel-item {
                width: 460px !important;
              }
            }
            .demo-carousel {
              width: 100%;
              height: 460px;
              .carouselPic {
                width: 460px;
                height: 460px;
              }
            }
            .picShowBox {
              position: relative;
              margin-top: 20px;
              padding: 0 30px;
              .bigBox {
                width: 398px;
                display: flex;
                overflow: hidden;
                .showImgBox {
                  width: 92px;
                  height: 92px;
                }
              }
              img {
                width: 84px;
                height: 84px;
                display: inline-block;
                margin: 2px;
              }
              .upIcon {
                width: 28px;
                height: 92px;
                position: absolute;
                left: 0;
                top: -2px;
                cursor: pointer;
              }
              .downIcon {
                width: 28px;
                height: 92px;
                position: absolute;
                right: 0;
                top: -2px;
                cursor: pointer;
              }
              .showImg {
                border: 2px solid #f3f4f6;
              }
              .activeImg {
                border: 2px solid #1491ff;
              }
            }
          }
          .goodsRight {
            width: 625px;
            height: 460px;
            display: flex;
            flex-flow: column nowrap;
            justify-content: flex-start;
            align-items: flex-start;
            .storeBox {
              width: 100%;
              height: 50px;
              line-height: 50px;
              background-color: #f0f8ff;
              border-radius: 4px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-right: 20px;
              .store-l {
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                align-items: center;
                img {
                  width: 46px;
                  height: 44px;
                  margin-left: 11px;
                }
                .storeTitle {
                  font-size: 18px;
                  font-weight: 600;
                  text-align: left;
                  color: #333333;
                  line-height: 50px;
                  display: inline-block;
                }
              }
              .storeBtn {
                font-size: 16px;
                font-weight: 400;
                text-align: left;
                color: #0083ff;
                cursor: pointer;
              }
            }
            .goodsTitle {
              text-align: left;
              font-size: 18px;
              word-break: break-all;
              text-overflow: ellipsis;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              word-break: break-all;
              font-weight: 600;
              color: #333333;
              line-height: 30px;
              margin: 15px 0;
              min-height: 60px;
            }
            .goodsIntrduce {
              width: 625px;
              height: 120px;
              background-color: #f3f4f6;
              padding: 8px 0 0 10px;
              .goodsUse {
                text-align: left;
                width: 100%;
                height: 28px;
                line-height: 28px;
                .item {
                  display: inline-block;
                  font-size: 14px;
                  font-weight: 400;
                  text-align: left;
                  color: #333333;
                  line-height: 14px;
                }
              }
              .period {
                text-align: left;
                width: 100%;
                height: 28px;
                line-height: 28px;
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                align-items: center;
                .periodDetail {
                  font-size: 14px;
                  font-weight: 400;
                  text-align: left;
                  color: #333333;
                  line-height: 14px;
                }
              }
              .priceBox {
                text-align: left;
                width: 100%;
                height: 30px;
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                align-items: flex-end;
                margin-top: 6px;
                .siglePrice {
                  font-size: 16px;
                  font-weight: 600;
                  text-align: left;
                  color: #1491ff;
                  line-height: 30px;
                }
                .price {
                  font-size: 30px;
                  color: #1491ff;
                  font-weight: 700;
                  line-height: 40px;
                }
                .profit {
                  font-size: 16px;
                  font-weight: 400;
                  text-align: left;
                  color: #ff5d19;
                  line-height: 30px;
                  margin-left: 10px;
                }
              }
            }
            .kc {
              display: flex;
              flex-flow: row nowrap;
              justify-content: flex-start;
              align-items: center;
              width: 100%;
              height: 58px;
              .kc-txt {
                font-size: 14px;
                font-weight: 400;
                text-align: left;
                color: #333333;
                line-height: 58px;
              }
              .kc-progress {
                margin-left: 30px;
                width: 285px;
                height: 100%;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                /deep/ .ivu-progress-inner {
                  background-color: #b8deff;
                }
              }
            }
            .numberBox {
              width: 100%;
              font-size: 14px;
              font-weight: 400;
              text-align: left;
              color: #333333;
              line-height: 20px;
              /deep/ .ivu-input-number {
                width: 100px;
                height: 50px;
                margin-left: 20px;
                .ivu-input-number-handler-wrap {
                  opacity: 1;
                  .ivu-input-number-handler-down-inner,
                  .ivu-input-number-handler-up-inner {
                    line-height: 25px;
                  }
                }
                .ivu-input-number-input-wrap,
                .ivu-input-number-input {
                  height: 50px;
                  font-size: 18px;
                  padding: 0 10px;
                }
                .ivu-input-number-handler {
                  height: 25px;
                }
              }
            }
            .buttonBox {
              flex: 1;
              width: 100%;
              margin-top: 20px;
              text-align: left;
              border-top: 1px solid #c9c9c9;
              display: flex;
              flex-flow: row nowrap;
              justify-content: flex-end;
              align-items: flex-end;
              .sy-box {
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-end;
                align-items: flex-end;
                width: 100%;
                height: 60px;
                .sy {
                  font-size: 14px;
                  font-weight: 500;
                  text-align: left;
                  color: #ff5d19;
                  display: inline-block;
                  line-height: 40px;
                }
                .com-num {
                  margin-left: 20px;
                  line-height: 40px;
                  .com {
                    font-size: 18px;
                    font-weight: 500;
                    text-align: left;
                    color: #333333;
                    line-height: 25px;
                  }
                  .price::before{
                    content: '￥';
                    display: inline-block;
                    font-size: 16px;
                    font-weight: 700;
                    color: #1491ff;
                  }
                  .price {
                    font-size: 22px;
                    font-weight: 700;
                    text-align: left;
                    color: #1491ff;
                    line-height: 26px;
                  }
                }
              }
              .goBuy {
                width: 195px;
                height: 50px;
                background: #1491ff;
                border-radius: 2px;
                color: #fff;
                outline: none;
                border: none;
                font-size: 16px;
                margin-top: 30px;
                text-align: center;
                cursor: pointer;
                margin-left: 15px;
              }
              .sold-out {
                width: 195px;
                height: 50px;
                background: #f3f4f6;
                border-radius: 2px;
                color: #666666;
                outline: none;
                border: none;
                font-size: 16px;
                margin-top: 30px;
                text-align: center;
                cursor: pointer;
                margin-left: 15px;
              }
            }
          }
        }
        .buyHistory {
          margin-top: 40px;
          .title {
            font-size: 18px;
            font-weight: 600;
            text-align: center;
            color: #333333;
            line-height: 25px;
          }
          /deep/ .ivu-table {
            margin-top: 30px;
            border: 1px solid #e0e0e0;
          }
          /deep/ .ivu-page {
            margin-top: 30px;
            .ivu-page-item-active {
              background-color: #1491ff;
              a {
                color: #fff;
              }
            }
          }
        }
        .buyProcess {
          margin-top: 40px;
          padding: 30px;
          width: 100%;
          border-radius: 8px;
          box-shadow: 0px 2px 5px 2px rgba(17, 16, 255, 0.05);
          .processTitle {
            font-size: 18px;
            font-weight: 700;
            text-align: left;
            color: #333333;
            line-height: 25px;
            margin-top: 10px;
          }
          .processText {
            font-size: 16px;
            text-align: left;
            color: #333333;
            line-height: 28px;
            margin-top: 10px;
          }
        }
        .goodsImgDetail {
          margin-top: 40px;
          .goodsPic {
            width: 800px;
            display: block;
            margin: 0 auto;
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
