export default {
  state: {
    menus: [],
    memberId: window.sessionStorage.memberId
  },

  mutations: {
    setMenus(state, value) {
      state.menus = value
    },

    login(state, value) {
      state.memberId = value
    },

    logout(state) {
      state.memberId = ''
    }
  }
}
