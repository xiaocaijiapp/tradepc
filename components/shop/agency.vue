<template>
  <div class="agency-container" @click="GoodsDetails">
    <img v-lazy="baseImageUrl + agencies.img" class="goods-img">
    <div class="title">
      {{ agencies.title }}
    </div>
    <div class="number">
      <span class="price">{{ agencies.outPrice }}</span>
      <div class="lr">
        <span class="lr-txt">利润:</span>
        <span class="lr-num">{{ agencies.rate }}</span>
      </div>
    </div>
    <div class="kc">
      <div v-if="agencies.inventory > 0" class="kc-txt">
        {{ `剩余${agencies.inventory}件` }}
      </div>
      <div v-else class="kc-txt">
        已抢完
      </div>
      <div class="kc-progress">
        <Progress :stroke-width="9" :percent="(agencies.sales / agencies.totalInventory) * 100" hide-info/>
      </div>
    </div>
    <img src="~/assets/images/index/hot.png" class="hot-icon">
    <div v-if="agencies.goodsType == 4" class="mask">
      <img src="~/assets/images/index/over.png" alt="">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Agency',
  props: {
    agencies: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters(['baseImageUrl'])
  },
  methods: {
    GoodsDetails () {
      this.$router.push({ name: 'details-id', params: { id: this.agencies.id } })
    }
  }
}
</script>

<style lang="less" scoped>
.agency-container {
  cursor: pointer;
  width: 204px;
  height: 345px;
  background: #ffffff;
  border-radius: 1px;
  box-shadow: 0px 1px 5px 2px rgba(0,0,0,0.04);
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  font-size: 0;
  margin-bottom: 30px;
  .goods-img {
    width: 204px;
    height: 205px;
    object-fit: cover;
    border-top-left-radius: 1px;
    border-top-right-radius: 1px;
  }
  .title {
    width: 100%;
    min-height: 69px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    padding: 13px 14px 8px 13px;
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    color: #333333;
    line-height: 24px;
    word-break: break-all;
  }
  .number {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 13px;
    .price::before{
      content: '￥';
      font-size: 16px;
      font-weight: 500;
      color: #333333;
      line-height: 24px;
    }
    .price {
      font-size: 22px;
      font-weight: 500;
      color: #333333;
      line-height: 24px;
    }
    .lr {
      font-size: 14px;
      font-weight: 400;
      text-align: left;
      color: #ff7100;
      line-height: 20px;
    }
  }
  .kc {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 13px;
    margin-top: 15px;
    .kc-txt {
      font-size: 14px;
      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 20px;
    }
    .kc-progress {
      width: 100px;
      height: 100%;
    }
  }
  .hot-icon {
    position: absolute;
    width: 54px;
    height: 26px;
    left: 0;
    top: 9px;
  }
  .mask {
    position: absolute;
    width: 204px;
    height: 204px;
    background-color: rgba(51,51,51,.7);
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    img {
      width: 80px;
      height: 80px;
    }
  }
}
</style>
