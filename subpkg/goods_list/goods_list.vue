<script setup>
import {onMounted, ref,onload} from 'vue'
import { onLoad,onReachBottom,onPullDownRefresh} from '@dcloudio/uni-app'
import myGoods from '../../components/myGoods/myGoods.vue';
const goodsList = ref([])
const goodsListTotal = ref(0)
const goodsInfo = ref({
  query: '',
  cid: '',
  pagenum: 1,
  pagesize: 20
})
const isShow = ref(false)



const getGoodsList = async (cb) => {
  isShow.value = true
  const {data} = await uni.$http.get('/api/public/v1/goods/search',{
    ...goodsInfo.value
  })
  isShow.value = false
  cb && cb()
  if(!data.meta.status === 200) return uni.$showMsg()
  console.log(data,'列表')
  goodsList.value = [...goodsList.value, ...data.message.goods]
  goodsListTotal.value = data.message.total
  console.log(isShow.value)
}

const gotoDetail = (id) => {
  uni.navigateTo({
    url: `/subpkg/goods_detail/goods_detail?goods_id=${id}`
  })
}


onPullDownRefresh(() => {
  goodsList.value = []
  goodsInfo.value.pagenum = 1
  getGoodsList(() => uni.stopPullDownRefresh())
  
})

onMounted(() => {

  getGoodsList()
})

onLoad ((options) => {
  console.log(options)
  goodsInfo.value.query = options.query || ''
  goodsInfo.value.cid = options.cid || ''
})

onReachBottom(() => {
  console.log(111)
  if(goodsInfo.value.pagenum * goodsInfo.value.pagesize >= goodsListTotal.value) {
    uni.$showMsg('暂无更多数据')
    return 
  }
  if(isShow.value) return
  goodsInfo.value.pagenum++
  getGoodsList()
})
</script>

<template>
  <view class="goods-list">
    <view v-for="goods in goodsList" :key="goods.goods_id" @click="gotoDetail(goods.goods_id)">
      <myGoods :goods="goods" ></myGoods>
    </view>
  </view>
</template>

<style lang="scss">


  
  

</style>
