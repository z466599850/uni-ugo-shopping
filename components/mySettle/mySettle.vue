<script setup>
import {ref,computed} from 'vue'
import { useCartStore } from '../../stores';

const cartStore = useCartStore()
const prop = defineProps({
  checkAll: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['onChangeAll'])
const gotoSettle = () => {
  console.log('我是结算页')
  uni.navigateTo({
    url: '/subpkg/settle/settle'
  })
}

const onCheckAll = () => {
  console.log('你好')
  emit('onChangeAll')
}

cartStore.setSettleList()
</script>

<template>
  <view class="my-settle-container">
    <!-- 全选区域 -->
    <label class="radio" >
      <radio color="#c00000" :checked="checkAll" @click="onCheckAll" /><text>全选</text>
    </label>
    <!-- 合计区域 -->
    <view class="amount-box">
      合计：<text class="amount">￥{{cartStore.settleListPrice}}</text>
    </view>
    <!-- 结算按钮 -->
    <view class="btn-settle" @click="gotoSettle">结算({{cartStore.settleListCount}})</view>
    
  </view>

</template>



<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100rpx;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28rpx;
  padding-left: 10rpx;
  box-sizing: border-box;
  
  .amount {
    color: #c00000;
  }
  
  .btn-settle {
    height: 100rpx;
    min-width: 200rpx;
    text-align: center;
    color: white;
    line-height: 100rpx;
    background-color: #c00000;
  }
}

</style>