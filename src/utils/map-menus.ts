import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'
let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1.先加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  // 获取 文件夹路径 true 表示递归查找 这个路径下所有文件
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    // 拿到路径后 遍历加载文件内容 添加到数组
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default) // 保存所有的 路由配置
  })
  // console.log(allRoutes)

  // 2. 根据菜单获取需要的routes

  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        // find 函数 按里面的 函数规则找到一样的 返回出去
        const route = allRoutes.find((item) => item.path === menu.url)
        if (!firstMenu) {
          firstMenu = menu
        }
        if (route) {
          routes.push(route)
        }
      } else {
        // 只有type ===2 才需要拿到里面的 url
        // 如果 === 1 则 去它里面 children 里面找 再次调用函数 递归
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)
  return routes
}

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

export function pathToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)
  return permissions
}

export { firstMenu }
