import Vue from 'vue';

import App from './App.vue';
import store from './store';
import router from './router';
import SmComponents from './components';

import '@/style/index.less';

Vue.use(SmComponents);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
