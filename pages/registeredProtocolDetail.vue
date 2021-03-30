<template>
  <div class="protocoldetail">
    <div v-html="detailInfo"></div>
  </div>
</template>

<script>
export default {
  name: 'registeredProtocolDetail',
  layout: 'common',
  data () {
    return {
      detailInfo: ''
    }
  },
  mounted () {
    this.queryProtocolDetail()
  },
  methods: {
    queryProtocolDetail () {
      const _this = this
      if (_this.$route.query.type === '1') {
        _this.$axios.get('/delegate/agreement/1369839358851620865').then((res) => {
          if (res.data.code === 200) {
            _this.detailInfo = res.data.data.content || {}
          }
        })
      }
      if (_this.$route.query.type === '2') {
        _this.$axios.get('/delegate/agreement/1369840758079844354').then((res) => {
          if (res.data.code === 200) {
            _this.detailInfo = res.data.data.content || {}
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.protocoldetail {
  background: #fff;
  padding: 0 120px 80px;
}
</style>
