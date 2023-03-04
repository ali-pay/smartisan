<template>
  <div class="sm-slider">
    <div ref="slider" class="track">
      <div class="bar" :style="barSts"></div>
      <div class="thumb" :style="thumbSts" @mousedown="handleDrag" @touchstart="handleDrag">
        <div v-if="!popup" class="popup">{{ newVal }}%</div>
      </div>
    </div>
    <span v-if="ratio" class="ratio">{{ newVal }}%</span>
  </div>
</template>

<script>
export default {
  name: 'SmSlider',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    // 是否禁用
    disabled: Boolean,
    // 是否显示比例
    popup: Boolean,
    // 是否显示比例
    ratio: Boolean,
  },
  data() {
    return {
      newVal: this.value,
      oldVal: this.value,
      startX: 0,
      sliderSize: 0,
    };
  },
  computed: {
    barSts() {
      const temp = {};
      temp.width = `${this.newVal}%`;
      return temp;
    },
    thumbSts() {
      const temp = {};
      temp.left = `${this.newVal}%`;
      return temp;
    },
  },
  watch: {
    newVal(val) {
      this.$emit('input', val);
    },
  },
  methods: {
    handleDrag(event) {
      if (this.disabled) return;
      this.onDragStart(event);
      window.addEventListener('mousemove', this.onDragging);
      window.addEventListener('touchmove', this.onDragging);
      window.addEventListener('mouseup', this.onDragEnd);
      window.addEventListener('touchend', this.onDragEnd);
      window.addEventListener('contextmenu', this.onDragEnd);
    },
    onDragStart(event) {
      if (event.type === 'touchstart') {
        event.clientX = event.touches[0].clientX;
      }
      this.startX = event.clientX;
      this.oldVal = this.newVal;
      this.sliderSize = this.$refs.slider.clientWidth;
    },
    onDragging(event) {
      if (event.type === 'touchmove') {
        event.clientX = event.touches[0].clientX;
      }
      const currentX = event.clientX;
      const diff = ((currentX - this.startX) / this.sliderSize) * 100;
      this.newVal = parseInt(this.oldVal + diff, 10);
      if (this.newVal < 0) this.newVal = 0;
      if (this.newVal > 100) this.newVal = 100;
    },
    onDragEnd() {
      window.removeEventListener('mousemove', this.onDragging);
      window.removeEventListener('touchmove', this.onDragging);
      window.removeEventListener('mouseup', this.onDragEnd);
      window.removeEventListener('touchend', this.onDragEnd);
      window.removeEventListener('contextmenu', this.onDragEnd);
    },
  },
};
</script>

<style lang="less" scoped>
.sm-slider {
  display: flex;
  align-items: center;
  width: 100%;
  height: 1rem;
  padding: 0 1rem;

  .track {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 0.5rem;
    background: var(--color-gray);
    border-radius: var(--radius);

    .bar {
      height: 100%;
      background: linear-gradient(#8db4ff, #749eff);
      border-radius: var(--radius);
    }

    .thumb {
      position: absolute;
      width: 4rem;
      height: 4rem;
      cursor: pointer;
      background-image: url('@/assets/images/components/slider.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      transform: translateX(-50%);

      &:hover {
        .popup {
          visibility: visible;
        }
      }
    }

    .popup {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2rem;
      visibility: hidden;
      background: var(--color-white);
      border: var(--border);
      border-radius: var(--radius);
      transform: translateY(-100%);
    }
  }

  .ratio {
    width: 5rem;
    font-size: var(--font-size-l);
    color: var(--font-color-2);
    text-align: right;
  }
}
</style>
