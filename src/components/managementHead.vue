<template>
  <div class="managementhead">
    <div class="logobox">
      <img src="../assets/u324.png" alt="">上文引立
    </div>
    <div class="loginbox">
      <a v-on:click="loginbtn">{{ memberTxt }}</a>
      <a v-on:click='fetch' v-show="fetchShow">退出</a>
    </div>
  </div>
</template>

<script>
export default {
  name:'managementHead',
  data () {
    return {
      // fetchShow:true,
      // loginTxt:''
    }
  },
  computed:{
    memberTxt(){
      return !this.$store.state.identity.memberId ? '亲，请登录' : 'admin'
    },

    fetchShow() {
      return this.$store.state.identity.memberId
    }

  },
  mounted(){
  },
  methods:{
    loginTxt(){
      if(window.sessionStorage.memberId != ''){
        return 'admin'
      }else{
        return '亲，请登录'
      }
    },
    loginbtn(){
      console.log(window.sessionStorage.memberId)
      this.$router.push('/login')
    },
    fetch(){
      window.sessionStorage.removeItem('memberId')
      this.$store.commit('logout')
      this.fetchShow = true
      this.$router.push('/login')
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
  color:#fff;
  cursor: pointer;
  margin: 0 5px;
}
</style>
