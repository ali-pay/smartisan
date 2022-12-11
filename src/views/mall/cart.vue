<template>
  <div id="cart" class="wrapper">
    <sm-box title="购物车">
      <div v-if="!products.length" class="empty">
        <img
          src="https://static.smartisanos.cn/index/assets/images/cart-empty@2x.f25b2c8c8168313d570820fe359998c5.png"
        />
        <p class="title">您的购物车中还没有商品</p>
        <sm-button :width="160" :height="50" :size="14" color="gray" to="/mall">现在选购</sm-button>
      </div>
      <div v-else>
        <div class="header">
          <div class="left">
            <span class="title">商品信息</span>
          </div>
          <div class="right">
            <span class="price">单价</span>
            <span class="quantity">数量</span>
            <span class="subtotal">小计</span>
            <span class="operation">操作</span>
          </div>
        </div>
        <div class="body">
          <sm-checkbox-group v-model="selSkus">
            <ul>
              <li v-for="(item, index) in products" :key="index" class="item">
                <div class="left">
                  <i class="checkbox" />
                  <sm-checkbox :title="item.sku.id" hide-title />
                  <img :src="item.sku.image" />
                  <div class="info">
                    <router-link class="title" :to="`/mall/item/${item.sku.id}`">{{ item.sku.title }}</router-link>
                    <ul class="specs">
                      <li v-for="(spec, specIndex) in item.sku.specs" :key="specIndex" class="spec">
                        {{ spec.value }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="right">
                  <div class="price">¥ {{ item.sku.price.toFixed(2) }}</div>
                  <div class="quantity"><sm-input-number v-model="item.quantity" /></div>
                  <div class="subtotal">
                    <p>¥ {{ ((item.sku?.discount || item.sku?.price) * item.quantity).toFixed(2) }}</p>
                    <p v-if="item.sku.discount" class="discount">
                      已优惠 ¥{{ ((item.sku.price - item.sku.discount) * item.quantity).toFixed(2) }}
                    </p>
                  </div>
                  <div class="operation"><i class="btn-delete" @click="deleteFromCart(item.sku.id)" /></div>
                </div>
              </li>
            </ul>
          </sm-checkbox-group>
        </div>
        <div :class="{ fixed: fixed }" class="footer">
          <div class="left">
            <sm-checkbox v-model="selAllSku" title="全选" />
            <span class="delete" @click="deleteFromCart()">删除选中的商品</span>
          </div>
          <div class="right">
            <div class="total-quantity">
              <p>
                已选中
                <span class="red">{{ skuQuantity }}</span>
                款商品
              </p>
              <p>
                共计
                <span>{{ totalQuantity }}</span>
                件商品
              </p>
            </div>
            <div class="total-price">
              <p>
                应付总额：<span class="red"><i>¥</i>{{ totalPrice }}</span>
              </p>
              <p>
                优惠总额：<span><i>¥</i>{{ totalDiscount }}</span>
              </p>
            </div>
            <sm-button :width="120" :height="40" :size="14">立即购买</sm-button>
          </div>
        </div>
      </div>
    </sm-box>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      fixed: true,
      el: null,
      offsetTop: 0,
      // 选中的skuid
      selSkus: [],
      // 是否全选
      selAllSku: true,
    };
  },
  computed: {
    products() {
      return this.$store.state.user.cart;
    },
    // 总款数
    skuQuantity() {
      return this.selSkus.length;
    },
    // 总件数
    totalQuantity() {
      const products = this.products.filter((item) => this.selSkus.includes(item.sku.id));
      return products.reduce((total, item) => total + item.quantity, 0);
    },
    // 应付总额
    totalPrice() {
      const products = this.products.filter((item) => this.selSkus.includes(item.sku.id));
      return products.reduce((total, item) => total + item.quantity * (item.sku.discount || item.sku.price), 0);
    },
    // 优惠总额
    totalDiscount() {
      const products = this.products.filter((item) => this.selSkus.includes(item.sku.id) && item.sku.discount);
      return products.reduce((total, item) => total + item.quantity * (item.sku.price - item.sku.discount), 0);
    },
  },
  watch: {
    selAllSku: {
      immediate: true,
      handler(val) {
        if (!val) this.selSkus = [];
        else this.selSkus = this.products.map((item) => item.sku.id);
      },
    },
  },
  mounted() {
    // 监听滚动事件
    this.recalc();
  },
  methods: {
    // 从购物车删除
    deleteFromCart(skuId) {
      let skuIds = [];
      if (skuId) skuIds.push(skuId);
      else skuIds = this.selSkus;
      this.$store.dispatch('user/deleteFromCart', { skuIds });
      this.selSkus = this.selSkus.filter((item) => !skuIds.includes(item));
      this.recalc();
    },
    // 滚动事件
    handleScroll() {
      this.fixed = this.el.clientHeight + this.el.scrollTop <= this.offsetTop;
    },
    // 重新计算购物车高度
    recalc() {
      this.$nextTick(() => {
        this.el = document.documentElement;
        const cart = document.querySelector('#cart');
        this.offsetTop = cart.clientHeight + cart.offsetTop;
        window.addEventListener('scroll', this.handleScroll);
        this.handleScroll();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.empty {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  padding: 5rem;

  .title {
    font-size: var(--font-size-l);
  }
}

.left {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 3rem;
}

.right {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 3rem;
}

.price,
.quantity,
.subtotal,
.operation {
  width: 13rem;
  text-align: center;
}

.operation {
  width: 5rem;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  font-weight: bold;
  background: var(--color-gray);
  border-bottom: var(--border);
}

.body {
  padding-bottom: 6.5rem;

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 0;
    border-bottom: 1px dashed var(--color-border);

    &:last-child {
      border-bottom: none;
    }

    .left {
      img {
        width: 6.5rem;
        height: 6.5rem;
        margin: 0 2rem;
        border: 1px solid var(--color-gray);
        border-radius: var(--radius);
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
          font-size: var(--font-size-xl);
          font-weight: bold;
          color: var(--font-color-2);

          &:hover {
            color: var(--color-blue);
          }
        }

        .specs {
          display: flex;

          .spec {
            padding-right: 1rem;
            margin-top: 1rem;
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
      .price {
        font-family: SmartisanMaquette;
        font-size: var(--font-size-l);
        font-weight: 900;
      }

      .subtotal {
        font-family: SmartisanMaquette;
        font-size: var(--font-size-l);
        font-weight: 900;
        color: var(--font-color-2);

        .discount {
          margin-top: 0.5rem;
          font-size: var(--font-size);
          color: var(--color-red);
        }
      }

      .operation {
        .btn-delete {
          display: block;
          width: 3.5rem;
          height: 3.5rem;
          margin: 0 auto;
          cursor: pointer;
          background-image: url('@/assets/images/components/btn-delete.png');
          background-repeat: no-repeat;
          background-size: contain;

          // &:hover,
          &:active {
            background-image: url('@/assets/images/components/btn-delete-active.png');
          }
        }
      }
    }
  }
}

.footer {
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 6.5rem;
  font-weight: bold;
  color: var(--font-color-2);
  background: var(--color-linear);
  border-top: var(--border);
  box-shadow: var(--shadow-bar);

  &.fixed {
    position: fixed;
    // bottom: 0;
    width: calc(var(--width) - 2px);
  }

  .left {
    .delete {
      padding-left: 1rem;
      margin-left: 1rem;
      cursor: pointer;
      border-left: var(--border);
    }
  }

  .right {
    font-family: SmartisanMaquette;

    .total-quantity {
      font-weight: 900;
      line-height: 1.5rem;
      text-align: right;
    }

    .total-price {
      padding-left: 2rem;
      margin-right: 2rem;
      margin-left: 2rem;
      font-weight: 900;
      line-height: 1.5rem;
      border-left: var(--border);
    }

    span {
      font-size: var(--font-size-l);
    }

    i {
      font-size: var(--font-size);
    }

    .red {
      font-size: var(--font-size-xxl);
      color: var(--color-red);
    }
  }
}
</style>
