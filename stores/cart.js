import {defineStore} from 'pinia'

import {ref} from 'vue'
export const useCartStore = defineStore('cart',() => {
  
  const add = ref(0)
  
  return {
    add
  }
})