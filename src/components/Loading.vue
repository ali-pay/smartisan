<template>
  <div>
    <div v-show="loading" :class="{ center: center }" class="sm-loading">
      <i /><span>{{ title }}</span>
    </div>
    <div v-show="!loading">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmLoading',
  props: {
    // 是否显示loading
    loading: Boolean,
    // 是否居中
    center: Boolean,
    // 标题
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="less" scoped>
.sm-loading {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 30rem;
  height: 10rem;
  background: var(--color-white);
  border: var(--border);
  border-radius: var(--radius-l);
  box-shadow: var(--shadow-large);

  &.center {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  i {
    width: 1rem;
    height: 1rem;
    background-image: url('@/assets/images/components/loading.gif');
    background-repeat: no-repeat;
    background-size: contain;
  }

  span {
    font-weight: bold;
  }
}
</style>
