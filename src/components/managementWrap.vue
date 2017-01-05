<template lang="html">
  <div class="wrap-box">
    <managementmenu></managementmenu>
    <router-view></router-view>
  </div>
</template>

<script>
import managementmenu from './managementMenu'
// import managementcontent from './managementContent'
// import managementadd from './managementAdd'

export default {
  name:'managementWrap',
  components:{
    managementmenu,
    // managementcontent,
    // managementadd
  }
}
</script>

<style scoped>
.wrap-box{
  width: 100%;
  height: 100%;
  background: #eeeeee;
}
</style>
