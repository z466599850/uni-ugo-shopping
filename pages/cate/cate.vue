<script setup>
import {onMounted, ref} from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import mySearch from '/components/mySearch/mySearch.vue'

const cateList = ref([])
const cateChildrenList = ref([])
const wh = ref(0)
const active = ref(0)
const scrollTop = ref(0)

wh.value = uni.getSystemInfoSync().windowHeight - 36

const getCateList = async () => {
  const {data} = await uni.$http.get('/api/public/v1/categories')
  console.log(data,'tabbar分类页')
  if(!data.meta.status === 200) return uni.$showMsg()
  cateList.value = data.message
  cateChildrenList.value = data.message[0].children
}

const changeActive = (index) => {
  active.value = index
  cateChildrenList.value = cateList.value[index].children
  
  scrollTop.value = scrollTop.value === 0 ? 1 : 0 
}


onMounted(() => {

  getCateList()
})
</script>
<template>
  <mySearch></mySearch>
  <view class="cate-list">
    <view class="scroll-view-container">
      <!-- 左侧 -->
      <scroll-view class="scroll-left-view" scroll-y="true" :style="{height: `${wh}px`}">
        <view
          class="scroll-left-view-item"
          :class="{active: index === active}"
          v-for="(item,index) in cateList" 
          :key="item.cat_id"
          @click="changeActive(index)"
        >
          {{ item.cat_name }}
        </view>
      </scroll-view>
      <!-- 右侧 -->
      <scroll-view scroll-y="true" class="scroll-right-view" :style="{height: `${wh}px`}" :scroll-top="scrollTop">
        <view class="scroll-right-view-item" v-for="item in cateChildrenList" :key="item.cat_id">
          <view class="scroll-right-view-item-title">
            {{ item.cat_name }}
          </view>
          <!-- 三级分类 -->
          <view class="scroll-right-cate-3-list">
            <navigator  class="scroll-right-cate-3-list-item" v-for="(item2,index2) in item.children" :key="item2.cat_id" :url="`/subpkg/goods_list/goods_list?cid=${item2.cat_id}`">
              <image :src="item2.cat_icon"></image>
              <text>{{ item2.cat_name }}</text>
            </navigator>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style lang="scss">
.scroll-view-container {
  display: flex;
  
  .scroll-left-view {
    width: 240rpx;
    .scroll-left-view-item {
      line-height: 120rpx;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 24rpx;
      
      &.active {
        background-color: #fff;
        position: relative;
        font-weight: 700;
        &::before {
          content: ' ';
          display: block;
          width: 6rpx;
          height: 60rpx;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }        
      }
    }
  }
  .scroll-right-view {
    background-color: #fff;
  }
  
  .scroll-right-view-item-title {
    font-size: 30rpx;
    font-weight: 700;
    margin-left: 30rpx;
    padding: 30rpx 0;
  }
  
  .scroll-right-cate-3-list {
    display: flex;
    flex-wrap: wrap;
    
    .scroll-right-cate-3-list-item {
      width: 33.33%;
      margin-bottom: 20rpx;
      border-radius: 10rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      
      image {
        border-radius: 5rpx;
        width: 120rpx;
        height: 120rpx;
      }
      text {
        font-size: 24rpx;
        color: #6b6b6b;
      }
    }
  }
  
}
</style>
