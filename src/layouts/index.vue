<template>
  <div>
    <header>
      <sm-header />
    </header>
    <router-view class="main" />
    <sm-backtop />
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

<style lang="less" scoped>
// header {
//   position: sticky;
//   top: 0;
//   z-index: 1;
// }
.main {
  min-height: calc(100vh - var(--header-wrapper-height) - 278px);
}
</style>
