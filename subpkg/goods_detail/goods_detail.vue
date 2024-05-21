<script setup>
import {onMounted, ref, watch} from 'vue'
import { useCartStore } from '/stores'
import {onLoad} from '@dcloudio/uni-app'
const cartStore = useCartStore()
const options =  ref(
  [
    {
      icon: 'shop',
      text: '店铺'
    },
    {
      icon: 'cart',
      text: '购物车',
      info: 0
    }
])    
const buttonGroup = ref(
    // 右侧按钮组的配置对象
  [{
      text: '加入购物车',
      backgroundColor: '#ff0000',
      color: '#fff'
    },
    {
      text: '立即购买',
      backgroundColor: '#ffa200',
      color: '#fff'
    }
])

console.log(cartStore.add)
const goodsInfo = ref([])

const getGoodsList = async (id) => {
  console.log(1)
  const {data} = await uni.$http.get('/api/public/v1/goods/detail',{
    goods_id: id
  })
  console.log(data)
  if(!data.meta.status === 200) return uni.$showMsg()
  data.message.goods_introduce = data.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, 'jpg')
  goodsInfo.value = data.message
}

const preview = (i) => {
    // 调用 uni.previewImage() 方法预览图片
    uni.previewImage({
      // 预览时，默认显示图片的索引
      current: i,
      loop: true,
      // 所有图片 url 地址的数组
      urls: goodsInfo.value.pics.map(item => item.pics_big)
    })
}

const onLeftbutton = (e) => {
  console.log(e,'左边')
  if(e.content.text === '购物车') {
    console.log('你好')
    uni.switchTab({
      url: '/pages/cart/cart'
    })
  }
}

const onRightbutton = (e) => {
  console.log(e,'右边')
  if(e.content.text === '加入购物车') {
    console.log(goodsInfo.value,'加入购物车')
    console.log(cartStore.cartListTotal,'he')

    cartStore.addCartList({id: goodsInfo.value.goods_id,price: goodsInfo.value.goods_price})
    options.value[1].info = cartStore.cartListTotal
    uni.$showMsg('加入购物车成功')
  }
  if(e.content.text === '立即购买') {
    console.log('立即购买')
  }
}

watch(cartStore.cartList.length,(value) => {
  console.log(value)
  // options.value[1].info = value
})

onLoad((options) => {
  console.log(options)
  getGoodsList(options.goods_id)
})

onMounted(() => {
  options.value[1].info = cartStore.cartListTotal
})


</script>

<template>
  <swiper indicator-dots autoplay :interval="3000" :duration="1000" circular>
    <swiper-item v-for="(item, i) in goodsInfo.pics" :key="i">
      <image :src="item.pics_big"  @click="preview(i)"></image>
    </swiper-item>
  </swiper>
  <view class="goods-info-box" v-if="goodsInfo.goods_name">
    <!-- 商品价格 -->
    <view class="price">￥{{goodsInfo.goods_price}}</view>
    <!-- 信息主体区域 -->
    <view class="goods-info-body">
      <!-- 商品名称 -->
      <view class="goods-name">{{goodsInfo.goods_name}}</view>
      <!-- 收藏 -->
      <view class="favi">
        <uni-icons type="star" size="18" color="gray"></uni-icons>
        <text>收藏</text>
      </view>
    </view>
    <!-- 运费 -->
    <view class="yf">快递：免运费</view>
  </view>
  
  <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
   <view class="goods_nav">
     <!-- fill 控制右侧按钮的样式 -->
     <!-- options 左侧按钮的配置项 -->
     <!-- buttonGroup 右侧按钮的配置项 -->
     <!-- click 左侧按钮的点击事件处理函数 -->
     <!-- buttonClick 右侧按钮的点击事件处理函数 -->
     <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onLeftbutton" @buttonClick="onRightbutton" />
   </view>
</template>


<style lang="scss">
swiper {
  height: 750rpx;
  image {
    width: 100%;
    height: 100%;
  }
}

.goods-info-box {
  padding: 10px;
  padding-right: 0;

  .price {
    color: #c00000;
    font-size: 18px;
    margin: 10px 0;
  }

  .goods-info-body {
    display: flex;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
      padding-right: 10px;
    }
    // 收藏区域
    .favi {
      width: 120px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #efefef;
      color: gray;
    }
  }

  // 运费
  .yf {
    margin: 10px 0;
    font-size: 12px;
    color: gray;
  }
}

.goods_nav {
  // 为商品导航组件添加固定定位
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
