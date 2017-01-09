import superagent from 'superagent'

import config from '../config'

import store from '../vuex/store'

let VueSuperagent = {}

VueSuperagent.install = function(Vue, options) {

  Vue.prototype.$getUrl = function(partial) {
    return config.domain + partial
  }

  Vue.prototype.$request = superagent

  Vue.prototype.$myRequest = function(method, url) {
    return superagent[method](config.domain + url)
      .timeout({
        response: 8000,
      }).
      on('error', (err) => {
        if (err.timeout) {
          Toast('请求超时')
        }
      })
  }

}

export default VueSuperagent
