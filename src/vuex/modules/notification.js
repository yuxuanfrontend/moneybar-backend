import _ from 'lodash'

let debounceHide = null

export default {
  state: {
    content: '',
    status: '',
    isShow: false
  },

  mutations: {
    showNotification(state) {
      state.isShow = true
    },

    hideNotification(state) {
      state.isShow = false
    },

    setStatus(state, value) {
      state.status = 'is-' + value
    },

    changeContent(state, value) {
      state.content = value
    },
  },

  actions: {
    fadeShow(context, obj) {

      context.commit('setStatus', obj.status)
      context.commit('changeContent', obj.content)

      context.commit('showNotification')

      // _.delay(() => {
      // }, 1000)

      if (!debounceHide) {
        debounceHide = _.debounce(() => {
          context.commit('hideNotification')
        }, 1000)
      }

      debounceHide()
    }
  }
}
