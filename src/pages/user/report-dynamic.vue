<template lang="html">
  <div class="my-container">
    <div class="mb-title">被举报动态 被举报数量：1条</div>
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
              <a v-on:click="teamList(team)">{{ reportdynamic.title }}</a>
            </td>
            <td>{{ reportdynamic.id }} </td>
            <td>{{ reportdynamic.userName }} </td>
            <td>{{ reportdynamic.publishDate }}</td>
            <td>{{ reportdynamic.readNum }}</td>
            <td>{{ reportdynamic.commentNum }}</td>
            <td>{{ (reportdynamic.status == 1)? '被举报':'未举报' }}</td>
            <td>{{ reportdynamic.reason }}</td>
            <td><a class="button">禁言恢复</a></td>
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
export default {
  data () {
    return {
      reportdynamics:[
        {title:'学选',id:1254,userName:'大boss',publishDate:'2017-12-12',readNum:12,commentNum:12,status:'1',reason:'政治因素'},
        {title:'学选',id:1254,userName:'大boss',publishDate:'2017-12-12',readNum:12,commentNum:12,status:'1',reason:'政治因素'},
        {title:'学选',id:1254,userName:'大boss',publishDate:'2017-12-12',readNum:12,commentNum:12,status:'1',reason:'政治因素'},
        {title:'学选',id:1254,userName:'大boss',publishDate:'2017-12-12',readNum:12,commentNum:12,status:'1',reason:'政治因素'}
      ]
    }
  },
  mounted(){
    // this.$request.post(this.$getUrl('dynamic/accusation/{id}'))
  }
}
</script>

<style lang="scss">
.table td{
  vertical-align: middle;
}
</style>
