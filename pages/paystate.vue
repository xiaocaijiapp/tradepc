<template>
  <div class="pay-state-container">
    <div class="content">
      <div class="pay-state">
        <img v-if="state == 'true'" class="state-icon" src="~/assets/images/index/pay-success.png" alt="">
        <img v-else-if="state == 'timeout'" class="state-icon" src="~/assets/images/index/timeout.png" alt="">
        <img v-else class="state-icon" src="~/assets/images/index/pay-error.png" alt="">
        <span v-if="state == 'true'" class="state-text">支付成功</span>
        <span v-else-if="state == 'timeout'" class="state-text">支付超时</span>
        <span v-else class="state-text">支付失败</span>
        <div v-if="state == 'true'" class="check-order-state" @click="checkOrder">
          查看订单
        </div>
        <div v-else class="check-order-state" @click="$router.push('/shopping')">
          回到首页
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Paystate',
  layout: 'shopping',
  asyncData ({ query }) {
    const { state = false } = query
    return {
      state
    }
  },
  computed: {
    ...mapGetters(['orderInfo', 'loginStatus'])
  },
  methods: {
    checkOrder () {
      this.$router.push('/goodsOrder/' + this.orderInfo.orderId)
    }
  }
}
</script>

<style lang="less" scoped>
.pay-state-container {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  .content {
    width: 1200px;
    height: 540px;
    background-color: #ffffff;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    .pay-state {
      width: 472px;
      height: 256px;
      background-color: #ffffff;
      border-radius: 2px;
      box-shadow: 0px 2px 5px 2px rgba(17,16,255,0.05);
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      .state-icon {
        width: 76px;
        height: 88px;
      }
      .state-text {
        font-size: 18px;
        font-weight: 500;
        text-align: left;
        color: #333333;
        line-height: 23px;
        margin-top: 15px;
      }
      .check-order-state {
        width: 168px;
        height: 40px;
        border: 1px solid #999999;
        border-radius: 21px;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;
        margin-top: 20px;
        cursor: pointer;
        background-color: #0083ff;
      }
    }
  }
}
</style>
