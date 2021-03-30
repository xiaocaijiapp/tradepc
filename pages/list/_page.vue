<template>
  <div class="list-container">
    <div class="bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">
          首页
        </BreadcrumbItem>
        <BreadcrumbItem to="/shopping">
          商城
        </BreadcrumbItem>
        <BreadcrumbItem>商品列表</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--筛选条件-->
    <div class="screening-area">
      <div class="goods-state">
        <span class="title">所有分类:</span>
        <div class="group">
          <div v-for="(item, index) in statusArr" :key="index" class="check-area">
            <span v-if="item.state === 'status'" class="check-text">商品状态:</span>
            <span v-if="item.state === 'price'" class="check-text">商品单价:</span>
            <span class="check-text">{{ item.name }}</span>
            <img src="~/assets/images/index/status-close.png" class="close" @click="changeCheckStatus(item)">
          </div>
        </div>
      </div>
      <div class="goods-state">
        <span class="title">商品状态:</span>
        <div class="group">
          <div v-for="(item, index) in stateGroup" :key="index" class="item" @click="changeState(item.code)">
            <span class="name" :class="item.check ? 'active' : ''">{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="goods-state">
        <span class="title">商品单价:</span>
        <div class="group">
          <div v-for="(item, index) in priceGroup" :key="index" class="item" @click="changePrice(item.code, index)">
            <span class="name" :class="item.check ? 'active' : ''">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="list-content">
      <div class="list">
        <agency v-for="item in listData.rows" :key="item.id" :agencies="item" />
      </div>
      <div v-if="listData.rows.length > 0" class="paging">
        <Page
          :total="listData.totalRows"
          :current="page"
          :page-size="pageSize"
          show-total
          show-elevator
          @on-change="changePage"
        />
      </div>
      <div v-else class="empty">
        <img src="~/assets/images/index/noInfo.png" alt="">
        <span>暂无数据</span>
      </div>
    </div>
  </div>
</template>

<script>
import agency from '../../components/shop/agency'
export default {
  name: 'List',
  components: {
    agency
  },
  layout: 'shopping',
  async asyncData ({ $axios, params, query, error }) {
    try {
      const stateGroup = [
        { name: '全部', check: false, code: '' },
        { name: '热销中', check: false, code: 2 },
        { name: '已完成', check: false, code: 4 }
      ]
      const priceGroup = [
        { name: '100-499', interval: { end: 499, start: 100 }, check: false, code: 0 },
        { name: '500-999', interval: { end: 999, start: 500 }, check: false, code: 1 },
        { name: '1000-1999', interval: { end: 1999, start: 1000 }, check: false, code: 2 },
        { name: '2000元以上', interval: { end: null, start: 2000 }, check: false, code: 3 }
      ]
      const { page } = params
      const { type = 'list', keywords = '', state, category, size, interval } = query
      const sellState = state ? state * 1 : ''
      const cate = category || null // 类目
      let end = null // 价格上限
      let start = null // 价格下限
      const pageSize = size || 15 // 页码长度
      const pageNo = page * 1 || 1 // 页码
      const statusArr = []
      if (interval) {
        priceGroup[interval].check = true
        end = priceGroup[interval].interval.end // 价格上限
        start = priceGroup[interval].interval.start // 价格下限
        statusArr.push({ state: 'price', index: interval, ...priceGroup[interval] })
      } else {
        end = null
        start = null
      }
      stateGroup.forEach((item) => {
        if (item.code === sellState) {
          item.check = true
          statusArr.push({ state: 'status', ...item })
        }
      })
      const listRequest = {
        endPrice: end,
        keyWord: keywords,
        goodsCategory: cate,
        goodsType: sellState,
        startPrice: start,
        pageNo,
        pageSize
      }
      const response = await $axios.post('/delegate/goods/list', listRequest)
      const { data: listData } = response.data
      return {
        page: page * 1,
        pageSize,
        type,
        keywords,
        category,
        interval,
        listData,
        sellState,
        stateGroup,
        priceGroup,
        statusArr: statusArr.reverse()
      }
    } catch (err) {
      return error(err)
    }
  },
  data () {
    return {
    }
  },
  watchQuery: ['type', 'state', 'interval', 'keywords', 'category', 'size'],
  created () {
    console.log(this.statusArr)
  },
  methods: {
    changeCheckStatus (item) {
      if (item.state === 'status') {
        this.changeState(item.code)
      } else {
        this.changePrice(item.code, item.index)
      }
    },
    changeState (state) {
      if (this.type === 'list') {
        if (state) {
          const _index = this.priceGroup.findIndex(item => item.check)
          if (_index === -1) {
            this.$router.push({ path: `/list/${this.page}`, query: { type: this.type, state } })
          } else {
            this.$router.push({ path: `/list/${this.page}`, query: { type: this.type, interval: _index, state } })
          }
        } else {
          const _index = this.priceGroup.findIndex(item => item.check)
          if (_index === -1) {
            this.$router.push({ path: `/list/${this.page}`, query: { type: this.type } })
          } else {
            this.$router.push({ path: `/list/${this.page}`, query: { type: this.type, interval: _index } })
          }
        }
      } else if (this.type === 'cate') {
        if (state) {
          const _index = this.priceGroup.findIndex(item => item.check)
          if (_index === -1) {
            this.$router.push({ path: `/list/${this.page}`, query: { type: this.type, category: this.category, state } })
          } else {
            this.$router.push({ path: `/list/${this.page}`, query: { type: this.type, category: this.category, interval: _index, state } })
          }
        } else {
          const _index = this.priceGroup.findIndex(item => item.check)
          if (_index === -1) {
            this.$router.push({ path: `/list/${this.page}`, query: { type: this.type, category: this.category } })
          } else {
            this.$router.push({ path: `/list/${this.page}`, query: { type: this.type, category: this.category, interval: _index } })
          }
        }
      } else if (state) {
        const _index = this.priceGroup.findIndex(item => item.check)
        if (_index === -1) {
          this.$router.push({ path: `/list/${this.page}`, query: { type: this.type, keywords: this.keywords, category: this.category, state } })
        } else {
          this.$router.push({ path: `/list/${this.page}`, query: { type: this.type, keywords: this.keywords, category: this.category, interval: _index, state } })
        }
      } else {
        const _index = this.priceGroup.findIndex(item => item.check)
        if (_index === -1) {
          this.$router.push({ path: `/list/${this.page}`, query: { type: this.type, keywords: this.keywords, category: this.category } })
        } else {
          this.$router.push({ path: `/list/${this.page}`, query: { type: this.type, keywords: this.keywords, category: this.category, interval: _index } })
        }
      }
    },
    changePrice (code, _index) {
      if (this.type === 'list') {
        if (this.priceGroup[_index].check) {
          if (this.sellState) {
            this.$router.push({ path: `/list/${this.page}`, query: { type: this.type, state: this.sellState || '' } })
          } else {
            this.$router.push({ path: `/list/${this.page}`, query: { type: this.type } })
          }
        } else if (this.sellState) {
          this.$router.push({ path: `/list/${this.page}`, query: { type: this.type, state: this.sellState || '', interval: _index } })
        } else {
          this.$router.push({ path: `/list/${this.page}`, query: { type: this.type, interval: _index } })
        }
      } else if (this.type === 'cate') {
        if (this.priceGroup[_index].check) {
          if (this.sellState) {
            this.$router.push({ path: `/list/${this.page}`, query: { type: this.type, state: this.sellState, category: this.category } })
          } else {
            this.$router.push({ path: `/list/${this.page}`, query: { type: this.type, category: this.category } })
          }
        } else if (this.sellState) {
          this.$router.push({ path: `/list/${this.page}`, query: { type: this.type, state: this.sellState, interval: _index, category: this.category } })
        } else {
          this.$router.push({ path: `/list/${this.page}`, query: { type: this.type, interval: _index, category: this.category } })
        }
      } else if (this.priceGroup[_index].check) {
        if (this.sellState) {
          this.$router.push({ path: `/list/${this.page}`, query: { type: this.type, keywords: this.keywords, state: this.sellState || '' } })
        } else {
          this.$router.push({ path: `/list/${this.page}`, query: { type: this.type, keywords: this.keywords } })
        }
      } else if (this.sellState) {
        this.$router.push({ path: `/list/${this.page}`, query: { type: this.type, keywords: this.keywords, state: this.sellState || '', interval: _index } })
      } else {
        this.$router.push({ path: `/list/${this.page}`, query: { type: this.type, keywords: this.keywords, interval: _index } })
      }
    },
    changePage (e) {
      if (this.type === 'list') {
        if (this.sellState) {
          const _index = this.priceGroup.findIndex(item => item.check)
          if (_index === -1) {
            this.$router.push({ path: `/list/${e}`, query: { type: this.type, interval: this.interval, state: this.sellState } })
          } else {
            this.$router.push({ path: `/list/${e}`, query: { type: this.type, interval: this.interval, state: this.sellState } })
          }
        } else {
          const _index = this.priceGroup.findIndex(item => item.check)
          if (_index === -1) {
            this.$router.push({ path: `/list/${e}`, query: { type: this.type, state: this.sellState } })
          } else {
            this.$router.push({ path: `/list/${e}`, query: { type: this.type, interval: this.interval } })
          }
        }
      } else if (this.type === 'cate') {
        if (this.sellState) {
          const _index = this.priceGroup.findIndex(item => item.check)
          if (_index === -1) {
            this.$router.push({ path: `/list/${e}`, query: { type: this.type, interval: this.interval, state: this.sellState, category: this.category } })
          } else {
            this.$router.push({ path: `/list/${e}`, query: { type: this.type, interval: this.interval, state: this.sellState, category: this.category } })
          }
        } else {
          const _index = this.priceGroup.findIndex(item => item.check)
          if (_index === -1) {
            this.$router.push({ path: `/list/${e}`, query: { type: this.type, state: this.sellState, category: this.category } })
          } else {
            this.$router.push({ path: `/list/${e}`, query: { type: this.type, interval: this.interval, category: this.category } })
          }
        }
      } else if (this.sellState) {
        const _index = this.priceGroup.findIndex(item => item.check)
        if (_index === -1) {
          this.$router.push({ path: `/list/${e}`, query: { type: this.type, keywords: this.keywords, interval: this.interval, state: this.sellState, category: this.category } })
        } else {
          this.$router.push({ path: `/list/${e}`, query: { type: this.type, keywords: this.keywords, interval: this.interval, state: this.sellState, category: this.category } })
        }
      } else {
        const _index = this.priceGroup.findIndex(item => item.check)
        if (_index === -1) {
          this.$router.push({ path: `/list/${e}`, query: { type: this.type, keywords: this.keywords, state: this.sellState, category: this.category } })
        } else {
          this.$router.push({ path: `/list/${e}`, query: { type: this.type, keywords: this.keywords, interval: this.interval, category: this.category } })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list-container {
  width: 100%;
  min-height: calc(100vh - 501px);
  padding: 0 360px;
  .bread {
    margin: 8px 0;
  }
  .screening-area {
    width: 1200px;
    height: 120px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-start;
    background-color: #ffffff;
    padding: 0 30px;
    .goods-state {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 30px;
      .title {
        width: 80px;
        font-size: 16px;
        font-weight: 500;
        text-align: left;
        color: #333333;
        line-height: 22px;
      }
      .group {
        flex: 1;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        .item {
          display: flex;
          align-items: center;
          width: 120px;
          cursor: pointer;
          .name {
            margin-left: 6px;
            font-size: 14px;
            font-weight: 400;
            color: #333333;
            line-height: 20px;
          }
          .active {
            font-weight: 500;
            color: #1491ff;
          }
        }
        .check-area:nth-of-type(1){
          margin-left: 0;
        }
        .check-area {
          border: 1px solid #0083ff;
          border-radius: 3px;
          padding: 0 15px;
          margin-left: 20px;
          .check-text {
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            color: #0083ff;
            line-height: 28px;
          }
          .check-text:nth-of-type(2){
            margin-left: 8px;
          }
          .close {
            margin-left: 6px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .list-content {
    width: 1200px;
    height: auto;
    border-radius: 1px;
    background-color: #FFFFFF;
    margin: 20px 0px;
    padding: 40px 30px 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    .list {
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      .agency-container:nth-of-type(5n+1){
        margin-left: 0;
      }
      .agency-container {
        margin-left: 30px;
      }
    }
    .paging {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      padding-bottom: 20px;
    }
  }
  .empty {
    width: 100%;
    height: 360px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 200px;
      height: 150px;
    }
    span {
      display: inline-block;
      margin-top: 20px;
      font-size: 18px;
      color: #999999;
    }
  }
}
</style>
