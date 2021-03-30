<template>
  <div class="container">
    <div class="messageContainer">
      <p class="title">
        消息
      </p>
      <Table :columns="tabConfig" :data="tabData" style="margin-top:30px;">
        <template slot="content" slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
        <template slot="status" slot-scope="{row}">
          <span v-if="row.checkStatus === 0">已读</span>
          <span v-else>未读</span>
        </template>
        <template slot="operate" slot-scope="{row, index}">
          <span style="color:#0083FF;cursor: pointer;font-size: 14px;font-weight: 500;" @click="checkDetails(row.id)">查看详情</span>
          <span style="color:#FA6400;cursor: pointer;font-size: 14px;font-weight: 500;margin-left: 20px" @click="remove(row.id, index)">删除</span>
        </template>
      </Table>
      <Page :total="tabData.length" show-elevator show-total :current="currentIndex" @on-change="changePage" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Message',
  middleware: 'auth',
  async asyncData ({ $axios, error }) {
    try {
      const tabConfig = [
        {
          title: '内容',
          align: 'center',
          key: 'title',
          slot: 'content',
          ellipsis: true,
          tooltip: true
        },
        {
          title: '发送人',
          align: 'center',
          key: 'sendUserName'
        },
        {
          title: '发送日期',
          align: 'center',
          key: 'receiveTime'
        },
        {
          title: '状态',
          align: 'center',
          key: 'checkStatus',
          slot: 'status'
        },
        {
          title: '操作',
          slot: 'operate',
          align: 'center'
        }
      ]
      let totalRows, tabData
      await $axios.get('/delegate/mail/findMyReceiveMailPage', {
        params: {
          pageNo: 1,
          pageSize: 6
        }
      }).then((res) => {
        if (res.data.code === 200) {
          tabData = res.data.data.rows
          totalRows = res.data.data.totalRows
        }
      })
      return {
        tabData,
        totalRows,
        tabConfig
      }
    } catch (err) {
      return error(err)
    }
  },
  data () {
    return {
      currentIndex: 1
    }
  },
  created () {
  },
  methods: {
    ...mapActions(['getMailCount']),
    changePage (page) {
      this.$axios.get('/delegate/mail/findMyReceiveMailPage', {
        params: {
          pageNo: page,
          pageSize: 6
        }
      }).then((res) => {
        if (res.data.code === 200) {
          this.tabData = res.data.data.rows
          this.totalRows = res.data.data.totalRows
        }
      })
    },
    checkDetails (id) {
      this.$router.push({ name: 'letterDetail-id', params: { id } })
    },
    remove (id, index) {
      this.$axios.get('/delegate/mail/delMail', { params: { id } }).then((res) => {
        if (res.data.code === 200) {
          this.tabData.splice(index, 1)
          this.getMailCount()
          this.$Message.success({
            content: '删除成功',
            duration: 1
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    width: 100%;
    height: auto;
    background-color: #f3f4f6;
    padding: 20px 0;
    ::-webkit-scrollbar {
      display: none;
    }
    .messageContainer {
      background-color: #fff;
      width: 1200px;
      margin: 0 auto;
      padding: 40px 30px;
      .title {
        font-size: 24px;
        color: #333;
        font-weight: 700;
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
    }
  }
</style>
