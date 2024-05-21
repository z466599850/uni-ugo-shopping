import {defineStore} from 'pinia'

import {computed, ref} from 'vue'
export const useCartStore = defineStore('cart',() => {
  
  const cartList = ref(JSON.parse(uni.getStorageSync('ugo-carlist')) || [])
 
  const addCartList = ({id,price}) => {
     // console.log(,'11111111111111111111111111111111111111111111')
    const item = cartList.value.find(item => item.id === id)
    item ? item.count++ : cartList.value.push({id: id,price: price,count: 1})
    uni.setStorageSync('ugo-carlist',JSON.stringify(cartList.value))
    console.log(cartList.value)
    
  }
  
  const removeCartList = () => {
    uni.setStorageSync('ugo-carlist','[]')
    cartList.value = []
  }
  
  const cartListTotal = computed(() => {
    return cartList.value.reduce((total,item) => total + item.count, 0)
  })
  
  const cartListPriceTotal = computed(() => {
    return cartList.value.reduce((total,item) => total + (item.price * item.count), 0)
  })

  return {
    cartList,
    addCartList,
    removeCartList,
    cartListPriceTotal,
    cartListTotal
  }
},{
  persist: {
    key: 'ugo-cart-list',
    paths: ['cartList']
  }
})