<template>
  <div class="withdrawal-container">
    <div class="bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">
          首页
        </BreadcrumbItem>
        <BreadcrumbItem to="/personal">
          个人中心
        </BreadcrumbItem>
        <BreadcrumbItem>提现</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="content">
      <div class="title">
        <p class="main-title">
          提现
        </p>
        <p class="small-title">
          请选择一种提现方式
        </p>
      </div>
      <div class="change-item">
        <!--        <div class="item" :class="active == 0 ? 'one-active' : ''" @click="active = 0">-->
        <div class="item" :class="active == 0 ? 'one-active' : ''" @click="()=>false">
          <div class="area">
            <div class="wx-title">
<!--              <img class="icon" src="~/assets/images/index/sqwx.png" alt="">-->
              <img class="icon" src="~/assets/images/index/sqwx-no.png" alt="">
              <span class="txt">提现到微信</span>
            </div>
            <div class="desc">
              不限额
            </div>
            <div class="desc">
              该提现方式暂未开通
            </div>
            <div class="wx-bottom">
              <div class="top">
                即时到账
              </div>
              <div class="bottom">
                请留意查看您绑定的
                <span style="color: rgba(153,153,153,1)">微信余额</span>
              </div>
            </div>
          </div>
        </div>
        <div class="item" :class="active == 1 ? 'two-active' : ''" @click="active = 1">
          <div class="area">
            <div class="wx-title">
              <img class="icon" src="~/assets/images/index/sqzfb.png" alt="">
              <span class="txt">提现到支付宝</span>
            </div>
            <div class="desc">
              每单限额五万,单日不限额
            </div>
            <div class="wx-bottom">
              <div class="top">
                即时到账
              </div>
              <div class="bottom">
                请留意查看您绑定的
                <span style="color: rgba(23,120,254,1)">支付宝余额</span>
              </div>
            </div>
          </div>
        </div>
        <div class="item" :class="active == 2 ? 'three-active' : ''" @click="active = 2">
          <div class="area">
            <div class="wx-title">
              <img class="icon" src="~/assets/images/index/cardtx.png" alt="">
              <span class="txt">提现到银行卡</span>
            </div>
            <div class="desc">
              不限额
            </div>
            <div class="wx-bottom">
              <div class="top">
                该提现方式需要两个步骤
              </div>
              <div class="bottom">
                <p>第一步: 从全民外贸账户余额转入到汇付天下</p>
                <p>第二部: 从汇付天下账户余额提现到银行卡</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="next-btn">
        <span class="btn" @click="nextWithdrawal">下一步</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Withdrawal',
  data () {
    return {
      active: 1
    }
  },
  methods: {
    nextWithdrawal () {
      if (this.active === 0) {
        this.$router.push({ path: '/personal/amount', query: { type: 'wx' } })
      } else if (this.active === 1) {
        this.$router.push({ path: '/personal/amount', query: { type: 'ali' } })
      } else {
        // 跳转银行卡提现页面
        this.$router.push({ path: '/personal/intoremittance' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.withdrawal-container {
  width: 1200px;
  min-height: calc(100vh - 457px);
  margin: 0 auto;
  .bread {
    margin: 8px 0;
  }
  .content {
    width: 1200px;
    height: 585px;
    background-color: #FFFFFF;
    border-radius: 1px;
    margin-bottom: 20px;
    padding: 30px;
    .title {
      .main-title {
        font-size: 24px;
        font-weight: 500;
        text-align: left;
        color: #333333;
        line-height: 24px;
      }
      .small-title {
        font-size: 16px;
        font-weight: 500;
        text-align: left;
        color: #333333;
        line-height: 16px;
        margin-top: 16px;
      }
    }
    .change-item {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      margin-top: 40px;
      cursor: pointer;
      .one-active {
        background: url("~/assets/images/index/wx-bg.png") no-repeat 90% 90%;
      }
      .two-active {
        background: url("~/assets/images/index/zfb-bg.png") no-repeat 90% 90%;
      }
      .three-active {
        background: url("~/assets/images/index/card-bg.png") no-repeat 90% 90%;
      }
      .item:nth-child(1) {
        width: 332px;
        height: 242px;
        border-radius: 6px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        cursor:no-drop;
        background: #fbfbfb;
        .area {
          width: 325px;
          height: 232px;
          border-radius: 6px;
          padding: 30px 0;
          color: #333333;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          align-items: center;
          .wx-title {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            .icon {
              width: 30px;
              height: 30px;
            }
            .txt {
              margin-left: 15px;
              font-size: 14px;
              font-weight: 400;
              color: #333333;
              line-height: 14px;
            }
          }
          .desc {
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            line-height: 14px;
          }
          .wx-bottom {
            .top, .bottom {
              font-size: 14px;
              font-weight: 400;
              text-align: left;
              color: #333333;
              line-height: 24px;
              p {
                font-size: 14px;
                font-weight: 400;
                text-align: left;
                color: #333333;
                line-height: 24px;
              }
            }
          }
        }
      }
      .item:not(.item:nth-child(1)) {
        width: 332px;
        height: 242px;
        border-radius: 6px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        .area {
          width: 325px;
          height: 234px;
          border-radius: 6px;
          padding: 30px 0;
          color: #333333;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          align-items: center;
          .wx-title {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            .icon {
              width: 30px;
              height: 30px;
            }
            .txt {
              margin-left: 15px;
              font-size: 14px;
              font-weight: 400;
              color: #333333;
              line-height: 14px;
            }
          }
          .desc {
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            line-height: 14px;
          }
          .wx-bottom {
            .top, .bottom {
              font-size: 14px;
              font-weight: 400;
              text-align: left;
              color: #333333;
              line-height: 24px;
              p {
                font-size: 14px;
                font-weight: 400;
                text-align: left;
                color: #333333;
                line-height: 24px;
              }
            }
          }
        }
      }
      .item:nth-of-type(1) .area{
        /*background-color: rgba(6,212,108,.3);*/
        background-color: #fbfbfb;
      }
      .item:nth-of-type(2) .area{
        background-color: #f3f8ff;
      }
      .item:nth-of-type(3) .area{
        background-color: #fff7f2;
      }
    }
    .next-btn {
      width: 100%;
      height: 60px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      margin-top: 60px;
      .btn {
        width: 168px;
        height: 40px;
        background-color: #0083FF;
        line-height: 40px;
        font-size: 14px;
        font-weight: 500;
        color: #FFFFFF;
        text-align: center;
        border-radius: 2px;
        cursor: pointer;
      }
    }
  }
}
</style>
