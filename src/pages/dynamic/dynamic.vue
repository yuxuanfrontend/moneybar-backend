<style lang="scss" scoped>
.mb-type {
  display: flex;
  align-items: center;
}
</style>

<template lang="html">
  <div class="my-container">
    <div class="mb-type">
      <span>动态类型: </span>
      <div class="control">
        <label class="radio">
          <input type="radio" name="question">
          Yes
        </label>
        <label class="radio">
          <input type="radio" name="question">
          No
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dynamic'
}
</script>
