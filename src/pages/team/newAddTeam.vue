<template lang="html">
  <div class="my-container">
    <div class="add-team__title">
      <h1 class="title is-3 has-text-left">新增小组 </h1>
    </div>
    <div class="">
      <table class="table">
        <tbody>
          <tr>
            <td width="10%"><label>小组名：</label></td>
            <td width="90%"><input class="input" type="text" placeholder="小组名称"></td>
          </tr>
          <tr>
            <td><label>小组logo：</label></td>
            <td>
              <div class="file-input">
                <input type="file" placeholder="小组名称">
              </div>
            </td>
          </tr>
          <tr>
            <td><label>管理员：</label></td>
            <td>
              <p class="control">
                <span class="select">
                  <select>
                    <option>Select dropdown</option>
                    <option>With options</option>
                  </select>
                </span>
                <span class="select">
                  <select>
                    <option>Select dropdown</option>
                    <option>With options</option>
                  </select>
                </span>
                <button class="button is-info">搜索</button>
                <button class="button is-info">重置</button>
              </p>
            </td>
          </tr>
          <tr>
            <td class="text-top"><label >简介：</label></td>
            <td>
              <p class="control">
                <textarea class="textarea" placeholder="Textarea"></textarea>
              </p>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2">
              <button class="button is-info">确定</button>
              <button class="button is-info">取消</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.table tr td{
  vertical-align: middle;
}
.table tfoot tr td{
  text-align: center;
}
.table tr td label{
  display: flex;
  justify-content: flex-end;
}
.text-top{
  vertical-align:top!important;
}
.file-input{
  text-align: left;
}
.table .control{
  margin-left: 0;
}
.control span,.control button{
  margin-right: 10px;
}
.add-team__title{
  padding: 20px 30px;
  font-family: "微软雅黑";
}
</style>
