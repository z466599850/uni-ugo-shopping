<script setup>
import {ref} from 'vue'
defineProps({
  goods: {
    type: Object,
    default: {}
  }
})

const defaultPic =  ref('https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png')

const gotoDetail = (goods) => {
  console.log(111)
  uni.navigateTo({
    url: `/subpkg/goods_detail/goods_detail?goods_id=${goods.goods_id}`
  })
}
</script>

<template>
  <view class="goods-item" @click="gotoDetail(goods)">
    <view class="goods-left-item">
      <image class="goods-pic" :src="goods.goods_small_logo || defaultPic" mode=""></image>
    </view>
    <view class="goods-right-item"> 
      <view class="goods-name">
        {{goods.goods_name}}
      </view>
      <view class="goods-info-boxx">
        <view class="goods-price">
          ￥{{ goods.goods_price.toFixed(2) }}
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.goods-item {
  display: flex;
  padding: 20rpx 10rpx;
  border: 2rpx solid #f0f0f0;
  .goods-left-item {
    margin-right: 10rpx;
    .goods-pic {
      width: 200rpx;
      height: 200rpx;
      display: block;
    }
  }
  
  .goods-right-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    .goods-name {
      font-size: 26rpx;
    }
    
    .goods-price {
      font-size: 32rpx;
      color: #c00000;
    }
  }
  }
</style>