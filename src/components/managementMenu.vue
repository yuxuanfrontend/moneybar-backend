<template lang="html">
  <div class="menuleft">
    <div class="nav-box">
      <h2 class="navtitle">钱吧</h2>
      <ul>
        <li v-for="(management,index) in managements" v-on:click="activeIndex = index" v-bind:class="{'active':index === activeIndex}" >
          <router-link :to='management.href'>{{management.managementTitle}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:'managementMenu',
  data(){
    return{
      activeIndex:0,
      managements:[
        {managementTitle:'动态管理',href:'/dynamic'},
        {managementTitle:'小组管理',href:'/team'},
        {managementTitle:'用户管理',href:'/user'},
        {managementTitle:'话题管理',href:'/topic'},
      ]
    }
  },
  methods:{
  }
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
  text-align: center;
}
.nav-box ul{
  background: #354356;
}
.nav-box ul li{
  height: 44px;
  line-height: 44px;
  cursor: pointer;
  text-decoration: none;
}
.nav-box ul li a{
  color: #dbdbdb;
  display: block;
  font-size: 14px;
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
  background: #44617b;
}
</style>
