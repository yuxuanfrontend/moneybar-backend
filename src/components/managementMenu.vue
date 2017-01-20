<template lang="html">
  <div class="menuleft">
    <div class="nav-box">
      <h2 class="navtitle">钱吧</h2>
      <ul>
        <li v-for="(management,index) in managements" v-on:click="clickTitle(index)" v-bind:class="{'active':index === count }" >
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
      count:0,
      managements:[]
    }
  },
  computed:{
  },
  mounted() {

    function getMenuTitle(id) {
      if (id === 1) {
        return '动态管理'
      }else if(id === 2){
        return '小组管理'
      }else if(id === 3){
        return '用户管理'
      }else if(id === 4){
        return '话题管理'
      }
    }

    function getMenuHref(id) {
      if (id === 1) {
        return '/managementwrap/dynamic'
      }else if(id === 2){
        return '/managementwrap/team'
      }else if(id === 3){
        return '/managementwrap/user'
      }else if(id === 4){
        return '/managementwrap/topic'
      }
    }

    let data = JSON.parse(window.sessionStorage.memberMenus)
    data.forEach((item) => {
      this.managements.push({
        managementTitle: getMenuTitle(item.id),
        href:getMenuHref(item.id)
      })
    })


    if (this.$route.path === '/managementwrap/dynamic') {
      this.count = 0
    }else if(this.$route.path === '/managementwrap/team'){
      this.count = 1
    }else if(this.$route.path === '/managementwrap/user'){
      this.count = 2
    }else if(this.$route.path === '/managementwrap/topic'){
      this.count = 3
    }
  },
  methods:{
    clickTitle(index){
      this.count = index
    }
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
