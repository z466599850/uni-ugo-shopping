<script setup>
import {onMounted, ref} from 'vue'

const goodslist = ref([])
const data = ref({
  query: '',
  cid: '',
  pagenum: 1,
  pagesize: 20
})
const getGoodsList = async () => {
  const res = await uni.$http.get('/api/public/v1/goods/search',{
    ...data.value
  })
}

onMounted(() => {
  getGoodsList()
})
</script>

<template>
  <view>
    goods_detail
  </view>
</template>


<style lang="scss">
         
</style>
