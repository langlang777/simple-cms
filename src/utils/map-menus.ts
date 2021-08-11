import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1.先加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  // 获取 文件夹路径 true 表示递归查找 这个路径下所有文件
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    // 拿到路径后 遍历加载文件内容 添加到数组
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  console.log(allRoutes)

  // 2. 根据菜单获取需要的routes
  return routes
}
