<template>
  <div class="header-cart">
    <a class="icon" href="/cart"><i v-if="products?.length" class="red-dot"></i></a>
    <div class="container">
      <div class="list">
        <div v-if="!products" class="loading"></div>
        <div v-else-if="!products.length" class="empty">
          <p class="title">购物车为空</p>
          <p class="desc">您还没有选购任何商品，现在前往商城选购吧！</p>
        </div>
        <div v-else>
          <ul class="items">
            <li v-for="(item, index) in products" :key="index" class="item">
              <div class="thumb">
                <span v-if="!item.sku.quantity">缺货</span>
                <img :src="item.sku.image" />
              </div>
              <div class="desc">
                <div class="title">
                  <a :href="`/mall/item/${item.sku.id}`">{{ item.sku.title }}</a>
                </div>
                <ul class="specs">
                  <li v-for="(spec, specIndex) in item.sku.specs" :key="specIndex" class="spec">{{ spec.value }}</li>
                </ul>
                <div class="price">
                  <span class="price-icon">¥</span>
                  <span class="price-num">{{ item.sku.price.toFixed(2) }}</span>
                  <span class="quantity">x {{ item.quantity }}</span>
                </div>
              </div>
              <i class="btn-delete" @click="deleteProduct(item)"></i>
            </li>
          </ul>
          <div class="total">
            <div>
              <p class="quantity">
                共 <span>{{ quantity }}</span> 件商品
              </p>
              <p class="price">
                合计：
                <span class="price-icon">¥</span>
                <span class="price-num">{{ price.toFixed(2) }}</span>
              </p>
            </div>
            <sm-button :width="120" :size="14">查看购物车</sm-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmHeaderCart',
  computed: {
    products() {
      return this.$store.state.user.cart;
    },
    quantity() {
      return this.products.reduce((total, item) => total + item.quantity, 0);
    },
    price() {
      return this.products.reduce((total, item) => total + item.quantity * item.sku.price, 0);
    },
  },
  methods: {
    deleteProduct(item) {
      console.log('item:', item);
    },
  },
};
</script>

<style lang="less" scoped>
.header-cart {
  margin-left: 2rem;

  .icon {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    background-image: var(--header-cart-image);
    background-size: contain;

    &:hover {
      // background-image: var(--header-cart-image-active);
      opacity: var(--opacity);
    }
  }

  .red-dot {
    .icon();

    position: absolute;
    top: -6px;
    right: -6px;
    background-image: url('@/assets/images/header-cart/red-dot.png');
    background-repeat: no-repeat;
  }

  &:hover .container {
    display: block;
  }

  .container {
    position: absolute;
    right: 0;
    display: none;
    padding-top: 1.5rem;
    overscroll-behavior: contain;
  }

  .list {
    width: 30rem;
    background: var(--color-white);
    border: var(--border);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-large);

    .loading {
      height: 10rem;
      background-image: url('@/assets/images/header-cart/loading.gif');
      background-repeat: no-repeat;
      background-position: center;
    }

    .empty {
      height: 20rem;
      padding-top: 12rem;
      text-align: center;
      background-image: url('@/assets/images/header-cart/empty.png');
      background-repeat: no-repeat;
      background-position: center;
      background-position-y: 35%;

      .title {
        margin-bottom: 1rem;
        font-size: var(--font-size-xxl);
      }
    }

    .items {
      max-height: 30rem;
      overflow: auto;
      // scroll-snap-type: y mandatory;

      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 10rem;
        padding: 1.5rem;
        overflow: hidden;
        border-top: var(--border-list);
        // scroll-snap-align: start;

        &:first-child {
          border-top: none;
          border-radius: var(--radius-xl) var(--radius-xl) 0 0;
        }

        &:hover {
          background-color: var(--color-hover);

          .btn-delete {
            visibility: visible;
          }
        }

        .btn-delete {
          width: 3.5rem;
          height: 3.5rem;
          cursor: pointer;
          visibility: hidden;
          background-image: url('@/assets/images/header-cart/btn-delete.png');
          background-repeat: no-repeat;
          background-size: contain;

          &:hover,
          &:active {
            background-image: url('@/assets/images/header-cart/btn-delete-active.png');
          }
        }

        .thumb {
          position: relative;

          img {
            width: 6.5rem;
            height: 6.5rem;
            border: var(--border-list);
            border-radius: var(--radius);
          }

          span {
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            height: 2rem;
            line-height: 2rem;
            color: var(--color-white);
            text-align: center;
            background: rgb(0 0 0 / 50%);
            border-radius: 0 0 var(--radius) var(--radius);
          }
        }

        .desc {
          width: 15rem;
          padding-left: 1rem;

          .title {
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: keep-all;
            white-space: nowrap;

            a {
              font-size: var(--font-size-l);
              font-weight: bold;
              color: var(--font-color-2);

              &:hover {
                color: var(--color-blue);
              }
            }
          }

          .specs {
            display: flex;
            margin: 1rem 0;

            .spec {
              padding-right: 0.5rem;
              margin-right: 0.5rem;
              border-right: var(--border-list);

              &:last-child {
                padding-right: 0;
                margin-right: 0;
                border-right: none;
              }
            }
          }

          .price {
            .price-icon,
            .price-num {
              font-family: SmartisanMaquette;
              font-weight: 900;
              color: var(--color-red);
            }

            .price-num {
              margin-right: 1rem;
              margin-left: 0.3rem;
              font-size: var(--font-size-l);
            }

            .quantity {
              font-weight: bold;
            }
          }
        }
      }
    }

    .total {
      display: flex;
      justify-content: space-between;
      padding: 1.5rem;
      background: var(--color-linear);
      border-top: var(--border-list);
      border-radius: 0 0 var(--radius-xl) var(--radius-xl);
      box-shadow: var(--shadow-bar);

      .quantity {
        span {
          margin: 0 0.5rem;
          font-family: SmartisanMaquette;
          font-size: var(--font-size-xl);
          font-weight: 900;
          color: var(--font-color-2);
        }
      }

      .price {
        margin-top: 0.5rem;

        .price-icon,
        .price-num {
          font-family: SmartisanMaquette;
          font-weight: 900;
          color: var(--color-red);
        }

        .price-num {
          margin-left: 0.5rem;
          font-size: var(--font-size-xl);
        }
      }
    }
  }
}
</style>
