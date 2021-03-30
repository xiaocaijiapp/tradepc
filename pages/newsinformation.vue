<template>
  <div class="news-container">
    <div class="news-image">
      <img v-for="(item, index) in carouselList" :key="index" :src="baseImageUrl+item.img" class="banner" @click="toNextPage(index)" />
    </div>
    <div class="information">
      <div class="infoDetail">
        <div class="content">
          <div class="topNav">
            <div class="navList" :style="navIndex == 0 ? navActiveStyle : {}" @click="changeNews(0)">
              行业新闻
            </div>
            <div class="navList" :style="navIndex == 1 ? navActiveStyle : {}" @click="changeNews(1)">
              跨境资讯
            </div>
            <div class="navList" :style="navIndex == 2 ? navActiveStyle : {}" @click="changeNews(2)">
              营销推广
            </div>
            <div class="navList" :style="navIndex == 3 ? navActiveStyle : {}" @click="changeNews(3)">
              平台公告
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
  name: 'NewsInformation',
  layout: 'shopping',
  async asyncData ({ $axios, error }) {
    try {
      let carouselList
      await $axios.post('/delegate/notice', {
        carouselType: 3,
        noticeTypes: [],
        pageSize: 6,
        terminals: 0
      }).then((res) => {
        carouselList = res.data.data.carouselList
      })
      return {
        carouselList
      }
    } catch (err) {
      return error(err)
    }
  },
  data () {
    return {
      navIndex: 0,
      breadText: '全部',
      navActiveStyle: {
        backgroundColor: '#208fff',
        color: '#fff',
        fontWeight: 600
      }
    }
  },
  created () {
    this.currentIndex(this.$route.name)
    console.log(this.carouselList)
  },
  computed: {
    ...mapGetters(['baseImageUrl'])
  },
  methods: {
    currentIndex (name) {
      switch (name) {
        case 'newsinformation-page':
          this.navIndex = 0
          this.changeNews(0)
          break
        case 'newsinformation-cross-page':
          this.navIndex = 1
          this.changeNews(1)
          break
        case 'newsinformation-marketing-page':
          this.navIndex = 2
          this.changeNews(2)
          break
        case 'newsinformation-platform-page':
          this.navIndex = 3
          this.changeNews(3)
          break
        default:
          this.changeNews(0)
          break
      }
    },
    changeNews (index) {
      this.navIndex = index
      switch (index) {
        case 0:
          this.breadText = '行业新闻'
          this.$router.push('/newsinformation')
          break
        case 1:
          this.breadText = '跨境资讯'
          this.$router.push('/newsinformation/cross/1')
          break
        case 2:
          this.breadText = '营销推广'
          this.$router.push('/newsinformation/marketing/1')
          break
        case 3:
          this.breadText = '平台公告'
          this.$router.push('/newsinformation/platform/1')
          break
        default:
          this.breadText = '行业新闻'
          this.$router.push('/newsinformation')
          break
      }
    },
    toNextPage (e) {
      const current = this.carouselList[e]
      switch (current.linkType) {
        case 0:
          break
        case 1:
          // 跳转外部
          window.location.href = 'https://' + current.link
          break
        case 2:
          // 跳转商品详情
          this.$router.push({ name: 'details-id', params: { id: current.id } })
          break
        case 3:
          // 跳转资讯详情
          this.$router.push({ name: 'details-id', params: { id: current.id } })
          break
        case 4:
          // 跳转活动详情
          this.$router.push({ name: 'details-id', params: { id: current.id } })
          break
        case 5:
          // 跳转公告详情
          this.$router.push({ name: 'details-id', params: { id: current.id } })
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.news-container {
  width: 100%;
  background-color: #f3f4f6;
  .news-image {
    width: 100%;
    height: 350px;
    .banner {
      width: 100%;
      height: 100%;
    }
  }
  .information {
    background-color: #f3f4f6;
    width: 100%;
    padding: 0px 360px 0px;
    .infoDetail {
      background-color: #f3f4f6;
      width: 1200px;
      margin-top: 40px;
      .content {
        width: 100%;
        text-align: center;
        .topNav {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          margin: 10px auto 0px;
          width: 950px;
          .navList {
            width: 200px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            border-radius: 8px;
            cursor: pointer;
            color: #333;
            font-size: 14px;
            background-color: #fff;
            box-shadow: 0px 2px 5px 2px rgba(17, 16, 255, 0.05);
          }
        }
        .bottomContent{
          padding: 40px 0 50px 0;
          min-height: 200px;
        }
      }
    }
  }
}
</style>
