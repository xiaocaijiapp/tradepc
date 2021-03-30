<template>
  <div class="container">
    <div class="opinionBox">
      <p class="title">
        常见问题
      </p>
      <div class="problem-area" v-for="(item) in list" :key="item.id">
        <p class="bigTitle">
          {{item.title}}
        </p>
        <div class="problemContent" v-html="item.content">
          {{item.content}}
        </div>
      </div>
    </div>
    <div class="paging">
      <Page :total="totalRows" :current="page" :page-size="10" show-elevator @on-change="changePage" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProblemList',
  async asyncData ({ $axios, error }) {
    try {
      let list, totalRows
      await $axios.get(`/delegate/feedback/faq/${1}/${10}`).then((res) => {
        if (res.data.code === 200) {
          list = res.data.data.rows
          totalRows = res.data.data.totalRows
        }
      })
      return {
        list,
        totalRows
      }
    } catch (err) {
      return error(err)
    }
  },
  data () {
    return {
      page: 1
    }
  },
  mounted () {
  },
  methods: {
    changePage (e) {
      this.$axios.get(`/delegate/feedback/faq/${e}/${10}`).then((res) => {
        if (res.data.code === 200) {
          this.list = res.data.data.rows
          this.totalRows = res.data.data.totalRows
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 1200px;
  margin: 0 auto 30px;
  background-color: #fff;
  .opinionBox {
    padding: 30px;
    .title {
      font-size: 24px;
      color: #333;
      font-weight: 700;
      text-align: left;
      margin-bottom: 20px;
    }
    .bigTitle,
    .problemContent {
      font-size: 14px;
      color: #999;
      text-align: left;
    }
    .bigTitle {
      color: #333;
      margin-top: 10px;
    }
    .littleTitle {
      font-size: 12px;
      font-weight: 500;
      color: #999;
      text-align: left;
    }
    .problemContent {
      color: #999;
      font-size: 12px;
      padding: 10px 0 30px 0;
    }

    .problemContent:last-child {
      padding-bottom: 0;
    }
    .explainTips {
      color: #999;
      line-height: 20px;
    }
  }
  .paging {
    width: 100%;
    height: 80px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }
}
</style>
