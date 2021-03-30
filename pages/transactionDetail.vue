<template>
  <div class="order-container">
    <div class="bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">
          首页
        </BreadcrumbItem>
        <BreadcrumbItem to="/personal">
          个人中心
        </BreadcrumbItem>
        <BreadcrumbItem>
          交易明细
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="orderDetailBox">
      <div class="content">
        <div class="title">
          交易明细
        </div>
        <div class="topNav">
          <div class="navList" :style="$route.name == 'transactionDetail-page' ? navActiveStyle : {}" @click="changeNews(0)">
            全部
          </div>
          <div class="navList" :style="$route.name == 'transactionDetail-withdrawRecord-page' ? navActiveStyle : {}" @click="changeNews(1)">
            提现记录
          </div>
          <div class="navList" :style="$route.name == 'transactionDetail-buyRecord-page' ? navActiveStyle : {}" @click="changeNews(2)">
            购买记录
          </div>
          <div class="navList" :style="$route.name == 'transactionDetail-returnedRecord-page' ? navActiveStyle : {}" @click="changeNews(3)">
            回款记录
          </div>
        </div>
        <div class="bottomContent">
          <nuxt-child />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Order',
  data () {
    return {
      navActiveStyle: {
        color: '#0083FF',
        borderBottom: '2px solid #0083FF'
      }
    }
  },
  methods: {
    changeNews (index) {
      switch (index) {
        case 0:
          this.$router.push('/transactionDetail')
          break
        case 1:
          this.$router.push('/transactionDetail/withdrawRecord')
          break
        case 2:
          this.$router.push('/transactionDetail/buyRecord')
          break
        case 3:
          this.$router.push('/transactionDetail/returnedRecord')
          break
        default:
          this.$router.push('/transactionDetail')
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.order-container {
  width: 1200px;
  margin: 0 auto;
  background-color: #f3f4f6;
  .bread {
    margin: 8px 0;
  }
  .orderDetailBox{
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 20px;
    /deep/ .ivu-breadcrumb{
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
      .topNav {
        margin: 0 auto;
        margin-top: 30px;
        width: 100%;
        .navList {
          display: inline-block;
          text-align: center;
          margin-left: 40px;
          cursor: pointer;
          color: #333;
          font-size: 14px;
        }
        .navList:first-child{
          margin-left: 0;
        }
      }
    }
  }
}
</style>
