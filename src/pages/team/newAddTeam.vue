<template lang="html">
  <div class="my-container">
    <div class="add-team__title">
      <h1 class="title is-3 has-text-left">新增小组 </h1>
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
                <img style="width: 50px;" :src="previewImg" alt="">
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
                <span class="select">
                  <select>
                    <option>Select dropdown</option>
                    <option>With options</option>
                  </select>
                </span>
                <button class="button is-info">搜索</button>
                <button class="button is-info">重置</button>
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
              <a class="button is-info">取消</a>
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
      teamName:'',
      teamBrief:'',
      teamManager:'',
      teamManagers:[],
      selectedManagerId: '',

      // files: [],
      previewImg: ''
    }
  },
  mounted(){
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
      this.$request.post(this.$getUrl('group/123456')).send({
        name:this.teamName,
        brief:this.teamBrief,
        attachment: {
          path: this.previewImg
        },
        logo: this.previewImg,
        manager:{
          id: this.selectedManagerId
        }
      }).then((res)=>{

      },(err)=>{
        console.log(11111)
      })
      this.$router.push('team')
    },

    chooseFile() {
      let choosedFile = this.$refs.file.files[0]
      let fileReader = new FileReader()
      let sendData = new FormData()

      fileReader.readAsDataURL(choosedFile)

      fileReader.onload = () => {
        this.previewImg = fileReader.result
      }

      sendData.append('file', choosedFile)

      this.$request.post('http://192.168.228.236:8081/api/upload/files')
        .send(sendData)
        .then((res) => {
          this.previewImg = res.body.t
        })
    }

    // addFiles(files) {
    //   console.log(files);
    //   this.files = files
    // },
    //
    // previewImg() {
    //   let src = window.URL.createObjectURL(this.files[this.files.length - 1].file);
    //   return src;
    // }
  }

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
