import {defineStore} from 'pinia'

import {computed, ref, watch} from 'vue'
export const useCartStore = defineStore('cart',() => {
  
  const cartList = ref([])
  const settleList = ref([])
  const checkAll = ref(false)

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

    setStorage()
    console.log(cartList.value) 
  }
  
  const delCartList = (id) => {
    cartList.value = cartList.value.filter(item => item.goods_id !== id)
    setStorage()
  }
  
  const removeCartList = () => {
    uni.setStorageSync('ugo-carlist','[]')
    cartList.value = []
  }
  
  const cartListTotal = computed(() => {
    return cartList.value.reduce((total,item) => total + item.goods_count, 0)
  })
  
  const cartListPriceTotal = computed(() => {
    return cartList.value.reduce((total,item) => total + (item.goods_price * item.goods_count), 0).toFixed(2)
  })
  
  const updateCartList = (value) => {
    const item = cartList.value.find(item => item.goods_id === value.goodsId)
    
    if(item) {
      item.goods_state = value.goodsState
      setStorage()
    }
    setSettleList()
    isCheckedAll()
  }
  
  const updateCountCartList = (value) => {
    const item = cartList.value.find(item => item.goods_id === value.goodsId)
    
    if(item) {
      item.goods_count = value.goodsNumber
      
      setStorage()
    }
  }
  
  const setCartList = () => {
    if(uni.getStorageSync('ugo-carlist')) {
      cartList.value = JSON.parse(uni.getStorageSync('ugo-carlist'))
    }
  }
  
  const setStorage = () => {
    uni.setStorageSync('ugo-carlist',JSON.stringify(cartList.value))

  }
  
  const setCheckAll = (value) => {
    checkAll.value = value
    cartList.value.forEach(item => {
      item.goods_state = checkAll.value ? 1 : 2
    })
  }
  

  const isCheckedAll = () => {
    checkAll.value = cartList.value.every(item => item.goods_state === 1) ? true : false
  }
  
  const setSettleList = () => {
    settleList.value = cartList.value.filter(item => item.goods_state === 1)
  }
  
  const removeSettleList = () => {
    settleList.value = []
  }

  const settleListPrice = computed(() => {
    return settleList.value.reduce((total,item) => total + (item.goods_price * item.goods_count), 0)
  })
  
  const settleListCount = computed(() => {
    return settleList.value.reduce((total,item) => total + item.goods_count,0)
  })
 
  return {
    cartList,
    addCartList,
    removeCartList,
    cartListPriceTotal,
    cartListTotal,
    setCartList,
    updateCartList,
    updateCountCartList,
    setStorage,
    delCartList,
    setSettleList,
    checkAll,
    setCheckAll,
    isCheckedAll,
    removeSettleList,
    settleListPrice,
    settleListCount
    
  }
},{
  persist: {
    key: 'ugo-cart-list',
    paths: ['cartList']
  }
})