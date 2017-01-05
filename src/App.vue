<style lang="scss">

</style>

<template>
  <div id="app">
    <section class="hero is-primary">
      <div class="hero-body">
        <img src="./assets/logo.png" style="width:50px;">
        <span>上文引力</span>
      </div>
    </section>
    <div class="columns section">
      <div class="column is-1">
        <aside class="menu">
          <p class="menu-label">
            钱吧
          </p>
          <ul class="menu-list">
            <li><router-link to="dynamic" :class="{'is-active': $route.path === '/dynamic'}">动态管理</router-link></li>
            <li><router-link to="team" :class="{'is-active': $route.path === '/team'}">小组管理</router-link></li>
            <li><router-link to="user" :class="{'is-active': $route.path === '/user'}">用户管理</router-link></li>
            <li><router-link to="topic" :class="{'is-active': $route.path === '/topic'}">话题管理</router-link></li>
          </ul>
        </aside>
      </div>

      <div class="column">
        <router-view></router-view>
      </div>

    </div>

    <notification></notification>

  </div>
</template>

<script>

import notification from './components/notification'

export default {
  name: 'app',
  components: {
    notification
  },
}
</script>
