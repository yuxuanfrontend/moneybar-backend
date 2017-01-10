<style lang="scss" scoped>
.mb-type {
  display: flex;
  align-items: center;
  padding: 20px 30px;
}

.control {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.mb-filter {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 30px;
  margin-left: -10px;

  &__input {
    width: 100px;
    margin: 0 10px;
  }
}

th, td {
  vertical-align: middle;
  text-align: center;
}

.title-td {
  text-align:left;
  width:400px;
  overflow: hidden;
}
</style>

<template lang="html">
  <div class="my-container">
    <div class="mb-type">
      <span>动态类型: </span>
      <div class="control">
        <label class="radio">
          <input type="radio" name="question">
          全部
        </label>
        <label class="radio">
          <input type="radio" name="question">
          非小组动态
        </label>
        <label class="radio">
          <input type="radio" name="question">
          小组内动态
        </label>
      </div>
    </div>
    <div class="mb-filter">
      <input class="input mb-filter__input" type="text" placeholder="动态标题">
      <input class="input mb-filter__input" type="text" placeholder="用户昵称">
      <input class="input mb-filter__input" type="text" placeholder="开始日期">至
      <input class="input mb-filter__input" type="text" placeholder="结束日期">

      <button class="button">搜索</button>
      <button class="button">重置</button>
    </div>

    <div>
      <table class="table is-striped">
        <thead>
          <th style="max-width:200px;">标题</th>
          <th>交易id</th>
          <th>用户昵称</th>
          <th>发布时间</th>
          <th>所属小组</th>
          <th>阅读次数</th>
          <th>动态状态</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr v-for="dynamic in dynamicDatas">
            <td class="title-td">{{dynamic.title}}</td>
            <td>{{dynamic.dealId}}</td>
            <td>{{dynamic.nickname}}</td>
            <td>{{dynamic.publishTime}}</td>
            <td>{{dynamic.team}}</td>
            <td>{{dynamic.readAmount}}</td>
            <td>{{dynamic.status}}</td>
            <td>
              <button class="button is-info">查看</button>
              <button class="button is-info">删帖</button>
              <button class="button is-info" v-show="false">恢复</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <pagination :total="20" @pagination-change="changePage"></pagination>
  </div>
</template>

<script>

import pagination from '../../components/pagination'

export default {
  name: 'dynamic',

  data() {
    return {
      dynamicDatas: [
        {
          title: '上文引立公0005号关于上文引立公0005号关于上文引立公0005号关于上文引立公0005号关于上文引立公0005号关于',
          dealId: 124,
          nickname: '村夫',
          publishTime: '2016-11-11 15:20',
          team: '有油壹分小组',
          readAmount: 1000,
          status: 0,
        },
        {
          title: '上文引立公0005号关于',
          dealId: 124,
          nickname: '村夫',
          publishTime: '2016-11-11 15:20',
          team: '有油壹分小组',
          readAmount: 1000,
          status: 0,
        },
        {
          title: '上文引立公0005号关于',
          dealId: 124,
          nickname: '村夫',
          publishTime: '2016-11-11 15:20',
          team: '有油壹分小组',
          readAmount: 1000,
          status: 0,
        }
      ]
    }
  },

  methods: {
    changePage(page) {
      console.log(page);
    }
  },

  components: {
    pagination
  }
}
</script>
