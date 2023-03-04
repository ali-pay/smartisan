<template>
  <div v-show="visible" class="z-index">
    <div :class="{ overlay: overlay }" @scroll.prevent></div>
    <div :class="{ center: center }" class="sm-dialog center">
      <div v-if="title" class="sm-dialog-header">
        <div class="header">
          <span class="title">{{ title }}</span>
        </div>
      </div>
      <div class="sm-dialog-body">
        <!-- 内容 -->
        <slot></slot>
        <div class="default">{{ message }}</div>
      </div>
      <div v-if="footer" class="sm-dialog-footer">
        <sm-button v-if="cancel" :height="40" :size="14" :color="cancelColor" @click="handleCancel">
          {{ cancelText }}
        </sm-button>
        <sm-button v-if="confirm" :height="40" :size="14" :color="confirmColor" @click="handleConfirm">
          {{ confirmText }}
        </sm-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmDialog',
  props: {
    // 是否显示
    visible: Boolean,
    // 是否居中
    center: {
      type: Boolean,
      default: true,
    },
    // 是否显示遮罩
    overlay: {
      type: Boolean,
      default: true,
    },
    // 是否锁定滚动
    lockScroll: {
      type: Boolean,
      default: true,
    },
    // 是否显示底部按钮
    footer: {
      type: Boolean,
      default: true,
    },
    // 是否显示确认按钮
    confirm: {
      type: Boolean,
      default: true,
    },
    // 是否显示取消按钮
    cancel: {
      type: Boolean,
      default: true,
    },
    // 标题
    title: {
      type: String,
      default: null,
    },
    // 内容
    message: {
      type: String,
      default: null,
    },
    // 确认按钮文字
    confirmText: {
      type: String,
      default: '确认',
    },
    // 取消按钮文字
    cancelText: {
      type: String,
      default: '取消',
    },
    // 确认按钮颜色
    confirmColor: {
      type: String,
      default: 'default',
    },
    // 取消按钮颜色
    cancelColor: {
      type: String,
      default: 'gray',
    },
    // 执行的回调函数
    callback: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      action: '',
    };
  },
  computed: {
    scrollBarWidth() {
      const outer = document.createElement('div');
      outer.style.visibility = 'hidden';
      outer.style.width = '100px';
      outer.style.position = 'absolute';
      outer.style.top = '-9999px';
      outer.style.overflow = 'scroll';
      document.body.appendChild(outer);

      const inner = document.createElement('div');
      inner.style.width = '100%';
      outer.appendChild(inner);

      const widthNoScroll = outer.offsetWidth;
      const widthWithScroll = inner.offsetWidth;
      outer.parentNode.removeChild(outer);
      const scrollBarWidth = widthNoScroll - widthWithScroll;
      return scrollBarWidth;
    },
  },
  watch: {
    visible: {
      immediate: true,
      handler(val) {
        if (!this.lockScroll) return;
        // 隐藏滚动条并设置页面边距避免页面抖动
        if (val) {
          if (document.body.scrollHeight >= document.body.clientHeight) return;
          document.body.style.overflow = 'hidden';
          document.body.style.marginRight = `${this.scrollBarWidth}px`;
          const els = document.querySelectorAll('.fixed');
          if (els) {
            els.forEach((item) => {
              item.style.marginRight = `${this.scrollBarWidth}px`;
            });
          }
        } else {
          document.body.style.overflow = 'auto';
          document.body.style.marginRight = '0px';
          const els = document.querySelectorAll('.fixed');
          if (els) {
            els.forEach((item) => {
              item.style.marginRight = '0px';
            });
          }
        }
      },
    },
  },
  methods: {
    handleConfirm(event) {
      this.action = 'confirm';
      this.doClose(event);
    },
    handleCancel(event) {
      this.action = 'cancel';
      this.doClose(event);
    },
    doClose(event) {
      this.$emit('update:visible', false);
      this.$emit(this.action, event);
      setTimeout(() => {
        this.callback?.(this.action, this);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.z-index {
  position: fixed;
  z-index: 1;
}

.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgb(0 0 0 / 40%);
}

.sm-dialog {
  box-sizing: border-box;
  margin: 0 auto;
  // overflow: hidden;
  background: var(--color-white);
  border: var(--border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-large);

  &.center {
    position: fixed;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .sm-dialog-header {
    overflow: hidden;
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;

    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 5rem;
      background: var(--color-linear);
      border-bottom: var(--border);

      .title {
        font-size: var(--font-size-xxl);
      }
    }
  }

  .sm-dialog-body {
    min-width: 35rem;
    padding: 2rem;

    .default {
      font-size: var(--font-size-xl);
      text-align: center;
    }
  }

  .sm-dialog-footer {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    border-top: var(--border);

    .sm-button {
      width: 100%;
    }
  }
}
</style>
