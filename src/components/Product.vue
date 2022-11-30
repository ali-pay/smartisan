<template>
  <a v-if="sku" :href="sku.link" class="sm-product">
    <img :src="sku.image" />
    <p class="title">{{ sku.title }}</p>
    <p class="desc">{{ sku.desc }}</p>
    <ul class="colors">
      <li v-for="(item, index) in sku.skus" :key="index" class="color" @mouseenter="sku = item">
        <div v-if="sku.color" :class="{ active: item.id === sku.id }" class="border">
          <img v-if="item.color.image" :src="item.color.image" class="img" />
          <div v-else-if="item.color.hex" :style="{ background: item.color.hex }" class="img"></div>
        </div>
        <div v-else :style="{ height: '14px' }"></div>
      </li>
    </ul>
    <p class="prices">
      <span class="discount-icon">¥</span>
      <span class="discount-num">{{ sku?.discount?.toFixed(2) || sku?.price?.toFixed(2) }}</span>
      <span v-if="sku.discount" class="price">¥{{ sku?.price?.toFixed(2) }}</span>
    </p>
  </a>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'SmProduct',
  props: {
    // 商品spu
    spu: {
      type: Object,
      default: null,
      required: true,
    },
  },
  data() {
    return {
      // 商品sku
      sku: null,
    };
  },
  mounted() {
    if (!this.spu?.skus?.length) return;
    // 去除相同主图的数据
    const skus = _.uniqBy(_.cloneDeep(this.spu.skus), 'image');
    skus.forEach((sku) => {
      // 所有sku显示spu的标题
      sku.title = this.spu.title;
      // 详情页面
      sku.link = `/item/${sku.id}`;
      // 提取颜色
      sku.color = sku?.attrs?.find((attr) => attr.key === '颜色');
      // 将skus存到sku中，用以显示其他sku的数据
      sku.skus = skus;
    });
    // 默认显示第一个sku
    this.sku = _.head(skus);
  },
};
</script>

<style lang="less" scoped>
.sm-product {
  box-sizing: border-box;
  padding: 2.5rem;
  text-align: center;
  cursor: pointer;

  &:hover {
    box-shadow: var(--shadow-inset);

    .desc {
      color: var(--color-red);
    }
  }

  img {
    height: 18rem;
  }

  .title {
    margin-top: 1rem;
    overflow: hidden;
    font-size: var(--font-size-xl);
    font-weight: bold;
    color: var(--font-color-2);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .desc {
    margin-top: 1.5rem;
    color: var(--font-color-1);
  }

  .colors {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;

    .color {
      margin-right: 1rem;

      &:last-child {
        margin-right: 0;
      }

      .border {
        padding: 2px;
        border: var(--border);
        border-radius: 50%;

        &.active {
          border-color: var(--color-active);
        }
      }

      .img {
        display: list-item;
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
    }
  }

  .prices {
    margin-top: 1.5rem;
    font-family: SmartisanMaquette;

    .discount-icon,
    .discount-num {
      font-size: var(--font-size-xxl);
      font-weight: 900;
      color: var(--color-red);
    }

    .discount-icon {
      margin-right: 0.2rem;
      font-size: var(--font-size-l);
    }

    .price {
      margin-left: 0.5rem;
      font-size: var(--font-size);
      font-weight: normal;
      color: var(--font-color-0);
      text-decoration: line-through;
    }
  }
}
</style>
