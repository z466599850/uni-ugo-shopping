import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useUserStore = defineStore('user',() => {
  
  // const token = ref('')
  const userInfo = ref({})
  
  return {
    // token,
    userInfo
  }
},{
  persist: {
    key: 'ugo-shopping-token',
    paths: ['userInfo']
  }
})
