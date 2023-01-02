<template>
  <div v-clickoutside="handleClose" class="sm-select-wrapper" @click="focus = !focus">
    <div class="sm-select" :class="cls" :style="sts">
      <div v-if="icon" class="icon" :style="iconSts">
        <t-icon :name="icon" />
      </div>
      <span v-if="prefix" class="prefix">{{ prefix }}</span>
      <input :value="newVal?.[titleKey] || newVal" :disabled="true" :placeholder="placeholder" :style="inputSts" />
      <!-- <span>{{ newVal?.[titleKey] || newVal }}</span> -->
      <span v-if="validateMessage || tip" class="tip">{{ validateMessage || tip }}</span>
      <div class="chevron" :style="iconSts">
        <t-icon v-show="focus" name="chevron-up" />
        <t-icon v-show="!focus" name="chevron-down" />
      </div>
    </div>
    <div v-if="focus" class="sm-option" :style="sts" :class="cls">
      <ul :id="`sm-option-${_uid}`">
        <li
          v-for="(item, index) in options"
          :key="index"
          :class="{ active: isEqual(newVal, item) }"
          @click="newVal = item"
        >
          {{ item?.[titleKey] || item }}
          <!-- <i /> -->
          <t-icon v-if="isEqual(newVal, item)" name="check" size="large" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import clickoutside from '@/utils/clickoutside';
import scrollIntoView from '@/utils/scroll-into-view';

export default {
  name: 'SmSelect',
  directives: { clickoutside },
  props: {
    value: {
      type: [Object, Number, String],
      default: null,
    },
    // 是否禁用
    disabled: Boolean,
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
    // 可选项
    options: {
      type: Array,
      default: null,
    },
    // 可选项的title的字段名
    titleKey: {
      type: String,
      default: null,
    },
    // 可选项的value的字段名
    valueKey: {
      type: String,
      default: null,
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
      selected: [],
      selectedIndex: -1,
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
    opIndex() {
      return this.options.findIndex((item) => this.isEqual(this.newVal, item));
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
    focus: {
      immediate: true,
      handler(val) {
        if (val && this.opIndex !== -1) this.$nextTick(this.scrollToOption);
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
  methods: {
    isEqual(val, item) {
      return _.isEqual(val, item);
    },
    scrollToOption() {
      const container = document.querySelector(`#sm-option-${this._uid}`);
      const target = container?.children[this.opIndex];
      if (target) scrollIntoView(container, target);
    },
    handleClose() {
      this.focus = false;
    },
  },
};
</script>

<style lang="less" scoped>
.sm-select-wrapper {
  position: relative;
}

.sm-select {
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

  &:hover {
    border-color: var(--color-active);
  }

  &.focus,
  &.blue {
    border-color: var(--color-border-blue);

    .chevron {
      color: var(--color-blue);
    }
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
    cursor: pointer;
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

  .chevron {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-left: 1rem;
    margin-left: 1rem;
    font-size: 1.5rem;
  }

  .prefix {
    padding-right: 1rem;
  }
}

.sm-option {
  position: absolute;
  z-index: 1;
  display: flex;
  width: 100%;
  margin-top: 0.3rem;
  overflow: hidden;
  background-color: var(--color-white);
  border: var(--border);
  border-color: var(--color-border-blue);
  border-radius: var(--radius-l);
  box-shadow: var(--shadow-large);

  &.red {
    border-color: var(--color-border-red);

    ul li {
      &.active,
      &:hover {
        color: var(--color-border-red);
      }
    }
  }

  ul {
    // width: max-content;
    width: 100%;
    height: 10rem;
    overflow: auto;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 3rem;
    padding: 0 1rem;
    font-size: var(--font-size-l);
    cursor: pointer;

    // &:not(:last-child) {
    //   border-bottom: var(--border);
    // }

    &.active,
    &:hover {
      font-weight: bold;
      color: var(--color-border-blue);
      background-color: var(--color-hover);
    }

    // &.active i {
    //   display: block;
    // }

    // i {
    //   display: none;
    //   width: 2rem;
    //   height: 2rem;
    //   background-image: url('@/assets/images/components/select.png');
    //   background-repeat: no-repeat;
    //   background-size: contain;
    // }
  }
}
</style>
