<template>
  <div class="sm-button" :class="cls" :style="sts" @click="handleClick">
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
    disabled: {
      type: Boolean,
      default: false,
    },
    // 是否显示阴影
    shadow: {
      type: Boolean,
      default: false,
    },
    // 按钮颜色
    color: {
      type: String,
      // 可选：default / gray / red / green / blue
      default: 'default',
      validator: (val) => ['default', 'gray', 'red', 'green', 'blue'].includes(val),
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
    // 跳转路由
    to: {
      type: String,
      default: null,
    },
    // 跳转链接
    href: {
      type: String,
      default: null,
    },
  },
  computed: {
    cls() {
      const temp = [this.color];
      if (this.disabled) temp.push('disabled');
      if (this.shadow) temp.push('shadow');
      return temp;
    },
    sts() {
      const temp = {};
      if (this.width) temp.width = `${this.width}px`;
      if (this.height) temp.height = `${this.height}px`;
      if (this.size) temp.fontSize = `${this.size}px`;
      return temp;
    },
  },
  methods: {
    handleClick(evt) {
      if (this.to) this.$router.push(this.to);
      if (this.href) window.open(this.href);
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
