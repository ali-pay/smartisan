<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  mounted() {
    this.$store.dispatch('theme/initTheme', { mode: 'auto', color: 'default' });
  },
});
</script>

<style lang="less" scoped></style>
