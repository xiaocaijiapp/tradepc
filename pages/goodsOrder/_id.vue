<template>
  <div class="order-container">
    <div class="orderDetailBox">
      <div class="bread">
        <Breadcrumb separator=">">
          <BreadcrumbItem to="/">
            首页
          </BreadcrumbItem>
          <BreadcrumbItem to="/personal">
            个人中心
          </BreadcrumbItem>
          <BreadcrumbItem to="/orderManagement">
            订单管理
          </BreadcrumbItem>
          <BreadcrumbItem>
            订单详情
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="content">
        <div class="title">
          订单详情
        </div>
        <div class="smallTitle">
          {{ '订单号:'+details.orderId }}
        </div>
        <div class="order-content">
          <img :src="baseImageUrl + details.orderGoodsDto.img" class="goods-img">
          <div class="goods-info">
            <p class="goods-title">
              {{details.orderGoodsDto.title}}
            </p>
            <div class="desc">
              <div class="zq">
                <span class="zq-l">周期:</span>
                <span class="zq-r">{{details.orderGoodsDto.period + '天'}}</span>
              </div>
              <div class="price-box">
                <span class="price">{{details.orderGoodsDto.outPrice + '.00'}}</span>
                <div class="lr">
                  <span class="lr-txt">单件利润:</span>
                  <span class="lr-num">{{details.orderGoodsDto.rate + '元'}}</span>
                </div>
              </div>
              <div class="order-num">
                数量：
                {{details.buyNum}}
              </div>
            </div>
            <div class="dateBox">
              <p class="buyDate">
                <img src="~/assets/images/index/commodity.png" class="dateImg">
                <span class="dateText">{{'购买日期:' + details.createDate}}</span>
              </p>
              <p class="returnedDate">
                <img src="~/assets/images/index/financing-one.png" class="dateImg">
                <span class="dateText">{{'回款日期:' + details.expireDate}}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="order-button">
          <div class="title">
            支付信息
          </div>
          <div class="repayInfo">
            <span class="repayType">{{'付款方式：' + payType}}</span>
            <span class="repayMoney">实付金额：<span class="textColor">{{details.price + '元'}}</span></span>
            <span class="totalProfit">总利润：<span class="textColor">{{details.profit + '元'}}</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Order',
  async asyncData ({ $axios, params, error }) {
    try {
      const { id } = params
      let details
      await $axios.get(`/delegate/order/detail/${id}`).then((res) => {
        if (res.data.code === 200) {
          details = res.data.data
        }
      })
      return {
        details
      }
    } catch (err) {
      return error(err)
    }
  },
  computed: {
    ...mapGetters(['baseImageUrl']),
    payType () {
      const arr = ['支付宝支付', '余额支付', '汇付支付', '微信支付']
      return arr[this.details.payType * 1 - 1]
    }
  },
  created () {
    console.log(this.details)
  }
}
</script>

<style lang="less" scoped>
.order-container {
  width: 100%;
  background-color: #f3f4f6;
  .orderDetailBox {
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 20px;
    /deep/ .ivu-breadcrumb {
      background-color: #f3f4f6;
      height: 45px;
      line-height: 45px;
    }
    .content {
      height: 585px;
      padding: 30px;
      background-color: #ffffff;
      .title {
        font-size: 24px;
        font-weight: 500;
        text-align: left;
        color: #333333;
        line-height: 33px;
      }
      .smallTitle {
        font-size: 16px;
        color: #333;
        margin-top: 16px;
      }
      .order-content {
        width: auto;
        height: 288px;
        margin: 30px 70px;
        border-bottom: 1px solid #c9c9c9;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        .goods-img {
          width: 258px;
          height: 258px;
          object-fit: cover;
        }
        .goods-info {
          width: 100%;
          height: 270px;
          margin-left: 30px;
          .goods-title {
            height: 56px;
            font-size: 18px;
            font-weight: 600;
            text-align: left;
            color: #333333;
            line-height: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .desc {
            width: 100%;
            height: 147px;
            padding-left: 20px;
            padding-top: 16px;
            background-color: #f3f4f6;
            display: flex;
            flex-flow: column nowrap;
            justify-content: flex-start;
            align-items: flex-start;
            margin-top: 15px;
            .name {
              width: 100%;
              height: 34px;
              font-size: 14px;
              font-weight: 400;
              text-align: left;
              color: #333333;
              line-height: 34px;
            }
            .zq {
              width: 100%;
              font-size: 14px;
              font-weight: 400;
              text-align: left;
              color: #333333;
              line-height: 34px;
            }
            .order-num {
              font-size: 14px;
              font-weight: 400;
              text-align: left;
              color: #333333;
              line-height: 54px;
            }
            .price-box {
              width: 100%;
              height: 40px;
              display: flex;
              flex-flow: row nowrap;
              justify-content: flex-start;
              align-items: flex-end;
              .price::before {
                content: "单价￥";
                font-size: 16px;
                font-weight: 600;
                text-align: left;
                color: #1491ff;
                line-height: 26px;
              }
              .siglePrice {
                font-size: 16px;
                font-weight: 600;
                text-align: left;
                color: #1491ff;
                line-height: 26px;
              }
              .price {
                font-size: 30px;
                font-weight: 600;
                text-align: left;
                color: #1491ff;
                line-height: 26px;
              }
              .lr {
                font-size: 16px;
                font-weight: 400;
                text-align: left;
                color: #ff5d19;
                line-height: 26px;
                margin-left: 10px;
              }
            }
          }
          .dateBox {
            height: 42px;
            line-height: 42px;
            margin-top: 10px;
            .buyDate,
            .returnedDate {
              display: inline-block;
            }
            .returnedDate {
              margin-left: 30px;
            }
            .dateImg {
              width: 42px;
              height: 42px;
              display: inline-block;
              box-sizing: border-box;
              vertical-align: middle;
            }
            .dateText {
              line-height: 42px;
              font-size: 14px;
              color: #333;
              display: inline-block;
              box-sizing: border-box;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .order-button {
      width: 100%;
      .repayInfo {
        width: 100%;
        padding: 30px 70px;
        span {
          font-size: 14px;
          color: #333;
          margin-left: 50px;
          .textColor {
            font-size: 22px;
            color: #ff5d19;
          }
        }
        span:first-child {
          margin-left: 0;
        }
      }
    }
  }
}
</style>
