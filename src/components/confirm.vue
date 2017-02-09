<style lang="css">
.confirm {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}
</style>

<template lang="html">
  <div class="confirm" v-show="isShow">
    <div class="card">
      <div class="card-content">
        <div class="content">{{content}}</div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" v-for="button in buttons" @click="buttonClick(button)">{{button.text}}</a>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    content() {
      return this.$store.state.confirm.content
    },

    isShow() {
      return this.$store.state.confirm.isShow
    },

    buttons() {
      return this.$store.state.confirm.buttons
    }
  },

  methods: {
    buttonClick(button) {
      this.$store.dispatch('closeConfirm')
      button.callback && button.callback()
    }
  }
}
</script>
