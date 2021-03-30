<template>
  <div class="container">
    <div class="bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/personal">
          个人中心
        </BreadcrumbItem>
        <BreadcrumbItem to="/orderManagement">
          订单管理
        </BreadcrumbItem>
        <BreadcrumbItem>
          电子合同
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="contractBox">
      <p class="title">电子合同</p>
      <div class="contractPic">
        <img src="https://static.qmwm777.com/web/project%20introduction/b_z1.jpg" alt="" class="conImg" @click="modal1 = true">
      </div>
      <p class="bottomtips">电子合同<span>(点击查看大图)</span></p>
      <div class="btnBox">
        <Button class="submitEmail" @click="modal2 = true">发送合同至邮箱</Button>
      </div>
    </div>
    <Modal v-model="modal1" title="电子合同" @on-ok="ok" @on-cancel="cancel">
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
    <Modal title="电子合同" v-model="modal2" class-name="vertical-center-modal">
      <p class="modalTitle">将发送至您填写的邮箱</p>
      <Input v-model="formItem.email" placeholder="请输入邮箱" class="emailInput"></Input>
      <div class="btnDiv">
        <Button class="cancelBtn" @click="modal2 = false">取消</Button>
        <Button class="submitBtn">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'Shopping',
  data () {
    return {
      modal1: false,
      modal2: false,
      value1: 0,
      formItem: {
        email: ''
      }
    }
  },
  methods: {
    ok () {
    },
    cancel () {
    },
    submitEmail () {
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 15px 0 30px 0;
  background-color: #f3f4f6;
  .bread {
    width: 1200px;
    margin: 0 auto;
  }
  .contractBox {
    width: 1200px;
    background-color: #fff;
    margin: 0 auto;
    padding: 30px;
    margin-top: 15px;
    .title {
      font-size: 24px;
      color: #333;
      font-weight: 700;
      text-align: left;
    }
    .contractPic {
      width: 100%;
      .conImg {
        width: 483px;
        margin: 0 auto;
        display: block;
        height: 666px;
        margin-top: 30px;
        box-shadow: 0px 2px 5px 2px rgba(17, 16, 255, 0.05);
      }
    }
    .bottomtips {
      font-size: 14px;
      color: #333;
      text-align: center;
      margin-top: 20px;
      span {
        color: #999;
      }
    }
    .btnBox {
      width: 100%;
      text-align: center;
      .submitEmail {
        width: 200px;
        height: 40px;
        background: #0083ff;
        border-radius: 2px;
        color: #fff;
        outline: none;
        border: none;
        font-size: 14px;
        margin-top: 30px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
/deep/ .ivu-modal {
  width: auto !important;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .ivu-modal-body {
    padding: 30px 60px;
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
  .modalTitle {
    font-size: 12px;
    color: #333;
    text-align: left;
  }
  .ivu-input {
    width: 350px;
    height: 40px;
    line-height: 40px;
    border-radius: 7px;
    border: 1px solid #d7d7d7;
    margin-top: 15px;
  }
  .btnDiv {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 40px;
    .cancelBtn {
      width: 150px;
      height: 40px;
      border: 1px solid #888888;
      border-radius: 3px;
      outline: none;
      background-color: transparent;
    }
    .submitBtn {
      width: 150px;
      height: 40px;
      background: #0083ff;
      outline: none;
      border: none;
      color: #fff;
      margin-left: 40px;
      border-radius: 2px;
    }
    .ivu-modal-content {
      width: 469px;
      .ivu-modal-body {
        padding: 30px 60px;
      }
    }
  }
}
</style>
