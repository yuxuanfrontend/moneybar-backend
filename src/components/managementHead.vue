<template>
  <div class="managementhead">
    <div class="logobox">
      <img src="../assets/u324.png" alt="">上文引立
    </div>
    <div class="loginbox">
      <a v-on:click="loginbtn">{{ loginTxt }}</a>
      <a v-on:click='fetch'>退出</a>
    </div>
  </div>
</template>

<script>
export default {
  name:'managementHead',
  data () {
    return {
    }
  },
  computed:{
    loginTxt(){
      if(this.$store.state.isLogin){
        return 'admin'
      }else{
        return '亲，请登陆'
      }
    }
  },
  methods:{
    loginbtn(){
        this.$router.push('login')
    },
    fetch(){

    }
  }
}
</script>
<style scoped>
.managementhead{
  height:60px;
  background: #274a78;
  display: flex;
  color:#fff;
  font-family: "微软雅黑";
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left:0;
  top:0;
  z-index: 1
}
.managementhead .logobox{
  width:160px;
  line-height: 40px;
  display: inline-flex;
  align-items: center;
  margin-left: 20px;
}
.managementhead img{
  width:40px;
  margin-right: 10px;
}
.managementhead .loginbox{
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
}
.loginbox a{
  cursor: pointer;
}
</style>
