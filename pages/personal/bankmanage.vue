<template>
  <div class="bank-list-container">
    <div class="bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">
          首页
        </BreadcrumbItem>
        <BreadcrumbItem to="/personal">
          个人中心
        </BreadcrumbItem>
        <BreadcrumbItem>银行卡管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="list-container">
      <div class="title">
        银行卡列表
      </div>
      <div class="fun-area">
        <div class="tab">
          <div class="tab-area tab-l">
            <div class="desc">
              <img src="~/assets/images/index/zk-card.png" class="icon">
              <span>{{ `${paySize}张支付卡` }}</span>
            </div>
            <!--            <span class="btn" @click="addBankCard('z')">添加支付卡</span>-->
          </div>
          <div class="tab-area tab-r">
            <div class="desc">
              <img src="~/assets/images/index/zk-card.png" class="icon">
              <span>{{ `${withdrawalSize}张提现卡` }}</span>
            </div>
            <span class="btn" @click="addBankCard">添加提现卡</span>
          </div>
        </div>
      </div>
      <!--    无银行卡列表显示状态-->
      <div v-if="withdrawalSize == 0 && paySize == 0" class="empty">
        <img src="~/assets/images/index/card-empty.png" class="empty-icon" alt="">
        <span>暂无银行卡~</span>
      </div>
      <div v-else class="card-list">
        <div v-for="item in bankList" :key="item.bankNo" class="bank-item" style="background-repeat: no-repeat;background-size: contain;background-origin: content-box" :style="{backgroundImage: `url(${ item.cardImage })`}">
          <div class="top">
            <img :src="item.cardIco" class="bank-icon">
            <span class="bank-title">{{ item.bankName }}</span>
            <span class="type">储蓄卡</span>
            <span class="btn" @click="unbundlingCode(item)">解绑</span>
          </div>
          <div class="center">
            <span class="card-h">****</span>
            <span class="card-h">****</span>
            <span class="card-h">****</span>
            <span class="card-no">{{ item.cardNo }}</span>
          </div>
          <div class="bottom">
            <span v-if="item.cardType == 0">提现卡</span>
            <span v-else>支付卡</span>
            <span v-if="item.cardType == 0">提现额度不限制</span>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="modal1" title="解绑银行卡" @on-ok="ok" @on-cancel="cancel">
      <p>您确定解绑该银行卡吗？</p>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Bankmanage',
  async asyncData ({ $axios, error, route }) {
    try {
      let withdrawalCards = []
      let withdrawalSize = 0
      let payCards = []
      let paySize = 0
      await $axios.post('/delegate/appHuiFu/findUserCard').then((res) => {
        if (res.data.code === 200) {
          withdrawalCards = res.data.data.qulist || []
          withdrawalSize = res.data.data.qulistsize || 0
          payCards = res.data.data.zhilist || []
          paySize = res.data.data.zhilistsize || 0
        }
      })
      return {
        withdrawalCards,
        withdrawalSize,
        payCards,
        paySize,
        bankList: [...withdrawalCards, ...payCards]
      }
    } catch (err) {
      return error({ path: route.name, message: '数据加载失败' })
    }
  },
  data () {
    return {
      modal1: false,
      item: ''
    }
  },
  computed: {
    ...mapGetters(['baseImageUrl'])
  },
  methods: {
    addBankCard () {
      this.$router.push({ path: '/personal/addbankcard' })
    },
    unbundlingCode (item) {
      this.modal1 = true
      this.item = item
    },
    ok () {
      console.log(this.item)
      this.$axios.post('/delegate/appHuiFu/untieCard', {
        bankId: this.item.bankNo,
        bindCardId: this.item.bindCardId,
        cardType: this.item.cardType
      }).then((res) => {
        if (res.data.code === 200) {
          this.$Message.success({
            content: '解绑成功',
            duration: 1
          })
          this.$router.go(0)
        }
      })
    },
    cancel () {
      this.modal1 = false
    }
  }
}
</script>

<style lang="less" scoped>
.bank-list-container {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  .bread {
    margin: 8px 0;
  }
  .list-container {
    width: 1200px;
    min-height: 585px;
    border-radius: 1px;
    background-color: #ffffff;
    margin-bottom: 20px;
    padding-bottom: 30px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    .title {
      width: 100%;
      font-size: 24px;
      text-align: left;
      font-weight: 500;
      color: #333333;
      line-height: 80px;
      padding-left: 30px;
    }
    .fun-area {
      width: 100%;
      height: auto;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: center;
      margin-top: 20px;
      .tab {
        width: 600px;
        height: 50px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        .tab-area {
          width: 285px;
          height: 50px;
          border-radius: 2px;
          box-shadow: 0px 2px 5px 2px rgba(17, 16, 255, 0.05);
          padding: 0 20px;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;
          .desc {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;
            span {
              margin-left: 15px;
              font-size: 14px;
              font-weight: 400;
              color: #333333;
              line-height: 20px;
            }
          }
          .btn {
            font-size: 14px;
            font-weight: 500;
            color: #1491ff;
            line-height: 16px;
            cursor: pointer;
          }
        }
        .tab-r {
          .btn {
            color: #fa6400;
          }
        }
      }
    }
    .empty {
      width: 600px;
      height: 300px;
      border-radius: 2px;
      box-shadow: 0px 2px 5px 2px rgba(17, 16, 255, 0.05);
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: center;
      margin-top: 40px;
      .empty-icon {
        width: 200px;
        height: 160px;
        object-fit: cover;
      }
      span {
        font-size: 14px;
        font-weight: 400;
        color: #c9c9c9;
        line-height: 20px;
        margin-top: 30px;
      }
    }
    .card-list {
      width: 820px;
      height: auto;
      border-radius: 2px;
      box-shadow: 0px 2px 5px 2px rgba(17, 16, 255, 0.05);
      margin-top: 40px;
      padding: 30px;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      .bank-item {
        margin-bottom: 15px;
        width: 240px;
        height: 120px;
        padding: 15px 0 0 0;
        .top {
          display: flex;
          align-items: center;
          padding-left: 10px;
          padding-right: 8px;
          height: 35px;
          .bank-icon {
            width: 22px;
            height: 22px;
          }
          .bank-title {
            font-size: 12px;
            font-weight: 400;
            text-align: left;
            color: #ffffff;
            line-height: 14px;
            margin-left: 10px;
          }
          .type {
            font-size: 12px;
            font-weight: 400;
            text-align: left;
            color: #ffffff;
            line-height: 12px;
            margin-left: 10px;
            margin-right: 34px;
          }
          .btn {
            width: 36px;
            height: 20px;
            font-size: 10px;
            font-weight: 400;
            text-align: center;
            color: #ffffff;
            line-height: 20px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 4px;
            cursor: pointer;
          }
        }
        .center {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;
          padding: 0 30px;
          height: 30px;
          color: #ffffff;
          span {
            flex: 1;
            height: 30px;
          }
          .card-h {
            font-size: 12px;
            line-height: 34px;
            text-align: left;
          }
          .card-no {
            font-size: 12px;
            line-height: 30px;
            text-align: left;
          }
        }
        .bottom {
          padding-left: 30px;
          span:nth-of-type(2) {
            margin-left: 10px;
          }
          span {
            font-size: 12px;
            font-weight: 400;
            text-align: left;
            color: #ffffff;
            line-height: 17px;
          }
        }
      }
    }
  }
}
/deep/ .ivu-modal {
  top: 50%;
  transform: translate(0, -50%);
  .ivu-modal-body {
    p {
      text-align: center;
      color: #57a3f3;
    }
  }
}
</style>
