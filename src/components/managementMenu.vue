<template lang="html">
  <div class="menuleft">
    <div class="nav-box">
      <h2 class="navtitle">钱吧</h2>
      <ul>
        <router-link to='/dynamic' tag='li' class="active">动态管理</router-link>
        <router-link to='/' tag='li' class="active">小组管理</router-link>
        <router-link to='/' tag='li' class="active">用户管理</router-link>
        <router-link to='/' tag='li' class="active">话题管理</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.menuleft{
  width:220px;
  height:calc(100% - 70px);
  background: #273240;
  position:absolute;
  top:70px;
  font-family:"微软雅黑";
}
.nav-box ul li{
  color: #dbdbdb;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
}
.navtitle{
  font-size: 16px;
  color: #eee;
  height: 44px;
  line-height: 44px;
  font-weight: normal;
  cursor: pointer;
}
.active{
  background: #354356;
}
</style>
