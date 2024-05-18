<script setup>
import { onMounted, ref } from 'vue';

const navList = ref([])
const swiperList = ref([])

// 3. 获取轮播图数据的方法
const  getSwiperList = async () => {
  // 3.1 发起请求
  const {data} = await uni.$http.get('/api/public/v1/home/swiperdata')
  console.log(data,'我是轮播图')
  if(!data.meta.status === 200) {
    return uni.$showMsg()
  }
  swiperList.value = data.message
}
const getNavList = async () => {
  const {data} = await uni.$http.get('/api/public/v1/home/catitems')
  console.log(data,'我是分类')
  if(!data.meta.status === 200) return uni.$showMsg()
  
  navList.value = data.message
}

const navClickHandler = (item) => {
  console.log(item)
  if(item.name === '分类') {
    // 跳转分类
    uni.switchTab({
      url: '/pages/cate/cate'
    })
  }
}


onMounted(()=>{
  getSwiperList()
  getNavList()
})

</script>

<template>

  <swiper 
    indicator-dots
    autoplay
    interval="3000"
    circular
    duration="1000"
    
  >
    <swiper-item v-for="item in swiperList" :key="item.goods_id">
        <navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
          <image :src="item.image_src" />
        </navigator>
    </swiper-item>
  </swiper>
  <view class="home-nav-list">
    <view class="home-nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
      <image :src="item.image_src" class="nav-image" />
    </view>
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
.home-nav-list {
  margin: 15px 0;
  display: flex;
  justify-content: space-around;
  
  .nav-image {
    height: 140rpx;
    width: 128rpx;
  }
  
}
</style>
