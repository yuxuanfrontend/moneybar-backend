<template lang="html">
  <div class="my-container">
    <div class="team-box">
      <div class="team-box-title">
        <h1 class="title is-3 has-text-left">小组动态列表</h1>
        <h2 class="subtitle is-4 has-text-left"> {{ teamTitle }} </h2>
      </div>
      <div class="mb-filter">
        <input class="input mb-filter__input" type="text" placeholder="动态标题">
        <input class="input mb-filter__input" type="text" placeholder="用户昵称">
        <input class="input mb-filter__input" type="text" placeholder="开始日期" ref="startDate">至
        <input class="input mb-filter__input" type="text" placeholder="结束日期" ref="endDate">
        <!-- <date-picker field="myDate" placeholder="开始时间" v-model="dateBegin" format="yyyy/mm/dd"></date-picker>
        <date-picker field="myDate" placeholder="结束时间" v-model="dateEnd" format="yyyy/mm/dd"></date-picker> -->
        <button class="button is-info mb-filter__button">搜索</button>
        <button class="button is-info mb-filter__button">重置</button>
        数量1000条
      </div>
      <div class="">
        <table class="table is-striped">
          <thead>
            <tr>
              <th>标题</th>
              <th>微信ID</th>
              <th>用户昵称</th>
              <th>发布时间</th>
              <th>阅读次数</th>
              <th>动态状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(team,index) in teams">
              <td>{{ team.title }}</td>
              <td>{{ team.userId }}</td>
              <td>{{ team.username }}</td>
              <td>{{ team.pubulish }}</td>
              <td>{{ team.readcount }}</td>
              <td>{{ team.status }}</td>
              <td><a class="button is-small">编辑</a><a class="button is-small" @click="teamDynamicDelete(index)">删除</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Flatpickr from 'flatpickr'
import datePickerZh from 'flatpickr/dist/l10n/zh'
import Img from '../../assets/logo.png'

Flatpickr.localize(datePickerZh.zh)
export default {
  data () {
    return {
      teams:[
        {title:'上文引立公0005号关于《2016猴年贺岁纪念币》等艺术品预约及托管延期公告',userId:123456,username:'诸葛村夫',pubulish:'2016-12-12',readcount:1000,status:'发布中'},
        {title:'上文引立公0005号关于《2016猴年贺岁纪念币》等艺术品预约及托管延期公告',userId:123456,username:'诸葛村夫',pubulish:'2016-12-12',readcount:1000,status:'发布中'},
        {title:'上文引立公0005号关于《2016猴年贺岁纪念币》等艺术品预约及托管延期公告',userId:123456,username:'诸葛村夫',pubulish:'2016-12-12',readcount:1000,status:'发布中'},
        {title:'上文引立公0005号关于《2016猴年贺岁纪念币》等艺术品预约及托管延期公告',userId:123456,username:'诸葛村夫',pubulish:'2016-12-12',readcount:1000,status:'发布中'},
        {title:'上文引立公0005号关于《2016猴年贺岁纪念币》等艺术品预约及托管延期公告',userId:123456,username:'诸葛村夫',pubulish:'2016-12-12',readcount:1000,status:'发布中'}
      ]
    }
  },
  computed:{
    teamTitle(){
      return this.$route.params.id
    }
  },
  mounted(){
    new Flatpickr(this.$refs.startDate)
    new Flatpickr(this.$refs.endDate)
  },
  methods:{
    teamDynamicDelete(index){
      console.log(index)
      this.teams.splice(index,1)
    }
  }
}
</script>

<style lang="css" scoped>
.team-box-title{
  font-family: "微软雅黑";
  padding:20px 30px 0 30px;
}
.table tr th,.table tr td{
  text-align: center;
}
.table tbody tr td:first-child{
  width: 600px;
  text-align: left;
}
</style>
