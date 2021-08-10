import axios, { AxiosInstance } from 'axios'
import { WLRequestInterceptors, WLRequestConfig } from './type' //导入接口
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

const DEAFULT_LOADING = false

class WLRequest {
  instance: AxiosInstance
  interceptors?: WLRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  constructor(config: WLRequestConfig) {
    // 构造器 当类创建时 会执行里面代码 config 是创建时要求传入的 对象
    // 1.创建axios的实例
    this.instance = axios.create(config)
    //config 是 WLRequestConfig 这个类型 所以会有 interceptors属性
    this.interceptors = config.interceptors
    // 接受 传入的 showLoading 如果没有 就是false
    this.showLoading = config.showLoading ?? DEAFULT_LOADING

    // 使用拦截器 这里的拦截器 是config 传入的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )
    //所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // loading画面 是否加载
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据。。。',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        console.log('所有的实例都有的拦截器：请求成功拦截')
        return config
      },
      (err) => {
        console.log('所有的实例都有的拦截器：请求失败拦截')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // 移除loading 画面
        this.loading?.close()

        console.log('所有的实例都有的拦截器：响应成功拦截')
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败')
        }
        return data
      },
      (err) => {
        // 移除loading 画面
        this.loading?.close()
        if (err.response.status === 400) {
          console.log('404错误')
        }
        console.log('所有的实例都有的拦截器：响应失败拦截')
        return err
      }
    )
  }
  // 在类里面定义一个方法 使用这个方法需要传入 config参数
  request<T>(config: WLRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //如果请求时 添加了 showlodaing false 拦截器里面的 loading画面不加载
      if (config.showLoading === false) {
        this.showLoading = false
      }
      if (config.interceptors?.requestInterceptors) {
        // 如果有传入请求拦截器 调用处理函数 处理响应 再把请求赋值出去
        config = config.interceptors.requestInterceptors(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptors) {
            // 如果有传入响应拦截器 调用处理函数 处理响应结果 再把结果赋值出去
            res = config.interceptors.responseInterceptors(res)
          }
          // 请求成功后 恢复初始值 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          // 请求成功后 恢复初始值 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
          reject(err)
          return err
        })
    })
  }
  //定义其他函数
  get<T>(config: WLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: WLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: WLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: WLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default WLRequest
