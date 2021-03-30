<template>
  <div class="page-error">
    <div class="err-content">
      <img src="~/assets/images/index/error.png" class="error-icon">
      <span class="text">数据加载失败</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  mounted () {
    console.log(this.error)
  }
}
</script>
<style lang="less" scoped>
  .page-error {
    width: 1200px;
    min-height: calc(100vh - 457px);
    margin: 20px auto;
    background-color: #FFFFFF;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    .err-content {
      width: 300px;
      height: 300px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: center;
      .text {
        font-size: 14px;
        font-weight: 400;
        color: #c9c9c9;
        line-height: 20px;
        margin-top: 20px;
      }
    }
  }
</style>
