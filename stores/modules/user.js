import {defineStore} from 'pinia'
import {ref,computed} from 'vue'

export const useUserStore = defineStore('user',() => {
  
  // const token = ref('')
  const userInfo = ref({})
  const address = ref({})
  
  
  const setUserInfo = (value) => {
    userInfo.value = value
    setUserInfoStorage()
  }
  
  const removeUserInfo = () => {
    userInfo.value = {}
    uni.setStorageSync('ugo-userInfo','{}')
  }
  
  const setUserInfoStorage = () => {
    uni.setStorageSync('ugo-userInfo',JSON.stringify(userInfo.value))
  }
  
  const getUserInfoStorage = () => {
    userInfo.value = uni.getStorageSync('ugo-userInfo')
  }
  
  const setAddress = (value) =>  {
    address.value = value
    setAddressStorage()
  }
  const removeAddress = () => {
    address.value = {}
    uni.setStorageSync('ugo-address','{}')
  }
  
  const setAddressStorage = () => {
    uni.setStorageSync('ugo-address',JSON.stringify(address.value))
  }
  
  const getAddressStorage = () => {
    if(!uni.getStorageSync('ugo-address')) return
    address.value = JSON.parse(uni.getStorageSync('ugo-address'))
  }
  
  const addstr = computed(() => {
    if(!address.value.provinceName) return ''
    
    return address.value.provinceName + address.value.cityName + address.value.countyName + address.value.detailInfo
  })
  
  return {
    // token,
    userInfo,
    address,
    setUserInfo,
    removeUserInfo,
    setUserInfoStorage,
    setAddress,
    removeAddress,
    setAddressStorage,
    setUserInfo,
    getUserInfoStorage,
    getAddressStorage,
    addstr
  }
},{
  persist: {
    key: 'ugo-shopping-token',
    paths: ['userInfo']
  }
})
