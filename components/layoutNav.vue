<template>
  <div class="nav-container">
    <!--主导航区域-->
    <div class="nav">
      <nuxt-link to="/">
        <span class="nav-item" :class="$route.name.includes('index') ? 'active' : '' ">首页</span>
      </nuxt-link>
      <nuxt-link to="/shopping">
        <span class="nav-item" :class="shopArr.includes($route.name) ? 'active' : '' ">商城</span>
      </nuxt-link>
      <nuxt-link to="/newsinformation">
        <span class="nav-item" :class="newsArr.includes($route.name) ? 'active' : '' ">新闻资讯</span>
      </nuxt-link>
      <nuxt-link to="/activity">
        <span class="nav-item" :class="$route.name.includes('activity') ? 'active' : '' ">平台开店</span>
      </nuxt-link>
      <nuxt-link to="/about">
        <span class="nav-item" :class="$route.name.includes('about') ? 'active' : '' ">关于我们</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LayoutNav',
  computed: {
    ...mapGetters(['loginStatus', 'headImg', 'baseImageUrl'])
  },
  data () {
    return {
      shopArr: ['shopping', 'receivable-page', 'list-page', 'orderpay', 'details-id', 'shopInfo-page', 'store-id', 'store-sale-id', 'order', 'paystate', 'addpaycard'],
      newsArr: ['newsinformation-page', 'newsdetail-id', 'newsinformation-cross-page', 'newsinformation-marketing-page', 'newsinformation-platform-page']
    }
  }
}
</script>

<style lang="less" scoped>
.nav-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  .nav {
    height: 100%;
    flex: 1;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    .active {
      font-weight: 600;
      position: relative;
      color: #1491ff;
      line-height: 15px;
    }
    .active::after {
      content: "";
      display: inline-block;
      position: absolute;
      width: 100%;
      height: 6px;
      border-radius: 4px;
      top: 23px;
      left: 0;
      background-color: #1491ff;
    }
    a {
      cursor: pointer;
      display: flex;
      align-items: center;
      height: 100%;
      font-size: 16px;
      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 15px;
    }
  }
  .userInfo {
    width: 40px;
    height: 40px;
    margin-right: 20px;
    cursor: pointer;
    .user-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 50%;
    }
  }
}
</style>
