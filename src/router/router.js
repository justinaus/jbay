import Vue from 'vue'
import Router from 'vue-router'
import routerPath from './routerPath'
import menuId from '@/constants/menuId'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if( from.path === to.path ) {
      return;
    }
    
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: routerPath.HOME,
      redirect: routerPath.ITEMS
    },
    {
      path: routerPath.ITEMS,
      meta: {
        menuId: menuId.ITEM,
      },
      component: () => import('../pages/admin/item/Items.vue')
    },
    {
      path: routerPath.ITEM,
      meta: {
        menuId: menuId.ITEM,
      },
      component: () => import('../pages/admin/item/Item.vue')
    },
    {
      path: routerPath.BIDS,
      meta: {
        menuId: menuId.BID,
      },
      component: () => import('../pages/admin/bid/Bids.vue')
    },
    {
      path: routerPath.BID,
      meta: {
        menuId: menuId.BID,
      },
      component: () => import('../pages/admin/bid/Bid.vue')
    },
    {
      path: routerPath.MANAGEMENT_USERS,
      meta: {
        menuId: menuId.MANAGEMENT,
        subMenuId: menuId.MANAGEMENT_USER,
      },
      component: () => import('../pages/admin/management/user/Users.vue')
    },
    {
      path: routerPath.MANAGEMENT_USER,
      meta: {
        menuId: menuId.MANAGEMENT,
        subMenuId: menuId.MANAGEMENT_USER,
      },
      component: () => import('../pages/admin/management/user/User.vue')
    },
    {
      path: routerPath.MANAGEMENT_ETC,
      meta: {
        menuId: menuId.MANAGEMENT,
        subMenuId: menuId.MANAGEMENT_ETC,
      },
      component: () => import('../pages/admin/management/etc/Etc.vue')
    },
    { path: '*', redirect: routerPath.HOME }
  ]
})

export default router
