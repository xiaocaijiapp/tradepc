<template>
  <div class="container">
    <div class="newsInfoBox">
      <p class="title">
        消息详情
      </p>
      <div class="messageContent">
        <p class="sendInfo">
          <span class="sendDate">发送时间：{{ details.sendTime }}</span>
          <span class="sendPerson">发送人：{{ details.sendUserName }}</span>
        </p>
        <div class="messageBox">
          <p class="bigTitle">
            {{ details.title }}
          </p>
          <div class="messageText">
            <div class="content">
              {{ details.detail }}
            </div>
            <div v-if="shareInfoList.length > 0" class="mail-link">
              <span>链接地址：</span>
              <p v-for="item in shareInfoList" :key="item.id" class="link-item" @click="linkTo(item)">
                {{ item.name }}
              </p>
            </div>
            <div v-if="attachments.length > 0" class="mail-images">
              <img v-for="(url, index) in attachments" :key="index" :src="baseImageUrl + url" class="iamge-area">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LetterDetail',
  async asyncData ({ $axios, params, error, store }) {
    try {
      const { id } = params
      let details, attachments, shareInfoList
      await $axios.get('/delegate/mail/getMailInfo', {
        params: {
          id
        }
      }).then((res) => {
        if (res.data.code === 200) {
          details = res.data.data
          attachments = res.data.data.attachments.split(',')
          shareInfoList = res.data.data.shareInfoList
          store.dispatch('getMailCount')
        }
      })
      return {
        details,
        attachments,
        shareInfoList
      }
    } catch (err) {
      return error(err)
    }
  },
  computed: {
    ...mapGetters(['baseImageUrl'])
  },
  created () {
    console.log(this.details)
    console.log(this.attachments)
  },
  methods: {
    linkTo (item) {
      switch (item.type) {
        case 1:
          // 首页
          this.$router.push('/')
          break
        case 2:
          // 资讯
          this.$router.push({ name: 'newsdetail-id', params: { id: item.linkId } })
          break
        case 3:
          // 活动
          this.$router.push({ name: 'activity-details-id', params: { id: item.linkId } })
          break
        case 4:
          this.$router.push({ name: 'details-id', params: { id: item.linkId } })
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: auto;
  background-color: #f3f4f6;
  padding: 20px 0;
  .newsInfoBox {
    background-color: #fff;
    width: 1200px;
    margin: 0 auto;
    padding: 40px 30px;
    .title {
      font-size: 24px;
      color: #333;
      font-weight: 700;
    }
    .messageContent {
      padding: 50px 170px;
      .sendInfo {
        width: 100%;
        text-align: left;
        font-size: 12px;
        color: #333;
        .sendPerson {
          margin-left: 20px;
        }
      }
      .messageBox {
        width: 800px;
        border-radius: 2px;
        box-shadow: 0px 2px 5px 2px rgba(17, 16, 255, 0.05);
        padding: 25px 50px;
        margin-top: 20px;
        .bigTitle {
          width: 500px;
          font-size: 18px;
          text-align: center;
          font-weight: 700;
          margin: 0 auto;
        }
        .messageText {
          margin-top: 20px;
          .content {
            font-size: 12px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            line-height: 24px;
            text-indent: 20px;
          }
          .mail-link {
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;
            margin-top: 20px;
            .link-item {
              font-size: 12px;
              font-weight: 400;
              text-align: left;
              color: #0083ff;
              line-height: 24px;
              cursor: pointer;
              text-indent: 20px;
            }
          }
          .mail-images {
            width: 100%;
            display: flex;
            flex-flow: row wrap;
            justify-content: flex-start;
            align-items: flex-start;
            margin-top: 20px;
            .iamge-area:nth-of-type(3n){
              margin-right: 0px;
            }
            .iamge-area{
              width: 220px;
              height: 220px;
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
