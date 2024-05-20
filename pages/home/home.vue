<script setup>
import { onMounted, ref } from 'vue';
import mySearch from '../../components/mySearch/mySearch.vue';
const navList = ref([])
const swiperList = ref([])
const floorList = ref([])

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

const getFloorList = async () => {
  const {data} = await uni.$http.get('/api/public/v1/home/floordata')
  console.log(data,'我是楼层')
  if(!data.meta.status === 200) return uni.$showMsg
  
  data.message.forEach((item) => {
    item.product_list.forEach((pro)=>{
      pro.navigator_url = '/subpkg/goods_list/goods_list?' + pro.navigator_url.split('?')[1]
    })
  })
  floorList.value = data.message
  console.log(floorList.value)
}

onMounted(()=>{
  getSwiperList()
  getNavList()
  getFloorList()
})

</script>

<template>
  <view class="search-box">
    <mySearch></mySearch>
  </view>
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
  <!-- 楼层区域 -->
  <view class="floor-list">
    <view class="floor-item" v-for="(item,index) in floorList" :key="index">
      <image class="floor-title" :src="item.floor_title.image_src"></image>
      <view class="floor-img-box">
        <view class="left-img-box">
          <image :src="item.product_list[0].image_src" mode="widthFix" :style="{width: `${item.product_list[0].image_width}rpx`}"></image>
        </view>
        <view class="right-img-box">
          <navigator class="right-img-item" v-for="(product,proIndex) in item.product_list" :key="proIndex" :url="product.navigator_url">
            <image v-if="proIndex !== 0" :src="product.image_src" :style="{width: `${product.image_width}rpx`}" mode="widthFix"></image>
          </navigator>
        </view>
      </view>
    </view>
  </view>


</template>



<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
  
}
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


.floor-title {
  height: 60rpx;
  width: 100%;
  display: flex;
}
.floor-img-box {
  display: flex;
  padding-left: 14rpx;
}


.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

</style>
