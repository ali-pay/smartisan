export default [
  {
    path: 'product',
    name: 'Product',
    meta: { title: 'Smartisan Product' },
    component: () => import('@/views/product/index.vue'),
  },
];
