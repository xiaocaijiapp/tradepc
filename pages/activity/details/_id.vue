<template>
  <div class="news-details-container">
    <div class="news-image">
      <img src="https://static.qmwm777.com/manager/2021/03/19/1616153642755/1372873998883467266.png" class="banner">
    </div>
    <div class="newsInfoBox">
      <div class="bread">
        <Breadcrumb separator=">">
          <BreadcrumbItem to="/">
            首页
          </BreadcrumbItem>
          <BreadcrumbItem to="/activity">
            活动通知
          </BreadcrumbItem>
          <BreadcrumbItem>
            通知详情
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="content">
        <div class="title-area">
          <div class="title">
            通知详情
          </div>
          <div class="title-en">
            Notice details
          </div>
        </div>
        <div class="news-text">
          <div class="news-title">
            {{ newsContent.title }}
          </div>
          <div class="news-date">
            {{ newsContent.createTime }}
          </div>
          <!-- <img v-lazy="baseImageUrl + newsContent.img" class="news-image"> -->
          <div class="news-desc" v-html="newsContent.content" />
          <p class="source">
            来源：三益集团
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Id',
  layout: 'shopping',
  async asyncData ({ $axios, params, error }) {
    try {
      let newsContent
      const { id } = params
      await $axios.get('/delegate/notice/' + id).then((res) => {
        if (res.data.code === 200) {
          newsContent = res.data.data
        }
      })
      return {
        newsContent
      }
    } catch (err) {
      return error(err)
    }
  },
  computed: {
    ...mapGetters(['baseImageUrl'])
  },
  created () {
    console.log(this.newsContent)
  }
}
</script>

<style lang="less" scoped>
  .news-details-container {
    width: 100%;
    .news-image {
      width: 100%;
      height: 350px;
      .banner {
        width: 100%;
        height: 100%;
      }
    }
    .newsInfoBox {
      width: 1200px;
      margin: 0 auto;
      .bread {
        margin: 15px 0;
      }
      .content {
        width: 1200px;
        height: auto;
        background-color: #ffffff;
        margin-bottom: 20px;
        .title-area {
          width: 100%;
          padding-left: 50px;
          padding-top: 22px;
          .title {
            font-size: 24px;
            font-weight: 500;
            text-align: left;
            color: #333333;
            line-height: 33px;
          }
          .title-en {
            font-size: 16px;
            font-weight: 400;
            text-align: left;
            color: #999999;
            line-height: 22px;
            margin-top: 5px;
          }
        }
        .news-text {
          width: 100%;
          height: auto;
          padding: 30px 100px;
          .news-title {
            font-size: 26px;
            font-weight: 500;
            text-align: center;
            color: #333333;
            line-height: 26px;
          }
          .news-date {
            font-size: 12px;
            font-weight: 400;
            text-align: center;
            color: #999999;
            line-height: 12px;
            margin-top: 20px;
            margin-bottom: 30px;
          }
          .news-image {
            width: 100%;
            height: 400px;
          }
          .news-desc {
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            line-height: 20px;
            margin-top: 30px;
          }
          .source {
            font-size: 14px;
            color: #999;
            text-align: left;
            margin-top: 30px;
          }
        }
      }
    }
  }
</style>
