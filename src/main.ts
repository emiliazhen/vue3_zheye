import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/routers'
// import axios from 'axios'
// axios.defaults.baseURL = 'http://api.vikingship.xyz/api'
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
