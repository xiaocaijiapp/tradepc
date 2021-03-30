<template>
  <div class="all-news-container">
    <div class="banner">
      <img src="https://static.qmwm777.com/web/banner/lALPDhmOvLb9uR3NAV7NB4A_1920_350.png" alt="">
    </div>
    <div class="bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/shopping">
          商城
        </BreadcrumbItem>
        <BreadcrumbItem>平台公告</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="news-content">
      <p class="platText">
        平台公告
      </p>
      <div v-for="item in newsList" :key="item.id">
        <platForm :news="item" />
      </div>
      <div v-if="totalRows > 0" class="paging">
        <Page :total="totalRows" :current="page" show-total show-elevator @on-change="changePage" />
      </div>
    </div>
  </div>
</template>

<script>
import platForm from '~/components/information/platForm'
export default {
  name: 'Index',
  components: {
    platForm
  },
  async asyncData ({ $axios, params, error }) {
    try {
      let newsList, totalRows
      const { page = 1 } = params
      await $axios.post('/delegate/notice/page', {
        pageNo: page,
        pageSize: 6,
        terminals: 0,
        type: [8],
        state: true
      }).then((res) => {
        if (res.data.code === 200) {
          newsList = res.data.data.rows
          totalRows = res.data.data.totalRows
        }
      })
      return {
        newsList,
        totalRows,
        page: page * 1
      }
    } catch (err) {
      return error(err)
    }
  },
  methods: {
    changePage (page) {
      this.$router.push('/receivable/' + page)
    }
  }
}
</script>

<style lang="less" scoped>
  .all-news-container {
    width: 100%;
    height: auto;
    margin: 0 auto;
    .banner {
      width: 100%;
      height: 350px;
      img {
        width: 100%;
        height: 350px;
      }
    }
    .bread {
      width: 1200px;
      margin: 8px auto;
    }
    .news-content {
      width: 1200px;
      background-color: #fff;
      padding: 40px 50px;
      margin: 0 auto;
      .platText{
        font-size: 24px;
        color: #333;
        font-weight: 700;
        text-align: left;
      }
    }
    .paging {
      width: 100%;
      height: 35px;
      margin-top: 30px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
    }
  }
</style>
