<style lang="scss">
th,td{
  text-align: center;
  font-family: "微软雅黑";
}
td a{
  color: #666;
  margin: 0 5px
}
.center-title{
  text-align: left;
}
</style>

<template lang="html">
  <div class="my-container">
    <div class="mb-filter">
      <input class="input mb-filter__input" type="text" placeholder="小组名称" v-model="teamText">
      <input class="input mb-filter__input" type="text" placeholder="开始日期" ref="startDate" v-model="startDate">
      <input class="input mb-filter__input" type="text" placeholder="结束日期" ref="endDate" v-model="endDate">
      <!-- <date-picker field="myDate" placeholder="开始时间" v-model="dateBegin" format="yyyy/mm/dd"></date-picker>
      <date-picker field="myDate" placeholder="结束时间" v-model="dateEnd" format="yyyy/mm/dd"></date-picker> -->
      <button class="button is-info mb-filter__button">搜索</button>
      <button class="button is-info mb-filter__button">重置</button>
      数量2个
      <button class="button is-info mb-filter__button is-pulled-right" @click="newAddTeam">新增</button>
    </div>
    <div class="">
      <table class="table is-striped">
        <thead>
          <tr>
            <th>小组名称</th>
            <th>logo</th>
            <th>管理员</th>
            <th>创建时间</th>
            <!-- <th>小组成员数</th> -->
            <th>动态数</th>
            <!-- <th>话题书/跟帖数</th> -->
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(team,index) in teams">
            <td class="center-title" >
              <a v-on:click="teamList(team)">{{ team.name }}</a>
            </td>
            <td>
              <img :src="team.logo" alt="" class="icon">
            </td>
            <td>{{ team.memberName }}</td>
            <td>{{ team.createTime }}</td>
            <!-- <td>{{ team.teamNum }}</td> -->
            <td>{{ team.dynamicCount }}</td>
            <!-- <td>{{ team.topicNum + ' / ' + team.followNum }}</td> -->
            <td><a class="button is-small">编辑</a><a class="button is-small" @click="teamDelete(index)">删除</a></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="8">
            </td>
          </tr>
        </tfoot>
      </table>
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
        {id:1,name:'油一分小组',logo:Img,memberName:'李福朕',createTime:'2017-12-12',dynamicCount:'10'},
        {id:2,name:'油二分小组',logo:Img,memberName:'李福朕',createTime:'2017-12-12',dynamicCount:'10'},
        {id:3,name:'油三分小组',logo:Img,memberName:'李福朕',createTime:'2017-12-12',dynamicCount:'10'},
        {id:4,name:'油四分小组',logo:Img,memberName:'李福朕',createTime:'2017-12-12',dynamicCount:'10'}
      ]
    }
  },
  mounted(){

    new Flatpickr(this.$refs.startDate)
    new Flatpickr(this.$refs.endDate)

    this.$request.post(this.$getUrl('groups'))
      .send({
      }).then((res)=>{
        //this.teams = res.body.dto
      },(err)=>{
        console.log(1111)
      })
  },
  methods:{
    teamList(team){
      this.$router.push('teamlist/'+team.id)
    },
    teamDelete(index){
      console.log(index)
      this.teams.splice(index,1)
    },
    newAddTeam(){
      console.log(1111)
      this.$router.push('newaddteam')
    }
  }
}
</script>
