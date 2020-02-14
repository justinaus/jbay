import Vue from 'vue';
import Router from 'vue-router';
import routerPath from './routerPath';
import menuId from '@/constants/menuId';
import LocalStorageManager from '@/LocalStorageManager';
import store from '@/store';
import { HIDE_ALERT_ACTION } from '@/store/modules/alert/action';
import { PROGRESS_END_ACTION } from '@/store/modules/progressbar/action';
import { menu as adminMenu } from '@/constants/admin/menu';
import { menu as userMenu } from '@/constants/user/menu';

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
      // redirect: routerPath.PRODUCTS,
      // admin home: bids, user home: products.
      meta: { requiresAuth: true },
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
      // component: () => import('../pages/admin/product/Products.vue'),
      // admin/user same path, different component.
      // shared/component 에서 분기.
      component: () => import('../pages/shared/product/Products.vue'),
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

  const isRequiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (!isRequiresAuth) {
    next();
    return;
  }

  const loginData = LocalStorageManager.shared.getLoginData();

  if (!loginData) {
    next({
      path: routerPath.USER_LOGIN,
      query: to.fullPath === routerPath.HOME ? null : { redirect: to.fullPath },
    });
    return;
  }

  const isAdmin = LocalStorageManager.shared.getIsAdmin();

  if (to.path === routerPath.HOME) {
    next({
      path: isAdmin ? routerPath.BIDS : routerPath.PRODUCTS,
    });
    return;
  }

  const menus = isAdmin ? adminMenu : userMenu;
  const { menuId, subMenuId } = to.meta;

  const isValidMenu = getIsValidMenuByAccount(menuId, subMenuId, menus);
  if (!isValidMenu) {
    next({
      path: routerPath.HOME,
    });
    return;
  }

  next();
});

function getIsValidMenuByAccount(menuId, subMenuId, menus) {
  const ret = menus.some(item => {
    if (!item.arrSub) {
      // return item.id === menuId;
      const targerId = subMenuId || menuId;

      return item.id === targerId;
    }

    return item.arrSub.some(subItem => subItem.id === subMenuId);
  });

  return ret;
}

export default router;
