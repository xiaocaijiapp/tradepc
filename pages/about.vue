<template>
  <div class="about-container">
    <div class="banner">
      <Carousel autoplay loop :autoplay-speed="3000" @click="toNextPage">
        <CarouselItem v-for="(item, index) in carouselList" :key="index">
          <div class="demo-carousel">
            <img :src="baseImageUrl + item.img" class="carouse-image">
          </div>
        </CarouselItem>
      </Carousel>
    </div>
    <div class="bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">
          首页
        </BreadcrumbItem>
        <BreadcrumbItem to="/about">
          关于我们
        </BreadcrumbItem>
        <BreadcrumbItem>{{ breadText }}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="nav-container">
      <div class="nav">
        <div class="content">
          <div class="nav-item" :style="current == 0 ? borderStyle : {}" @click="changeNav(0)">
            <!-- <span class="text" :style="current == 0 ? colorStyle : {}"> -->
            了解我们
            <!-- </span> -->
          </div>
          <div class="nav-item" :style="current == 3 ? borderStyle : {}" @click="changeNav(3)">
            <!-- <span class="text" :style="current == 3 ? colorStyle : {}"> -->
            模式公告
            <!-- </span> -->
          </div>
          <div class="nav-item" :style="current == 4 ? borderStyle : {}" @click="changeNav(4)">
            <!-- <span class="text" :style="current == 4 ? colorStyle : {}"> -->
            安全保障
            <!-- </span> -->
          </div>
          <div class="nav-item" :style="current == 5 ? borderStyle : {}" @click="changeNav(5)">
            <!-- <span class="text" :style="current == 5 ? colorStyle : {}"> -->
            联系我们
            <!-- </span> -->
          </div>
        </div>
      </div>
    </div>
    <div class="child-content">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'About',
  layout: 'shopping',
  async asyncData ({ $axios, error }) {
    try {
      let carouselList
      await $axios.post('/delegate/notice/v1', {
        carouselType: 7,
        terminals: 0,
        state: true
      }).then((res) => {
        if (res.data.code === 200) {
          carouselList = res.data.data.carouselList
        }
      })
      return {
        carouselList
      }
    } catch (err) {
      return error(err)
    }
  },
  computed: {
    ...mapGetters(['baseImageUrl'])
  },
  data () {
    return {
      current: 0,
      breadText: '了解我们',
      borderStyle: {
        backgroundColor: '#208fff',
        color: '#fff',
        fontWeight: 600
      },
      colorStyle: {
        color: '#138cff',
        fontWeight: 700
      }
    }
  },
  watch: {
    $route: {
      handler (to) {
        const path = to.path
        this.currentIndex(path)
      },
      // 深度观察监听
      deep: true
    }
  },
  created () {
    this.currentIndex(this.$route.path)
  },
  methods: {
    toNextPage (e) {
      const current = this.carouselList[e]
      switch (current.linkType) {
        case 0:
          // 不可以跳转
          break
        case 1:
          // 跳转外部
          this.a_href('http://' + current.link)
          break
        case 2:
          // 跳转商品详情
          this.$router.push({ name: 'details-id', params: { id: current.id } })
          break
        case 3:
          // 跳转资讯详情
          this.$router.push({ name: 'newsdetail-id', params: { id: current.id } })
          break
        case 4:
          // 跳转活动详情
          this.$router.push({ name: 'activity-details-id', params: { id: current.id } })
          break
        case 5:
          // 跳转公告详情
          this.$router.push({ name: 'newsdetail-id', params: { id: current.id } })
          break
        case 6:
          // 跳转新闻详情
          this.$router.push({ name: 'newsdetail-id', params: { id: current.id } })
          break
        case 7:
          // 跳转攻略详情
          this.$router.push({ name: 'activity-operating-id', params: { id: current.id } })
          break
        default:
          break
      }
    },
    a_href (href) {
      const a = document.createElement('a')
      a.setAttribute('href', href)
      a.setAttribute('target', '_blank')
      a.setAttribute('id', 'js_a')
      // 防止反复添加
      if (document.getElementById('js_a')) {
        document.body.removeChild(document.getElementById('js_a'))
      }
      document.body.appendChild(a)
      a.click()
    },
    currentIndex (path) {
      switch (path) {
        case '/about':
          this.current = 0
          this.changeNav(0)
          break
        case '/about/company':
          this.current = 1
          this.changeNav(1)
          break
        case '/about/project':
          this.current = 2
          this.changeNav(2)
          break
        case '/about/announcement':
          this.current = 3
          this.changeNav(3)
          break
        case '/about/security':
          this.current = 4
          this.changeNav(4)
          break
        case '/about/contactus':
          this.current = 5
          this.changeNav(5)
          break
        default:
          this.current = 0
          this.changeNav(0)
          break
      }
    },
    changeNav (index) {
      this.current = index
      switch (index) {
        case 0:
          this.breadText = '了解我们'
          this.$router.push('/about')
          break
        case 1:
          // 公司介绍
          this.breadText = '公司介绍'
          this.$router.push('/about/company')
          break
        case 2:
          // 项目介绍
          this.breadText = '项目介绍'
          this.$router.push('/about/project')
          break
        case 3:
          // 模式公告
          this.breadText = '模式公告'
          this.$router.push('/about/announcement')
          break
        case 4:
          // 安全保障
          this.breadText = '安全保障'
          this.$router.push('/about/security')
          break
        case 5:
          // 联系我们
          this.breadText = '联系我们'
          this.$router.push('/about/contactus')
          break
        default:
          this.breadText = '了解我们'
          this.$router.push('/about')
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.about-container {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  .banner {
    width: 100%;
    height: 350px;
  }
  .bread {
    padding: 14px 360px;
  }
  .nav-container {
    width: 100%;
    height: 60px;
    padding: 0 360px;
    .nav {
      width: 100%;
      height: 100%;
      position: relative;
      box-sizing: border-box;
      .content {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin: 10px auto 0px;
        width: 950px;
        .nav-item {
          width: 200px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          border-radius: 8px;
          cursor: pointer;
          color: #333;
          font-size: 14px;
          background-color: #f9f9f9;
          box-shadow: 0px 2px 5px 2px rgba(17, 16, 255, 0.05);
        }
      }
    }
  }
}
</style>
