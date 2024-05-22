<script setup>
import { useCartStore } from '../../stores';
import {onMounted, ref} from 'vue'
import {onShow} from '@dcloudio/uni-app'
import myGoods from '../../components/myGoods/myGoods.vue';
import myAddress from '../../components/myAddress/myAddress.vue';
const cartStore = useCartStore()

const radioChangeHandler = (e) => {
  // console.log('点击了吗？',e)
  cartStore.updateCartList(e)
}

const countChange = (e) => {
  console.log(e,'我是number')
  cartStore.updateCountCartList(e)
}

const options = ref([
  {
    text: '删除',
    style: {
      backgroundColor: '#c00000'
    }
  }
])

const bindClick = (item) => {
  console.log(1)
  cartStore.delCartList(item.goods_id)
}

onMounted(() => {
  cartStore.setCartList()
})


</script>


<template>
  <view class="cart-address">
    <myAddress></myAddress>
  </view>
  <view class="cart-title">
    <uni-icons type="shop" size="18"></uni-icons>
    <text class="cart-title-text">购物车</text>
  </view>
  
  <uni-swipe-action>
     <block v-for="(item,index) in cartStore.cartList" :key="index" >
    <uni-swipe-action-item :right-options="options" @click="bindClick(item)">
        <my-goods :goods="item" :showRadio="true" @radio-change="radioChangeHandler" @countChange="countChange"></my-goods>
    </uni-swipe-action-item>
    </block>
  </uni-swipe-action>
 
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
