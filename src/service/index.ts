// service 的统一出口
import WLRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const wlRequest = new WLRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    // 传入拦截器
    requestInterceptors: (config) => {
      // 拦截 添加  token
      const token = localCache.getCache('token') ?? ''
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      //拦截器必须 return 不然就直接拦断了
      return config
    },
    requestInterceptorsCatch: (err) => {
      return err
    },
    responseInterceptors: (res) => {
      return res
    },
    responseInterceptorsCatch: (err) => {
      return err
    }
  }
})
export default wlRequest
