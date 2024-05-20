<script setup>
import {onMounted, ref, computed} from 'vue'

const timeId = ref(null)
const searchList = ref([])
const seatchListTotal = ref(0)
const searchInfo = ref({
  query: '',
  cid: '',
  pagenum: 1,
  pagesize: 20
})
const searchHistoryList = ref([])

const wh = ref(0)
wh.value = uni.getSystemInfoSync().windowHeight - 80

const searchInput = (value) => {
  clearTimeout(timeId.value)
  timeId.value = setTimeout(() => {
    searchInfo.value.query = value
    getSearchList()
    console.log(value)
  }, 500) 
}

const getSearchList = async () => {
  if(searchInfo.value.query === '') {
    searchList.value = []
    return
  }
  
  const {data} = await uni.$http.get('/api/public/v1/goods/search',{
    ...searchInfo.value
  })
  
  console.log(data)
  if(!data.meta.status === 200) return
  searchList.value = data.message.goods
  seatchListTotal.value = data.message.total
}

const onSearchItem = (item) => {
  console.log(item)
  historyPush()
  uni.navigateTo({
    url: `/subpkg/goods_detail/goods_detail?=goodsId=${item.goods_id}`
  })
}

const historyPush = () => {
  // searchHistoryList.value.push(searchInfo.value.query)
  
  // 将 Array 数组转化为 set对象
  const set = new Set(searchHistoryList.value)
  // 调用 Set对象的 delete 方法 移除对应的元素
  set.delete(searchInfo.value.query)
  // 调用 Set 对象的 add 方法，向 set 中添加元素
  set.add(searchInfo.value.query)
  // 将set对象转化为 Array 数组
  searchHistoryList.value = Array.from(set)
  
  // 调用 uni.setStorageSync(key,data)
  uni.setStorageSync('historyValue',JSON.stringify(searchHistoryList.value))
  
  
}

const historys = computed(() => {
  return [...searchHistoryList.value].reverse()
})

const clearHistory = () => {
  uni.setStorageSync('historyValue','[]')
  searchHistoryList.value = []
}

const gotoGoodsList = (item) => {
  uni.navigateTo({
    url: `/subpkg/goods_list/goods_list?query=${item}`
  })
}

onMounted(() => {
  searchHistoryList.value = JSON.parse(uni.getStorageSync('historyValue') || "[]")
})

 
</script>


<template>
  <view class="search-box">
    <uni-search-bar placeholder="请输入商品名称" :radius="100" @input="searchInput" cancelButton="none"></uni-search-bar>
  </view>
  <scroll-view scroll-y="true" class="search-list" :style="{height: `${wh}px`}" v-if="searchList.length > 0">
    <view class="search-list-item" v-for="item in searchList" :key="item.goods_id" @click="onSearchItem(item)">
      <uni-icons class="search-icon" type="search" size="17"></uni-icons><view class="search-title">
        {{ item.goods_name }}
      </view>
      <uni-icons type="arrowright" size="16"></uni-icons>
    </view>
  </scroll-view>
  
  <view class="history-box" v-else>
    <view class="history-title">
      <text class="history-title-text">搜索历史</text>
      <uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
    </view>
    <view class="history-list">
      <uni-tag v-for="(item,index) in historys" :key="index" @click="gotoGoodsList(item)" inverted :circle="true" :text="item" type="primary" />
    </view>
  </view>
</template>


<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
.search-list {
   padding: 0 10rpx;
}
.search-list-item {
  font-size: 12px;
  padding: 26rpx 0;
  border-bottom: 2rpx solid #efefef;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search-title {
  margin-left: 10rpx;
  margin-right: 6rpx;
  white-space: nowrap; // 不允许文字换行
  overflow: hidden; // 文字超出隐藏
  text-overflow: ellipsis;
}

.history-box {
  padding: 0 20rpx;
  
  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80rpx;
    font-size: 26rpx;
    border-bottom: 2rpx solid #efefef;
  }
  
  .history-list {
    display: flex;
    flex-wrap: wrap;
    
    uni-tag {
      margin-top: 20rpx;
      margin-right: 20rpx;
       text {
          color: #000;
       }
      
      .uni-tag--primary {
          border: none;
      }
    }
  }
  

}

</style>
