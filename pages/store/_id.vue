<template>
  <div class="container">
    <div class="leftBox">
      <p class="title">
        交易信息
      </p>
      <p class="sellTotal">
        <img src="~/assets/images/index/consumption.png" class="shopImg">
        <span>累计销售总额：<span>{{ trading.sumPrice }}元</span></span>
      </p>
      <p class="sellTotal">
        <img src="~/assets/images/index/back-up.png" class="shopImg">
        <span>累计返还人数：<span>{{ trading.sumCount }}次</span></span>
      </p>
      <p class="sellTotal">
        <img src="~/assets/images/index/backups.png" class="shopImg">
        <span>累计返还利润：<span>{{ trading.sumProfit }}元</span></span>
      </p>
    </div>
    <div class="rightBox">
      <p class="title">
        卖家回购
      </p>
      <p class="sellTotal">
        <img src="~/assets/images/index/financing.png" class="shopImg">
        <span>累计回购总额：<span>{{ repoData.sumProfit }}元</span></span>
      </p>
      <p class="sellTotal">
        <img src="~/assets/images/index/earnings.png" class="shopImg">
        <span>累计销售次数：<span>{{ repoData.sumCount || 0 }}次</span></span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Id',
  layout: 'shopping',
  async asyncData ({ $axios, params, error }) {
    try {
      const { id } = params
      // 交易数据
      let trading, repoData
      await $axios.get(`/delegate/store/getTotalDataByCom/${id}`).then((res) => {
        if (res.data.code === 200) {
          trading = res.data.data
        }
      })
      await $axios.get(`/delegate/store/getSecTotalDataByCom/${id}`).then((res) => {
        if (res.data.code === 200) {
          repoData = res.data.data
        }
      })
      return {
        trading,
        repoData
      }
    } catch (err) {
      return error(err)
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  padding:50px 70px 90px;
  display: flex;
  justify-content: space-between;
  .leftBox,.rightBox{
    text-align: left;
    width: 472px;
    height: 256px;
    padding: 30px 95px 50px;
    box-shadow: 0px 2px 5px 2px rgba(17,16,255,0.05);
    .title{
      font-size: 16px;
      line-height: 22px;
      font-weight: 700;
      color: #333;
      text-align: center;
    }
    .sellTotal{
      margin-top: 15px;
      .shopImg{
        width: 34px;
        height: 34px;
        display: inline-block;
        box-sizing: border-box;
        vertical-align: middle;
      }
      span{
        font-size: 14px;
        color: #333;
        line-height: 20px;
        display: inline-block;
        box-sizing: border-box;
        vertical-align: middle;
      }
    }
  }
}
</style>
