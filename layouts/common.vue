<template>
  <div class="default-content">
    <div class="head-area">
      <!--导航-->
      <div class="nav-guiding">
        <div class="nav-content">
          <img src="~/assets/images/index/logo.png" class="logo" @click="$router.push('/')">
          <!--主导航区域-->
          <div v-if="functionGuiding" class="nav">
            <nuxt-link to="/">
              <span class="nav-item" :class="$route.name.includes('index') ? 'active' : '' ">首页</span>
            </nuxt-link>
            <nuxt-link to="/newsinformation">
              <span class="nav-item">商城</span>
            </nuxt-link>
            <nuxt-link to="/newsinformation">
              <span class="nav-item" :class="$route.name.includes('newsinformation') ? 'active' : '' ">新闻资讯</span>
            </nuxt-link>
            <nuxt-link to="/newsinformation">
              <span class="nav-item">平台开店</span>
            </nuxt-link>
            <nuxt-link to="/about">
              <span class="nav-item" :class="$route.name.includes('about') ? 'active' : '' ">关于我们</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="main-view-area">
      <Nuxt />
    </div>
    <layout-footer />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import layoutFooter from '../components/layoutFooter'
export default {
  comments: {
    layoutFooter
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['functionGuiding'])
  }
}
</script>

<style lang="less" scoped>
  .default-content {
    width: 100%;
    min-height: 100vh;
    .head-area {
      .nav-guiding {
        width: 100%;
        height: 96px;
        background-color: #ffffff;
        .nav-content {
          width: 1200px;
          height: 100%;
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          align-items: center;
          margin: 0 auto;
          .logo {
            width: 343px;
            height: 64px;
            object-fit: contain;
            cursor: pointer;
          }
          .nav {
            height: 100%;
            flex: 1;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;
            .active {
              color: #1491ff;
            }
            a {
              font-size: 16px;
              color: #000000;
              line-height: 22px;
              cursor: pointer;
              display: flex;
              align-items: center;
              height: 100%;
            }
          }
          .title {
            font-size: 24px;
            font-weight: 500;
            color: #333333;
            line-height: 33px;
            margin-left: 30px;
          }
        }
      }
    }
    .main-view-area {
      width: 100%;
      min-height: calc( 100vh - 422px);
      background-color: #F3F4F6;
    }
  }
</style>
