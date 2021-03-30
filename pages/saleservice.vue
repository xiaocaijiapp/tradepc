<template>
  <div class="container">
    <div class="outBox">
      <p class="title">售后服务</p>
      <div class="contentBox">
        <div class="goodsBox">
          <div class="boxList">
            <div class="leftBox">
              <p class="boxTitle">
                <span class="blueCircle"></span>
                商品营销保障
              </p>
              <div class="boxText">
                用户购买的商品在周期内未售出的，由日本三益贸易株式会社旗下的“STARDAY”商城进行回售，不影响用户代购和代购利润的按时发放。
              </div>
            </div>
            <div class="rightBox">
              <img src="~/assets/images/index/11.png" class="qrocde" />
            </div>
          </div>
          <div class="boxList">
            <div class="leftBox">
              <p class="boxTitle">
                <span class="blueCircle"></span>
                商品营销保障
              </p>
              <div class="boxText">
                用户购买的商品在周期内未售出的，由日本三益贸易株式会社旗下的“STARDAY”商城进行回售，不影响用户代购和代购利润的按时发放。
              </div>
            </div>
            <div class="rightBox">
              <img src="~/assets/images/index/22.png" class="qrocde" />
            </div>
          </div>
        </div>
        <div class="tipsContent">
          <div class="tips">
            全民外贸用户在平台所代购的商品，会按照固定周期结算代购成本和代购利润。<br>
            如您还有任何问题可拨打公司热线电话：400 808 8399 或添加客服微信：qmwm2020,我们将竭诚为您服务！
          </div>
        </div>
        <div class="documentBox">
          <div class="imgBox" @click="modal1 = true">
            <img src="https://static.qmwm777.com/web/project%20introduction/b_z1.jpg" alt="" class="file-image">
            <img src="https://static.qmwm777.com/web/project%20introduction/b_z2.jpg" alt="" class="file-image">
          </div>
          <p class="bottomtips">售后承诺书<span>(点击查看大图)</span></p>
        </div>
      </div>
    </div>
    <Modal v-model="modal1" title="售后承诺书" @on-ok="ok" @on-cancel="cancel">
      <Carousel v-model="value1" loop>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="https://static.qmwm777.com/web/project%20introduction/b_z1.jpg" alt="" class="modelImg">
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="https://static.qmwm777.com/web/project%20introduction/b_z2.jpg" alt="" class="modelImg">
          </div>
        </CarouselItem>
      </Carousel>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'Newhand',
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

<style lang="less" scoped>
.container {
  width: 100%;
  height: auto;
  background-color: #f3f4f6;
  padding: 30px 0;
  .outBox {
    width: 1200px;
    margin: 0 auto;
    background-color: #fff;
    padding: 30px;
    .title {
      font-size: 24px;
      color: #333;
      text-align: left;
      font-size: 700;
    }
    .contentBox {
      padding: 30px;
      text-align: center;
      .goodsBox {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .boxList {
          width: 532px;
          height: 180px;
          padding: 20px;
          box-shadow: 0px 2px 5px 2px rgba(17, 16, 255, 0.05);
          display: flex;
          justify-content: space-between;
          .boxTitle {
            font-size: 16px;
            color: #333;
            font-weight: 700;
            text-align: left;
            .blueCircle {
              width: 11px;
              height: 11px;
              border-radius: 50%;
              display: inline-block;
              background-color: #138cff;
              margin-right: 10px;
            }
          }
          .boxText {
            font-size: 12px;
            color: #333;
            line-height: 24px;
            text-align: left;
            margin-top: 20px;
          }
          .qrocde {
            width: 180px;
            height: 124px;
            margin-left: 40px;
            margin-top: 8px;
          }
        }
      }
      .tipsContent {
        width: 100%;
        padding: 20px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0px 2px 5px 2px rgba(17, 16, 255, 0.05);
        margin-top: 30px;
        .tips {
          font-size: 14px;
          color: #333;
          text-align: left;
          line-height: 24px;
        }
      }
      .documentBox {
        width: 1080px;
        height: 764px;
        background-color: #f9f9f9;
        border-radius: 10px;
        padding: 30px 40px;
        margin-top: 30px;
        .imgBox {
          display: flex;
          justify-content: space-between;
          .file-image {
            width: 483px;
            height: 666px;
            cursor: pointer;
          }
        }
        .bottomtips {
          font-size: 18px;
          color: #333;
          text-align: center;
          margin-top: 25px;
          span {
            color: #999;
          }
        }
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
