<template>
  <div class="sm-input-number">
    <a :class="minusClass" :style="imgSts" @click="value--"></a>
    <p class="number" :style="numSts">{{ value }}</p>
    <a :class="plusClass" :style="imgSts" @click="value++"></a>
  </div>
</template>

<script>
export default {
  name: 'SmInputNumber',
  props: {
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
    // 最小值
    min: {
      type: Number,
      default: 1,
    },
    // 最大值
    max: {
      type: Number,
      default: 999,
    },
  },
  data() {
    return {
      // 计数值
      value: 1,
    };
  },
  computed: {
    minusClass() {
      const temp = ['minus'];
      if (this.value <= this.min) temp.push('disabled');
      return temp;
    },
    plusClass() {
      const temp = ['plus'];
      if (this.value >= this.max) temp.push('disabled');
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
    numSts() {
      const temp = {};
      if (this.height) temp.width = `${this.height}px`;
      if (this.size) temp.fontSize = `${this.size}px`;
      return temp;
    },
  },
  watch: {
    value(val) {
      this.$emit('input', val);
    },
  },
};
</script>

<style lang="less" scoped>
.sm-input-number {
  display: flex;
  align-items: center;

  .number {
    width: 3.5rem;
    font-size: 1.3rem;
    font-weight: bold;
    text-align: center;
  }

  .minus,
  .plus {
    width: 3.5rem;
    height: 3.5rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .minus {
    background-image: url('@/assets/images/components/btn-minus.png');

    &:active {
      background-image: url('@/assets/images/components/btn-minus-active.png');
    }
  }

  .plus {
    background-image: url('@/assets/images/components/btn-plus.png');

    &:active {
      background-image: url('@/assets/images/components/btn-plus-active.png');
    }
  }
}
</style>
