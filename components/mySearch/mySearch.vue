<script setup>

defineProps({
  bgColor: {
    type: String,
    default: '#c00000'
  },
  radius: {
    type: Number,
    default: 36
  }
})

const gotoSearch = () => {
  uni.navigateTo({
    url: '/subpkg/search/search'
  })
}
</script>

<template>
  <view class="my-search-container" :style="{backgroundColor: bgColor}" @click="gotoSearch">
    <view class="my-search-box" :style="{borderRadius: `${radius}rpx`}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>



<style lang="scss">
.my-search-container {
  height: 100rpx;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
}
.my-search-box {
  height: 72rpx;
  background-color: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder {
  font-size: 30rpx;
  margin-left: 10rpx;
}
</style>