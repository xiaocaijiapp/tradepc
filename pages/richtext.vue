<template>
  <div class="rich-text-container">
    <img src="https://static.qmwm777.com/web/banner/lALPDgQ9xKIeho_M3M0HgA_1920_220.png" class="banner">
    <div class="content" v-html="rich" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Richtext',
  asyncData ({ query }) {
    const { type, index } = query
    return { type, index }
  },
  data () {
    return {
      rich: ''
    }
  },
  computed: {
    ...mapGetters(['richText'])
  },
  beforeMount () {
    this.rich = this.richText[this.type][this.index].content
  }
}
</script>

<style lang="less" scoped>
.rich-text-container {
  width: 100%;
  background: #FFFFFF;
  .banner {
    width: 100%;
    height: 300px;
  }
  .content {
    width: 1200px;
    overflow: hidden;
    margin: 0 auto;
    min-height: 300px;
  }
}
</style>
