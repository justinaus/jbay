import Vue from 'vue';
import Router from 'vue-router';
import routerPath from './routerPath';
import menuId from '@/constants/menuId';
import LocalStorageManager from '@/LocalStorageManager';
import store from '@/store';
import { HIDE_ALERT_ACTION } from '@/store/modules/alert/action';
import { PROGRESS_END_ACTION } from '@/store/modules/progressbar/action';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (from.path === to.path) {
      return;
    }

    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: routerPath.HOME,
      redirect: routerPath.PRODUCTS,
    },
    {
      path: routerPath.USER_LOGIN,
      component: () => import('../pages/user/Login.vue'),
    },
    {
      path: routerPath.ADMIN_LOGIN,
      component: () => import('../pages/admin/AdminLogin.vue'),
    },
    {
      path: routerPath.PRODUCTS,
      meta: {
        menuId: menuId.PRODUCT,
        requiresAuth: true,
      },
      component: () => import('../pages/admin/product/Products.vue'),
    },
    {
      path: routerPath.PRODUCT + '/:id',
      meta: {
        menuId: menuId.PRODUCT,
        requiresAuth: true,
      },
      component: () => import('../pages/admin/product/Product.vue'),
    },
    {
      path: routerPath.BIDS,
      meta: {
        menuId: menuId.BID,
        requiresAuth: true,
      },
      component: () => import('../pages/admin/bid/Bids.vue'),
    },
    {
      path: routerPath.BID + '/:id',
      meta: {
        menuId: menuId.BID,
        requiresAuth: true,
      },
      component: () => import('../pages/admin/bid/Bid.vue'),
    },
    {
      path: routerPath.MANAGEMENT_USERS,
      meta: {
        menuId: menuId.MANAGEMENT,
        subMenuId: menuId.MANAGEMENT_USER,
        requiresAuth: true,
      },
      component: () => import('../pages/admin/management/user/Users.vue'),
    },
    {
      path: routerPath.MANAGEMENT_USER,
      meta: {
        menuId: menuId.MANAGEMENT,
        subMenuId: menuId.MANAGEMENT_USER,
        requiresAuth: true,
      },
      component: () => import('../pages/admin/management/user/User.vue'),
    },
    {
      path: routerPath.MANAGEMENT_ETC,
      meta: {
        menuId: menuId.MANAGEMENT,
        subMenuId: menuId.MANAGEMENT_ETC,
        requiresAuth: true,
      },
      component: () => import('../pages/admin/management/etc/Etc.vue'),
    },
    { path: '*', redirect: routerPath.HOME },
  ],
});

router.beforeEach(async (to, _from, next) => {
  store.dispatch(HIDE_ALERT_ACTION);
  store.dispatch(PROGRESS_END_ACTION);

  const loginData = LocalStorageManager.shared.getLoginData();

  const isRequiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (isRequiresAuth) {
    if (!loginData) {
      next({
        path: routerPath.USER_LOGIN,
        query:
          to.fullPath === routerPath.HOME ? null : { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
