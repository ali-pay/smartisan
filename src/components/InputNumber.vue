<template>
  <div class="sm-input-number">
    <i :class="minusClass" :style="imgSts" @click="handleMinus" />
    <span class="number" :style="textSts">{{ newVal }}</span>
    <i :class="plusClass" :style="imgSts" @click="handlePlus" />
  </div>
</template>

<script>
export default {
  name: 'SmInputNumber',
  props: {
    // 计数值
    value: {
      type: Number,
      default: 1,
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
      newVal: this.value,
    };
  },
  computed: {
    minusClass() {
      const temp = ['minus'];
      if (this.newVal <= this.min) temp.push('disabled');
      return temp;
    },
    plusClass() {
      const temp = ['plus'];
      if (this.newVal >= this.max) temp.push('disabled');
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
      if (this.height) temp.width = `${this.height}px`;
      if (this.size) temp.fontSize = `${this.size}px`;
      return temp;
    },
  },
  watch: {
    newVal(val) {
      this.$emit('input', val);
    },
  },
  methods: {
    handleMinus() {
      this.newVal--;
      this.$emit('minus', this.newVal);
    },
    handlePlus() {
      this.newVal++;
      this.$emit('plus', this.newVal);
    },
  },
};
</script>

<style lang="less" scoped>
.sm-input-number {
  display: flex;
  align-items: center;
  justify-content: center;

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
    cursor: pointer;
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
