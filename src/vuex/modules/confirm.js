export default {
  state: {
    content: '',
    buttons: [],
    isShow: false
  },

  mutations: {
    showConfirm(state) {
      state.isShow = true
    },

    hideConfirm(state) {
      state.isShow = false
    },

    setContent(state, value) {
      state.content = value
    },

    setButtons(state, value) {
      state.buttons = value
    }
  },

  actions: {
    openConfirm(context, obj) {
      context.commit('showConfirm')
      context.commit('setContent', obj.content)
      context.commit('setButtons', obj.buttons)
    },

    closeConfirm(context, obj) {
      context.commit('hideConfirm')
    }
  }
}
