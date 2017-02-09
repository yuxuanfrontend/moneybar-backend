<style lang="scss">
th,td{
  text-align: center;
  font-family: "微软雅黑";
}
</style>

<template lang="html">
  <div class="my-container">
    <div class="mb-title">举报管理</div>
    <div class="mb-filter">
      <input class="input mb-filter__input" type="text" placeholder="用户昵称" v-model="userName">
      <input class="input mb-filter__input" type="text" placeholder="开始日期" ref="startDate" v-model="startDate">至
      <input class="input mb-filter__input" type="text" placeholder="结束日期" ref="endDate" v-model="endDate">
      <button class="button mb-filter__button" @click="searchUser">搜索</button>
      <button class="button mb-filter__button">重置</button>
      <div class="">
        <!-- 被举报数量：1000条 -->
      </div>
    </div>
    <div class="">
      <table class="table is-striped">
        <thead>
          <tr>
            <th>微信Id</th>
            <th>真实姓名</th>
            <th>成员昵称</th>
            <th>注册时间</th>
            <th>被举报数</th>
            <th>被举报动态</th>
            <th>被举报评论</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user,index) in users">
            <td class="title-td" >
              <a v-on:click="teamList(team)">{{ user.id }}</a>
            </td>
            <td>{{ user.name }} </td>
            <td>{{ user.nickname }} </td>
            <td>{{ user.createTime | dateFormat }}</td>
            <td>{{ user.reportDynamicCount +  user.reportCommentCount  }}</td>
            <td><a @click="reportDynamic(index)">{{ user.reportDynamicCount }}</a></td>
            <td><a @click="reportComment(index)">{{ user.reportCommentCount }}</a></td>
            <td><a class="button" @click="silent(user)">{{ (user.statusVal === '0')? '禁言':'恢复' }}</a></td>
          </tr>
        </tbody>
        <tfoot v-show="pageshow">
          <tr>
            <td colspan="9">
              <pagination :total-page="totalPage" @pagination-change="changePage"></pagination>
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

import pagination from '../../components/pagination'

import moment from 'moment'

Flatpickr.localize(datePickerZh.zh)
export default {
  components: {
    pagination
  },
  data () {
    return {
      userName:'',
      startDate:'',
      endDate:'',
      users:[],
      queryPage:1,
      querySize:10,
      totalPage:0,
      pageshow:false
    }
  },
  mounted(){
    new Flatpickr(this.$refs.startDate)
    new Flatpickr(this.$refs.endDate)

    this.userList()
  },
  methods:{
    changePage(page) {
      this.queryPage = page
      this.userList()
    },
    userList(){
      this.$request.post(this.$getUrl('members'))
      .send({
        basePageResults: {
          pageNo: this.queryPage,
          pageSize: this.querySize,
        },
      })
      .then((res)=>{
        console.log(res.body.dto.results)
        this.users = res.body.dto.results
        this.totalPage = res.body.dto.count / this.querySize

        if(this.totalPage < 1){
          this.pageshow =false
        }else if(this.totalPage > 1){
          this.pageshow =true
          this.totalPage = Math.ceil(this.totalPage)
        }

      },(err)=>{
        console.log(res.body.responseMsg)
      })
    },
    searchUser(){
      var teamData = {
            basePageResults:{
              pageNo: this.queryPage,
              pageSize: this.querySize,
            },
            nickname: this.userName,
            beginCreateTime:   moment(this.startDate + ' 00:00:00').valueOf(),
            endCreateTime:   moment(this.endDate + ' 23:59:59').valueOf(),
            // statusVal:this.status
          }
      this.$request.post(this.$getUrl('members')).send(
        teamData
      )
      .then((res)=>{
        this.users = res.body.dto.results
        this.totalPage = res.body.dto.count / this.querySize

        if(this.totalPage < 1){
          this.pageshow =false
        }else if(this.totalPage > 1){
          this.pageshow =true
          this.totalPage = Math.ceil(this.totalPage)
        }

      },(err)=>{
        console.log(res.body.responseMsg)
      })
    },
    reportDynamic(index){
      this.$router.push({path:'reportdynamic',query: { userDynamicId: this.users[index].id , userMemberId:this.users[index].memberId}})
    },
    reportComment(){
      this.$router.push('reportcomment')
    },
    silent(user) {
      if (user.statusVal === '0') {
        this.$request.post(this.$getUrl('members/shutup/' + user.openId))
        .then((res) => {
          if (res.body.responseCode === '000') {
            user.statusVal = '1'
          }
        })
      } else {
        this.$request.post(this.$getUrl('members/cancelShutup/' + user.openId))
        .then((res) => {
          if (res.body.responseCode === '000') {
            user.statusVal = '0'
          }
        })
      }
    }
  },
  filters: {
    dateFormat(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
