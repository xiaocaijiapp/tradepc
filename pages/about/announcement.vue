<template>
  <div class="container">
    <div class="announcement">
      <div class="titleTop">
        <p class="title">
          模式公告
        </p>
        <p class="smallTitle">Model Announcement</p>
      </div>
      <div class="announceBox">
        <div class="guaranteeBox">
          <div class="guaranteeList">
            <div class="guaranteeText">
              <div class="guaranteeTitle">
                <span class="blueDot"></span>
                商品营销保障
              </div>
              <div class="guaranteeContent">
                用户购买的商品在周期内未售出的，由日本三益贸易株式会社旗下的“STARDAY”商城进行回售，不影响用户代购和代购利润的按时发放。
              </div>
            </div>
            <div class="guaranteeImg">
              <img src="https://static.qmwm777.com/web/Model%20announcement/vfd.png" alt="">
            </div>
          </div>
          <div class="guaranteeList">
            <div class="guaranteeText">
              <div class="guaranteeTitle">
                <span class="blueDot"></span>
                商品受损保障
              </div>
              <div class="guaranteeContent">
                商品在运输过程中出现损坏的，由三益供应链集团有限公司与货代公司协商赔偿，同时在周期结束时三益供应链集团有限公司先行跟用户结算代购成本和代购利润。
              </div>
            </div>
            <div class="guaranteeImg">
              <img src="https://static.qmwm777.com/web/Model%20announcement/cdf.png" alt="">
            </div>
          </div>
          <div class="relationBox">
            <div class="guaranteeText">
              <p class="relationTitle">全民外贸用户在平台所代购的商品，会按照固定周期结算代购成本和代购利润。</p>
              <p class="relationPhone">如您还有任何问题可拨打公司热线电话：400 808 8399</p>
              <p class="relationWechat">或添加客服微信：qmwm2020,我们将竭诚为您服务！</p>
            </div>
          </div>
        </div>
        <div class="announcePic" @click="modal1 = true">
          <img src="https://static.qmwm777.com/web/Model%20announcement/11.jpg" alt="">
          <p class="tips">模式服务公告<span>(点击查看大图)</span></p>
        </div>
        <div class="grayBox"></div>
      </div>
    </div>
    <Modal v-model="modal1" title="模式服务公告" @on-ok="ok" @on-cancel="cancel">
      <Carousel v-model="value1" loop>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="https://static.qmwm777.com/web/Model%20announcement/11.jpg" alt="" class="modelImg">
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="https://static.qmwm777.com/web/Model%20announcement/22.jpg" alt="" class="modelImg">
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="https://static.qmwm777.com/web/Model%20announcement/33.jpg" alt="" class="modelImg">
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="https://static.qmwm777.com/web/Model%20announcement/44.jpg" alt="" class="modelImg">
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="https://static.qmwm777.com/web/Model%20announcement/66.jpg" alt="" class="modelImg">
          </div>
        </CarouselItem>
      </Carousel>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'Announcement',
  data () {
    return {
      modal1: false,
      value1: 0
    }
  },
  methods: {
    ok () {
    },
    cancel () {
    }
  }
}
</script>

<style lang="less"  scoped>
.container {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  position: relative;
  .announcement {
    width: 1200px;
    margin: 0 auto;
    .titleTop {
      padding: 40px 0;
      .title {
        font-size: 24px;
        line-height: 33px;
        color: #666;
        text-align: center;
        margin-bottom: 10px;
      }
      .smallTitle {
        font-size: 14px;
        line-height: 20px;
        color: #dedede;
        text-align: center;
      }
    }
    .announceBox {
      display: flex;
      justify-content: space-between;
      margin-top: 0px;
      .guaranteeBox {
        z-index: 999;
        margin-top: 220px;
        .guaranteeList {
          display: flex;
          justify-content: space-between;
          background-color: #fff;
          padding: 25px 20px;
          margin-top: 20px;
          width: 580px;
          height: 180px;
          .guaranteeText {
            .guaranteeTitle {
              font-size: 16px;
              color: #333;
              font-weight: 700;
              .blueDot {
                width: 11px;
                height: 11px;
                background-color: #138cff;
                display: inline-block;
                margin-right: 10px;
                border-radius: 50%;
              }
            }
            .guaranteeContent {
              margin-top: 15px;
              font-size: 12px;
              color: #333;
              line-height: 24px;
            }
          }
          .guaranteeImg {
            img {
              width: 180px;
              height: 124px;
            }
          }
        }
        .relationBox {
          background-color: #fff;
          margin-top: 20px;
          padding: 25px;
          width: 580px;
          height: 140px;
          .relationTitle,
          .relationPhone,
          .relationWechat {
            font-size: 14px;
            color: #333;
            line-height: 18px;
            text-align: left;
          }
          .relationPhone {
            margin-top: 20px;
          }
        }
      }
      .announcePic {
        z-index: 999;
        margin-left: 60px;
        cursor: pointer;
        .tips {
          padding: 20px 0;
          font-size: 18px;
          text-align: center;
          color: #333;
          span {
            color: #999;
          }
        }
        img {
          width: 580px;
          height: 780px;
          box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.08);
        }
      }
      .grayBox {
        position: absolute;
        bottom: 0px;
        left: 0;
        width: 1600px;
        height: 680px;
        background: #f9f9f9;
        border-top-right-radius: 40px;
        border-bottom-right-radius: 40px;
        // z-index: 0;
      }
    }
  }
}
/deep/ .ivu-modal {
  width: 610px !important;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .ivu-modal-body {
    margin: 0 0 30px 0;
  }
  .ivu-modal-footer {
    display: none;
  }
  .ivu-carousel-dots-inside {
    bottom: -15px;
  }
  .ivu-carousel,
  .ivu-carousel-list,
  .modelImg {
    width: 580px;
    height: 780px;
  }
}
</style>
