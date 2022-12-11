<template>
  <div class="sm-checkbox" :class="cls" @click="handleClick">
    <i :style="imgSts" />
    <span v-if="!hideTitle" :style="textSts">{{ title }}</span>
  </div>
</template>

<script>
import Emitter from '@/utils/emitter';

export default {
  name: 'SmCheckbox',
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
      default: '',
    },
    // 图标颜色
    color: {
      type: String,
      // 可选：red / blue
      default: 'blue',
      validator: (val) => ['red', 'blue'].includes(val),
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
      const temp = [this.color];
      if (this.disabled) temp.push('disabled');
      if (this.checked) temp.push('active');
      return temp;
    },
    imgSts() {
      const temp = {};
      if (this.height) {
        temp.width = `${this.height}px`;
        temp.height = `${this.height}px`;
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
        if (parent.$options.name === 'SmCheckboxGroup') return parent;
        parent = parent.$parent;
      }
      return null;
    },
  },
  watch: {
    'group.value': {
      handler() {
        this.checked = this.group?.value?.includes(this.title);
      },
    },
  },
  mounted() {
    if (this.group) this.checked = this.group?.value?.includes(this.title);
  },
  methods: {
    handleClick() {
      this.checked = !this.checked;
      if (!this.group) {
        this.$emit('input', this.checked);
        return;
      }
      let groupValue = this.group?.value;
      if (this.checked) groupValue.push(this.title);
      else groupValue = groupValue.filter((item) => item !== this.title);
      this.dispatch('SmCheckboxGroup', 'input', [groupValue]);
    },
  },
};
</script>

<style lang="less" scoped>
.sm-checkbox {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &.active i {
    background-image: url('@/assets/images/components/checkbox-active-blue.png');
  }

  &.active.red i {
    background-image: url('@/assets/images/components/checkbox-active-red.png');
  }

  i {
    display: block;
    width: 2rem;
    height: 2rem;
    background-image: url('@/assets/images/components/checkbox.png');
    background-repeat: no-repeat;
    background-size: contain;
  }

  span {
    font-weight: bold;
  }
}
</style>
