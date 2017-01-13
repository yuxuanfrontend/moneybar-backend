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
      <input class="input mb-filter__input" type="text" placeholder="用户昵称">
      <input class="input mb-filter__input" type="text" placeholder="开始日期" ref="startDate">至
      <input class="input mb-filter__input" type="text" placeholder="结束日期" ref="endDate">
      <button class="button mb-filter__button">搜索</button>
      <button class="button mb-filter__button">重置</button>
      <div class="">
        被举报数量：1000条
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
            <td><a @click="reportDynamic">{{ user.reportDynamicCount }}</a></td>
            <td><a @click="reportComment">{{ user.reportCommentCount }}</a></td>
            <td><a class="button">{{ (status == 0)? '禁言':'恢复' }}</a></td>
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
      status:1,
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
      console.log(page);
      this.queryPage = page
      this.userList()
    },
    userList(){
      this.$request.post(this.$getUrl('members'))
      .send({
        basePageResults: {
          pageNo: this.queryPage,
          pageSize: this.querySize,
        }
        // statusVal:this.status
      })
      .then((res)=>{
        this.users = res.body.dto.results
        this.totalPage = res.body.dto.count / this.querySize

        console.log(res.body.dto.count)
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
    reportDynamic(){
      this.$router.push('reportdynamic')
    },
    reportComment(){
      this.$router.push('reportcomment')
    }
  },
  filters: {
    dateFormat(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
