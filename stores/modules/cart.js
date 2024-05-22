import {defineStore} from 'pinia'

import {computed, ref, watch} from 'vue'
export const useCartStore = defineStore('cart',() => {
  
  const cartList = ref([])
 
  const addCartList = (value) => {
    const item = cartList.value.find(item => item.goods_id === value.goods_id)
    if(item) {
      item.goods_count++
    }else {
      if(!value.goods_count) {
        value.goods_count = 1
      }
      cartList.value.push(value)
    }

    uni.setStorageSync('ugo-carlist',JSON.stringify(cartList.value))
    console.log(cartList.value)
    
  }
  
  const removeCartList = () => {
    uni.setStorageSync('ugo-carlist','[]')
    cartList.value = []
  }
  
  const cartListTotal = computed(() => {
    return cartList.value.reduce((total,item) => total + item.goods_count, 0)
  })
  
  const cartListPriceTotal = computed(() => {
    return cartList.value.reduce((total,item) => total + (item.goods_price * item.goods.count), 0).toFixed(2)
  })
  
  const updateCartList = (value) => {
    const item = cartList.value.find(item => item.goods_id === value.goodsId)
    
    if(item) {
      item.goods_state = value.goodsState
      
      uni.setStorageSync('ugo-carlist',JSON.stringify(cartList.value))
    }
  }
  
  const updateCountCartList = (value) => {
    const item = cartList.value.find(item => item.goods_id === value.goodsId)
    
    if(item) {
      item.goods_count = value.goodsNumber
      
      uni.setStorageSync('ugo-carlist',JSON.stringify(cartList.value))
    }
  }
  
  const setCartList = () => {
    cartList.value = JSON.parse(uni.getStorageSync('ugo-carlist'))
  }
  
  watch('cartList',(value) => {
    console.log(value,'我是本地存储')
  },{
    deep: true
  })

  return {
    cartList,
    addCartList,
    removeCartList,
    cartListPriceTotal,
    cartListTotal,
    setCartList,
    updateCartList,
    updateCountCartList
  }
},{
  persist: {
    key: 'ugo-cart-list',
    paths: ['cartList']
  }
})