import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'Main' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/main/main.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    // 如果没有 token 跳到 登录页面
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})
export default router
