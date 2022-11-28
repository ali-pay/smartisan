<template>
  <div class="sm-button" :class="classs" :style="styles" @click="handleClick">
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'SmButton',
  props: {
    // 是否禁用按钮
    disabled: Boolean,
    // 是否显示阴影
    shadow: Boolean,
    // 按钮颜色
    color: {
      type: String,
      // 可选：default / gray / red / green / blue
      default: 'default',
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
  },
  computed: {
    classs() {
      let { color } = this;
      if (!['gray', 'red', 'green', 'blue'].includes(color)) color = 'default';
      const css = [color];
      if (this.disabled) css.push('disabled');
      if (this.shadow) css.push('shadow');
      return css;
    },
    styles() {
      const style = {};
      if (this.width) style.width = `${this.width}px`;
      if (this.height) style.height = `${this.height}px`;
      if (this.size) style.fontSize = `${this.size}px`;
      return style;
    },
  },
  methods: {
    // 按钮点击事件
    handleClick(evt) {
      this.$emit('click', evt);
    },
  },
};
</script>

<style lang="less" scoped>
.sm-button {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  cursor: pointer;
  border-radius: var(--radius-l);

  &.default {
    background: linear-gradient(#678ee7, #5078df);
    // border: 1px solid #5c81e3;

    &:active {
      background: linear-gradient(#6c8cd4, #4769c2);
    }
  }

  &.gray {
    color: var(--font-color-2);
    background: var(--color-linear);
    border: var(--border);

    &:active {
      background: var(--color-gray);
    }
  }

  &.red {
    background: linear-gradient(#e67766, #d54);

    &:active {
      background: linear-gradient(#d97869, #d15a4b);
    }

    &.shadow {
      box-shadow: 0 1px 3px rgb(221 85 68 / 60%);

      &:hover,
      &:active {
        box-shadow: 0 1px 8px rgb(221 85 68 / 60%), 0 10px 30px rgb(221 85 68 / 30%);
      }
    }
  }

  &.green {
    background: linear-gradient(#91dd44, #67bb22);

    &:active {
      background: linear-gradient(#8fd14b, #6ab42e);
    }

    &.shadow {
      box-shadow: 0 1px 3px rgb(103 187 34 / 60%);

      &:hover,
      &:active {
        box-shadow: 0 1px 8px rgb(103 187 34 / 60%), 0 10px 30px rgb(103 187 34 / 30%);
      }
    }
  }

  &.blue {
    background: linear-gradient(#8ae, #47e);

    &:active {
      background: linear-gradient(#87a5e0, #4b78e0);
    }

    &.shadow {
      box-shadow: 0 1px 3px rgb(68 119 238 / 60%);

      &:hover,
      &:active {
        box-shadow: 0 1px 8px rgb(68 119 238 / 60%), 0 10px 30px rgb(68 119 238 / 30%);
      }
    }
  }
}
</style>
