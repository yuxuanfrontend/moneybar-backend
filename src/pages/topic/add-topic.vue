<template lang="html">
  <div class="my-container">
    <div class="mb-title">新增话题 </div>
    <div class="topic-box">
      <div class="mb-filter">
        话题名称：<input class="input w400" type="text" placeholder="请输入话题名称" v-model="topicTitle">
       </div>
       <div class="topic-box__foot">
         <a class="button" @click="confirmBtn">确定</a>
         <a class="button" >取消</a>
       </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      topicTitle:''
    }
  },
  methods:{
    confirmBtn(){
      this.$request.post(this.$getUrl('topic/123456')).send({
        title:this.topicTitle
      }).then((res)=>{
        console.log(res)
        //this.$router.push('topic')
      },(err)=>{
        console.log(1111)
      })
    }
  }
}
</script>

<style lang="scss">
.topic-box{

  &__bd{

  }

  &__foot{
    padding: 20px 30px;
    text-align: center;
  }
}
</style>
