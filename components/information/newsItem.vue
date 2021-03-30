<template>
  <div class="information-item" @click="nextPage">
    <div class="cardDec">
      <div class="cardImg">
        <img v-lazy="baseImageUrl + news.img" class="news-image">
      </div>
      <div class="cardText">
        <p class="cardTitle">{{ news.title }}</p>
        <!-- <div class="textDec" v-html="news.content">{{ news.content }}</div> -->
        <div class="cardBottom">
          <button class="btnMore">查看详情</button>
          <p class="date">
            <span class="source">来源：三益集团</span>
            <span class="public">发布时间：{{ news.updateTime.slice(5, 10) }}</span>
          </p>
        </div>
      </div>
    </div>

  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NewsItem',
  props: {
    news: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters(['baseImageUrl'])
  },
  methods: {
    // 跳转资讯详情
    nextPage () {
      this.$router.push({ name: 'newsdetail-id', params: { id: this.news.id } })
    }
  }
}
</script>

<style lang="less" scoped>
.information-item {
  width: 1200px;
  height: 232px;
  margin-bottom: 30px;
  background-color: #fff;
  padding: 30px;
  cursor: pointer;
  .cardDec {
    display: flex;
    justify-content: space-between;
    .cardImg {
      img {
        width: 300px;
        height: 172px;
        box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.08);
      }
    }
    .cardText {
      margin-left: 30px;
      position: relative;
      width: 800px;
      margin: 20px 0;
      .cardTitle {
        font-size: 16px;
        color: #333;
        line-height: 16px;
        font-weight: 700;
        text-align: left;
      }
      .textDec {
        font-size: 14px;
        color: #333;
        line-height: 24px;
        text-align: left;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-top: 13px;
        p {
          img {
            display: none;
          }
        }
      }
      .cardBottom {
        width: 100%;
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 0;
        .btnMore {
          width: 140px;
          height: 45px;
          line-height: 45px;
          background-color: #208fff;
          cursor: pointer;
          color: #fff;
          border-radius: 4px;
          outline: none;
          border: none;
        }
        .date {
          color: #999;
          font-size: 14px;
          .public {
            margin-left: 30px;
            height: 45px;
            line-height: 45px;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
