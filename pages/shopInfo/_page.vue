<template>
  <div class="shopping-container">
    <div class="bread">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">
          首页
        </BreadcrumbItem>
        <BreadcrumbItem to="/shopping">
          商城
        </BreadcrumbItem>
        <BreadcrumbItem>
          店铺信息
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!-- 店铺信息 -->
    <div class="shopInfomation">
      <div class="infoDetail">
        <div class="title">
          <h3 class="title-name">
            店铺信息
          </h3>
          <span class="small-title">Store information</span>
        </div>
        <div class="content">
          <div v-for="item in storeList" :key="item.id" class="shopInfoBg" @click="toDetail(item.companyInfoId)">
            <img v-if="item.platform == 'amazon'" src="~/assets/images/index/shopInfo.png" class="shopImg">
            <img v-if="item.platform == 'ebay'" src="~/assets/images/index/shopInfoOne.png" class="shopImg">
            <p class="store">
              {{ item.name }}
            </p>
          </div>
        </div>
      </div>
      <div class="paging">
        <Page :total="totalRows" :current="pageNo" show-elevator show-total @on-change="changePage" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Shopping',
  layout: 'shopping',
  async asyncData ({ params, $axios }) {
    const { page } = params
    let storeList, totalRows
    await $axios.post('/delegate/store/list', {
      pageNo: page,
      pageSize: 10
    }).then((res) => {
      if (res.data.code === 200) {
        storeList = res.data.data.rows
        totalRows = res.data.data.totalRows
      }
    })
    return {
      pageNo: page * 1,
      storeList,
      totalRows
    }
  },
  data () {
    return {
      cateBox: false
    }
  },
  methods: {
    ...mapMutations(['setStoreId']),
    toDetail (id) {
      this.$router.push({
        name: 'store-id',
        params: {
          id
        }
      })
      this.setStoreId(id)
    },
    changePage (index) {
      this.$router.push({ name: 'shopInfo-page', params: { page: index } })
    }
  }
}
</script>

<style lang="less" scoped>
.shopping-container {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  background-color: #f3f4f6;
  .bread {
    margin: 8px 0;
  }
  .shopInfomation{
    width: 1200px;
    background-color: #fff;
    margin-bottom: 20px;
    .infoDetail{
      width: 100%;
      height: 460px;
      background-color: #fff;
      padding: 30px;
      .title-name{
        font-size: 24px;
        color: #333;
        line-height: 33px;
        font-weight: 700;
      }
      .small-title{
        font-size: 16px;
        color: #c9c9c9;
        line-height: 22px;
        margin-top: 8px;
        display: block;
      }
      .content{
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
        .shopInfoBg{
          width: 210px;
          height: 120px;
          background-color: #fff;
          box-shadow: 0px 0px 10px #ccc;
          text-align: center;
          margin-top: 22px;
          cursor: pointer;
          .shopImg{
            width: 118px;
            height: 56px;
            margin-top: 10px;
          }
          .store{
            font-size: 16px;
            color: #333;
            line-height: 22px;
          }
        }
      }
    }
    .paging {
      width: 100%;
      height: 100px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
