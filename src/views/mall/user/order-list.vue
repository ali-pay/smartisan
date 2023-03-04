<template>
  <sm-box title="订单列表">
    <div v-if="!orders.length" class="empty">
      <img src="@/assets/images/cart/empty.png" />
      <p class="title">您还没有此类订单</p>
      <sm-button :width="160" :height="50" :size="14" color="gray" to="/mall">现在选购</sm-button>
    </div>
    <div v-else>
      <transition-group tag="ul" name="group" appear>
        <li v-for="order in orders" :key="order.id" class="container">
          <div class="header">
            <div class="left">
              <span class="title">{{ order.datetime }}</span>
              <span class="title">订单号：{{ order.id }}</span>
            </div>
            <div class="right">
              <span class="price">单价</span>
              <span class="quantity">数量</span>
              <span class="subtotal">付款总额</span>
              <span class="operation" @click="deleteOrder(order)">{{ order.status }}</span>
            </div>
          </div>
          <div class="body">
            <ul>
              <li v-for="(item, index) in order.products" :key="item.sku.id" class="item">
                <div class="left">
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
                  <div class="quantity">{{ item.quantity }}</div>
                  <i class="line" />
                  <div class="subtotal">
                    <p v-if="index === 0">¥ {{ order.price.toFixed(2) }}</p>
                  </div>
                  <div class="operation">
                    <sm-button v-if="index === 0" :width="100" :height="30" color="gray" @click="gotoDetail(order)">
                      查看详情
                    </sm-button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </transition-group>
    </div>
  </sm-box>
</template>

<script>
export default {
  name: 'OrderList',
  computed: {
    orders() {
      return this.$store.state.order.orders;
    },
  },
  methods: {
    // 查看详情
    gotoDetail(order) {
      this.$router.push({ name: 'OrderDetail', params: { order } });
    },
    // 删除订单
    deleteOrder(order) {
      this.$danger('警告', '确认删除？').then(() => {
        this.$store.dispatch('order/deleteOrder', [order.id]);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.group-move {
  transition: all 0.3s;
}

.group-leave-active {
  position: absolute;
  opacity: 0;
}

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

.container:not(:first-child) {
  border-top: var(--border);
}

.left {
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-left: 3rem;
}

.right {
  display: flex;
  align-items: center;
  margin-right: 3rem;
}

.price,
.quantity,
.subtotal,
.operation {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  text-align: center;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  font-weight: bold;
  background: var(--color-gray);
  border-bottom: var(--border);

  .operation {
    color: var(--font-color-2);
  }
}

.body {
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // padding: 1.5rem 0;

    // &:not(:last-child) {
    //   border-bottom: var(--border-dashed);
    // }

    .left {
      img {
        width: 6.5rem;
        height: 6.5rem;
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
            margin-top: 1rem;
            color: var(--font-color-1);

            &:not(:last-child) {
              padding-right: 1rem;
              margin-right: 1rem;
              border-right: var(--border);
            }
          }
        }
      }
    }

    .right {
      .quantity,
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

      .line {
        height: 8rem;
        border-left: var(--border);
      }
    }
  }
}
</style>
