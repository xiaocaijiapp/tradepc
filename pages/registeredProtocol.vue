<template>
  <div class="protocol">
    <Modal v-model="showProtocolModal" title="全民外贸相关协议" width="900">
      <p class="title">《注册协议》</p>
      <p>【审慎阅读】您在申请注册流程中点击同意前,应当认真阅读以下协议。<span>请您务必审慎阅读、充分理解协议中相关条款内容，其中包括: </span></p>
      <p><span>1、与您约定免除或限制责任的条款</span></p>
      <p><span>2、与您约定法律适用和管辖的条款:</span></p>
      <p><span>3、其他以粗体下划线标识的重要条款。</span></p>
      <p>如您对协议有任何疑问，可向平台客服咨询。</p>
      <p>【特别提示】当您按照注册页面提示填写信息、阅读并同意协议且完成全部注册程序后,即表示您已充分阅读、理解井接受协议的全部内容。如您因平台服务与全民外贸发生争议的,适用《全民外贸平台服务协议》处理。如您在使用平台服务过程中与其他用户发生争议的,依您与其他用户达成的协议处理。</p>
      <div class="linktitle">
        <span @click="$router.push('/registeredProtocolDetail?type=1')">《全民外贸平台服务协议》</span>
        <span @click="$router.push('/registeredProtocolDetail?type=2')">《法律声明及隐私权政策》</span>
      </div>
      <p>【签约动作】当您按照注册页面提示填写信息，阅读并同意本协议且完成全部注册程序后,即表示您已充分阅读。理解并接受本协议的全部内容并与全民外贸达成一致,成为全民外贸平台“用户”。阅读本协议的过程中,如果您不同意本协议或其中任何条款约定,您应立即停止注册程序</p>
    <div slot="footer">
      <span class="btn" @click="$router.push('/')">取消</span>
      <span class="btn" @click="$router.push('/registered')">同意并继续</span>
    </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'registeredProtocol',
  layout: 'common',
  data () {
    return {
      showProtocolModal: true
    }
  }
}
</script>

<style scoped lang="less">
  .title {
    font-size: 14px;
    color: #0083FF;
    font-weight: 600;
  }
  p {
    line-height: 24px;
    font-size: 12px;
    color: #333333;
    span {
      font-weight: 600;
      text-decoration: underline;
    }
  }
  .linktitle {
    margin: 30px 0 25px 0;
    span {
      font-size: 14px;
      color: #0083FF;
      font-weight: 600;
      cursor: pointer;
    }
  }
  .btn:first-child {
    background-color: #f1f1f1;
    color: #999999;
  }
  .btn {
    display: inline-block;
    width: 168px;
    height: 40px;
    border-radius: 8px;
    background-color: #0083ff;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    color: #ffffff;
    line-height: 40px;
    cursor: pointer;
  }
</style>
