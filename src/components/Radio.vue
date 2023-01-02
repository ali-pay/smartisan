<template>
  <div class="sm-radio" :class="cls" @click="handleClick">
    <i class="border" :style="borderSts"><i class="dot" :style="dotSts" /></i>
    <span v-if="!hideTitle" :style="textSts">{{ title }}</span>
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
      type: String,
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
    borderSts() {
      const temp = {};
      if (this.height) {
        temp.width = `${this.height}px`;
        temp.height = `${this.height}px`;
      }
      return temp;
    },
    dotSts() {
      const temp = {};
      if (this.height) {
        temp.width = `${this.height * 0.53}px`;
        temp.height = `${this.height * 0.53}px`;
      }
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
  justify-content: center;
  cursor: pointer;

  .border {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border: var(--border);
    border-radius: 50%;
    box-shadow: inset 0 2px 4px rgb(0 0 0 / 5%);
  }

  .dot {
    display: none;
    width: 0.8rem;
    height: 0.8rem;
    background: #6c94f3;
    background: linear-gradient(#749af4, #668ef2);
    border: 1px solid #5d81d9;
    border-radius: 50%;
    box-shadow: 0 1px 2px rgb(0 0 0 / 20%);
  }

  &.active .dot {
    display: block;
  }
}
</style>
