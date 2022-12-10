<template>
  <i
    :class="{ active: visible }"
    :style="{ right: styleRight, bottom: styleBottom }"
    class="sm-backtop"
    @click="handleClick"
  />
</template>

<script>
// 源码：https://github.com/ElemeFE/element/blob/dev/packages/backtop/src/main.vue
import _ from 'lodash';

const cubic = (value) => value ** 3;
const easeInOutCubic = (value) => (value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2);

export default {
  name: 'SmBacktop',
  props: {
    visibilityHeight: {
      type: Number,
      default: 200,
    },
    target: {
      type: [String],
      default: null,
    },
    right: {
      type: Number,
      default: 40,
    },
    bottom: {
      type: Number,
      default: 60,
    },
  },
  data() {
    return {
      el: null,
      container: null,
      visible: false,
    };
  },
  computed: {
    styleBottom() {
      return `${this.bottom}px`;
    },
    styleRight() {
      return `${this.right}px`;
    },
  },
  mounted() {
    this.init();
    this.throttledScrollHandler = _.throttle(this.onScroll, 300);
    this.container.addEventListener('scroll', this.throttledScrollHandler);
  },
  beforeDestroy() {
    this.container.removeEventListener('scroll', this.throttledScrollHandler);
  },
  methods: {
    init() {
      this.container = document;
      this.el = document.documentElement;
      if (this.target) {
        this.el = document.querySelector(this.target);
        if (!this.el) {
          throw new Error(`target is not existed: ${this.target}`);
        }
        this.container = this.el;
      }
    },
    onScroll() {
      const { scrollTop } = this.el;
      this.visible = scrollTop >= this.visibilityHeight;
    },
    handleClick(e) {
      this.scrollToTop();
      this.$emit('click', e);
    },
    scrollToTop() {
      const { el } = this;
      const beginTime = Date.now();
      const beginValue = el.scrollTop;
      const rAF = window.requestAnimationFrame || ((func) => setTimeout(func, 16));
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500;
        if (progress < 1) {
          el.scrollTop = beginValue * (1 - easeInOutCubic(progress));
          rAF(frameFunc);
        } else {
          el.scrollTop = 0;
        }
      };
      rAF(frameFunc);
    },
  },
};
</script>

<style lang="less" scoped>
.sm-backtop {
  position: fixed;
  width: 5rem;
  height: 5rem;
  cursor: pointer;
  background-image: url('@/assets/images/components/backtop.png');
  background-repeat: no-repeat;
  background-size: contain;
  transition: all 0.3s;
  transform: translateY(150px);

  &.active {
    transform: translateY(0);
  }
}
</style>
