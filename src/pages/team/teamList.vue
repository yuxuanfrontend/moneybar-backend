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
              <td>{{ team.nickname }}</td>
              <td>{{ team.createTime | my-date }}</td>
              <td>{{ team.readCount }}</td>
              <td>{{ team.statusDescribe }}</td>
              <td><a class="button">编辑</a><a class="button" @click="teamDynamicDelete(index)">删除</a></td>
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
      teams:[]
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


    this.$request.post(this.$getUrl('dynamics')).send({
      group :{
        id:this.$route.params.id
      }
    }).then((res)=>{
      this.teams = res.body.dto.results
    },(err)=>{

    })

  },
  methods:{
    teamDynamicDelete(index){
      this.$request.delete(this.$getUrl('dynamic/'+this.teams[index].id)).then((res)=>{
        this.teams.splice(index,1)
        console.log(11111)
      },(err)=>{

      })
    }
  },
 //  beforeRouteEnter(to, from, next) {
 //    // alert(1000)
 //    next()
 // },
}
</script>

<style lang="css" scoped>
.team-box-title{
  font-family: "微软雅黑";
  padding:20px 30px 0 30px;
}
.table tr th,.table tr td{
  text-align: center;
  vertical-align: middle;
}
.table tbody tr td:first-child{
  text-align: left;
}
</style>
