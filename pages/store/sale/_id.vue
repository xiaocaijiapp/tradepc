<template>
  <div class="echarts-container">
    <div class="echarts-l">
      <div class="title">
        <span class="name">订单量</span>
        <span class="line-color" />
      </div>
      <div ref="orderCharts" class="orderCharts" />
    </div>
    <div class="echarts-r">
      <div class="title">
        <span class="name">订单金额</span>
        <span class="line-color" />
      </div>
      <div ref="saleCharts" class="saleCharts" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Storeid',
  async asyncData ({ $axios, params, error }) {
    try {
      const { storeid } = params
      // 交易数据
      let chartsData, orderAcountArr, orderPriceArr
      await $axios.get(`/delegate/store/getSecTotalSum/${storeid}`).then((res) => {
        if (res.data.code === 200) {
          chartsData = res.data.data
          orderAcountArr = chartsData.map((item) => {
            return item.sumCount
          })
          orderPriceArr = chartsData.map((item) => {
            return item.sumPrice
          })
        }
      })
      return {
        chartsData,
        orderAcountArr,
        orderPriceArr
      }
    } catch (err) {
      return error(err)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.orderChart()
      this.saleChart()
    })
  },
  methods: {
    orderChart () {
      const myChart = window.echarts.init(this.$refs.orderCharts)
      myChart.setOption({
        xAxis: {
          show: false
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.orderAcountArr,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#1491ff'
          }
        }]
      })
    },
    saleChart () {
      const myChart = window.echarts.init(this.$refs.saleCharts)
      myChart.setOption({
        xAxis: {
          show: false
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.orderPriceArr,
          type: 'line',
          smooth: true,
          lineStyle: {
            color: '#ff7b13'
          }
        }]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.echarts-container{
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  .echarts-l {
    .line-color {
      background: #1491ff;
      border-radius: 2px;
    }
  }
  .echarts-r {
    .line-color {
      background: #ff7b13;
      border-radius: 2px;
    }
  }
  .echarts-l, .echarts-r{
    width: 540px;
    height: 300px;
    border-radius: 2px;
    box-shadow: 0px 2px 5px 2px rgba(17,16,255,0.05);
    .title {
      width: 100%;
      height: 50px;
      padding-left: 20px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      .name {
        display: inline-block;
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        line-height: 50px;
      }
      .line-color {
        display: inline-block;
        width: 20px;
        height: 8px;
        margin-left: 10px;
      }
    }
    .orderCharts, .saleCharts {
      width: 424px;
      height: 229px;
      margin: 0 58px;
    }
  }
}
</style>
