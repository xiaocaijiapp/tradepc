<template>
  <div class="add-bank-card">
    <div class="bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">
          首页
        </BreadcrumbItem>
        <BreadcrumbItem to="/personal">
          个人中心
        </BreadcrumbItem>
        <BreadcrumbItem to="/personal/bankmanage">
          银行卡管理
        </BreadcrumbItem>
        <BreadcrumbItem>添加取现卡</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="content">
      <div class="title">
        添加取现卡
      </div>
      <div class="input-from">
        <div class="from-area">
          <p class="ipt-title">
            请输入您的银行卡列表
          </p>
          <Input v-model="bankCode" size="large" placeholder="请输入您的银行卡号" />
          <span class="check-list" @click="mask = true">点击查看支持银行</span>
          <div class="btn" @click="addbank">
            <span>立即绑定</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="mask" class="mask" @click.self="mask = false">
      <div class="zc-bank-list">
        <div class="title">
          <span class="tit">银行卡列表</span>
          <img src="~/assets/images/index/close-dialog.png" class="close" @click="mask = false">
        </div>
        <div class="content-area">
          <div v-for="(item, index) in bankList" :key="index" class="recommended-bank">
            <img :src="item.url" class="bank-ico" alt="">
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div class="btn" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Addbankcard',
  data () {
    return {
      bankCode: '',
      mask: false,
      bankList: [
        {
          url: require('~/assets/images/bank/bj.png'),
          name: '北京银行'
        },
        {
          url: require('~/assets/images/bank/gd.png'),
          name: '光大银行'
        },
        {
          url: require('~/assets/images/bank/gf.png'),
          name: '广发银行'
        },
        {
          url: require('~/assets/images/bank/gs.png'),
          name: '工商银行'
        },
        {
          url: require('~/assets/images/bank/hx.png'),
          name: '华夏银行'
        },
        {
          url: require('~/assets/images/bank/js.png'),
          name: '建设银行'
        },
        {
          url: require('~/assets/images/bank/jt.png'),
          name: '交通银行'
        },
        {
          url: require('~/assets/images/bank/lz.png'),
          name: '兰州银行'
        },
        {
          url: require('~/assets/images/bank/ms.png'),
          name: '民生银行'
        },
        {
          url: require('~/assets/images/bank/ny.png'),
          name: '农业银行'
        },
        {
          url: require('~/assets/images/bank/pa.png'),
          name: '平安银行'
        },
        {
          url: require('~/assets/images/bank/sh.png'),
          name: '浦发银行'
        },
        {
          url: require('~/assets/images/bank/sh2.png'),
          name: '上海银行'
        },
        {
          url: require('~/assets/images/bank/xx.png'),
          name: '兴业银行'
        },
        {
          url: require('~/assets/images/bank/yz.png'),
          name: '邮政银行'
        },
        {
          url: require('~/assets/images/bank/zx.png'),
          name: '中信银行'
        },
        {
          url: require('~/assets/images/bank/zg.png'),
          name: '中国银行'
        },
        {
          url: require('~/assets/images/bank/zs.png'),
          name: '招商银行'
        }
      ]
    }
  },
  methods: {
    addbank () {
      if (this.bankCode) {
        this.$axios.post('/delegate/huiFu/addCardQu', { cardNo: this.bankCode }).then((res) => {
          if (res.data.code === 200) {
            this.$Message.success({
              content: '添加银行卡成功',
              duration: 1
            })
            this.$router.push('/personal/bankmanage')
          }
        })
      } else {
        this.$Message.warning({
          content: '银行卡不能为空',
          duration: 1
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.add-bank-card {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  .bread {
    margin: 8px 0;
  }
  .content {
    width: 1200px;
    height: 585px;
    border-radius: 1px;
    background-color: #FFFFFF;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    margin-bottom: 20px;
    .title {
      width: 100%;
      font-size: 24px;
      text-align: left;
      font-weight: 500;
      color: #333333;
      line-height: 80px;
      height: 80px;
      padding-left: 30px;
    }
    .input-from {
      width: 1200px;
      flex: 1;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: center;
      .from-area {
        width: 500px;
        height: 300px;
        border-radius: 2px;
        box-shadow: 0px 2px 5px 2px rgba(17,16,255,0.05);
        margin-top: 70px;
        padding: 0 100px;
        .ipt-title {
          margin: 60px 0 15px;
          font-size: 14px;
          font-weight: 400;
          color: #333333;
          line-height: 14px;
        }
        .check-list {
          font-size: 12px;
          font-weight: 400;
          color: #0083ff;
          line-height: 12px;
          margin-top: 13px;
          display: inline-block;
          cursor: pointer;
        }
        .btn {
          width: 100%;
          height: 40px;
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          span {
            width: 168px;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            font-weight: 500;
            color: #ffffff;
            background-color: #0083ff;
            text-align: center;
            border-radius: 2px;
            margin-top: 50px;
          }
        }
      }
    }
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(51,51,51,.3);
    z-index: 999;
    top: 0;
    left: 0;
    .zc-bank-list {
      position: absolute;
      width: 660px;
      min-height: 504px;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      background-color: #FFFFFF;
      border-radius: 6px;
      .title {
        width: 100%;
        height: 60px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px 0 60px;
        .tit {
          font-size: 14px;
          font-weight: 500;
          text-align: left;
          color: #333333;
          line-height: 14px;
        }
        .close {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      }
      .content-area {
        width: 100%;
        height: auto;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
        padding: 0 60px;
        margin-top: 20px;
        .recommended-bank {
          width: 160px;
          height: 40px;
          border-radius: 2px;
          box-shadow: 0px 2px 5px 2px rgba(17,16,255,0.05);
          background: #ffffff;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          margin-bottom: 20px;
          .bank-ico {
            width: 26px;
            height: 26px;
          }
          span{
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            line-height: 14px;
          }
        }
      }
    }
  }
}
</style>
