import { createRouter, createWebHistory } from 'vue-router'
import i18n from '@/locales'

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
            title: 'nav.home',
            keepAlive: true,
          },
        },
        {
          path: '/create',
          name: 'Create',
          component: () => import('@/views/Create/index.vue'),
          meta: {
            title: 'nav.create',
            keepAlive: true,
          },
        },
        {
          path: '/blogs',
          name: 'Blogs',
          component: () => import('@/views/Blogs/index.vue'),
          meta: {
            title: 'nav.blogs',
            keepAlive: true,
          },
        },
        {
          path: '/team',
          name: 'Team',
          component: () => import('@/views/Team/index.vue'),
          meta: {
            title: 'nav.team',
            keepAlive: true,
          },
        },
        {
          path: '/morelinks',
          name: 'MoreLinks',
          component: () => import('@/views/Morelinks/index.vue'),
          meta: {
            title: 'nav.moreLinks',
            keepAlive: true,
          },
        },
        {
          path: '/message',
          name: 'Message',
          component: () => import('@/views/Message/index.vue'),
          meta: {
            title: 'nav.message',
            keepAlive: true,
          },
        },
        {
          path: '/contact',
          name: 'Contact',
          component: () => import('@/views/Contact/index.vue'),
          meta: {
            title: 'nav.contact',
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
        title: 'common.notFound',
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
  document.title = to.meta.title ? `${i18n.global.t(to.meta.title as string)} - Token` : 'Token'

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
