<template>
  <div class="sm-form-item">
    <span v-if="title" class="title">{{ title }}</span>
    <div :style="sts">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmFormItem',
  inject: ['smForm'],
  props: {
    // 标题
    title: {
      type: String,
      default: null,
    },
    // 宽度
    width: {
      type: Number,
      default: 0,
    },
    // 高度
    height: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    sts() {
      const temp = {};
      if (this.width || this.smForm.width) temp.width = `${this.width || this.smForm.width}px`;
      if (this.height || this.smForm.height) temp.height = `${this.height || this.smForm.height}px`;
      return temp;
    },
  },
};
</script>

<style lang="less" scoped>
.sm-form-item {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;

  .title {
    font-size: var(--font-size-l);
    font-weight: bold;
  }
}
</style>
