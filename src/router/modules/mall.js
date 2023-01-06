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
    ],
    // redirect: '/mall/item',
  },
];
