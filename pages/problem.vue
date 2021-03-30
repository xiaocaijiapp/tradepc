<template>
  <div class="about-container">
    <div class="logo" />
    <div class="nav-container">
      <div class="nav">
        <div class="content">
          <div class="nav-item" :style="current == 0 ? borderStyle : {}" @click="changeNav(0)">
            意见反馈
          </div>
          <div class="nav-item" :style="current == 1 ? borderStyle : {}" @click="changeNav(1)">
            常见问题
          </div>
        </div>
      </div>
    </div>
    <div class="child-content">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Problem',
  // layout: 'shopping',
  data () {
    return {
      current: 0,
      borderStyle: {
        backgroundColor: '#208fff',
        color: '#fff',
        fontWeight: 600
      },
      colorStyle: {
        color: '#138cff',
        fontWeight: 700
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
        case '/problem':
          this.current = 0
          this.changeNav(0)
          break
        case '/problem/problemList':
          this.current = 1
          this.changeNav(1)
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
          this.$router.push('/problem')
          break
        case 1:
          // 常见问题
          this.$router.push('/problem/problemList')
          break
        default:
          this.$router.push('/problem')
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
    height: 200px;
    background: url("https://static.qmwm777.com/web/banner/lALPDhYBPeXgag3MyM0HgA_1920_200.png")
      no-repeat 100% 100%;
  }
  .nav-container {
    width: 1200px;
    height: auto;
    margin: 0 auto;
    padding: 30px 0;
    .nav {
      width: 100%;
      height: 60px;
      position: relative;
      box-sizing: border-box;
      .content {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin: 0 auto;
        width: 480px;
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
</style>
