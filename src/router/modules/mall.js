export default [
  {
    path: 'mall',
    name: 'Mall',
    meta: { title: 'Smartisan Mall' },
    component: () => import('@/components/RouterView.vue'),
    children: [
      { path: '', component: () => import('@/views/mall/index.vue') },
      { path: 'item/:id', component: () => import('@/views/mall/item.vue') },
      { path: 'cart', component: () => import('@/views/mall/cart.vue') },
    ],
    // redirect: '/mall/item',
  },
];
