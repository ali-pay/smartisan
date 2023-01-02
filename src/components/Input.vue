<template>
  <div class="sm-input" :class="cls" :style="sts">
    <div v-if="icon" class="icon" :style="iconSts">
      <t-icon :name="icon" />
    </div>
    <span v-if="prefix" class="prefix">{{ prefix }}</span>
    <input
      v-model="newVal"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="type"
      :style="inputSts"
      @blur="focus = false"
      @focus="focus = true"
    />
    <span v-if="suffix" class="suffix">{{ suffix }}</span>
    <span v-if="validateMessage || tip" class="tip">{{ validateMessage || tip }}</span>
  </div>
</template>

<script>
export default {
  name: 'SmInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    // 是否禁用
    disabled: Boolean,
    // 输入框类型
    type: {
      type: String,
      default: 'text',
      validator: (val) => ['text', 'password'].includes(val),
    },
    // 提示颜色
    color: {
      type: String,
      default: '',
      validator: (val) => ['', 'red', 'blue'].includes(val),
    },
    // 提示文字
    tip: {
      type: String,
      default: null,
    },
    // t-icon图标名称
    icon: {
      type: String,
      default: null,
    },
    // 占位符文字
    placeholder: {
      type: String,
      default: null,
    },
    // 前缀文字
    prefix: {
      type: String,
      default: null,
    },
    // 后缀文字
    suffix: {
      type: String,
      default: null,
    },
    // 按钮宽度
    width: {
      type: Number,
      default: 0,
    },
    // 按钮高度
    height: {
      type: Number,
      default: 0,
    },
    // 文字尺寸
    size: {
      type: Number,
      default: 0,
    },
    // 作为FORM表单的字段标识
    prop: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      newVal: null,
      focus: false,
      validateMessage: null,
      validateColor: null,
    };
  },
  computed: {
    cls() {
      const temp = [this.validateColor || this.color];
      if (this.disabled) temp.push('disabled');
      if (this.red) temp.push('red');
      if (this.focus) temp.push('focus');
      return temp;
    },
    sts() {
      const temp = {};
      if (this.width) temp.width = `${this.width}px`;
      if (this.height) temp.height = `${this.height}px`;
      if (this.size) temp.fontSize = `${this.size}px`;
      return temp;
    },
    iconSts() {
      const temp = {};
      if (this.size) temp.fontSize = `${this.size}px`;
      return temp;
    },
    inputSts() {
      const temp = {};
      if (this.size) temp.fontSize = `${this.size}px`;
      return temp;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.newVal = val;
      },
    },
    newVal: {
      immediate: true,
      handler(val) {
        this.$emit('input', val);
      },
    },
  },
  mounted() {
    if (!this.prop) return;
    this.$on('SmFormValidate', (val) => {
      const item = val?.find((item) => item.field === this.prop);
      if (item) {
        this.validateColor = 'red';
        this.validateMessage = item.message;
      } else {
        this.validateColor = null;
        this.validateMessage = null;
      }
    });
  },
};
</script>

<style lang="less" scoped>
.sm-input {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  padding: 0 1rem;
  font-weight: normal;
  color: var(--font-color-2);
  border: var(--border);
  border-radius: var(--radius);
  // box-shadow: inset 0 3px 5px -4px rgb(0 0 0 / 40%), inset -1px 0 3px -2px rgb(0 0 0 / 10%);

  &:hover {
    border-color: var(--color-active);
  }

  &.focus,
  &.blue {
    border-color: var(--color-border-blue);
  }

  &.red {
    border-color: var(--color-border-red);

    .tip {
      background: var(--color-border-red);
    }
  }

  .tip {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    height: 2rem;
    padding: 0 1rem;
    margin-right: 1rem;
    font-size: var(--font-size);
    color: var(--color-white);
    background: var(--color-border-blue);
    border-radius: var(--radius);
  }

  input {
    width: 100%;
    height: 100%;
    color: var(--font-color-2);
    background: none;
    border: none;
    outline: none;

    &:-moz-placeholder,
    &::-moz-placeholder,
    &:-ms-input-placeholder,
    &::-webkit-input-placeholder {
      color: var(--font-color-0);
    }
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-right: 1rem;
    margin-right: 1rem;
    font-size: 1.5rem;
    border-right: var(--border);
  }

  .prefix {
    padding-right: 1rem;
  }

  .suffix {
    padding-left: 1rem;
  }
}
</style>
