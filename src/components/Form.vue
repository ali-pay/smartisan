<template>
  <div class="sm-form">
    <slot></slot>
  </div>
</template>

<script>
import Schema from 'async-validator';
import emitter from '@/utils/emitter';

export default {
  name: 'SmForm',
  mixins: [emitter],
  provide() {
    return {
      smForm: this,
    };
  },
  props: {
    value: {
      type: Object,
      default: null,
    },
    // 校验规则
    rules: {
      type: Object,
      default: null,
    },
    // item宽度
    width: {
      type: Number,
      default: 0,
    },
    // item高度
    height: {
      type: Number,
      default: 0,
    },
    // 是否验证通过
    passed: Boolean,
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(val) {
        if (!val || !this.rules) return;
        const validator = new Schema(this.rules);
        validator
          .validate(val)
          .then(() => {
            this.$emit('update:passed', true);
            ['SmInput', 'SmSelect', 'SmCascader'].forEach((item) => {
              this.broadcast(item, 'SmFormValidate', []);
            });
          })
          .catch(({ errors }) => {
            this.$emit('update:passed', false);
            ['SmInput', 'SmSelect', 'SmCascader'].forEach((item) => {
              this.broadcast(item, 'SmFormValidate', [errors]);
            });
          });
      },
    },
  },
};
</script>

<style lang="less" scoped>
.sm-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
