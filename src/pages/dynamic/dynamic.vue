<style lang="scss" scoped>
</style>

<template lang="html">
  <div class="my-container">
    <div class="mb-type">
      <span>动态类型: </span>
      <div class="control">
        <label class="radio">
          <input type="radio" name="question">
          全部
        </label>
        <label class="radio">
          <input type="radio" name="question" :value="status">
          非小组动态
        </label>
        <label class="radio">
          <input type="radio" name="question">
          小组内动态
        </label>
      </div>
    </div>
    <div class="mb-filter">
      <input class="input mb-filter__input" type="text" placeholder="动态标题">
      <input class="input mb-filter__input" type="text" placeholder="用户昵称">
      <input class="input mb-filter__input" type="text" placeholder="开始日期" ref="startDate" >至
      <input class="input mb-filter__input" type="text" placeholder="结束日期" ref="endDate">

      <button class="button" >搜索</button>
      <button class="button">重置</button>
      <div class="">
        数量：1000条
      </div>
    </div>

    <div>
      <table class="table is-striped">
        <thead>
          <th style="max-width:200px;">标题</th>
          <!-- <th>交易id</th> -->
          <th>用户昵称</th>
          <th>发布时间</th>
          <th>所属小组</th>
          <th>阅读次数</th>
          <th>动态状态</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr v-for="(dynamic,index) in dynamicDatas">
            <td class="title-td">{{dynamic.title}}</td>
            <!-- <td>{{dynamic.dealId}}</td> -->
            <td>{{dynamic.nickname}}</td>
            <td>{{dynamic.createTime | dateFormat }}</td>
            <td>{{(dynamic.groupName === null) ? '-' : dynamic.groupName }}</td>
            <td>{{dynamic.readCount}}</td>
            <td>{{dynamic.statusDescribe}}</td>
            <td>
              <button class="button" v-if="dynamic.statusVal === '0'" @click="audit(dynamic)">审核</button>
              <button class="button" @click="readClick(index)">查看</button>
              <button class="button" @click="deleteClick(index)">删帖</button>
              <button class="button" v-show="false">恢复</button>
            </td>
          </tr>
        </tbody>
        <tfoot v-show="pageshow">
          <tr>
            <td colspan="8">
              <pagination :total-page='totalPage' @pagination-change="changePage"></pagination>
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
export default {
  name: 'dynamic',

  data() {
    return {
      queryPage:1,
      querySize:10,
      dynamicDatas: [ ],
      totalPage:0,
      pageshow:false
    }
  },

  computed:{
    totalNum(){
      return
    }
  },

  mounted(){
    new Flatpickr(this.$refs.startDate)
    new Flatpickr(this.$refs.endDate)

    this.dynamicList()
  },

  methods: {
    changePage(page) {
      this.queryPage = page
      this.dynamicList()
    },
    dynamicList(){
      this.$request.post(this.$getUrl('dynamics')).send(
        {
          basePageResults: {
            pageNo: this.queryPage,
            pageSize: this.querySize,
          }
          // statusVal:this.status
        }).then((res)=>{
          this.dynamicDatas = res.body.dto.results
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
    readClick(index){
      this.$router.push('dynamicDetail/'+this.dynamicDatas[index].id)
    },
    deleteClick(index){
      this.$request.post(this.$getUrl('dynamic/delete/'+this.dynamicDatas[index].id+'?memberId='+123456)).send().then((res)=>{
        console.log(1)
        this.dynamicDatas.splice(index,1)
      },(err)=>{

      })
    },

    audit(dynamic) {
      this.$request.post(this.$getUrl('dynamic/check/' + dynamic.id))
        .query({
          memberId: '2dfa235dbb1484813500502',
          flag: true
        })
        .then((res) => {
          if (res.body.responseCode === '000') {
            dynamic.statusVal = res.body.dto.statusVal
            dynamic.statusDescribe = res.body.dto.statusDescribe
          }
        })
    }
  },

  components: {
    pagination
  },

  filters: {
    dateFormat(value) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
