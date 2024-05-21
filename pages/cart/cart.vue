<script setup>
import { useCartStore } from '../../stores';
import {onMounted, ref} from 'vue'
import {onShow} from '@dcloudio/uni-app'
import myGoods from '../../components/myGoods/myGoods.vue';
const cartStore = useCartStore()

const radioChangeHandler = (e) => {
  // console.log('点击了吗？',e)
  cartStore.updateCartList(e)
}

const countChange = (e) => {
  console.log(e,'我是number')
  cartStore.updateCountCartList(e)
}

onMounted(() => {
  cartStore.setCartList()
})


</script>


<template>
  <view class="cart-title">
    <uni-icons type="shop" size="18"></uni-icons>
    <text class="cart-title-text">购物车</text>
  </view>
  
  <block v-for="(item,index) in cartStore.cartList" :key="index" >
    <my-goods :goods="item" :showRadio="true" @radio-change="radioChangeHandler" @countChange="countChange"></my-goods>
  </block>
</template>

<style lang="scss">
.cart-title {
  height: 80rpx;
  display: flex;
  align-items: center;
  font-size: 28rpx;
  padding-left: 10rpx;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 20rpx;
  }
}
</style>
