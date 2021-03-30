<template>
  <div class="order-container">
    <div class="bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">
          首页
        </BreadcrumbItem>
        <BreadcrumbItem to="/personal">
          个人中心
        </BreadcrumbItem>
        <BreadcrumbItem>
          邀请好友
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="orderDetailBox">
      <div class="content">
        <div class="title">
          邀请好友
        </div>
        <div class="inviteBox">
          <div class="inviteCode">
            <p class="mineInvite">
              我的邀请码<span class="code">{{ inviteCode }}</span>
              <img src="~/assets/images/registered/copy-one.png" @click="copy">
            </p>
          </div>
          <div id="qrcode" ref="qrCodeDiv" class="erweima">
            <span>邀请二维码</span>
          </div>
        </div>
        <div class="title">
          邀请记录
        </div>
        <div class="tableBox">
          <Table :loading="loading" :columns="options" :data="tabData" />
          <Page :total="totalRows" show-elevator show-total @on-change="changePage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Password',
  async asyncData ({ $axios, error }) {
    try {
      let inviteCode, inviteLink
      await $axios.get('/delegate/invite/inviteLink').then((res) => {
        if (res.data.code === 200) {
          inviteCode = res.data.data.inviteCode
          inviteLink = res.data.data.inviteLink
        }
      })
      return {
        inviteCode,
        inviteLink
      }
    } catch (err) {
      return error(err)
    }
  },
  data () {
    return {
      options: [
        {
          title: '被邀请人',
          align: 'center',
          key: 'realName'
        },
        {
          title: '手机号',
          align: 'center',
          key: 'phone'
        },
        {
          title: '注册时间',
          align: 'center',
          key: 'createDate'
        },
        {
          title: '购买记录',
          align: 'center',
          key: 'orderNum'
        }
      ],
      totalRows: 0,
      loading: false,
      tabData: [
        {
          realName: '张三',
          phone: '15236254125',
          createDate: '2020-12-28 15:28:22',
          orderNum: '是'
        }
      ],
      QrCodeObj: {}
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    this.QrCodeObj = new QRCode('qrcode', {
      text: this.inviteLink,
      width: 78,
      height: 78,
      colorDark: '#000', // 绿色
      colorLight: '#fff',
      // eslint-disable-next-line no-undef
      correctLevel: QRCode.CorrectLevel.H
    })
    this.invitationList()
  },
  methods: {
    copy () {
      this.$copyText(this.inviteCode).then(() => {
        this.$Message.success({
          content: '复制成功',
          duration: 1
        })
      })
    },
    // 获取邀请记录
    invitationList (no = 1, size = 5) {
      this.loading = true
      this.$axios.get('/delegate/invite/list', {
        params: {
          pageNo: no,
          pageSize: size
        }
      }).then((res) => {
        if (res.data.code === 200) {
          console.log(res.data.data)
          this.loading = false
          this.tabData = res.data.data.rows.map((item) => {
            item.orderNum === 0 ? item.orderNum = '否' : item.orderNum = '是'
            return item
          })
          this.totalRows = res.data.data.totalRows
        }
      })
    },
    changePage (page) {
      this.invitationList(page)
    }
  }
}
</script>

<style lang="less" scoped>
.order-container {
  width: 1200px;
  margin: 0 auto;
  background-color: #f3f4f6;
  height: auto;
  .bread {
    margin: 8px 0;
  }
  .orderDetailBox {
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 20px;
    /deep/ .ivu-breadcrumb {
      background-color: #f3f4f6;
      height: 45px;
      line-height: 45px;
    }
    .content {
      height: auto;
      padding: 30px;
      background-color: #ffffff;
      .title {
        font-size: 24px;
        font-weight: 500;
        text-align: left;
        color: #333333;
        line-height: 33px;
        margin-bottom: 20px;
      }
      .inviteBox {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .inviteCode,
        .erweima {
          width: 552px;
          height: 106px;
          line-height: 106px;
          text-align: center;
          background-color: #fff;
          box-shadow: 0px 2px 5px 2px rgba(17, 16, 255, 0.05);
        }
        .mineInvite {
          font-size: 14px;
          color: #333;
          .code {
            font-size: 22px;
            color: #0083ff;
            font-weight: 600;
            margin-left: 30px;
            display: inline-block;
            box-sizing: border-box;
            vertical-align: middle;
          }
          img {
            margin-left: 15px;
            width: 18px;
            height: 20px;
            cursor: pointer;
            display: inline-block;
            box-sizing: border-box;
            vertical-align: middle;
          }
        }
        .erweima {
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          align-items: center;
          span {
            font-size: 14px;
            color: #333;
            display: inline-block;
            box-sizing: border-box;
            vertical-align: middle;
            margin-right: 15px;
          }
        }
      }
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
    }
  }
}
</style>
