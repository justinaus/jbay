import routerPath from '@/router/routerPath';
import menuId from '../menuId';

const menu = [
  {
    id: menuId.PRODUCT,
    text: 'Product',
    link: routerPath.PRODUCTS,
  },
  {
    id: menuId.BID,
    text: 'Bid',
    link: routerPath.BIDS,
  },
];

export { menu };
