<template>
  <div class="about-container">
    <div class="logo" />
    <div class="contentBox">
      <div class="tipsContent">
        <p class="smalltitle">了解全民外贸，安心赚取利润</p>
        <div class="tips">
          全民外贸是三益供应链集团有限公司旗下的外贸交易代购电商平台。<br>
          平台采用出口“代购”模式，让国人参与外贸，给外国人代购中国商品赚外国人的钱。30天周期商品单价的1.2%作为代购利润 （例：参与代购商品每1万元，30天周期可获得120元的利润）。
        </div>
      </div>
      <div class="nav-container">
        <div class="nav">
          <div class="content">
            <div class="nav-item" :style="current == 0 ? borderStyle : {}" @click="changeNav(0)">新手引导</div>
            <div class="nav-item" :style="current == 1 ? borderStyle : {}" @click="changeNav(1)">支付教程</div>
            <div class="nav-item" :style="current == 2 ? borderStyle : {}" @click="changeNav(2)">提现流程</div>
            <div class="nav-item" :style="current == 3 ? borderStyle : {}" @click="changeNav(3)">网银教程</div>
            <div class="nav-item" :style="current == 4 ? borderStyle : {}" @click="changeNav(4)">支付限额</div>
          </div>
        </div>
      </div>
      <div class="child-content">
        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Guidance',
  data () {
    return {
      current: 0,
      borderStyle: {
        backgroundColor: '#208fff',
        color: '#fff',
        fontWeight: 600
      }
    }
  },
  watch: {
    $route: {
      handler (to) {
        const path = to.path
        this.currentIndex(path)
      },
      // 深度观察监听
      deep: true
    }
  },
  created () {
    this.currentIndex(this.$route.path)
  },
  methods: {
    currentIndex (path) {
      switch (path) {
        case '/guidance':
          this.current = 0
          this.changeNav(0)
          break
        case '/guidance/repaycourse':
          this.current = 1
          this.changeNav(1)
          break
        case '/guidance/withdrawal':
          this.current = 2
          this.changeNav(2)
          break
        case '/guidance/internetbank':
          this.current = 3
          this.changeNav(3)
          break
        case '/guidance/repayquota':
          this.current = 4
          this.changeNav(4)
          break
        default:
          this.current = 0
          this.changeNav(0)
          break
      }
    },
    changeNav (index) {
      this.current = index
      switch (index) {
        case 0:
          this.breadText = '新手引导'
          this.$router.push('/guidance')
          break
        case 1:
          this.breadText = '支付流程'
          this.$router.push('/guidance/repaycourse')
          break
        case 2:
          this.breadText = '提现流程'
          this.$router.push('/guidance/withdrawal')
          break
        case 3:
          this.breadText = '网银教程'
          this.$router.push('/guidance/internetbank')
          break
        case 4:
          this.breadText = '支付限额'
          this.$router.push('/guidance/repayquota')
          break
        default:
          this.breadText = '新手引导'
          this.$router.push('/guidance')
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.about-container {
  width: 100%;
  height: auto;
  background-color: #f3f4f6;
  .logo {
    width: 100%;
    height: 350px;
    background: url("https://static.qmwm777.com/web/Novice%20guide/banner.png")
      no-repeat 100% 100%;
  }
  .contentBox {
    width: 1200px;
    padding: 30px 0 40px 0;
    margin: 0 auto;
    .tipsContent {
      width: 100%;
      padding: 30px 100px;
      background-color: #fff;
      .smalltitle {
        font-size: 14px;
        color: #333;
        text-align: center;
      }
      .tips {
        font-size: 12px;
        color: #333;
        text-align: left;
        margin-top: 20px;
        line-height: 20px;
      }
    }
    .nav-container {
      width: 1200px;
      height: 60px;
      .nav {
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;
        .content {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          margin: 30px auto 0px;
          width: 1200px;
          .nav-item {
            width: 200px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            border-radius: 8px;
            cursor: pointer;
            color: #333;
            font-size: 14px;
            background-color: #f9f9f9;
            box-shadow: 0px 2px 5px 2px rgba(17, 16, 255, 0.05);
          }
        }
      }
    }
  }
}
</style>
