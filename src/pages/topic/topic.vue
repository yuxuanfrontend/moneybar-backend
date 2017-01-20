<style lang="css">
</style>

<template lang="html">
  <div class="my-container">
    <div class="mb-title">
      <div>
        话题管理 话题数量：2条
      </div>
      <div>
        <a class="button" @click="addTopic">新建话题</a>
      </div>
    </div>
    <div class="">
      <table class="table is-striped">
        <thead>
          <tr>
            <th>话题标题</th>
            <th>发布者</th>
            <th>发布时间</th>
            <th>跟帖量</th>
            <!-- <th>参与讨论人数</th> -->
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(topic,index) in topics">
            <td class="title-td" > {{ topic.title}} </td>
            <td>{{ topic.manager }}</td>
            <td>{{ topic.createTime | dateFormat }}</td>
            <td>{{ topic.dynamicCount }}</td>
            <!-- <td>{{ topic.personNum }}</td> -->
            <td><a class="button" @click="shelveBtn(topic)">{{topic.statusVal === '0' ? '下架' : '已下架'}}</a></td>
          </tr>
        </tbody>
        <tfoot v-show="pageshow">
          <tr>
            <td colspan="5">
              <pagination :total-page='totalPage' @pagination-change="changePage"></pagination>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import pagination from '../../components/pagination'
import moment from 'moment'
export default {
  components: {
    pagination
  },
  data () {
    return {
      topics:[],
      queryPage:1,
      querySize:10,
      totalPage:0,
      pageshow:false
    }
  },
  computed:{
  },
  mounted(){
    this.topicList()
  },
  methods:{
    changePage(page) {
      this.queryPage = page
      this.topicList()
    },
    topicList(){
      this.$request.post(this.$getUrl('topics')).send(
        {
          basePageResults: {
            pageNo: this.queryPage,
            pageSize: this.querySize
          }
        }).then((res)=>{
          this.topics = res.body.dto.results
          this.totalPage = res.body.dto.count / this.querySize

          if(this.totalPage < 1){
            this.pageshow = false
            this.totalPage = 0
          }else if(this.totalPage >= 1){
            this.pageshow = true
            this.totalPage = Math.ceil(this.totalPage)
          }
      },(err)=>{
      })
    },
    addTopic(){
      this.$router.push('addtopic')
    },
    shelveBtn(topic){   //话题下架
      if (topic.statusVal === '0') {
        this.$request.post(this.$getUrl('topic/soldOut/'+topic.id))
        .then((res)=>{
          topic.statusVal === '1'
        },(err)=>{
          console.log(1111)
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
