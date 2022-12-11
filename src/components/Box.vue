<template>
  <div class="sm-box">
    <div v-if="title" class="sm-box-header">
      <span class="title">{{ title }}</span>
      <a v-if="buttonText" :href="buttonLink" class="button" target="_blank">
        <span>{{ buttonText }}</span>
        <i class="smartisan-icon gt" />
      </a>
      <div v-if="pageTotal" class="pagination">
        <i :class="leftClass" @click="pageCurrent--" />
        <i :class="rightClass" @click="pageCurrent++" />
      </div>
    </div>
    <div class="sm-box-body">
      <!-- 内容 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmBox',
  props: {
    // 标题
    title: {
      type: String,
      default: null,
    },
    // 按钮的文字
    buttonText: {
      type: String,
      default: null,
    },
    // 按钮的链接
    buttonLink: {
      type: String,
      default: null,
    },
    // 分页器的总页数
    pageTotal: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // 分页器的当前页数
      pageCurrent: 1,
    };
  },
  computed: {
    leftClass() {
      const temp = ['left'];
      if (this.pageCurrent <= 1) temp.push('disabled');
      return temp;
    },
    rightClass() {
      const temp = ['right'];
      if (this.pageCurrent >= this.pageTotal) temp.push('disabled');
      return temp;
    },
  },
  watch: {
    pageCurrent(val) {
      this.$emit('page-change', val);
    },
  },
};
</script>

<style lang="less" scoped>
.sm-box {
  position: relative;
  box-sizing: border-box;
  margin: 2.5rem auto;
  overflow: hidden;
  background: var(--color-white);
  border: var(--border);
  border-radius: var(--radius-xl);

  .sm-box-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 5rem;
    padding: 0 2rem;
    background: var(--color-linear);
    border-bottom: var(--border);

    .title {
      font-size: var(--font-size-xxl);
      font-weight: bold;
    }

    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 3rem;
      padding: 0 2rem;
      font-weight: bold;
      color: var(--color-blue);
      background: var(--color-linear);
      border: var(--border);
      border-radius: var(--radius);

      &:hover {
        background: var(--color-hover);
      }

      &:active {
        background: var(--color-gray);
      }
    }

    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;

      .left,
      .right {
        width: 4.5rem;
        height: 4.5rem;
        cursor: pointer;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }

      .left {
        background-image: url('@/assets/images/components/btn-left.png');

        &:active {
          background-image: url('@/assets/images/components/btn-left-active.png');
        }
      }

      .right {
        background-image: url('@/assets/images/components/btn-right.png');

        &:active {
          background-image: url('@/assets/images/components/btn-right-active.png');
        }
      }
    }
  }

  .sm-box-body {
    padding: 0;
  }
}
</style>
