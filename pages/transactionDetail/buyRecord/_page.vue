<template>
  <div class="container">
    <Table :columns="option" :data="listData" max-height="330" />
    <Page :total="totalRows" show-elevator show-total @on-change="changePage" />
  </div>
</template>

<script>
export default {
  name: 'Shopping',
  async asyncData ({ $axios, params, error }) {
    try {
      const { page = 1 } = params
      const listData = []
      let totalRows = 0
      const option = [
        {
          title: '操作名称',
          align: 'center',
          key: 'dealTypeName'
        },
        {
          title: '商品名称',
          align: 'center',
          key: 'goodsTitle'
        },
        {
          title: '金额',
          align: 'center',
          key: 'dealMoney'
        },
        {
          title: '日期',
          align: 'center',
          key: 'createDate'
        },
        {
          title: '详情',
          align: 'center',
          key: 'detail'
        }
      ]
      // 获取全部明细列表
      await $axios.post('/delegate/dealLog/list', {
        pageNo: page,
        pageSize: 6,
        type: 2
      }).then((res) => {
        if (res.data.code === 200) {
          res.data.data.rows.forEach((item) => {
            listData.push({
              dealTypeName: item.dealTypeName,
              goodsTitle: item.goodsTitle,
              dealMoney: item.dealMoney,
              createDate: item.createDate,
              detail: '成功'
            })
          })
          totalRows = res.data.data.totalRows
        }
      })
      return {
        listData,
        totalRows,
        option
      }
    } catch (err) {
      return error(err)
    }
  },
  data () {
    return {
    }
  },
  methods: {
    changePage (page) {
      this.$router.push('/transactionDetail/buyRecord/' + page)
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  padding: 30px 0;
  ::-webkit-scrollbar {
    display: none;
  }
  /deep/ .ivu-table{
    border: 1px solid #e0e0e0;
  }
  /deep/ .ivu-table th{
    background-color: #eaf5ff !important;
  }
  /deep/ .ivu-table tr:nth-child(even) td{
    background-color: #F6FBFF !important;
  }
  /deep/ .ivu-table table{
    width: 100% !important;
  }
  /deep/ .ivu-page{
    margin-top: 30px;
    text-align: center;
    .ivu-page-item-active{
      background-color: #1491FF;
      a{
        color: #fff;
      }
    }
  }
  .watchDetail{
    color: #0083FF;
    cursor: pointer;
  }
  .cancelOrder{
    color: #f38a43;
    margin-left: 5px;
    cursor: pointer;
  }
}
</style>
