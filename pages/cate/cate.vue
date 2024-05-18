<script setup>
import {onMounted, ref} from 'vue'
const navList = ref([])

const getNavList = async () => {
  const {data} = await uni.$http.get('/api/public/v1/home/catitems')
  console.log(data,'我是分类')
  if(!data.meta.status === 200) {
    // return common.showMsg()
    return uni.$showMsg()
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
