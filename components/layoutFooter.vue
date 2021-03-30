<template>
  <div class="footer-area">
    <div class="f-top">
      <div class="t-top-l">
        <div class="f-t-item">
          <div class="title">
            联系我们
          </div>
          <div class="content">
            <div class="call-me">
              <img src="~/assets/images/index/phone-call.png" calss="phone-ico"/>
              <span class="phone-code">400-808-8399</span>
              <span class="phone-code">工作日9:00~17:00</span>
            </div>
            <div class="address-box">
              <img src="~/assets/images/index/local.png" calss="phone-ico"/>
              <div class="address">
                <p class="add-text">中国公司地址：河南省郑州市建正东方中心C座8楼</p>
                <p class="add-text">日本公司地址：埼玉县比企郡都几川町别所</p>
              </div>
            </div>
          </div>
        </div>
        <div class="newbie-guide">
          <div class="title">
            新手指南
          </div>
          <div class="content">
            <span @click="$router.push('/guidance')">购物流程</span>
            <span @click="$router.push('/guidance/repaycourse')">支付方式</span>
            <span @click="$router.push('/problem/problemList')">常见问题</span>
          </div>
        </div>
        <div class="newbie-guide">
          <div class="title">
            售后服务
          </div>
          <div class="content">
            <span  @click="$router.push('/saleservice')">售后服务</span>
            <span  @click="$router.push('/about/contactus')">联系客服</span>
          </div>
        </div>
        <div class="newbie-guide">
          <div class="title">
            关于我们
          </div>
          <div class="content">
            <span @click="$router.push('/about')">公司介绍</span>
            <span @click="$router.push('/')">项目介绍</span>
            <span @click="a_href">招商合作</span>
          </div>
        </div>
      </div>
      <div class="t-top-r">
        <img src="~/assets/images/index/down-app.png" class="qrocde" />
        <span class="yd-text">扫码下载APP</span>
      </div>
    </div>
    <div class="f-bot">
      Copyright 2017-2021 qmwm777.com 版权所有（电信业务经营许可证 豫B2-20190737） 豫ICP备17049564号-2
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  methods: {
    a_href () {
      const href = 'https://www.stardaymart.com/'
      const a = document.createElement('a')
      a.setAttribute('href', href)
      a.setAttribute('target', '_blank')
      a.setAttribute('id', 'js_a')
      // 防止反复添加
      if (document.getElementById('js_a')) {
        document.body.removeChild(document.getElementById('js_a'))
      }
      document.body.appendChild(a)
      a.click()
    }
  }
}
</script>

<style lang="less" scoped>
.footer-area {
  width: 100%;
  height: 326px;
  background-color: #333333;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  .f-top {
    width: 1200px;
    padding: 40px 0 0 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin: 0 auto;
    height: 100%;
    .t-top-r {
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: center;
      width: 120px;
      padding-top: 27px;
      .qrocde {
        width: 119px;
        height: 119px;
      }
      .yd-text {
        width: 100%;
        text-align: center;
        font-size: 12px;
        font-weight: 400;
        color: #ffffff;
        line-height: 12px;
        margin-top: 10px;
      }
    }
    .t-top-l {
      width: 1000px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      .f-t-item {
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: flex-start;
        .title {
          font-size: 18px;
          font-weight: 600;
          text-align: left;
          color: #ffffff;
          line-height: 36px;
        }
        .content {
          height: 86px;
          border-right: 1px solid #e5eaf2;
          padding-right: 70px;
          .call-me {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;
            font-size: 12px;
            font-weight: 400;
            color: #ffffff;
            line-height: 12px;
            .phone-ico {
              width: 18px;
              height: 18px;
            }
            .phone-code {
              margin-left: 10px;
            }
          }
          .address-box {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: flex-start;
            margin-top: 12px;
            .phone-ico {
              width: 18px;
              height: 18px;
            }
            .address {
              margin-left: 10px;
              .add-text:last-child{
                margin-top: 10px;
              }
              .add-text {
                font-size: 12px;
                font-weight: 400;
                text-align: left;
                color: #ffffff;
                line-height: 20px;
              }
            }
          }
        }
      }
      .newbie-guide {
        height: 100%;
        width: 210px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: flex-start;
        .title {
          width: 100%;
          font-size: 18px;
          font-weight: 600;
          text-align: center;
          color: #ffffff;
          line-height: 36px;
        }
        .content {
          width: 100%;
          height: 86px;
          display: flex;
          flex-flow: column nowrap;
          justify-content: flex-start;
          align-items: center;
          border-right: 1px solid #e5eaf2;
          span {
            font-size: 12px;
            font-weight: 400;
            text-align: left;
            color: #ffffff;
            line-height: 12px;
            margin-top: 25px;
            cursor: pointer;
          }
          span:nth-child(1) {
            margin-top: 0;
          }
        }
      }
    }
  }
  .f-bot {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
