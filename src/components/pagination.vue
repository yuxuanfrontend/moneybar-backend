<style lang="css">
</style>

<template lang="html">
  <div>
    <nav class="pagination is-pulled-right">
      <a class="pagination-previous" @click="goPage(currentPage - 1)">上一页</a>
      <a class="pagination-next" @click="goPage(currentPage + 1)">下一页</a>
      <ul class="pagination-list">
        <li>
          <a class="button is-info is-outlined" @click="goPage(1)">首页</a>
        </li>
        <li v-show="isPrevEllipsis">
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li v-for="page in showPages">
          <a class="button is-info" :class="{'is-outlined': !(page === currentPage)}" @click="goPage(page)">{{page}}</a>
        </li>
        <li v-show="isNextEllipsis">
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li>
          <a class="button is-info is-outlined" @click="goPage(totalPage)">尾页</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>

import _ from 'lodash'

export default {
  data() {
    return {
      currentPage: 1,
      totalPage: this.total,
    }
  },

  props: {
    total: {
      type: Number,
      required: true
    }
  },

  computed: {
    isPrevEllipsis() {
      return this.currentPage >= 4 && this.totalPage > 5
    },

    isNextEllipsis() {
      return this.currentPage <= this.totalPage - 3 && this.totalPage > 5
    },

    showPages() {
      let arr = []

      if (this.totalPage < 5) {
        for (let i = 1; i <= this.totalPage; i++) {
          arr.push(i)
        }
        return arr
      }

      if (this.currentPage < 3) {
        return [1,2,3,4,5]
      }

      if (this.currentPage > this.totalPage - 3) {
        for (let i = 4 ; i >= 0; i--) {
          arr.push(this.totalPage - i)
        }
        return arr
      }

      for (let i = 0; i < 5; i++) {
        arr.push(this.currentPage - 2 + i)
      }

      return arr
    },

  },

  methods: {
    goPage(page) {
      if (page < 1 || page > this.totalPage) {
        return false
      }
      this.currentPage = page

      this.$emit('pagination-change', page)
    }
  }
}
</script>
