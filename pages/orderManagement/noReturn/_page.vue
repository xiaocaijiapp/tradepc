<template>
  <div class="container">
    <Table :columns="option" :data="listData" max-height="330">
      <template slot="operate" slot-scope="{row}">
        <span v-if="row.state !== 0" class="watchDetail" @click="checkOrder(row.orderId)">查看详情</span>
        <span class="contract" @click="$router.push('/electronicContract')">电子合同</span>
      </template>
    </Table>
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
          title: '订单号',
          align: 'center',
          key: 'orderId',
          width: 220
        },
        {
          title: '商品名称',
          align: 'center',
          key: 'goodsTitle'
        },
        {
          title: '销售周期',
          align: 'center',
          key: 'period',
          width: 100
        },
        {
          title: '数量',
          align: 'center',
          key: 'buyNum',
          width: 100
        },
        {
          title: '支付金额',
          align: 'center',
          key: 'payAmount',
          width: 100
        },
        {
          title: '销售利润',
          align: 'center',
          key: 'profit',
          width: 100
        },
        {
          title: '状态',
          align: 'center',
          key: 'status'
        },
        {
          title: '操作',
          slot: 'operate',
          align: 'center'
        }
      ]
      const stateArr = ['未付款', '待回款', '已回款', '退款成功']
      // 获取全部订单列表
      await $axios.post('/delegate/order/orderList', {
        pageNo: page,
        pageSize: 6,
        state: 1
      }).then((res) => {
        if (res.data.code === 200) {
          res.data.data.rows.forEach((item) => {
            listData.push({
              orderId: item.orderId,
              goodsTitle: item.orderGoodsDto.title,
              period: item.orderGoodsDto.period + '天',
              buyNum: item.buyNum,
              payAmount: item.price,
              profit: item.profit,
              state: item.state,
              status: stateArr[item.state]
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
      this.$router.push('/orderManagement/noReturn/' + page)
    },
    checkOrder (id) {
      this.$router.push({ name: 'goodsOrder-id', params: { id } })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 30px 0;
  ::-webkit-scrollbar {
    display: none;
  }
  /deep/ .ivu-table {
    border: 1px solid #e0e0e0;
  }
  /deep/ .ivu-table th {
    background-color: #eaf5ff !important;
  }
  /deep/ .ivu-table tr:nth-child(even) td {
    background-color: #f6fbff !important;
  }
  /deep/ .ivu-table table {
    width: 100% !important;
  }
  /deep/ .ivu-page {
    margin-top: 30px;
    text-align: center;
    .ivu-page-item-active {
      background-color: #1491ff;
      a {
        color: #fff;
      }
    }
  }
  .watchDetail {
    color: #0083ff;
    cursor: pointer;
  }
  .cancelOrder {
    color: #f38a43;
    margin-left: 5px;
    cursor: pointer;
  }
  .contract {
    color: #0083ff;
    cursor: pointer;
    margin-left: 5px;
  }
}
</style>
