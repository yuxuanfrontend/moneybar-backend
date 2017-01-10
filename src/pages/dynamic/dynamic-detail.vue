<style lang="scss" scoped>
.detail-wrap {
  padding: 20px;
}

.mb-detail-main {
  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-left {
      display: flex;
      align-items: center;
    }

    &-right {
      width: 20%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__body {
    padding: 0 10px;
    border-bottom: 1px solid #666;
  }
}

.mb-detail-comments {
  margin-top: 10px;

  &__item {
    display: flex;
    margin: 10px 0;

    &-left {
      margin-right: 10px;
    }

    &-center {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
    }

    &-right {
      display: flex;
      width: 20%;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>

<template lang="html">
  <div class="my-container">
    <h2>动态内容</h2>
    <div class="detail-type">
      <div>来自：啦啦啦小组</div>
      <div>话题： 有油壹分话题</div>
    </div>
    <div class="detail-wrap">
      <div class="mb-detail-main">
        <div class="mb-detail-main__head">
          <div class="mb-detail-main__head-left">
            <img src="../../assets/logo.png" style="width:50px;height:50px;">
            <div>用户昵称</div>
          </div>
          <div class="mb-detail-main__head-right">
            <div>12-24</div>
            <div class="button is-info">删帖</div>
          </div>
        </div>

        <div class="mb-detail-main__body">
          <div class="margin-para" style="font-weight:bold;">壹分极具增长潜力，抓紧买入</div>
          <div class="font-small margin-para">
            动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文内容动态详情正文
          </div>
        </div>
      </div>

      <div class="mb-detail-comments">
        <div class="mb-detail-comments__head">用户评论()</div>
        <div class="mb-detail-comments__item" v-for="n in 3">
          <img class="mb-detail-comments__item-left" src="../../assets/logo.png" style="width:50px;height:50px;">
          <div class="mb-detail-comments__item-center font-small">
            <div>用户昵称</div>
            <div>回复内容回复内容回复内容回复内容回复内容回复内容回复内容回复内容</div>
          </div>
          <div class="mb-detail-comments__item-right">
            <div>12-24</div>
            <div class="button is-info">删帖</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dynamic-detail'
}
</script>
