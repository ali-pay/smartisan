import _ from 'lodash';
import { android } from '@/config/phone-case';
import { black, red, blue } from '@/config/earphone';
import { black464, red464, gold464 } from '@/config/jianguo3';

const state = {
  products: [
    {
      sku: black464,
      quantity: 1,
    },
    {
      sku: red464,
      quantity: 2,
    },
    {
      sku: gold464,
      quantity: 3,
    },
    {
      sku: black,
      quantity: 4,
    },
    {
      sku: red,
      quantity: 5,
    },
    {
      sku: blue,
      quantity: 6,
    },
    {
      sku: android,
      quantity: 7,
    },
  ],
};

const getters = {
  // 商品列表
  products(state) {
    return state.products;
  },
  // 总款数
  totalSKU(state) {
    return state.products.length;
  },
  // 总件数
  totalQuantity(state) {
    return state.products.reduce((total, item) => total + item.quantity, 0);
  },
  // 总价（优惠前）
  totalCost(state) {
    return state.products.reduce((total, item) => total + item.quantity * item.sku.cost, 0);
  },
  // 总价（优惠后）
  totalPrice(state) {
    return state.products.reduce((total, item) => total + item.quantity * item.sku.price, 0);
  },
  // 总优惠
  totalDiscount(state) {
    return state.products.reduce((total, item) => total + item.quantity * (item.sku.cost - item.sku.price), 0);
  },
};

const mutations = {
  updateProducts(state, payload) {
    state.products = payload;
  },
};

const actions = {
  // 添加到购物车
  addToCart({ state, commit }, payload) {
    const products = _.cloneDeep(state.products);
    // 判断sku是否存在
    const item = products.find((item) => item.sku.id === payload.sku.id);
    // 存在则叠加数量
    if (item) item.quantity += payload.quantity;
    // 不在则添加到第一位
    else products.unshift(payload);
    commit('updateProducts', products);
  },
  // 从购物车删除
  deleteFromCart({ state, commit }, payload) {
    let products = _.cloneDeep(state.products);
    products = products.filter((item) => !payload.includes(item.sku.id));
    commit('updateProducts', products);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
