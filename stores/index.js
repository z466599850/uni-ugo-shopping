import { createPinia } from "pinia";
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia


export * from './modules/cart.js'
export * from './modules/user.js'