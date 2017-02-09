<style lang="scss">
.table th,.table td{
  text-align: center;
  font-family: "微软雅黑";
  vertical-align: middle;
}
td a{
  color: #666;
  margin: 0 5px
}
.noSearchTip{
  width: 100%;
  padding: 25px 0;
  text-align: center;
  font-size: 16px;
  color: #888;
  font-family: "微软雅黑";
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
      <button class="button mb-filter__button" @click="searchBtn">搜索</button>
      <button class="button mb-filter__button" @click="resetClick">重置</button>
      数量{{ teamCount }}个
      <button class="button is-info mb-filter__button" @click="newAddTeam">新增</button>
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
            <td class="title-td" >
              <a v-on:click="teamListBtn(team)">{{ team.name }}</a>
            </td>
            <td>
              <img :src="team.logo" alt="" class="icon">
            </td>
            <td>{{ team.memberName }}</td>
            <td>{{ team.createTime | dateFormat }}</td>
            <!-- <td>{{ team.teamNum }}</td> -->
            <td>{{ team.dynamicCount }}</td>
            <!-- <td>{{ team.topicNum + ' / ' + team.followNum }}</td> -->
            <td><a class="button" @click="editorTeam(index)">编辑</a><a class="button" @click="teamDelete(index)">删除</a></td>
          </tr>
        </tbody>
        <tfoot v-show="pageshow">
          <tr>
            <td colspan="8">
              <pagination :total-page="totalPage" @pagination-change="changePage"></pagination>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="noSearchTip" v-show="noSearchTip"> sorry,木有搜索到你想要的数据! </div>
  </div>
</template>

<script>
import Flatpickr from 'flatpickr'
import datePickerZh from 'flatpickr/dist/l10n/zh'
import Img from '../../assets/logo.png'

import pagination from '../../components/pagination'

import moment from 'moment'

Flatpickr.localize(datePickerZh.zh)
export default {
  components: {
    pagination
  },
  data () {
    return {
      teamText:'',
      startDate:'',
      endDate:'',
      queryPage:1,
      querySize:10,
      totalPage:0,
      pageshow:false,
      teamCount:'',
      teams:[],
      noSearchTip:false
    }
  },
  mounted(){
    new Flatpickr(this.$refs.startDate)
    new Flatpickr(this.$refs.endDate)

    this.teamList()

  },
  methods:{
    changePage(page) {
      this.queryPage = page
      this.teamList()
    },
    teamList(){
      this.$request.post(this.$getUrl('groups')).send(
        {
          basePageResults: {
            pageNo: this.queryPage,
            pageSize: this.querySize,
          },
          // statusVal:this.status
        }).then((res)=>{

          this.teams = res.body.dto.results
          this.teamCount = res.body.dto.count
          this.totalPage =  res.body.dto.count / this.querySize


          if(this.totalPage < 1){
            this.pageshow = false
            this.totalPage = 0
          }else if(this.totalPage >= 1){
            this.pageshow = true
            this.totalPage = Math.ceil(this.totalPage)
          }
        },(err)=>{
          console.log(2222)
        })
    },
    searchBtn(){
      var teamData = {
            basePageResults:{
              pageNo: this.queryPage,
              pageSize: this.querySize,
            },
            name: this.teamText,
            beginCreateTime:   moment(this.startDate + ' 00:00:00').valueOf(),
            endCreateTime:   moment(this.endDate + ' 23:59:59').valueOf(),
            // statusVal:this.status
          }
      this.$request.post(this.$getUrl('groups')).send(
          teamData
        ).then((res)=>{
          if(this.teamText == ''){
            this.$store.dispatch('fadeShow', {
              status: 'warning',
              content: '搜索关键字不能为空'
            })
          }else{

            this.teams = res.body.dto.results
            this.teamCount = this.teams.length
            this.totalPage =  res.body.dto.count / this.querySize

            if(res.body.dto.count == 0){
              this.noSearchTip = true
            }else {
              this.noSearchTip = false
            }

            if(this.totalPage < 1){
              this.pageshow = false
              this.totalPage = 0
            }else if(this.totalPage >= 1){
              this.pageshow = true
              this.totalPage = Math.ceil(this.totalPage)
            }

          }
        },(err)=>{
          console.log(2222)
        })
    },
    resetClick(){
      this.teamText = ''
      this.startDate = ''
      this.endDate = ''
      this.noSearchTip = false
      this.teamList()
    },
    teamListBtn(team){
      this.$router.push('teamlist/'+team.id)
    },
    editorTeam(index){
        this.$router.push({path:'newAddTeam',query: { teamId: this.teams[index].id }})
    },
    teamDelete(index){
      this.$request.delete(this.$getUrl('group/'+window.sessionStorage.memberId)).query({
        id:this.teams[index].id
      }).then((res)=>{
        this.teams.splice(index,1)
      },(err)=>{

      })

    },
    newAddTeam(){
      this.$router.push('newaddteam')
    }
  },
  filters: {
    dateFormat(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
