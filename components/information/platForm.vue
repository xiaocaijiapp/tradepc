<template>
  <div class="information-item" @click="nextPage(news.type)">
    <div class="actionsList">
      <span class="redCircle" />
      <p class="actionsTitle">
        {{ news.title }}
      </p>
      <span class="source">来源：三益集团</span>
      <span class="republicTime">发布时间：{{ news.updateTime.slice(5, 10) }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PlatForm',
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
    nextPage (type) {
      if (type === 4) {
        this.$router.push({ name: 'newsdetail-id', params: { id: this.news.id } })
      } else if (type === 8) {
        this.$router.push({ name: 'receivable-details-id', params: { id: this.news.id } })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.information-item {
  width: 100%;
  background-color: #fff;
  cursor: pointer;
  margin-top: 20px;
  .actionsList {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px dashed #999999;
    cursor: pointer;
    padding: 20px 0;
    span:first-child {
      width: 10px;
      height: 10px;
      display: block;
      border-radius: 50%;
      margin-top: 10px;
      // margin-left: -30px;
      background-color: #0083ff;
    }
    .actionsTitle {
      font-size: 20px;
      color: #333;
      flex: 1;
      margin-left: 20px;
      text-align: left;
    }
    .source {
      font-size: 16px;
      color: #999;
      width: 120px;
      text-align: right;
      margin-left: 30px;
    }
    .republicTime {
      font-size: 16px;
      color: #999;
      width: 150px;
      text-align: right;
    }
  }
}
</style>
