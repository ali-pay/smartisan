<template>
  <div class="sm-radio" :class="cls" @click="handleClick">
    <i />
    <span v-if="!hideTitle && !$slots.default" :style="textSts">{{ title }}</span>
    <span v-else :style="textSts"><slot></slot></span>
  </div>
</template>

<script>
import Emitter from '@/utils/emitter';

export default {
  name: 'SmRadio',
  mixins: [Emitter],
  props: {
    // 是否选中
    value: Boolean,
    // 是否禁用
    disabled: Boolean,
    // 是否隐藏标题
    hideTitle: Boolean,
    // 标题
    title: {
      type: [Number, String],
      default: null,
    },
    // 高度
    height: {
      type: Number,
      default: 0,
    },
    // 文字尺寸
    size: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // 是否选中
      checked: this.value,
    };
  },
  computed: {
    cls() {
      const temp = [];
      if (this.disabled) temp.push('disabled');
      if (this.checked) temp.push('active');
      return temp;
    },
    textSts() {
      const temp = {};
      if (this.size) temp.fontSize = `${this.size}px`;
      return temp;
    },
    group() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.name === 'SmRadioGroup') return parent;
        parent = parent.$parent;
      }
      return null;
    },
  },
  watch: {
    'group.value': {
      handler() {
        this.checked = this.group?.value === this.title;
      },
    },
  },
  mounted() {
    if (this.group) this.checked = this.group?.value === this.title;
  },
  methods: {
    handleClick() {
      this.checked = !this.checked;
      if (!this.group) this.$emit('input', this.checked);
      else this.dispatch('SmRadioGroup', 'input', this.title);
    },
  },
};
</script>

<style lang="less" scoped>
.sm-radio {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  // justify-content: center;
  height: 1rem;
  cursor: pointer;

  i {
    width: 2rem;
    height: 2rem;
    background-image: url('@/assets/images/components/radio.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  &.active i {
    background-image: url('@/assets/images/components/radio-active.png');
  }
}
</style>
