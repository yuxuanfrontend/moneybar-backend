<style lang="scss">
  .notification {
    width: 40%;
    position: absolute;
    top: 30%;
    right:30%;
    margin-left: -20%;
    z-index: 9999;
    color:#ffffff;
    text-align: center;
  }
</style>

<template lang="html">
  <div class="notification" :class="[status]" v-if="isShow">
    {{content}}
  </div>
</template>

<script>
export default {
  computed: {
    content() {
      return this.$store.state.notification.content
    },

    isShow() {
      return this.$store.state.notification.isShow
    },

    status() {
      return this.$store.state.notification.status
    }
  }
}
</script>
