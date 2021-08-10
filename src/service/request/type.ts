import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 定义一个拦截器接口
//T = AxiosResponse 设置默认类型
export interface WLRequestInterceptors<T = AxiosResponse> {
  // 请求的拦截
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (error: any) => any
  //响应的拦截
  responseInterceptors?: (config: T) => T
  responseInterceptorsCatch?: (error: any) => any
}

// 定义一个借口 通过继承 AxiosRequestConfig
export interface WLRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  // 在添加一些属性
  interceptors?: WLRequestInterceptors<T> // 拦截器
  showLoading?: boolean // loading画面加载
}
