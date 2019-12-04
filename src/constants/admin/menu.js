import routerPath from '@/router/routerPath';
import menuId from '../menuId';

const menu = [
  {
    id: menuId.ITEM,
    text: 'Item',
    link: routerPath.ITEMS,
  },
  {
    id: menuId.BID,
    text: 'Bid',
    link: routerPath.BIDS,
  },
  {
    id: menuId.MANAGEMENT,
    text: 'Management',
    link: routerPath.MANAGEMENT_USERS,
    arrSub: [
      {
        id: menuId.MANAGEMENT_USER,
        text: 'User',
        link: routerPath.MANAGEMENT_USERS,
      },
      {
        id: menuId.MANAGEMENT_ETC,
        text: 'Etc',
        link: routerPath.MANAGEMENT_ETC,
      },
    ],
  },
];

export { menu };
