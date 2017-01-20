<style lang="scss" scoped>
.detail-wrap {
  padding: 20px;
}
.detail-type{
    padding: 0 30px;
}
.mb-detail-main {
  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-left {
      display: flex;
      align-items: center;
    }

    &-right {
      width: 20%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__body {
    padding: 0 10px;
    border-bottom: 1px solid #666;
  }
}

.mb-detail-comments {
  margin-top: 10px;

  &__item {
    display: flex;
    margin: 10px 0;

    &-left {
      margin-right: 10px;
    }

    &-center {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
    }

    &-right {
      display: flex;
      width: 20%;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>

<template lang="html">
  <div class="my-container">
    <h2 class="mb-title">动态内容</h2>
    <div class="detail-type">
      <div v-if="dynamicDatas.groupName">来自：{{ dynamicDatas.groupName }}</div>
      <div v-if="dynamicDatas.topicName">话题： {{ dynamicDatas.topicName }}</div>
    </div>
    <div class="detail-wrap">
      <div class="mb-detail-main">
        <div class="mb-detail-main__head">
          <div class="mb-detail-main__head-left">
            <img src="../../assets/logo.png" style="width:50px;height:50px;">
            <div>{{ dynamicDatas.nickname }}</div>
          </div>
          <div class="mb-detail-main__head-right">
            <div>{{ dynamicDatas.createTime | dateFormat }}</div>
            <div class="button is-info" @click="deleteDynamic">删帖</div>
          </div>
        </div>

        <div class="mb-detail-main__body">
          <div class="margin-para" style="font-weight:bold;">{{ dynamicDatas.title }}</div>
          <div class="font-small margin-para"> {{ dynamicDatas.content }} </div>
        </div>
      </div>

      <div class="mb-detail-comments">
        <div class="mb-detail-comments__head">用户评论{{ dynamicDatas.commentCount}}</div>
        <div class="mb-detail-comments__item" v-for="comment in dynamicDatas.comments">
          <img class="mb-detail-comments__item-left" src="../../assets/logo.png" style="width:50px;height:50px;">
          <div class="mb-detail-comments__item-center font-small">
            <div>{{comment.nickname}}</div>
            <div>{{comment.content}}</div>
          </div>
          <div class="mb-detail-comments__item-right">
            <div>{{comment.createTime | my-date}}</div>
            <div class="button is-info" @click="deleteComment(comment)">删评论</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'dynamic-detail',
  data () {
    return {
      // groupName:'',
      // topicName:'',
      // nickname:'',
      // createTime:'',
      // title:'',
      // content:'',
      dynamicDatas:[]

    }
  },
  computed:{

  },
  mounted(){
    this.$request.post(this.$getUrl('dynamics')).send(
      {
        id:this.$route.params.id
      }).then((res)=>{
        if (res.body.responseCode === '000') {
          this.dynamicDatas = res.body.dto.results[0]
        }
      })
  },
  methods:{
    deleteDynamic() {
      this.$request.delete(this.$getUrl('dynamic/' + this.$route.params.id))
        .then(res => {
          if (res.body.responseCode === '000') {
            this.$router.back()
          }
        })
    },

    deleteComment(comment) {
      this.$request.delete(this.$getUrl('comment/' + comment.id))
        .then((res) => {
          if (res.body.responseCode === '000') {
            let index = this.dynamicDatas.comments.indexOf(comment)
            this.dynamicDatas.comments.splice(index, 1)
            this.dynamicDatas.commentCount--
          }
        })
    }
  },
  filters: {
    dateFormat(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  }

}
</script>
