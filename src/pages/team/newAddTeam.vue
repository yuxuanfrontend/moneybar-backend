<template lang="html">
  <div class="my-container">
    <div class="add-team__title">
      <h1 class="title is-4 has-text-left">{{teamTitle}} </h1>
    </div>
    <div class="">
      <table class="table">
        <tbody>
          <tr>
            <td width="10%"><label>小组名：</label></td>
            <td width="90%"><input class="input" type="text" placeholder="小组名称" v-model="teamName"></td>
          </tr>
          <tr>
            <td><label>小组logo：</label></td>
            <td>
              <div class="file-input">
                <!-- <vue-file-upload url="my.do" :max="1" @onAdd="addFiles"></vue-file-upload> -->
                <input type="file" @change="chooseFile" ref="file">
                <img style="width: 50px;vertical-align:middle;" :src="previewImg" alt="">
              </div>
            </td>
          </tr>
          <tr>
            <td><label>管理员：</label></td>
            <td>
              <p class="control">
                <span class="select">
                  <select v-model="selectedManagerId">
                    <option v-for="manager in teamManagers" :value="manager.memberId">{{ manager.name }}</option>
                  </select>
                </span>
                <!-- <span class="select">
                  <select>
                    <option>Select dropdown</option>
                    <option>With options</option>
                  </select>
                </span> -->
                <!-- <button class="button is-info">搜索</button>
                <button class="button is-info">重置</button> -->
              </p>
            </td>
          </tr>
          <tr>
            <td class="text-top"><label >简介：</label></td>
            <td>
              <p class="control">
                <textarea class="textarea" placeholder="Textarea" v-model="teamBrief"></textarea>
              </p>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2">
              <a class="button is-info" @click="confirmBtn">确定</a>
              <a class="button is-info" @click="cancel">取消</a>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>


export default {
  name:'newAddTeam',
  data () {
    return {
      teamTitle:'新增小组',
      teamName:'',
      teamBrief:'',
      selectedManagerId:'',
      teamManager:'',
      teamManagers:[],
      selectedManagerId: '',
      previewImg: ''
    }
  },
  mounted(){

    console.log(this.$route.query.teamId);
    if (this.$route.query.teamId) {
      this.$request.post(this.$getUrl('groups'))
      .send({
        id: this.$route.query.teamId
      })
      .then(res => {
        if (res.body.responseCode === '000') {
          this.teamTitle = '编辑小组'
          this.teamName = res.body.dto.results[0].name
          this.previewImg = res.body.dto.results[0].logo
          this.selectedManagerId = res.body.dto.results[0].managerId
          this.teamBrief = res.body.dto.results[0].brief
        }else{
          this.teamName=''
          this.previewImg=''
          this.selectedManagerId=''
          this.teamBrief=''
        }
      })

    }

    this.$request.post(this.$getUrl('members')).send({
      isManager:true
    }).then((res)=>{
      res.body.dto.results.forEach((item) =>{
        this.teamManagers.push({
          name: item.name,
          memberId: item.id
        })
      })
    },(err)=>{
      console.log(111111)
    })
  },
  methods:{
    confirmBtn(){
      if (this.$route.query.teamId) {   //编辑
        this.$request.post(this.$getUrl('group/'+window.sessionStorage.memberId)).send({
          name:this.teamName,
          brief:this.teamBrief,
          attachment: {
            path: this.previewImg
          },
          manager:{
            id: this.selectedManagerId
          },
          id:this.$route.query.teamId
        }).then((res)=>{
          this.$store.dispatch('openConfirm', {
            buttons: [
              {
                text: '确认',
                callback: () => {
                  console.log(111);
                  this.$router.push('team')
                }
              },
              {
                text: '取消',
              }
            ],
            content: '编辑成功成功！'
          })
        },(err)=>{
          console.log(11111)
        })
      }else{        //添加
        this.$request.post(this.$getUrl('group/'+window.sessionStorage.memberId)).send({
          name:this.teamName,
          brief:this.teamBrief,
          attachment: {
            path: this.previewImg
          },
          manager:{
            id: this.selectedManagerId
          }
        }).then((res)=>{
          if(this.teamName ==''|| this.teamBrief == ''){
            this.$store.dispatch('fadeShow', {
              status: 'warning',
              content: '小组名或简介不能为空'
            })
          }else{
            this.$store.dispatch('openConfirm', {
              buttons: [
                {
                  text: '确认',
                  callback: () => {
                    console.log(111);
                    this.$router.push('team')
                  }
                },
                {
                  text: '取消',
                }
              ],
              content: '是否新添加小组！'
            })
          }
        },(err)=>{
          console.log(11111)
        })
      }
    },
    cancel(){
      this.$router.push('team')
    },

    chooseFile() {
      let choosedFile = this.$refs.file.files[0]
      let sendData = new FormData()
      // let fileReader = new FileReader()
      //
      // fileReader.readAsDataURL(choosedFile)
      //
      // fileReader.onload = () => {
      //   this.previewImg = fileReader.result
      // }

      sendData.append('files', choosedFile)

      this.$request.post('https://wjx.yinli99.com/file-inrpc/file/uploads')
        .send(sendData)
        .then((res) => {
          this.previewImg = res.body.dto[0].downloadPath
        })
    }
  },


}
</script>

<style lang="css" scoped>
.table tr td{
  vertical-align: middle;
}
.table tfoot tr td{
  text-align: center;
}
.table tr td label{
  display: flex;
  justify-content: flex-end;
}
.text-top{
  vertical-align:top!important;
}
.file-input{
  text-align: left;
}
.table .control{
  margin-left: 0;
}
.control span,.control button{
  margin-right: 10px;
}
.add-team__title{
  padding: 20px 30px;
  font-family: "微软雅黑";
}
</style>
