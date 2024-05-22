<script setup>
import {ref,onMounted} from 'vue'

</script>

<template>
  <view class="address-choose-box">
    <button type="primary" size="mini" class="btnChooseAddress">请选择收获地址+</button>
  </view>
  
  <view class="address-info-box">
    
    <view class="row-one-left">
      <view class="username">收货人：<text>escook</text></view>
    </view>
    
    <view class="row-one-right">
      <view class="phone">电话：<text>138XXXXXXX5</text></view>
      <uni-icon type="arrowright" size="16"></uni-icon>
    </view>
    
    <view class="row-two">
      <view class="row-two-left">
        收获地址：
      </view>
      <view class="row-two-right">
        河北省邯郸市肥乡区xxx 河北省邯郸市肥乡区xxx 河北省邯郸市肥乡区xxx 河北省邯郸市肥乡区xxx 
      </view>
    </view>
  
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>



<style lang="scss">
.address-choose-box {
  width: 100%;
  height: 180rpx;
  display: flex;
  align-items: center;
}
</style>