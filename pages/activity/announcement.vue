<template>
  <div class="announcement-container">
    <div class="bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">
          首页
        </BreadcrumbItem>
        <BreadcrumbItem to="/activity">
          新闻资讯
        </BreadcrumbItem>
        <BreadcrumbItem>平台公告</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="announcement-area">
      <div class="title">
        平台公告
      </div>
      <div class="announcement-list">
        <div class="list-item" v-for="item in list" :key="item.id">
          <div class="item-l">
            <img src="~/assets/images/index/carcle.png" class="ico">
            <span class="name">{{item.title}}</span>
          </div>
          <div class="item-r">
            发布时间:
            <span>{{item.createTime}}</span>
          </div>
        </div>
      </div>
      <div class="paging">
        <Page :total="totalRows" show-total />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Announcement',
  layout: 'shopping',
  data () {
    return {
      list: [],
      totalRows: 0
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList (page = 1) {
      this.$axios.post('/delegate/notice/page', {
        pageNo: page,
        pageSize: 6,
        terminals: 0,
        type: [4],
        state: true
      }).then((res) => {
        if (res.data.code === 200) {
          this.list = res.data.data.rows
          this.totalRows = res.data.data.totalRows
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.announcement-container {
  width: 1200px;
  margin: 0 auto;
  .bread {
    margin: 8px 0;
  }
  .announcement-area {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    background-color: #FFFFFF;
    border-radius: 1px;
    padding-bottom: 10px;
    .title {
      font-size: 24px;
      font-weight: 500;
      text-align: left;
      color: #333333;
      line-height: 80px;
      width: 100%;
      height: 80px;
      padding-left: 30px;
    }
    .announcement-list {
      width: 100%;
      height: auto;
      padding: 0 50px;
      .list-item:last-child{
        border: none;
      }
      .list-item {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px dashed #999999;
        height: 60px;
        .item-l {
          display: flex;
          align-items: center;
          .ico {
            width: 12px;
            height: 12px;
          }
          .name {
            font-size: 16px;
            font-weight: 500;
            text-align: left;
            color: #333333;
            line-height: 16px;
            margin-left: 20px;
          }
        }
        .item-r {
          font-size: 14px;
          font-weight: 400;
          text-align: left;
          color: #999999;
          line-height: 14px;
        }
      }
    }
    .paging {
      width: 100%;
      height: 60px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
