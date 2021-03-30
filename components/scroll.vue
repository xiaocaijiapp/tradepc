<template>
  <div :style="{ height: `${height}px` }" class="outer" @mouseover="stopScroll" @mouseleave="startScroll">
    <div ref="inner1">
      <slot />
    </div>
    <div ref="inner2" />
  </div>
</template>

<script>
export default {
  props: {
    // 设定容器高度
    height: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    this.getDomRef()
    this.tryScroll()
  },
  updated () {
    this.tryScroll()
  },
  methods: {
    // 将dom元素的引用绑定到this上
    getDomRef () {
      this.outer = this.$el
      this.inner1 = this.$refs.inner1
      this.inner2 = this.$refs.inner2
    },
    tryScroll () {
      // 如果inner1的高度超过outer，则将其内容原样保存一份至inner2中，并开启滚动定时器
      if (this.inner1.clientHeight > this.outer.clientHeight) {
        this.inner2.innerHTML = this.inner1.innerHTML
        this.startScroll()
      } else {
        // 否则清空inner2中的内容，并停止滚动定时器
        this.inner2.innerHTML = ''
        this.stopScroll()
      }
    },
    // 开启滚动定时器
    startScroll () {
      if (!this.autoScrollInterval) {
        this.autoScrollInterval = setInterval(() => {
          // 如果已经滚动到inner1的底部，则重置滚动的位置到inner1的头部
          if (this.outer.scrollTop >= this.inner1.offsetHeight) {
            this.outer.scrollTop = 0
            // 触发complete事件
            this.$emit('complete')
          } else {
            // 否则向下滚动1个单位
            this.outer.scrollTop += 1
            // 如果滚动了inner1一半的内容，则触发half事件
            if (
              this.outer.scrollTop === Math.ceil(this.inner1.offsetHeight / 2)
            ) {
              this.$emit('half')
            }
          }
        }, 50)
      }
    },
    // 停止滚动定时器
    stopScroll () {
      clearInterval(this.autoScrollInterval)
      this.autoScrollInterval = null
    }
  }
}
</script>

<style scoped>
  .outer {
    overflow: hidden;
  }
</style>
