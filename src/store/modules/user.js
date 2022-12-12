import _ from 'lodash';
import { android } from '@/config/phone-case';
import { black, red, blue } from '@/config/earphone';
import { black464, red464, gold464 } from '@/config/jianguo3';

const state = {
  info: {
    username: 'ali-pay',
    nickname: '支付宝',
    mobile: '18888888888',
    // avatar: 'https://static.smartisanos.cn/cloud/index/img/default-user-avatar_d6c83a2e26.png',
  },
  cart: [
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

const getters = {};

const mutations = {
  updateCart(state, payload) {
    state.cart = payload;
  },
};

const actions = {
  // 添加到购物车
  addToCart({ state, commit }, payload) {
    const cart = _.cloneDeep(state.cart);
    // 判断sku是否存在
    const exist = cart.find((item) => item.sku.id === payload.sku.id);
    // 存在则叠加数量
    if (exist) exist.quantity += payload.quantity;
    // 不在则添加到第一位
    else cart.unshift(payload);
    commit('updateCart', cart);
  },
  // 从购物车删除
  deleteFromCart({ state, commit }, payload) {
    let cart = _.cloneDeep(state.cart);
    cart = cart.filter((item) => !payload.skuIds.includes(item.sku.id));
    commit('updateCart', cart);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
