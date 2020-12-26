import axios from 'axios'
import store from '@/store'
// 创建AXIOS实例;
const service = axios.create({
  timeout: 600000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=utf-8'
  }
})
service.interceptors.request.use(config => {
  store.commit('setLoading', true)
  return config
})
service.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
})

export default service
