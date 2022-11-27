<template>
  <div>
    <header>
      <sm-header />
    </header>
    <router-view />
    <footer>
      <sm-footer />
    </footer>
  </div>
</template>

<script>
import Vue from 'vue';
import SmHeader from './components/Header.vue';
import SmFooter from './components/Footer.vue';

export default Vue.extend({
  name: 'Layout',
  components: {
    SmHeader,
    SmFooter,
  },
});
</script>

<style lang="less" scoped></style>
