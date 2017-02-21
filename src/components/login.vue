<template lang="html">
  <div class="loginbox">
    <div class="login">
      <h2>用户登录</h2>
      <form class="" action="" method="post">
        <input type="text" name="username" placeholder="username" v-model="username">
        <input type="password" name="password" placeholder="password" v-model="password">
        <input type="button" name="" value="登录" v-on:click="loginbtn" v-on:keyup.enter="loginbtn">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name : 'login',
  data () {
    return {
      username:'',
      password:'',
      userId:'',
    }
  },
  methods : {
    loginbtn (){
      this.$request.post('https://wjs.yinli99.com/mb-inrpc/mb/login')
        .send({
          username: this.username,
          password: {
            password: this.password
          }
        })
      .then((res)=>{
        window.sessionStorage.memberId = res.body.dto.memberId
        window.sessionStorage.memberMenus = JSON.stringify(res.body.dto.menus)
        this.$store.commit('login', res.body.dto.memberId)
        this.$router.push('/managementwrap/dynamic')
      },(err)=>{
        console.log(111)
      })

    }
  }
}
</script>

<style lang="css" scoped>
.loginbox{
  width: 100%;
  height: 100%;
  position: relative;
}
.login{
  width: 398px;
  height: 358px;
  position: absolute;
  left: 50%;
  margin-left:-200px;
  top:44%;
  margin-top: -180px;
  border: 1px solid #dbdbdb;
  background: #f3f3f3;
  border-radius: 6px;
}
.login h2{
  font-size:1.4em;
  line-height: 60px;
  margin-top: 40px;
  font-weight:normal;
  color: #333;
  text-align: center;
}
.login input{
  width: 70%;
  display: block;
  margin: 10px auto;
  height:2.2em;
  line-height:2.2em;
  border: 1px solid #dbdbdb;
  border-radius: 6px;
  font-family:"微软雅黑";
  outline: none;
}
.login input[type=text],
.login input[type=password]{
  text-indent:.8em;
  font-size:1.2em;
  color: #666;
}
.login input[type=button]{
  background:#347ab6;
  border:none;
  color: #fff;
  font-size:1.3em;
  cursor: pointer;
  margin-top:25px;
}
.login input[type=button]:hover{
  background:#2f71a9;
}
</style>
