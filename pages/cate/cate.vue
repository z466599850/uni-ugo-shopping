<script setup>
import {onMounted, ref} from 'vue'
import common from '../../common/common.js';
import {$http} from '@escook/request-miniprogram'
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

const navList = ref([])

const getNavList = async () => {
  const {data} = await $http.get('/api/public/v1/home/catitems')
  console.log(data,'我是分类')
  if(!data.meta.status === 200) {
    return common.showMsg()
  }
  
  navList.value = data.message
}

onMounted(() => {
  getNavList()
})
</script>
<template>
  <view>
    cate 分类页
  </view>
</template>

<style lang="scss">
         
</style>
