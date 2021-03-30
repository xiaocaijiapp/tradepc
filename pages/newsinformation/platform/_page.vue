<template>
  <div class="all-news-container">
    <div class="news-content">
      <p class="platText">平台公告</p>
      <div v-for="item in newsList" :key="item.id">
        <platForm :news="item" />
      </div>
    </div>
    <div class="paging" v-if="totalRows > 0">
      <Page :total="totalRows" show-total show-elevator @on-change="changePage" />
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
        pageSize: 8,
        terminals: 0,
        type: [4],
        state: true
      }).then((res) => {
        if (res.data.code === 200) {
          newsList = res.data.data.rows
          totalRows = res.data.data.totalRows
        }
      })
      return {
        newsList,
        totalRows
      }
    } catch (err) {
      return error(err)
    }
  },
  methods: {
    changePage (page) {
      this.$router.push('/newsinformation/cross/' + page)
    }
  }
}
</script>

<style lang="less" scoped>
.all-news-container {
  width: 100%;
  height: auto;
  .news-content {
    width: 100%;
    background-color: #fff;
    padding: 40px 50px;
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
