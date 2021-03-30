<template>
  <div class="shopping-container">
    <!--banner-->
    <div class="banner">
      <Carousel autoplay loop :autoplay-speed="3000" @on-click="toNextPage">
        <CarouselItem v-for="(item, index) in carouselList" :key="index">
          <div class="demo-carousel">
            <img :src="baseImageUrl + item.img" class="carouse-image">
          </div>
        </CarouselItem>
      </Carousel>
    </div>
    <div class="content">
      <!--一层导航-->
      <div class="nav">
        <div class="nav-item" @click="$router.push('/about')">
          <div class="item-l">
            <div class="title">
              <span class="text">了解我们</span>
            </div>
            <div class="item-r" />
          </div>
          <div class="desc">
            带你了解企业平台模式，旨在为国人提供专业化、 便捷化的外贸交易平台。
          </div>
        </div>
        <div class="nav-item" @click="$router.push('/about/security')">
          <div class="item-l">
            <div class="title">
              <span class="text">安全保障</span>
            </div>
            <div class="item-r" />
          </div>
          <div class="desc">
            交易安全、支付安全、政策支持，三重保障。全方位守护您的财产安全！
          </div>
        </div>
        <div class="nav-item" @click="$router.push('/shopInfo/1')">
          <div class="item-l">
            <div class="title">
              <span class="text">店铺信息</span>
            </div>
            <div class="item-r" />
          </div>
          <div class="desc">
            优选外贸商家签约合作。查看商家企业资质、店铺销量数据，优质商家才是用户增值的保障。
          </div>
        </div>
      </div>
      <!--占位-->
      <div style="width: 100%;height: 130px" />
      <!-- 平台公告 -->
      <div class="announcement">
        <p class="anceTitle">
          平台公告
        </p>
        <img src="~/assets/images/index/speaker-one.png" alt="">
        <div class="scroll-area">
          <scroll
            :height="30 * partSize"
            @complete="handleComplete"
            @half="handleHalf"
          >
            <div v-for="(item, index) in partA" :key="`a${index}`" class="item part-a" @click="$router.push({ name: 'receivable-details-id', params: { id: item.id } })">
              <span class="title-name">{{ item.title }}</span>
              <span class="create-time">发布时间:{{ item.createTime }}</span>
            </div>
            <div v-for="(item, index) in partB" :key="`b${index}`" class="item part-b" @click="$router.push({ name: 'receivable-details-id', params: { id: item.id } })">
              <span class="title-name">{{ item.title }}</span>
              <span class="create-time">发布时间:{{ item.createTime }}</span>
            </div>
          </scroll>
        </div>
        <p class="watchMore" @click="$router.push('/receivable/1')">
          更多
        </p>
      </div>
      <!--优选好货-->
      <div class="optimization">
        <div class="title">
          <div class="title-l">
            <h3 class="title-name">
              今日热门
            </h3>
            <span class="small-title">Selling item</span>
          </div>
          <div class="title-r" @click="$router.push({path:'/list/1', query: { type: 'list'}})">
            全部商品
          </div>
        </div>
        <div class="goods-list">
          <agency v-for="item in optimizationData" :key="item.id" :agencies="item" />
        </div>
      </div>
      <!--热卖单品-->
      <div class="hot-content">
        <div class="title">
          <div class="title-l">
            <h3 class="title-name">
              爆款好货
            </h3>
            <span class="small-title">Purchasing goods</span>
          </div>
        </div>
        <div class="goods-list">
          <agency v-for="item in hotData" :key="item.id" :agencies="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import agency from '../components/shop/agency'
import scroll from '../components/scroll'
export default {
  name: 'Shopping',
  components: {
    agency,
    scroll
  },
  layout: 'shopping',
  async asyncData ({ $axios, error }) {
    try {
      const { data } = await $axios.post('/delegate/goods/indexGoodsList')
      const shopData = data.data
      // 获取商城首页轮播图
      let carouselList = []
      let repayList = []
      await $axios.post('/delegate/notice/v1', {
        carouselType: 4,
        map: {
          8: 20
        },
        terminals: 0
      }).then((res) => {
        if (res.data.code === 200) {
          carouselList = res.data.data.carouselList
          repayList = res.data.data.repayList
        }
      })
      return {
        optimizationData: shopData.slice(0, 5), // 今日热门
        hotData: shopData.slice(6), // 爆款好货
        carouselList,
        repayList
      }
    } catch (err) {
      return error(err)
    }
  },
  data () {
    return {
      userSearchKeyWords: '',
      // 每个part包含的数据条数
      partSize: 1,
      // partA在items中的开始索引
      partAStartIndex: 0,
      // partB在items中的开始索引
      partBStartIndex: 1
    }
  },
  computed: {
    ...mapGetters(['baseImageUrl']),
    // partA中的数据
    partA () {
      if (this.repayList.length > this.partSize) {
        return this.repayList.concat(this.repayList.slice(0, this.partSize)).slice(this.partAStartIndex, this.partAStartIndex + this.partSize)
      } else {
        return this.repayList
      }
    },
    // partB中的数据
    partB () {
      if (this.repayList.length > this.partSize) {
        return this.repayList.concat(this.repayList.slice(0, this.partSize)).slice(this.partBStartIndex, this.partBStartIndex + this.partSize)
      } else {
        return []
      }
    }
  },
  methods: {
    // 当滚动至一半的位置时，修改partAStartIndex，计算属性partA会自动更新内容
    handleHalf () {
      this.partAStartIndex = (this.partBStartIndex + this.partSize) % this.repayList.length
    },
    // 当滚动归位时，修改partBStartIndex，计算属性partB会自动更新内容
    handleComplete () {
      this.partBStartIndex = (this.partAStartIndex + this.partSize) % this.repayList.length
    },
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
    }
  }
}
</script>

<style lang="less" scoped>
.shopping-container {
  width: 100%;
  min-height: calc(100vh - 501px);
  background-color: #f3f4f6;
  .banner {
    width: 100%;
    height: 500px;
    .demo-carousel {
      width: 100%;
      height: 500px;
      .carouse-image{
        width: 100%;
        height: 500px;
      }
    }
  }
  .content {
    width: 100%;
    height: auto;
    padding: 0 360px;
    position: relative;
    .nav {
      width: calc(100vw - 720px);
      height: 175px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      position: absolute;
      top: -64px;
      z-index: 99;
      .nav-item:nth-of-type(1),
      .nav-item:nth-of-type(2) {
        border-right: none;
      }

      .nav-item:nth-of-type(1) {
        .item-l {
          .title::before {
            content: "";
            display: inline-block;
            width: 27px;
            height: 27px;
            background-image: url("~/assets/images/index/learn-me.png");
            background-size: 100% 100%;
          }
        }
      }

      .nav-item:nth-of-type(2) {
        .item-l {
          .title::before {
            content: "";
            display: inline-block;
            width: 27px;
            height: 27px;
            background-image: url("~/assets/images/index/security.png");
            background-size: 100% 100%;
          }
        }
      }

      .nav-item:nth-of-type(3) {
        .item-l {
          .title::before {
            content: "";
            display: inline-block;
            width: 27px;
            height: 27px;
            background-image: url("~/assets/images/index/store.png");
            background-size: 100% 100%;
          }
        }
      }

      .nav-item {
        flex: 1;
        height: 100%;
        padding: 20px 20px 0px 30px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        background-color: #ffffff;
        border: 1px solid #f0f0f0;
        cursor: pointer;
        .item-l {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;
          .item-r {
            width: 55px;
            height: 55px;
            background-color: #0884ff;
            border-radius: 50%;
            background-image: url("~/assets/images/index/right-top.png");
          }
          .title {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;
            .text {
              font-size: 24px;
              font-weight: 600;
              color: #333333;
              line-height: 33px;
              margin-left: 10px;
            }
          }
        }
        .desc {
          width: 100%;
          flex: 1;
          font-size: 16px;
          font-weight: 400;
          color: #999999;
          line-height: 22px;
          margin-top: 28px;
        }
      }

      .nav-item:nth-of-type(1):hover {
        background-color: #0884ff;
        border-left: 1px solid #0884ff;
        border-bottom: 1px solid #0884ff;
        border-top: 1px solid #0884ff;
        border-right: none;
        .item-l {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;
          .item-r {
            width: 55px;
            height: 55px;
            background-color: #0884ff;
            border-radius: 50%;
            background-image: url("~/assets/images/index/right-top-hover.png");
          }
          .title::before {
            content: "";
            display: inline-block;
            width: 27px;
            height: 27px;
            background-image: url("~/assets/images/index/learn-me-active.png");
            background-size: 100% 100%;
          }
          .title {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;
            .text {
              font-size: 24px;
              font-weight: 600;
              color: #ffffff;
              line-height: 33px;
              margin-left: 10px;
            }
          }
        }
        .desc {
          width: 100%;
          flex: 1;
          font-size: 16px;
          font-weight: 400;
          color: #ffffff;
          line-height: 22px;
          margin-top: 28px;
        }
      }
      .nav-item:nth-of-type(2):hover {
        background-color: #0884ff;
        border-left: 1px solid #0884ff;
        border-bottom: 1px solid #0884ff;
        border-top: 1px solid #0884ff;
        border-right: none;
        .item-l {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;

          .item-r {
            width: 55px;
            height: 55px;
            background-color: #0884ff;
            border-radius: 50%;
            background-image: url("~/assets/images/index/right-top-hover.png");
          }

          .title::before {
            content: "";
            display: inline-block;
            width: 27px;
            height: 27px;
            background-image: url("~/assets/images/index/security-active.png");
            background-size: 100% 100%;
          }

          .title {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;

            .text {
              font-size: 24px;
              font-weight: 600;
              color: #ffffff;
              line-height: 33px;
              margin-left: 10px;
            }
          }
        }
        .desc {
          width: 100%;
          flex: 1;
          font-size: 16px;
          font-weight: 400;
          color: #ffffff;
          line-height: 22px;
          margin-top: 28px;
        }
      }
      .nav-item:nth-of-type(3):hover {
        background-color: #0884ff;
        border: 1px solid #0884ff;
        .item-l {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;

          .item-r {
            width: 55px;
            height: 55px;
            background-color: #0884ff;
            border-radius: 50%;
            background-image: url("~/assets/images/index/right-top-hover.png");
          }

          .title::before {
            content: "";
            display: inline-block;
            width: 27px;
            height: 27px;
            background-image: url("~/assets/images/index/store-active.png");
            background-size: 100% 100%;
          }

          .title {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;

            .text {
              font-size: 24px;
              font-weight: 600;
              color: #ffffff;
              line-height: 33px;
              margin-left: 10px;
            }
          }
        }
        .desc {
          width: 100%;
          flex: 1;
          font-size: 16px;
          font-weight: 400;
          color: #ffffff;
          line-height: 22px;
          margin-top: 28px;
        }
      }
    }
    .announcement {
      width: 1200px;
      background-color: #fff;
      border-radius: 1px;
      height: 84px;
      line-height: 84px;
      padding: 0 30px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      .anceTitle {
        font-size: 24px;
        font-weight: 500;
        text-align: left;
        color: #333333;
        line-height: 24px;
      }
      img {
        width: 48px;
        height: 48px;
        margin-left: 20px;
        display: inline-block;
        box-sizing: border-box;
        vertical-align: middle;
      }
      .scroll-area{
        flex: 1;
        height: 30px;
        cursor: pointer;
        /* item 总高度为30 */
        .item {
          line-height: 28px;
          height: 28px;
          .title-name {
            font-size: 16px;
            font-weight: 500;
            text-align: left;
            color: #333333;
            line-height: 16px;
          }
          .create-time {
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            color: #999999;
            line-height: 14px;
            margin-left: 30px;
          }
        }
      }
      .watchMore {
        font-size: 14px;
        color: #333;
        float: right;
        cursor: pointer;
      }
    }
    .optimization,
    .hot-content,
    .agency-content {
      width: 1200px;
      height: auto;
      background-color: #ffffff;
      border-radius: 1px;
      padding: 20px 30px;
      margin-top: 30px;
      .title {
        width: 100%;
        height: 63px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        .title-l {
          .title-name {
            font-size: 24px;
            font-weight: 400;
            text-align: left;
            color: #666666;
            line-height: 33px;
          }
        }
        .title-r {
          font-size: 14px;
          font-weight: 400;
          text-align: left;
          color: #333333;
          line-height: 20px;
          cursor: pointer;
        }
        .small-title {
          font-size: 16px;
          font-weight: 500;
          text-align: left;
          color: #c9c9c9;
          line-height: 16px;
          margin-top: 15px;
          display: inline-block;
        }
      }
      .goods-list {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        margin-top: 30px;
        .agency-container:nth-of-type(5n+1){
          margin-left: 0;
        }
        .agency-container {
          margin-left: 30px;
        }
      }
    }
    .optimization .goods-list {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      margin-top: 30px;
    }
    .hot-content {
      margin-top: 20px;
    }
    .agency-content {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
}
</style>
