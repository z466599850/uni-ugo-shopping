<script setup>
import {$http} from '@escook/request-miniprogram'
import { onMounted, ref } from 'vue';
import common from '/common/common.js'
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

const swiperList = ref([])

// 3. 获取轮播图数据的方法
const  getSwiperList = async () => {
  // 3.1 发起请求
  const {data} = await $http.get('/api/public/v1/home/swiperdata')
  console.log(data)
  if(!data.meta.status === 200) {
    return common.showMsg()
  }
  swiperList.value = data.message
}

onMounted(()=>{
  getSwiperList()
})

</script>

<template>
  <view>
    <swiper 
      indicator-dots
      autoplay
      interval="3000"
      circular
      duration="1000"
      
    >
      <swiper-item v-for="item in swiperList" :key="item.goods_id">
          <navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
            <image :src="item.image_src"></image>
          </navigator>
      </swiper-item>
    </swiper>
  </view>
</template>



<style lang="scss">
swiper {
  height: 300rpx;
  
  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}
</style>
