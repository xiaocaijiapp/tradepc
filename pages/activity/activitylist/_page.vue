<template>
  <div class="activity-list">
    <div class="bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">
          首页
        </BreadcrumbItem>
        <BreadcrumbItem to="/activity">
          平台开店
        </BreadcrumbItem>
        <BreadcrumbItem>活动通知</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="list">
      <div class="title">
        活动通知
      </div>
      <div class="list-box">
        <div v-for="item in list" :key="item.id" class="item" @click="$router.push('/activity/details/' + item.id)">
          <img :src="baseImageUrl + item.img" class="item-img">
          <div class="item-r-box">
            <p class="item-title">
              {{ item.title }}
            </p>
            <p class="item-date">
              {{ item.startTime }}
            </p>
          </div>
        </div>
      </div>
      <div class="paging">
        <Page :total="totalRows" :current="page" show-total show-elevator @on-change="changePage" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Activitylist',
  layout: 'shopping',
  async asyncData ({ $axios, params, error }) {
    try {
      let totalRows
      let list
      const { page } = params
      await $axios.post('/delegate/notice/page', {
        pageNo: page,
        pageSize: 6,
        terminals: 0,
        type: [3],
        state: true
      }).then((res) => {
        if (res.data.code === 200) {
          totalRows = res.data.data.totalRows
          list = res.data.data.rows
        }
      })
      return {
        totalRows,
        list,
        page: page * 1
      }
    } catch (err) {
      return error(err)
    }
  },
  computed: {
    ...mapGetters(['baseImageUrl'])
  },
  methods: {
    changePage (e) {
      this.$router.push('/activity/activitylist/' + e)
    }
  }
}
</script>

<style lang="less" scoped>
.activity-list {
  width: 1200px;
  margin: 0 auto;
  .bread {
    margin: 8px 0;
  }
  .list {
    width: 1200px;
    height: auto;
    background: #FFFFFF;
    padding: 0 30px;
    .title {
      font-size: 24px;
      font-weight: 500;
      text-align: left;
      color: #333333;
      line-height: 84px;
    }
    .list-box {
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: center;
      .item {
        height: 120px;
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        box-sizing: content-box;
        border-radius: 2px;
        box-shadow: 0px 2px 5px 2px rgba(17,16,255,0.05);
        margin-bottom: 30px;
        cursor: pointer;
        .item-img {
          width: 210px;
          height: 120px;
        }
        .item-r-box {
          flex: 1;
          height: 100%;
          margin-left: 20px;
          .item-title {
            font-size: 16px;
            font-weight: 500;
            text-align: left;
            color: #333333;
            line-height: 60px;
          }
          .item-date {
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
  .paging {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
  }
}
</style>
