import Vue from 'vue';

import Dialog from './Dialog.js';

const files = import.meta.glob('./*.vue', {
  eager: true,
});

const components = [];
Object.keys(files).forEach((key) => {
  components.push(files[key].default);
});

export default {
  install() {
    components.forEach((item) => {
      Vue.component(item.name, item);
    });

    Vue.prototype.$alert = Dialog.alert;
    Vue.prototype.$confirm = Dialog.confirm;
    Vue.prototype.$danger = Dialog.danger;
  },
};
