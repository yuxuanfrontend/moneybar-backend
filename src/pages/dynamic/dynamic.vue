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
      <table class="table">
        <thead>
          <th>标题</th>
          <th>交易id</th>
          <th>用户昵称</th>
          <th>发布时间</th>
          <th>所属小组</th>
          <th>阅读次数</th>
          <th>动态状态</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr v-for=""></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dynamic'
}
</script>
