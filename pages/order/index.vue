<template>
  <div class="order-container">
    <div class="bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">
          首页
        </BreadcrumbItem>
        <BreadcrumbItem to="/shopping">
          商城
        </BreadcrumbItem>
        <BreadcrumbItem to="/shopping">
          商品详情
        </BreadcrumbItem>
        <BreadcrumbItem>提交订单</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="content">
      <div class="title">
        提交订单
      </div>
      <div class="order-content">
        <img v-lazy="baseImageUrl + userBuyGoodsInfo.img" class="goods-img">
        <div class="goods-info">
          <p class="goods-title">
            {{ userBuyGoodsInfo.title }}
          </p>
          <div class="desc">
            <span class="name">{{ userBuyGoodsInfo.goodsCategory }}</span>
            <div class="zq">
              <span class="zq-l">周期:</span>
              <span class="zq-r">{{ userBuyGoodsInfo.period + '天' }}</span>
            </div>
            <div class="price-box">
              <span class="siglePrice">单价</span>
              <span class="price">{{ userBuyGoodsInfo.outPrice }}</span>
              <div class="lr">
                <span class="lr-txt">单个利润:</span>
                <span class="lr-num">{{ Math.floor(userBuyGoodsInfo.rate * 100) / 100 }}元</span>
              </div>
            </div>
            <div class="order-num">
              数量：
              {{ userBuyGoodsInfo.buyNum }}
            </div>
          </div>
        </div>
      </div>
      <div class="order-button">
        <div class="sy-box">
          <span class="sy">预计收益: ￥{{ userBuyGoodsInfo.allProfits }}</span>
          <div class="com-num">
            <span class="com">合计:</span>
            <span class="price">{{ userBuyGoodsInfo.combined + '.00' }}</span>
          </div>
        </div>
        <div class="btn" @click="submitOrder">
          提交订单
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
const _debounce = require('lodash/debounce')
export default {
  name: 'Order',
  layout: 'shopping',
  middleware: 'auth',
  computed: {
    ...mapGetters(['baseImageUrl', 'userBuyGoodsInfo', 'userInfo'])
  },
  methods: {
    ...mapMutations(['setOrderInfo']),
    submitOrder () {
      if (this.userInfo.realNameFlag === 1) {
        this.goBuy()
      } else {
        const path = this.$route.path
        this.$router.push('/personal/authentication?ref=' + encodeURIComponent(path))
      }
    },
    goBuy: _debounce(function () {
      // 创建订单
      this.$axios.post('/delegate/order/createOrder', {
        goodsId: this.userBuyGoodsInfo.id,
        num: this.userBuyGoodsInfo.buyNum
      }).then((res) => {
        if (res.data.code === 200) {
          this.setOrderInfo(res.data.data)
          this.$router.push({
            path: '/orderpay',
            query: {
              id: res.data.data.orderId,
              price: res.data.data.price
            }
          })
        }
      })
    }, 1000)
  }
}
</script>

<style lang="less" scoped>
.order-container {
  width: 1200px;
  min-height: calc(100vh - 457px);
  margin: 0 auto;
  .bread {
    margin: 8px 0;
  }
  .content {
    width: 1200px;
    height: 541px;
    margin-bottom: 20px;
    background-color: #ffffff;
    .title {
      font-size: 24px;
      font-weight: 500;
      text-align: left;
      color: #333333;
      line-height: 33px;
      padding: 30px 0px 30px 30px;
    }
    .order-content {
      width: 1000px;
      height: 285px;
      margin: 0 100px;
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
        width: 709px;
        height: 258px;
        .goods-title {
          width: 709px;
          height: 60px;
          line-height: 30px;
          font-size: 18px;
          font-weight: 600;
          text-align: left;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .desc {
          width: 100%;
          height: 183px;
          padding-left: 20px;
          padding-top: 16px;
          background-color: #f3f4f6;
          display: flex;
          flex-flow: column nowrap;
          justify-content: flex-start;
          align-items: flex-start;
          margin-top: 17px;
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
          .price-box {
            width: 100%;
            height: 40px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: flex-end;
            .price::before {
              content: "￥";
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
              line-height: 35px;
            }
            .price {
              font-size: 30px;
              font-weight: 600;
              text-align: left;
              color: #1491ff;
              line-height: 40px;
            }
            .lr {
              font-size: 16px;
              font-weight: 400;
              text-align: left;
              color: #ff5d19;
              line-height: 35px;
              margin-left: 10px;
            }
          }
        }
        .order-num {
          width: 100%;
          height: 54px;
          font-weight: 400;
          font-size: 14px;
          text-align: left;
          color: #333333;
          line-height: 54px;
        }
      }
    }
  }
  .order-button {
    width: 1000px;
    margin: 0 auto;
    height: auto;
    display: flex;
    flex-flow: column nowrap;
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
        line-height: 20px;
      }
      .com-num {
        margin-left: 20px;
        .com {
          font-size: 18px;
          font-weight: 500;
          text-align: left;
          color: #333333;
          line-height: 25px;
        }
        .price::before {
          content: '￥';
          display: inline-block;
          font-size: 18px;
          color: #1491ff;
          line-height: 25px;
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
    .btn {
      width: 194px;
      height: 50px;
      background-color: #1491ff;
      border-radius: 2px;
      font-size: 16px;
      font-weight: 400;
      color: #ffffff;
      line-height: 50px;
      text-align: center;
      margin-right: 0;
      margin-top: 20px;
      cursor: pointer;
    }
  }
}
</style>
