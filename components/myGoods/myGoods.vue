<script setup>
import {ref} from 'vue'
const prop = defineProps({
  goods: {
    type: Object,
    default: {}
  },
  showRadio: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['radio-change','countChange'])
const defaultPic =  ref('https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png')

const onRadioChange = (goods) => {
  console.log(goods)
  console.log(goods.goods_state)
  emit('radio-change', {
    goodsId: goods.goods_id,
    goodsState: goods.goods_state = goods.goods_state === 1 ? 2 : 1
  })
}

const handleChangeNumber = (value,goods) => {
  console.log('看看我触发了吗')
  console.log(value,goods)
  // emit('countChange',{
  //   goodsId: goods.goods_id,
  //   goodsNumber: goods.goods_number
  // })
}

</script>

<template>
  <view class="goods-item">
    <view class="goods-left-item">
      <radio @click="onRadioChange(goods)" :checked="goods.goods_state === 1" color="#c00000" v-if="showRadio"></radio>
      <image class="goods-pic" :src="goods.goods_small_logo || defaultPic" mode=""></image>
    </view>
    <view class="goods-right-item" > 
      <view class="goods-name">
        {{goods.goods_name}}
      </view>
      <view class="goods-info-box">
        <view class="goods-price">
          ￥{{ goods.goods_price.toFixed(2) }}
        </view>
        <uni-number-box v-if="showRadio" v-model="goods.goods_number" :min="1" :max="999999999" @change="handleChangeNumber"></uni-number-box>
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
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    
    .goods-info-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  }
</style>