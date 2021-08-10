import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerApp } from './global'
// import wlRequest from './service'
import 'normalize.css' // 样式初始化
import './assets/css/index.less' // 自己设定的初始化
import { setupStore } from './store'

const app = createApp(App)

// 注册element-plus组件
registerApp(app) // app.use(registerApp) 和这个用法一样
// app.use(function(app)) 会自动传入 app对象
app.use(store).use(router).mount('#app')
setupStore()

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// wlRequest
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'GET',
//     interceptors: {
//       requestInterceptors: (config) => {
//         console.log(config) // 打印发现 这里的config 就是 这个request 请求
//         console.log('处理单独请求的config')
//         return config
//       },
//       responseInterceptors: (res) => {
//         console.log('处理单独响应的res')
//         return res
//       }
//     },
//     showLoading: false
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })

// wlRequest.get({
//   url: '/home/multidata'
// })
