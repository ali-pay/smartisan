export default [
  {
    path: 'mall',
    name: 'Mall',
    meta: { title: 'Smartisan Mall' },
    component: () => import('@/components/RouterView.vue'),
    children: [
      { path: '', component: () => import('@/views/mall/index.vue') },
      { path: 'item/:id', name: 'Item', component: () => import('@/views/mall/item.vue') },
      { path: 'cart', name: 'Cart', component: () => import('@/views/mall/cart.vue') },
      { path: 'checkout', name: 'Checkout', component: () => import('@/views/mall/checkout.vue') },
      { path: 'payment', name: 'Payment', component: () => import('@/views/mall/payment.vue') },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/mall/user/index.vue'),
        children: [
          { path: '', redirect: '/mall/user/order' },
          { path: 'order', name: 'OrderList', component: () => import('@/views/mall/user/order-list.vue') },
          { path: 'order/detail', name: 'OrderDetail', component: () => import('@/views/mall/user/order-detail.vue') },
        ],
      },
    ],
    // redirect: '/mall/item',
  },
];
