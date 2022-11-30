import Vue from 'vue';
import VueRouter from 'vue-router';

import mall from './modules/mall';
import product from './modules/product';

const routes = [
  {
    path: '/',
    name: 'smartisan',
    meta: { title: 'Smartisan' },
    component: () => import('@/layouts/index.vue'),
    children: [...mall, ...product],
    redirect: '/mall',
  },
  {
    path: '*',
    redirect: '/',
  },
];

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
