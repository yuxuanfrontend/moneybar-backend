<template lang="html">
  <div class="contaiter">
    <div class="managementtitle">
      <h2>资讯管理</h2>
      <!-- <a v-on:click="addProject">添加</a> -->
    </div>
    <div class="statusbox">
      <p class="control">
        <label for="">状态:</label>
        <label class="radio">
          <input type="radio" name="question"> Yes
        </label>
        <label class="radio">
          <input type="radio" name="question"> No
        </label>
      </p>
      <p class="control">
        <label for="">状态:</label>
        <label class="radio">
          <input type="radio" name="question"> Yes
        </label>
        <label class="radio">
          <input type="radio" name="question"> No
        </label>
      </p>
    </div>
    <div class="searchbox">
      <input type="text" name="" value="" placeholder="文章标题" v-model="articleTitle">
      <!-- <date-picker field="myDate" placeholder="开始时间" v-model="dateBegin" format="yyyy/mm/dd"></date-picker>
      <date-picker field="myDate" placeholder="结束时间" v-model="dateEnd" format="yyyy/mm/dd"></date-picker> -->
      <button type="button" name="button" v-on:click="searchBtn">搜索</button>
      <button type="button" name="button" v-on:click="clearBtn">清空</button>
    </div>
    <div class="tab">
      <table>
        <thead>
          <tr>
            <td width="30%">标题</td>
            <td width="10%">标签</td>
            <td width="10%">状态</td>
            <td width="20%">发布时间</td>
            <td width="10%">阅读次数</td>
            <td width="20%">操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in items">
            <td>{{ item.title }}</td>
            <td>{{ item.tag = 1 ? '热门' : '公告' }}</td>
            <td>{{ item.status = 1 ? '已发布' : '草稿'  }}</td>
            <td>{{ item.publishDate | dateFormat }}</td>
            <td>{{ item.realNum }}</td>
            <td>
              <a @click="listEditor(index)">编辑</a>
              <a>删除</a>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="6">
              <div class="pagebox">
                  <div v-on:click="prePage()">上一页</div>
                  <div v-for="n in PageList" :class="{'active': pageCurrent === n }" v-on:click="pageGet(n)">{{ n }}</div>
                  <div v-on:click="nextPage()">下一页</div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
<script>
// import 'babel-polyfill'
// import myDatepicker from 'vue-datepicker-simple/datepicker-2.vue'
export default {
  name:'managementContainer',
  components:{
      // 'date-picker': myDatepicker
  },
  data () {
    return {
      items:[],
      dateBegin:'',
      dateEnd:'',
      status:1,
      pageOffset: 0,
      pageSize: 10,
      pageNums: 1,
      articleTitle:'',
      newPageNums:'',
      PageList:[],
    }
  },
  computed:{
    pageCurrent(){
      return this.pageOffset/this.pageSize + 1
    }
  },
  mounted(){
    this.ajaxGetList()
  },
  methods:{
    ajaxGetList(){
      this.$http.get('https://backend-api.yinli99.com/api/informations', {
        params: {
          status:this.status,
          offset:this.pageOffset,
          size: this.pageSize,
          title: this.articleTitle,
          startTime: this.dateBegin,
          endTime: this.dateEnd
        }
      }).then((res)=>{
        this.items = res.body.t.data
        this.pageNums = Math.ceil(res.body.t.count / this.pageSize)
        this.newPageNums = this.pageNums > 5 ?  5 : this.pageNums
          for(var i=0;i<this.newPageNums;i++){
            this.PageList.push(i+1)
          }
        // callback && callback(res)
      },(err)=>{
        console.log(111111)
      })
    },
    changeStatus() {
      this.ajaxGetList()
    },
    searchBtn(){
      this.ajaxGetList()
    },
    clearBtn(){
      alert(1)
      this.ajaxGetList()
    },
    listEditor(index){
      this.$router.push('/managementwrap/managementadd')
      this.$store.commit('setUpdatingItem',this.items[index])
      this.$store.commit('setIsUpdate',true)
    },
    pageGet(n){
      if(n < 1 || n > this.pageNums) return
      var pageNewNums = []
      if(n>2){
        for(var i = (n-3);i < ( (n+2) > this.pageNums ? this.pageNums : (n+2) );i++){
          pageNewNums.push(i+1)
        }
        this.PageList = pageNewNums
      }
      this.pageOffset = this.pageSize * ( n - 1 )
      this.$http.get('https://backend-api.yinli99.com/api/informations', {
        params: {
          status:this.status,
          offset:this.pageOffset,
          size: this.pageSize,
          title: this.articleTitle,
          startTime: this.dateBegin,
          endTime: this.dateEnd
        }
      }).then((res)=>{
        this.items = res.body.t.data
        this.pageNums = Math.ceil(res.body.t.count / this.pageSize)
        this.newPageNums = this.pageNums > 5 ?  5 : this.pageNums
      },(err)=>{
        console.log(111111)
      })
    },
    nextPage(){
      if(this.pageCurrent === this.pageNums){
        return false
      }
      this.pageOffset += this.pageSize
      this.pageGet(this.pageCurrent)
    },
    prePage(){
      if(this.pageCurrent === 1){
        return false
      }
      this.pageOffset -= this.pageSize
      this.pageGet(this.pageCurrent)
    },
    addProject(){
      this.$router.push('/managementwrap/managementadd')
    }
  },
  filters: {
    dateFormat(value) {
      let add0 = function(m){
        return m<10?'0'+m:m
      }
      var time = new Date(value)
      var y = time.getFullYear()
      var m = time.getMonth()+1
      var d = time.getDate()
      var h = time.getHours()
      var mm = time.getMinutes()
      var s = time.getSeconds()
      // return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s)
      return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s)
    }
  }
}
</script>

<style scoped>
.contaiter{
  background: #fff;
  left: 230px;
  top:70px;
  position: relative;
  width: calc(100% - 240px);
  height: calc(100% - 80px);
}
.managementtitle{
  background: #274a78;
  color: #fff;
  display: flex;
  justify-content:space-between;
  align-items: center;
  height: 44px;
  padding: 0 20px;
  font-family: "微软雅黑";
}
.managementtitle h2{
  font-size: 18px;
  font-weight: normal;
}
.managementtitle a{
  cursor: pointer;
}
.statusbox{
  font-family: "微软雅黑";
  height: 44px;
  line-height: 44px;
  text-align: left;
  padding-left: 20px;
}
.statusbox input{
  margin-right: 5px;
}
.searchbox{
  padding: 10px 20px;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.searchbox input{
  background: #f0f0f0;
  padding: 10px;
  margin-right:15px;
}
.searchbox button{
  color: #fff;
  margin-right:15px;
  padding: 10px 25px;
  background: #347ab6;
  border-radius: 4px;
  cursor: pointer;
}
.searchbox button,
.searchbox input{
  font-family: "微软雅黑";
  font-size: 14px;
  outline: none;
  border: none;
}
.tab{
  margin-top: 20px;
  padding: 0 20px;
}
.tab table{
  width: 100%;
  font-family: "微软雅黑";
}
.tab table tr td{
  padding:10px;
}
.tab table thead tr td{
  background: #f0f0f0;
}
.tab table tbody tr td:first-child{
  text-align: left;
}
.tab table tbody tr:nth-child(even){
  background: #f0f0f0;
}
.tab table tbody tr td a{
  color:#347ab6;
  cursor: pointer;
  margin: 0 5px;
}
.pagebox{
  display: flex;
  justify-content: flex-end;
}
.pagebox div{
  padding:2px 10px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
}
.pagebox div.active{
    background: #347ab6;
    color:#fff;
}


</style>
