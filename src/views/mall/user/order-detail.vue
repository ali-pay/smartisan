<template>
  <sm-box :title="`订单号：${order.id}`">
    <div class="timeline">
      <sm-timeline v-model="timeline" ratio />
    </div>
    <div class="container">
      <div class="header">
        <div class="left">
          <span class="title">商品信息</span>
        </div>
        <div class="right">
          <span class="price">单价</span>
          <span class="quantity">数量</span>
          <span class="subtotal">小计</span>
        </div>
      </div>
      <div class="body">
        <ul>
          <li v-for="item in order.products" :key="item.sku.id" class="item">
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
              <div class="subtotal">
                <p>¥ {{ (item.sku.price * item.quantity).toFixed(2) }}</p>
                <p v-if="item.sku.cost !== item.sku.price" class="discount">
                  已优惠 ¥{{ ((item.sku.cost - item.sku.price) * item.quantity).toFixed(2) }}
                </p>
              </div>
            </div>
          </li>
        </ul>
        <div class="total">
          <p class="total-cost">商品总计：¥{{ order.cost.toFixed(2) }}</p>
          <p class="total-fedex">运费：¥{{ order.fedex.toFixed(2) }}</p>
          <p class="total-price">
            应付金额：<span>¥{{ order.price.toFixed(2) }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="header">
        <div class="left">
          <span class="title">收货信息</span>
        </div>
      </div>
      <div class="body">
        <div class="left">
          <div class="address">
            <p>姓名：{{ order.address.name }}</p>
            <p>联系电话：{{ order.address.mobile }}</p>
            <p>详细地址： {{ `${order.address.path.join(' ')} ${order.address.address}` }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="header">
        <div class="left">
          <span class="title">发票信息</span>
        </div>
      </div>
      <div class="body">
        <div class="left">
          <div class="invoice">
            <p>发票类型：电子发票</p>
            <p v-if="order.invoice.title">发票抬头：{{ order.invoice.title }}</p>
            <p v-if="order.invoice.name">单位名称：{{ order.invoice.name }}</p>
            <p v-if="order.invoice.code">纳税人识别号：{{ order.invoice.code }}</p>
            <p>发票内容：购买商品明细</p>
          </div>
        </div>
      </div>
    </div>
  </sm-box>
</template>

<script>
export default {
  name: 'OrderDetail',
  computed: {
    order() {
      return this.$route.params.order;
    },
    timeline() {
      return [
        { time: '2023-01-16 21:00', title: '下单下单' },
        { time: '2023-01-16 21:01', title: '付款付款' },
        { time: '2023-01-16 21:02', title: '发货发货' },
        { title: '关闭订单' },
      ];
    },
  },
};
</script>

<style lang="less" scoped>
.container:not(:first-child) {
  border-top: var(--border);
}

.timeline {
  padding: 2rem;
}

.total {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-end;
  padding: 2rem;
  font-family: SmartisanMaquette;
  color: var(--font-color-2);
  border-top: var(--border);

  .total-cost {
    font-size: var(--font-size-xl);
  }

  .total-fedex {
    font-size: var(--font-size-xl);
  }

  .total-price {
    font-size: var(--font-size-xxl);
    font-weight: 900;

    span {
      color: var(--color-red);
    }
  }
}

.address,
.invoice {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  font-size: var(--font-size-l);
  color: var(--font-color-2);
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
  // display: flex;
  // align-items: center;
  // justify-content: center;
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
    padding: 1.5rem 0;

    &:not(:last-child) {
      border-bottom: var(--border-dashed);
    }

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
