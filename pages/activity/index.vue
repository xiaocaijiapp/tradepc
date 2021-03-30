<template>
  <div class="activity-container">
    <div class="banner">
      <img :src="baseImageUrl + carouselList[0].img" class="carouse-image">
    </div>
    <div class="content">
      <!--活动通知-->
      <div class="event-notification">
        <div class="event-title-box">
          <span class="title-l">活动通知</span>
          <span class="title-r" @click="$router.push('/activity/activitylist/1')">更多</span>
        </div>
        <div class="event-list">
          <div v-for="item in notification" :key="item.id" class="list-item" @click="$router.push('/activity/details/' + item.id)">
            <img v-lazy="baseImageUrl + item.img" alt="" class="cation-icon">
            <p class="cation-title">
              {{ item.title }}
            </p>
            <div class="cation-date">
              {{ item.startTime }}
            </div>
          </div>
        </div>
      </div>
      <!--热门平台-->
      <div class="hot-unit">
        <div class="event-title-box">
          <span class="title-l">热门平台</span>
        </div>
        <div class="unit-list">
          <div class="unit-item">
            <img src="~/assets/images/index/yamaxun.png" class="unit-img">
            <p class="name">
              亚马逊
            </p>
            <p class="desc">
              严格要求开店资质，招商经理 全权指导，打造优质listing
            </p>
            <div class="label-group">
              <span class="label-name" @click="$router.push({path: '/richtext', query: { type: 'amazon', index: 0 }})">亚马逊开店流程</span>
              <span class="label-name" @click="$router.push({path: '/richtext', query: { type: 'amazon', index: 1 }})">知识体系</span>
              <span class="label-name" @click="$router.push({path: '/richtext', query: { type: 'amazon', index: 2 }})">站内广告</span>
            </div>
          </div>
          <div class="unit-item">
            <img src="~/assets/images/index/letian-logo.png" class="unit-img">
            <p class="name">
              乐天
            </p>
            <p class="desc">
              高标准高费用开店，专职EC指导 一键完成跨境交易
            </p>
            <div class="label-group">
              <span class="label-name" @click="$router.push({path: '/richtext', query: { type: 'eBay', index: 0 }})">日本乐天入驻流程</span>
              <span class="label-name" @click="$router.push({path: '/richtext', query: { type: 'eBay', index: 1 }})">知识体系</span>
              <span class="label-name" @click="$router.push({path: '/richtext', query: { type: 'eBay', index: 2 }})">热卖产品 </span>
            </div>
          </div>
          <div class="unit-item">
            <img src="~/assets/images/index/starday-logo.png" class="unit-img">
            <p class="name">
              Starday商城
            </p>
            <p class="desc">
              入驻方便简单、0费用开店，招商经理 倾心传授大卖秘籍
            </p>
            <div class="label-group">
              <span class="label-name" @click="$router.push({path: '/richtext', query: { type: 'starDay', index: 0 }})">开店</span>
              <span class="label-name" @click="$router.push({path: '/richtext', query: { type: 'starDay', index: 1 }})">选品</span>
              <span class="label-name" @click="$router.push({path: '/richtext', query: { type: 'starDay', index: 2 }})">排名规则</span>
            </div>
          </div>
        </div>
      </div>
      <!--运营攻略-->
      <div class="operating-content">
        <div class="event-title-box">
          <span class="title-l">运营攻略</span>
          <span class="title-r" @click="$router.push('/activity/operatinglist/1')">更多</span>
        </div>
        <div class="operating-list">
          <div v-for="item in strategyList" :key="item.id" class="operating-item" @click="$router.push('/activity/operating/' + item.id)">
            <img v-lazy="baseImageUrl + item.img" class="operating-img">
            <div class="operating-box">
              <p class="operating-title">
                {{ item.title }}
              </p>
              <p class="operating-data">
                {{ item.updateTime }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Activity',
  layout: 'shopping',
  async asyncData ({ $axios, error }) {
    try {
      let notification // 活动通知
      let strategyList // 公告
      let carouselList // banner
      let platformAmazonList // 亚马逊
      let platformLotteList // 乐天
      let platformStardayList // starday
      await $axios.post('/delegate/notice/v1', {
        carouselType: 8,
        map: {
          3: 3,
          16: 3,
          13: 3,
          10: 3,
          9: 4
        },
        terminals: 0,
        state: true
      }).then((res) => {
        if (res.data.code === 200) {
          carouselList = res.data.data.carouselList
          notification = res.data.data.inFormNoticeList || []
          strategyList = res.data.data.strategyList || []
          platformAmazonList = res.data.data.platformAmazonList // 亚马逊
          platformLotteList = res.data.data.platformLotteList // 乐天
          platformStardayList = res.data.data.platformStardayList // starday
        }
      })
      return {
        notification,
        strategyList,
        carouselList,
        platformAmazonList,
        platformLotteList,
        platformStardayList
      }
    } catch (err) {
      return error(err)
    }
  },
  computed: {
    ...mapGetters(['baseImageUrl'])
  },
  mounted () {
    this.setRich({
      eBay: this.platformLotteList,
      starDay: this.platformStardayList,
      amazon: this.platformAmazonList
    })
  },
  methods: {
    ...mapMutations(['setRich'])
  }
}
</script>

<style lang="less" scoped>
.activity-container {
  width: 100%;
  height: auto;
  .banner {
    width: 100%;
    height: 350px;
    img {
      width: 100%;
      height: 350px;
    }
  }
  .content {
    width: 1200px;
    height: auto;
    margin: 20px auto;
    background: #ffffff;
    .event-notification,
    .hot-unit,
    .operating-content {
      width: 100%;
      padding: 0 50px;
      .event-title-box {
        width: 100%;
        height: 96px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        .title-l {
          font-size: 24px;
          font-weight: 500;
          text-align: left;
          color: #333333;
          line-height: 96px;
        }
        .title-r {
          font-size: 14px;
          font-weight: 400;
          text-align: left;
          color: #333333;
          line-height: 96px;
          cursor: pointer;
        }
      }
      .event-list {
        width: 100%;
        height: auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        .list-item {
          width: 350px;
          height: 320px;
          background: #ffffff;
          border-radius: 2px;
          box-shadow: 0px 2px 5px 2px rgba(17, 16, 255, 0.05);
          cursor: pointer;
          .cation-icon {
            width: 350px;
            height: 200px;
          }
          .cation-title {
            font-size: 16px;
            font-weight: 500;
            text-align: left;
            color: #333333;
            line-height: 26px;
            width: 100%;
            padding: 0 27px 0 20px;
          }
          .cation-date {
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            color: #999999;
            line-height: 30px;
            padding-left: 20px;
          }
        }
      }
      .unit-list {
        width: 100%;
        height: auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        .unit-item {
          width: 350px;
          height: 364px;
          background: #ffffff;
          border-radius: 2px;
          box-shadow: 0px 2px 5px 2px rgba(17, 16, 255, 0.05);
          display: flex;
          flex-flow: column nowrap;
          justify-content: flex-start;
          align-items: center;
          .unit-img {
            width: 350px;
            height: 164px;
          }
          .name {
            font-size: 20px;
            font-weight: 500;
            text-align: center;
            color: #333333;
            line-height: 60px;
          }
          .desc {
            font-size: 14px;
            font-weight: 400;
            text-align: center;
            color: #999999;
            line-height: 24px;
            padding: 0 80px;
          }
          .label-group {
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
            .label-name {
              margin: 0 5px;
              border: 1px solid #d5d5d5;
              font-size: 12px;
              font-weight: 400;
              text-align: center;
              color: #0083ff;
              line-height: 12px;
              padding: 10px 15px;
              cursor: pointer;
            }
          }
        }
      }
      .operating-list {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        .operating-item {
          width: 535px;
          height: 120px;
          background: #ffffff;
          border-radius: 2px;
          box-shadow: 0px 2px 5px 2px rgba(17, 16, 255, 0.05);
          margin-bottom: 30px;
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          align-items: flex-start;
          cursor: pointer;
          .operating-img {
            width: 210px;
            height: 120px;
          }
          .operating-box {
            margin-left: 30px;
            width: 265px;
            .operating-title {
              font-size: 16px;
              font-weight: 500;
              text-align: left;
              color: #333333;
              line-height: 66px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .operating-data {
              font-size: 14px;
              font-weight: 400;
              text-align: left;
              color: #999999;
              line-height: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
