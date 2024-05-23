<script setup>
import { useCartStore } from '../../stores';
import {onMounted, ref} from 'vue'
import {onShow} from '@dcloudio/uni-app'
import myGoods from '../../components/myGoods/myGoods.vue';
import myAddress from '../../components/myAddress/myAddress.vue';
import mySettleVue from '../../components/mySettle/mySettle.vue';

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

const onChangeAll = () => { 
  console.log('该改变了哦')
  cartStore.setCheckAll(!cartStore.checkAll)
 
}

onMounted(() => {
  cartStore.setCartList()
  cartStore.isCheckedAll()
  cartStore.setSettleList()
})


</script>


<template>
<view class="cart-container" v-if="cartStore.cartList.length !== 0">
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
  <mySettleVue :checkAll="cartStore.checkAll" @onChangeAll="onChangeAll"></mySettleVue>
</view>
 
 <view class="cart-empty" v-else>
   <image src="../../static/cart_empty@2x.png" mode=""></image>
   <text>空空如也</text>
 </view>
</template>

<style lang="scss">
.cart-container {
  padding-bottom: 100rpx;
}
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
.cart-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 300rpx;
  image {
    width: 180rpx;
    height: 180rpx;
  }
  
  text {
    font-size: 24rpx;
    color: gray;
    margin-top: 30rpx;
  }
}
</style>
