<template>
  <div class="wrapper">
    <sm-box title="支付订单" class="payment">
      <div class="payment-wrapper">
        <div class="info">
          <p class="title">提交订单成功，请选择支付方式</p>
          <p class="tip">请在 <span class="red">2 小时内</span> 完成支付，超时订单将自动取消。</p>
        </div>
        <t-tabs v-model="tab">
          <t-tab-panel value="线上支付" label="线上支付">
            <ul class="platforms">
              <li class="platform" :class="{ active: platform === '支付宝' }" @click="platform = '支付宝'">
                <img src="@/assets/images/payment/alipay.png" />
              </li>
              <li class="platform" :class="{ active: platform === '微信支付' }" @click="platform = '微信支付'">
                <img src="@/assets/images/payment/wechat.png" />
              </li>
            </ul>
          </t-tab-panel>
          <t-tab-panel value="分期付款" label="分期付款">
            <ul class="platforms">
              <li class="platform active"><img src="@/assets/images/payment/huabei.png" /></li>
            </ul>
            <div class="detail">
              <sm-radio-group v-model="quota" class="quotas">
                <sm-radio v-for="(item, index) in quotas" :key="index" :title="item.title" class="quota">
                  {{ item.value }}
                </sm-radio>
              </sm-radio-group>
              <i />
              <img src="@/assets/images/payment/huabei-quota.png" />
            </div>
          </t-tab-panel>
        </t-tabs>
      </div>
      <div class="bar-wrapper">
        <div class="prices">
          <span class="tip">合计：</span><span class="price"><i>¥</i>{{ order.price.toFixed(2) }}</span>
        </div>
        <sm-button color="red" :width="120" :height="35" :size="14" @click="submit">立即支付</sm-button>
      </div>
    </sm-box>
  </div>
</template>

<script>
export default {
  name: 'Payment',
  data() {
    return {
      tab: '线上支付',
      platform: '微信支付',
      quota: 3,
    };
  },
  computed: {
    order() {
      return this.$route.params.order;
    },
    quotas() {
      return [
        {
          title: 3,
          value: '3 期，每期金额约为 ¥43.99 ，每期花呗收取手续费约为 ¥0.99 ，费率 2.3%',
        },
        {
          title: 6,
          value: '6 期，每期金额约为 ¥22.47 ，每期花呗收取手续费约为 ¥0.97 ，费率 4.5%',
        },
        {
          title: 9,
          value: '12 期，每期金额约为 ¥11.56 ，每期花呗收取手续费约为 ¥0.81 ，费率 7.5%',
        },
      ];
    },
  },
  methods: {
    submit() {
      console.log('submit');
    },
  },
};
</script>

<style lang="less" scoped>
.payment {
  .payment-wrapper {
    padding: 3rem;

    .info {
      padding: 3rem 0;
      text-align: center;

      .title {
        font-size: var(--font-size-xxxxxl);
        color: var(--font-color-2);
      }

      .tip {
        margin-top: 2rem;
        font-size: var(--font-size-xxxl);

        .red {
          font-weight: bold;
          color: var(--color-red);
        }
      }
    }

    .platforms {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;

      .platform {
        width: 15rem;
        height: 5rem;
        padding: 1rem;
        cursor: pointer;
        border: 2px solid var(--color-border);
        border-radius: var(--radius-l);

        &.active {
          border-color: var(--color-active);
        }
      }
    }

    .detail {
      display: flex;
      justify-content: space-between;
      padding: 2rem;
      margin-top: 2rem;
      border: var(--border);
      border-radius: var(--radius-l);

      .quotas {
        display: flex;
        flex-direction: column;
        min-width: 50%;

        .quota {
          flex: 1;
          color: var(--font-color-2);
          cursor: pointer;

          &.active {
            font-weight: bold;
          }

          &:not(:last-child) {
            border-bottom: var(--border-dashed);
          }
        }
      }

      i {
        border-left: var(--border);
      }

      img {
        width: 40%;
      }
    }
  }

  .bar-wrapper {
    display: flex;
    gap: 2rem;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 1rem;
    background: var(--color-hover);
    border-top: var(--border);

    .prices {
      .tip {
        font-size: var(--font-size-xl);
        font-weight: bold;
        color: var(--font-color-2);
      }

      .price {
        font-family: SmartisanMaquette;
        font-size: var(--font-size-xxxxl);
        font-weight: 900;
        color: var(--color-red);

        i {
          margin-right: 0.2rem;
          font-size: var(--font-size-xl);
        }
      }
    }
  }
}
</style>
