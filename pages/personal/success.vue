<template>
  <div class="with-success">
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
    <div class="success-area">
      <div class="content">
        <img src="~/assets/images/index/with-success.png" class="success-img" alt="">
        <p class="text">
          提现成功
        </p>
        <p class="desc">
          具体通知时间以银行通知为主
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Success'
}
</script>

<style lang="less" scoped>
.with-success {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  .bread {
    margin: 8px 0;
  }
  .success-area {
    width: 1200px;
    height: 585px;
    background-color: #FFFFFF;
    border-radius: 1px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    .content {
      width: 185px;
      height: auto;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      .success-img {
        width: 185px;
        height: 93px;
      }
      .text {
        font-size: 16px;
        font-weight: 500;
        color: #333333;
        line-height: 14px;
        margin-top: 30px;
      }
      .desc {
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        line-height: 14px;
        margin-top: 20px;
      }
    }
  }
}
</style>
