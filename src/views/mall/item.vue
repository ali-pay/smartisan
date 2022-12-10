<template>
  <sm-loading :loading="loading" title="加载中" center>
    <div v-if="spu" class="wrapper">
      <sm-box>
        <div class="item-wrapper">
          <div class="image-wrapper">
            <div class="thumbs-wrapper">
              <img
                v-for="(item, index) in sku.images"
                :key="index"
                :class="{ active: imgIndex === index }"
                :src="item"
                @mouseenter="imgIndex = index"
              />
            </div>
            <div class="gallery-wrapper">
              <img :src="sku.images[imgIndex]" />
            </div>
          </div>
          <div class="detail-wrapper">
            <div class="info">
              <div>
                <p class="title">{{ spu.title }}</p>
                <p class="desc">{{ spu.desc }}</p>
              </div>
              <div class="prices">
                <p class="discount"><i>¥</i>{{ sku?.discount?.toFixed(2) || sku?.price?.toFixed(2) }}</p>
                <p v-if="sku.discount" class="price">原价：¥{{ sku?.price?.toFixed(2) }}</p>
              </div>
            </div>
            <ul class="specs">
              <template v-for="(v, k, i) in specs">
                <!-- TODO template不能加key，先把key加在这里 -->
                <li :key="i + 1000" class="spec" :class="k.includes('颜色') ? 'colors' : 'models'">
                  <p class="title">{{ k }}选择</p>
                  <ul class="list">
                    <li
                      v-for="(item, index) in v"
                      :key="index"
                      :class="[{ active: item.active }, { disabled: item.disabled }]"
                      class="item"
                      @click="clickSpecs(k, item)"
                    >
                      <img v-if="item.image" :src="item.image" class="img" />
                      <div v-else-if="item.hex" :style="{ background: item.hex }" class="img"></div>
                      <span v-else>{{ item.value }}</span>
                    </li>
                  </ul>
                </li>
                <!-- TODO template不能加key，先把key加在这里 -->
                <li :key="i + 2000" class="spec line-dashed"></li>
              </template>
              <li class="spec quantity">
                <p class="title">数量选择</p>
                <ul class="list">
                  <li class="item"><sm-input-number v-model="quantity"></sm-input-number></li>
                </ul>
              </li>
              <li class="spec line-solid"></li>
              <li v-if="sku?.tips?.length" class="spec tips">
                <p class="title">服务说明</p>
                <ul class="list">
                  <li v-for="(item, index) in sku.tips" :key="index" class="item">{{ item }}</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </sm-box>
      <sm-box title="产品信息">
        <img :src="sku.image_pc" class="image-pc" @load="loadImage()" />
      </sm-box>
    </div>
    <div v-if="spu" :class="{ fixed: fixed }" class="bar-wrapper">
      <div class="container">
        <div class="left">
          <p class="tip">您已选择：</p>
          <div class="info">
            <p class="title">{{ spu.title }} × {{ quantity }}</p>
            <ul class="specs">
              <li v-for="(item, index) in selSpecs" :key="index" class="spec">{{ item.value }}</li>
            </ul>
          </div>
        </div>
        <div class="right">
          <div class="prices">
            <p class="discount"><i>¥</i>{{ ((sku?.discount || sku?.price) * quantity).toFixed(2) }}</p>
            <p v-if="sku.discount" class="price">原价：¥{{ (sku.price * quantity).toFixed(2) }}</p>
          </div>
          <sm-button :width="120" :height="35" :size="14" color="gray">加入购物车</sm-button>
          <sm-button :width="120" :height="35" :size="14">立即购买</sm-button>
        </div>
      </div>
    </div>
  </sm-loading>
</template>

<script>
import _ from 'lodash';
import jianguo3 from '@/config/jianguo3';
import earphone from '@/config/earphone';
import phoneCase from '@/config/phone-case';

export default {
  name: 'Item',
  data() {
    return {
      spu: null,
      sku: null,
      imgIndex: 0,
      quantity: 1,
      specs: null,
      selSpecs: [],
      loading: true,
      fixed: true,
      el: null,
      offsetTop: 0,
    };
  },
  mounted() {
    // 根据路由匹配sku
    if (this.$route.params.id.includes(jianguo3.spu.id)) this.spu = jianguo3.spu;
    if (this.$route.params.id.includes(earphone.spu.id)) this.spu = earphone.spu;
    if (this.$route.params.id.includes(phoneCase.spu.id)) this.spu = phoneCase.spu;
    this.sku = this.spu.skus.find((item) => item.id === this.$route.params.id);

    // 初始化spu的所有规格
    const temp = {};
    this.spu?.specs?.forEach((item) => {
      if (!temp[item.key]) temp[item.key] = [];
      temp[item.key].push({
        skus: item?.skus,
        value: item?.value,
        image: item?.image,
        hex: item?.hex,
        disabled: item.disabled || false,
        active: item.active || false,
      });
    });
    this.specs = temp;
  },
  methods: {
    // 当详情图加载完成后
    loadImage() {
      // 关闭loading
      this.loading = false;

      // 监听滚动事件
      this.$nextTick(() => {
        this.el = document.documentElement;
        this.offsetTop = document.querySelector('.sm-footer').offsetTop;
        this.offsetTop += document.querySelector('.bar-wrapper').clientHeight;
        window.addEventListener('scroll', this.handleScroll);
        this.handleScroll();
      });

      // 默认选择该sku的规格
      const keys = _.keys(this.specs);
      keys.forEach((key) => {
        const spec = this.specs[key].find((spec) => spec.skus.includes(this.sku.id));
        if (spec) this.clickSpecs(key, spec);
      });
    },
    // 选中规格
    clickSpecs(key, item) {
      // console.log('clickSpecs key:', key);
      // console.log('clickSpecs item:', item);
      const keys = _.keys(this.specs);
      keys.forEach((key) => {
        const spec = this.specs[key].find((spec) => spec.value === item.value);
        if (!spec) return;
        // 转换选中状态
        if (spec) spec.active = !spec.active;
        // 记录选中规格
        if (spec.active) this.selSpecs.push(spec);
        // 剔除其他规格
        else this.selSpecs = this.selSpecs.filter((item) => spec.key !== item.key || spec.value !== item.value);
      });

      // 对选中的所有规格的sku求交集，得到最小范围的sku
      let selSkus = this.selSpecs.map((item) => item.skus);
      selSkus = _.intersection(...selSkus);
      // console.log('selSkus:', selSkus);

      // 对未选中的规格做disabled处理
      keys.forEach((key) => {
        this.specs[key].forEach((spec) => {
          spec.disabled = false;
          if (!selSkus.length) return;
          // 判断该规格的sku是否在 最小范围的sku 内
          const exist = _.intersection(spec.skus, selSkus);
          if (!exist.length) spec.disabled = true;
        });
      });
      // console.log('this.selSpecs:', this.selSpecs);

      // 切换符合规格的sku
      if (selSkus.length && !selSkus.includes(this.sku.id)) {
        this.sku = this.spu.skus.find((item) => item.id === _.head(selSkus));
      }
    },
    // 滚动事件
    handleScroll() {
      this.fixed = this.el.clientHeight + this.el.scrollTop <= this.offsetTop;
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  .item-wrapper {
    display: flex;
    align-items: flex-start;
    padding: 5rem;

    .image-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      min-width: 50%;
      max-width: 50%;

      .thumbs-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        img {
          min-width: 6.5rem;
          max-width: 6.5rem;
          cursor: pointer;
          border: 3px solid var(--color-border);
          border-radius: var(--radius);

          &.active {
            border: 3px solid var(--color-active);
            transition: all 0.2s;
          }
        }
      }

      .gallery-wrapper {
        img {
          height: 35rem;
        }
      }
    }

    .detail-wrapper {
      min-width: 50%;
      max-width: 50%;

      .info {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;

        .title {
          font-size: var(--font-size-xxxxl);
          color: var(--font-color-3);
        }

        .desc {
          margin-top: 2rem;
          font-size: var(--font-size-l);
        }

        .prices {
          font-family: SmartisanMaquette;
          text-align: right;

          .discount {
            font-size: var(--font-size-xxxxl);
            font-weight: 900;
            color: var(--color-red);

            i {
              margin-right: 0.2rem;
              font-size: var(--font-size-xxl);
            }
          }

          .price {
            color: var(--font-color-0);
            text-decoration: line-through;
          }
        }
      }

      .specs {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding-top: 2rem;
        margin-top: 2rem;
        line-height: 2rem;
        border-top: var(--border);

        .spec {
          display: flex;

          .title {
            min-width: 15%;
            max-width: 15%;
          }

          .list {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            align-items: center;

            .item {
              cursor: pointer;
            }
          }
        }

        .line-dashed {
          margin-left: 15%;
          border-top: 1px dashed var(--color-border);
        }

        .line-solid {
          border-top: 1px solid var(--color-border);
        }

        .models {
          .item {
            padding: 0 1rem;
            font-weight: bold;
            border: 2px solid var(--color-border);
            border-radius: var(--radius);

            &.active {
              border-color: var(--color-active);
            }
          }
        }

        .colors {
          .list {
            gap: 2rem;
          }

          .item {
            width: 2rem;
            height: 2rem;
            padding: 3px;
            border: 2px solid var(--color-border);
            border-radius: 50%;

            &.active {
              border-color: var(--color-active);
            }

            .img {
              display: block;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }

        .quantity {
          align-items: center;

          .list .item {
            cursor: default;
          }
        }

        .tips {
          .list {
            display: block;

            .item {
              list-style-type: initial;
              cursor: default;
            }
          }
        }
      }
    }
  }

  .image-pc {
    width: 100%;
  }
}

.bar-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: var(--width);
  padding: 1rem 0;
  background: var(--color-hover);
  border-top: var(--border);
  box-shadow: var(--shadow-bar);

  &.fixed {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .container {
    display: flex;
    justify-content: space-between;
    width: var(--width);

    .left {
      display: flex;
      gap: 1rem;

      .tip {
        color: var(--font-color-2);
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
          font-size: var(--font-size-l);
          font-weight: bold;
          color: var(--font-color-2);
        }

        .specs {
          display: flex;

          .spec {
            padding-right: 1rem;
            margin-right: 1rem;
            color: var(--font-color-1);
            border-right: var(--border);

            &:last-child {
              padding-right: 0;
              margin-right: 0;
              border-right: none;
            }
          }
        }
      }
    }

    .right {
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: center;

      .prices {
        font-family: SmartisanMaquette;
        text-align: right;

        .discount {
          font-size: var(--font-size-xxxl);
          font-weight: 900;
          color: var(--color-red);

          i {
            margin-right: 0.2rem;
            font-size: var(--font-size-xl);
          }
        }

        .price {
          color: var(--font-color-0);
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>
