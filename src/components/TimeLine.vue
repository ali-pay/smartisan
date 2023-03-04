<template>
  <div class="sm-timeline">
    <div class="titles">
      <div v-for="item in value" :key="item.title" class="title" :class="{ active: active(item.title) }">
        {{ item.title }}
      </div>
    </div>
    <div class="sm-slider">
      <div ref="slider" class="track">
        <div class="bar" :style="barSts"></div>
        <div class="thumb" :style="thumbSts"></div>
      </div>
    </div>
    <div class="times">
      <div v-for="item in value" :key="item.time" class="time">
        {{ item.time }}
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'SmTimeline',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    barSts() {
      const index = _.findLastIndex(this.value, (item) => item.time);
      let ratio = (100 / (this.value.length - 1)) * index;
      ratio = parseInt(ratio, 10);
      let str = ratio.toString();
      const num = str.substring(str.length - 1);
      const last = parseInt(num, 10);
      if (last > 5) str = `${str.substring(0, str.length - 1)}5`;
      else str = `${str.substring(0, str.length - 1)}0`;
      const temp = {};
      temp.width = `${str}%`;
      return temp;
    },
    thumbSts() {
      const index = _.findLastIndex(this.value, (item) => item.time);
      let ratio = (100 / (this.value.length - 1)) * index;
      ratio = parseInt(ratio, 10);
      let str = ratio.toString();
      const num = str.substring(str.length - 1);
      const last = parseInt(num, 10);
      if (last > 5) str = `${str.substring(0, str.length - 1)}5`;
      else str = `${str.substring(0, str.length - 1)}0`;
      const temp = {};
      temp.left = `${ratio}%`;
      return temp;
    },
  },
  methods: {
    // 判断最新的时间，为其标题添加active样式
    active(title) {
      const last = _.findLast(this.value, (item) => item.time);
      return last.title === title;
    },
  },
};
</script>

<style lang="less" scoped>
.sm-timeline {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  // align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 2rem;

  .times,
  .titles {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    color: var(--font-color-2);
    text-align: center;

    .time,
    .title {
      width: 6rem;
      line-height: 1.5rem;
    }

    .title {
      font-size: var(--font-size-l);

      &.active {
        font-weight: bold;
        color: var(--font-color-2);
      }
    }
  }

  .sm-slider {
    display: flex;
    align-items: center;
    width: 100%;
    height: 2rem;
    // padding: 0 2rem;

    .track {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: 1rem;
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
      }
    }
  }
}
</style>
