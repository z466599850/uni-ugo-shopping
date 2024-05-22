<script setup>
import {ref,onMounted, computed} from 'vue'
import { useUserStore } from '../../stores';

const userStore = useUserStore()
const chooseAddress = async () => {
  console.log('点击了收获地址')
  const res = await uni.chooseAddress()
  
  if(res.errMsg === 'chooseAddress:ok') {
    userStore.setAddress(res)
  }
  
  console.log(res)
}


// const test = async () => {
//   console.log('测试按钮')
//   const res = await uni.showModal({
//     content: '检测到您没打开地址权限，是否去设置打开？',
//     confirmText: '确认',
//     cancelText: '取消'
//   })
  
//   if(res.errMsg !== 'showModal:ok') return
//   if(res.cancel) {
//     return uni.$showMsg('您取消了授权')
//   }
//   if(res.confirm) {
//     return uni.openSetting({
//       success: (res) => {
        
//         console.log(res.authSetting['scope.address'],'泥淖')
//       }
//     })
//   }
   
//   console.log(res)
// }
onMounted(() => {
  userStore.getAddressStorage()
  
  console.log(userStore.addstr)
})


</script>

<template>
  <view class="address-choose-box" v-if="JSON.stringify(userStore.address) === '{}'">
    <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收获地址+</button>
  </view>
  
  <view class="address-info-box" v-else @click="chooseAddress">
    <view class="row-one">
      <view class="row-one-left">
        <view class="username">收货人：<text>{{userStore.address.userName}}</text></view>
      </view>
      
      <view class="row-one-right">
        <view class="phone">电话：<text>{{ userStore.address.telNumber }}</text></view>
        <uni-icon type="arrowright" size="16"></uni-icon>
      </view>
    </view>
    
    <view class="row-two">
      <view class="row-two-left">
        收获地址：
      </view>
      <view class="row-two-right">
        {{ userStore.addstr }}
      </view>
    </view>
  </view>
      <image src="/static/cart_border@2x.png" class="address-border"></image>
</template>



<style lang="scss">
.address-choose-box {
  width: 100%;
  height: 180rpx;
  display: flex;
  align-items: center;
}

.address-border {
  display: block;
  width: 100%;
  height: 10rpx;
}

.address-info-box {
  font-size: 24rpx;
  height: 180rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10rpx;
  
  .row-one {
    display: flex;
    justify-content: space-between;
    
    .row-one-right {
      display: flex;
      align-items: center;
      
      .phone {
        margin-right: 10rpx;
      }
    }
  }
  
  .row-two {
    display: flex;
    align-items: center;
    margin-top: 20rpx;
    
    .row-two-left {
      white-space: nowrap;
    }
  }
}
</style>