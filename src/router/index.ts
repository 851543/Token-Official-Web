import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/views/Home/index.vue'),
          meta: {
            title: '首页',
            keepAlive: true,
          },
        },
        {
          path: '/trend',
          name: 'Trend',
          component: () => import('@/views/Trend/index.vue'),
          meta: {
            title: '趋势',
            keepAlive: true,
          },
        },
        {
          path: '/blogs',
          name: 'Blogs',
          component: () => import('@/views/Blogs/index.vue'),
          meta: {
            title: '博客',
            keepAlive: true,
          },
        },
        {
          path: '/team',
          name: 'Team',
          component: () => import('@/views/Team/index.vue'),
          meta: {
            title: '团队',
            keepAlive: true,
          },
        },
        {
          path: '/morelinks',
          name: 'MoreLinks',
          component: () => import('@/views/Morelinks/index.vue'),
          meta: {
            title: '动态',
            keepAlive: true,
          },
        },
        {
          path: '/contact',
          name: 'Contact',
          component: () => import('@/views/Contact/index.vue'),
          meta: {
            title: '联系我们',
            keepAlive: true,
          },
        },
      ],
    },
    // 404 页面
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/Link/index.vue'),
      meta: {
        title: '页面未找到',
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return {
      top: 0,
      behavior: 'smooth',
    }
  },
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - Token` : 'Token'

  // 这里可以添加其他路由守卫逻辑，比如：
  // - 权限验证
  // - 登录状态检查
  // - 页面访问统计
  // - 加载进度条

  next()
})

// 路由错误处理
router.onError((error) => {
  console.error('路由错误:', error)
  // 可以添加错误处理逻辑，比如显示错误提示或重定向到错误页面
})

export default router
