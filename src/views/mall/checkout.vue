<template>
  <sm-loading :loading="loading" title="加载中" center>
    <div v-if="products" id="🧾" class="wrapper">
      <sm-box title="收货信息" class="addresses-box">
        <ul class="container">
          <li
            v-for="(item, index) in addresses"
            :key="index"
            class="item"
            :class="{ active: item.id === address?.id }"
            @click="address = item"
          >
            <p class="name">{{ item.name }}</p>
            <p class="mobile">{{ item.mobile }}</p>
            <p class="pcas">{{ `${item.path?.join(' / ')}` }}</p>
            <p class="address">{{ item.address }}</p>
            <div class="panel">
              <div class="operation" @click.stop="openAddressDialog(item)">修改</div>
              <div class="operation" @click.stop="deleteAddress(item)">删除</div>
            </div>
          </li>
          <li class="item add" @click="openAddressDialog()">
            <i class="smartisan-icon plus" />
            <p>使用新地址</p>
          </li>
        </ul>
      </sm-box>

      <sm-box title="购物清单" class="shoplist-box">
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
            <li v-for="item in products" :key="item.sku.id" class="item">
              <div class="left">
                <img :src="item.sku.image" @load="loadImage()" />
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
        </div>
      </sm-box>

      <sm-box title="发票信息" class="invoice-box">
        <ul class="container">
          <li class="item"><span class="title">发票类型：</span>电子发票<i class="smartisan-icon info-circle" /></li>
          <li class="item">
            <span class="title">发票抬头：</span>
            <div class="info">
              <sm-form v-model="invoice" :width="300">
                <sm-form-item>
                  <sm-radio-group v-model="invoice.title">
                    <sm-radio title="个人" />
                    <sm-radio title="单位" />
                  </sm-radio-group>
                </sm-form-item>
                <sm-form-item v-show="invoice.title === '单位'">
                  <sm-input v-model="invoice.name" color="red" tip="必填项" placeholder="单位名称" />
                </sm-form-item>
                <sm-form-item v-show="invoice.title === '单位'">
                  <sm-input v-model="invoice.code" color="red" tip="必填项" placeholder="纳税人识别号" />
                </sm-form-item>
              </sm-form>
            </div>
          </li>
          <li class="item"><span class="title">发票内容：</span>购买商品明细</li>
          <li class="tip">电子发票是税务局认可的有效付款凭证，可作为售后服务凭据，电子发票打印后可以用于企业报销。</li>
        </ul>
      </sm-box>

      <sm-box title="优惠券" class="coupon-box">
        <div class="container">
          <div class="empty">
            <i />
            <p>暂无优惠券</p>
          </div>
        </div>
      </sm-box>
    </div>

    <div v-if="products" :class="{ fixed: fixed }" class="bar-wrapper">
      <div class="container">
        <div class="left">
          <div class="info">
            <p class="title">商品款数</p>
            <p class="quantity">{{ totalSKU }}</p>
          </div>
          <div class="info">
            <p class="title">商品件数</p>
            <p class="quantity">{{ totalQuantity }}</p>
          </div>
          <div class="info">
            <p class="title">商品总价</p>
            <p class="price">¥ {{ totalCost.toFixed(2) }}</p>
          </div>
          <div class="info">
            <p class="title">活动优惠</p>
            <p class="price">- ¥ {{ totalDiscount.toFixed(2) }}</p>
          </div>
          <div class="info">
            <p class="title">优惠券抵扣</p>
            <p class="price">- ¥ {{ totalCoupon.toFixed(2) }}</p>
          </div>
          <div class="info">
            <p class="title">运费</p>
            <p class="price">¥ {{ totalFedex.toFixed(2) }}</p>
          </div>
        </div>
        <div class="right">
          <div class="prices">
            <span class="tip">合计：</span><span class="price"><i>¥</i>{{ totalPrice.toFixed(2) }}</span>
          </div>
          <sm-button :width="120" :height="35" :size="14" @click="submit">提交订单</sm-button>
        </div>
      </div>
    </div>

    <sm-dialog title="地址信息" :visible="addressDialogVisible" @confirm="confirmAddress" @cancel="cancelAddress">
      <sm-form v-if="address" v-model="address" :rules="rules" :passed.sync="passed" :width="300">
        <sm-form-item title="收件人姓名">
          <sm-input v-model="address.name" prop="name" />
        </sm-form-item>
        <sm-form-item title="收件人手机">
          <sm-input v-model="address.mobile" prop="mobile" />
        </sm-form-item>
        <sm-form-item title="地区">
          <sm-cascader v-model="address.location" :options="pcas" title-key="name" id-key="code" prop="location" />
        </sm-form-item>
        <sm-form-item title="详细地址">
          <sm-input v-model="address.address" prop="address" />
        </sm-form-item>
      </sm-form>
    </sm-dialog>
  </sm-loading>
</template>

<script>
import _ from 'lodash';
import dayjs from 'dayjs';
import pcas from '@/assets/json/pcas-code.json';

export default {
  name: 'Checkout',
  data() {
    return {
      loading: true,
      fixed: true,
      el: null,
      offsetTop: 0,
      imgCount: 0,
      invoice: { title: '个人', name: '', code: '' },
      addressDialogVisible: false,
      address: null,
      passed: false,
      rules: {
        name: [{ required: true, message: '必填项' }],
        mobile: [{ required: true, message: '必填项' }],
        location: [{ required: true, message: '必选项' }],
        address: [{ required: true, message: '必填项' }],
      },
    };
  },
  computed: {
    pcas() {
      return pcas;
    },
    addresses() {
      return this.$store.state.address.addresses;
    },
    products() {
      return this.$route.params.products || this.$store.state.cart.products;
    },
    // 商品款数
    totalSKU() {
      return this.products.length;
    },
    // 商品件数
    totalQuantity() {
      return this.products.reduce((total, item) => total + item.quantity, 0);
    },
    // 商品总价
    totalCost() {
      return this.products.reduce((total, item) => total + item.quantity * item.sku.cost, 0);
    },
    // 活动优惠
    totalDiscount() {
      return this.products.reduce((total, item) => total + item.quantity * (item.sku.cost - item.sku.price), 0);
    },
    // 优惠券抵扣
    totalCoupon() {
      return _.random(100, true);
    },
    // 运费
    totalFedex() {
      return _.random(20, true);
    },
    // 合计
    totalPrice() {
      return this.totalCost - this.totalDiscount - this.totalCoupon + this.totalFedex;
    },
  },
  watch: {
    'address.location': {
      immediate: true,
      handler(val) {
        if (!val?.path) return;
        this.address.path = val.path;
      },
    },
    'address.path': {
      immediate: true,
      handler(val) {
        if (!val) return;
        let tree = this.pcas;
        let node = val;
        val.forEach((name) => {
          node = tree.find((item) => item.name === name);
          if (node?.children) tree = node.children;
        });
        this.address.location = node;
      },
    },
  },
  mounted() {
    this.address = this.addresses?.find((item) => item.default);
  },
  methods: {
    // 重新计算高度
    recalc() {
      this.$nextTick(() => {
        this.el = document.documentElement;
        this.offsetTop = document.querySelector('.sm-footer').offsetTop;
        this.offsetTop += document.querySelector('.bar-wrapper').clientHeight;
        window.addEventListener('scroll', this.handleScroll);
        this.handleScroll();
      });
    },
    // 当所有图片加载完成后
    loadImage() {
      this.imgCount++;
      if (this.imgCount < this.products.length) return;
      // 关闭loading
      this.loading = false;
      // 当dom高度变化时，重新计算高度
      const resizeObserver = new ResizeObserver(() => {
        // 监听滚动事件
        this.recalc();
      });
      resizeObserver.observe(document.querySelector('#🧾'));
    },
    // 滚动事件
    handleScroll() {
      this.fixed = this.el.clientHeight + this.el.scrollTop <= this.offsetTop;
    },
    // 提交订单
    submit() {
      const order = {
        id: _.uniqueId(),
        datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        products: this.products,
        address: this.address,
        invoice: this.invoice,
        cost: this.totalCost,
        price: this.totalPrice,
        fedex: this.totalFedex,
        status: '未付款',
      };
      // 剔除掉购物车中的商品
      this.$store.dispatch(
        'cart/deleteFromCart',
        this.products.map((item) => item.sku.id),
      );
      // 创建订单
      this.$store.dispatch('order/createOrder', order);
      // 跳转支付页面
      this.$router.push({ name: 'Payment', params: { order } });
    },
    // 打开地址弹窗
    openAddressDialog(address) {
      this.addressDialogVisible = true;
      if (address) {
        this.address = _.cloneDeep(address);
        return;
      }
      this.address = {};
    },
    // 点击取消地址
    cancelAddress() {
      this.addressDialogVisible = false;
    },
    // 点击确认地址
    confirmAddress() {
      if (!this.passed) {
        this.$message.error('验证失败！');
        this.$notify.error({ title: '验证失败！', content: `请按要求填写内容！` });
        return;
      }
      this.addressDialogVisible = false;
      // 有id，是修改地址
      if (this.address.id) {
        this.$store.dispatch('address/updateAddress', this.address);
        return;
      }
      // 没有则是新建
      this.address.id = this.addresses.length + 1;
      this.$store.dispatch('address/createAddress', this.address);
    },
    // 删除地址
    deleteAddress(address) {
      this.$danger('警告', '确认删除？').then(() => {
        this.$store.dispatch('address/deleteAddress', address);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  .addresses-box {
    .container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      padding: 3rem;

      .item {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 2rem;
        overflow: hidden;
        cursor: pointer;
        border: var(--border);
        border-radius: var(--radius-l);

        &.active {
          background-image: url('@/assets/images/components/select.png');
          background-repeat: no-repeat;
          background-position: 95% 10%;
          background-size: 10%;
          border-color: var(--color-border-blue);
        }

        &:hover {
          .panel {
            visibility: visible;
            transform: translateY(0);
          }
        }

        .panel {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          display: flex;
          height: 3rem;
          visibility: hidden;
          background: var(--color-hover);
          border-radius: var(--radius-l);
          transition: all 0.3s;
          transform: translateY(3rem);

          .operation {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            border-top: var(--border);

            &:hover {
              background: var(--color-gray);
            }

            &:not(:last-child) {
              border-right: var(--border);
            }
          }
        }

        .name {
          font-size: var(--font-size-xl);
          color: var(--font-color-2);
        }

        .mobile,
        .pcas,
        .address {
          font-size: var(--font-size-l);
        }
      }

      .add {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        justify-content: center;
        background: var(--color-hover);

        &:hover {
          background: var(--color-gray);
        }

        i {
          font-size: var(--font-size-xxxxl);
          color: var(--font-color-2);
        }

        p {
          font-size: var(--font-size-l);
        }
      }
    }
  }

  .shoplist-box {
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
      width: 13rem;
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
        }
      }
    }
  }

  .invoice-box {
    .container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 3rem;

      .item {
        display: flex;
        font-size: var(--font-size-l);
        font-weight: bold;
        color: var(--font-color-2);

        .title {
          width: 7rem;
        }

        .smartisan-icon {
          margin-left: 0.5rem;
          font-weight: normal;
        }

        .info {
          display: flex;
          flex-direction: column;
          gap: 2rem;

          .sm-radio-group {
            display: flex;
            gap: 2rem;
          }
        }
      }

      .tip {
        padding-top: 2rem;
        border-top: var(--border-dashed);
      }
    }
  }

  .coupon-box {
    .container {
      padding: 3rem;

      .empty {
        display: flex;
        flex-direction: column;
        align-items: center;

        i {
          width: 8rem;
          height: 7rem;
          background-image: url('@/assets/images/checkout/coupon.png');
          background-repeat: no-repeat;
          background-size: contain;
        }

        p {
          font-size: var(--font-size-xxl);
        }
      }
    }
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

      .info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        &:not(:last-child) {
          padding-right: 2rem;
          margin-right: 2rem;
          border-right: var(--border);
        }

        .title {
          font-size: var(--font-size-l);
          font-weight: bold;
        }

        .price,
        .quantity {
          font-size: var(--font-size-xl);
          font-weight: bold;
          color: var(--font-color-2);
        }

        .price {
          color: var(--color-red);
        }
      }
    }

    .right {
      display: flex;
      gap: 2rem;
      align-items: flex-end;
      justify-content: center;

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
}
</style>
