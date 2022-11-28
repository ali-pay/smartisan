import Vue from 'vue';

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
  },
};
