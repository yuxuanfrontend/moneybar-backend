<template lang="html">
  <div class="wrap-box">
    <managementmenu></managementmenu>
    <router-view></router-view>
  </div>
</template>

<script>
import managementmenu from './managementMenu'

export default {
  name:'managementWrap',
  components:{
    managementmenu,
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
