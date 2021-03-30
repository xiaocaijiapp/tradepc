<template>
  <div class="shopping-container">
    <!-- 店铺信息 -->
    <div class="shopInfomation">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">
          首页
        </BreadcrumbItem>
        <BreadcrumbItem to="/shopping">
          商城
        </BreadcrumbItem>
        <BreadcrumbItem to="/shopInfo">
          店铺信息
        </BreadcrumbItem>
        <BreadcrumbItem>
          店铺详情
        </BreadcrumbItem>
      </Breadcrumb>
      <div class="infoDetail">
        <div class="title">
          <h3 class="title-name">
            店铺详情
          </h3>
          <span class="small-title">Shop for details</span>
        </div>
        <div class="content">
          <div class="topNav">
            <div class="navList" :style="$route.name == 'store-id' ? navActiveStyle : {}" @click="changeNews(0)">
              店铺数据
            </div>
            <div class="navList" :style="$route.name == 'store-sale-id' ? navActiveStyle : {}" @click="changeNews(1)">
              销售数据
            </div>
          </div>
          <div class="bottomContent">
            <nuxt-child />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Shopping',
  layout: 'shopping',
  data () {
    return {
      navIndex: 0,
      navActiveStyle: {
        color: '#fff',
        backgroundColor: '#1491FF',
        fontWeight: 600
      },
      cateBox: false
    }
  },
  computed: {
    ...mapGetters(['currentStoreId'])
  },
  methods: {
    changeNews (index) {
      this.navIndex = index
      if (index === 0) {
        this.$router.push({ name: 'store-id', params: { id: this.currentStoreId } })
      } else {
        this.$router.push({ name: 'store-sale-id', params: { id: this.currentStoreId } })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.shopping-container {
    width: 100%;
    height: auto;
    background-color: #f3f4f6;
    .shopInfomation{
      width: 1200px;
      margin: 0 auto;
      background-color: #fff;
      /deep/ .ivu-breadcrumb{
        background-color: #f3f4f6;
        height: 45px;
        line-height: 45px;
      }
      .infoDetail{
        width: 100%;
        height: 540px;
        background-color: #fff;
        padding: 30px;
        .title-name{
          font-size: 24px;
          color: #333;
          line-height: 33px;
          font-weight: 700;
        }
        .small-title{
          font-size: 16px;
          color: #c9c9c9;
          line-height: 22px;
          margin-top: 8px;
          display: block;
        }
        .content {
          width: 100%;
          text-align: center;
          .topNav {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            margin: 10px auto 0px;
            width: 300px;
            .navList {
              width: 120px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              cursor: pointer;
              color: #333;
              font-size: 14px;
              background-color: #fff;
              box-shadow: 0px 2px 5px 2px rgba(17,16,255,0.05);
            }
          }
        }
      }
    }
  }
</style>
