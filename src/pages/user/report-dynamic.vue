<template lang="html">
  <div class="my-container">
    <div class="mb-title">被举报动态 被举报数量：{{ reportdynamicNum }}条</div>
    <div class="">
      <table class="table is-striped">
        <thead>
          <tr>
            <th>标题</th>
            <th>交易Id</th>
            <th>用户昵称</th>
            <th>发布时间</th>
            <th>阅读次数</th>
            <th>评论次数</th>
            <th>状态</th>
            <th>原因</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(reportdynamic,index) in reportdynamics">
            <td class="title-td" >
              <a v-on:click="dynamicDetails(index)">{{ reportdynamic.title }}</a>
            </td>
            <td>{{ reportdynamic.id }} </td>
            <td>{{ reportdynamic.nickname }} </td>
            <td>{{ reportdynamic.createTime | dateFormat }}</td>
            <td>{{ reportdynamic.readCount }}</td>
            <td>{{ reportdynamic.commentCount }}</td>
            <td>{{ (reportdynamic.statusVal == 1)? '被举报':'未举报' }}</td>
            <td>{{ reportdynamic.reason }}</td>
            <td><a class="button" @click="cancelReport(index)">取消举报</a><a class="button">删除恢复</a></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="9">
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>

import moment from 'moment'
export default {
  data () {
    return {
      reportdynamics:[ ],
      reportdynamicNum:'',
      queryPage:1,
      querySize:10
    }
  },
  mounted(){
    console.log(this.$route.query.userMemberId)
    this.$request.post(this.$getUrl('members/'+this.$route.query.userMemberId+'/accusations'))
    .send({
      // member : {
      //   openId: this.$store.state.identity.openId
      // },
      basePageResults : {
        pageNo: this.queryPage,
        pageSize: this.querySize
      },
      orderByCreateTimeDesc: true,

    })
    .then(res=>{
      console.log(res.body.dto)
      this.reportdynamics = res.body.dto
      this.reportdynamicNum = res.body.dto.length
    },err=>{

    })
  },
  methods:{
    dynamicDetails(index){
      this.$router.push('dynamicDetail/'+this.reportdynamics[index].id)
    },
    cancelReport(index){
      this.$request.post(this.$getUrl('/dynamic/accusation/cancel/'+this.reportdynamics[index].id))
      .then(res=>{
        this.reportdynamics.splice(index,1)
      },err=>{

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

<style lang="scss">
.table td{
  vertical-align: middle;
}
</style>
