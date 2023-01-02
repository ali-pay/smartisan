import _ from 'lodash';
import { android } from '@/config/phone-case';
import { black, red, blue } from '@/config/earphone';
import { black464, red464, gold464 } from '@/config/jianguo3';

const state = {
  info: {
    username: 'ali-pay',
    nickname: '支付宝',
    mobile: '18888888888',
    avatar: 'https://avatars.githubusercontent.com/u/54493910',
    addresses: [
      {
        id: 1,
        name: '支付宝',
        mobile: '18888888888',
        path: ['广东省', '广州市', '越秀区', '黄花岗街道'],
        address: '先烈中路100号大院1号楼',
        default: true,
      },
      {
        id: 2,
        name: '支付宝',
        mobile: '18888888888',
        path: ['广东省', '广州市', '越秀区', '黄花岗街道'],
        address: '先烈中路100号大院2号楼',
        default: false,
      },
    ],
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
  updateAddresses(state, payload) {
    state.info.addresses = payload;
  },
};

const actions = {
  // 添加到购物车
  addToCart({ state, commit }, payload) {
    const cart = _.cloneDeep(state.cart);
    // 判断sku是否存在
    const item = cart.find((item) => item.sku.id === payload.sku.id);
    // 存在则叠加数量
    if (item) item.quantity += payload.quantity;
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
  // 添加到地址簿
  addToAddresses({ state, commit }, payload) {
    const addresses = _.cloneDeep(state.info.addresses);
    if (payload.default) {
      addresses.forEach((item) => {
        item.default = false;
      });
    }
    addresses.unshift(payload);
    commit('updateAddresses', addresses);
  },
  // 更新某个地址
  updateAddress({ state, commit }, payload) {
    const addresses = _.cloneDeep(state.info.addresses);
    const index = addresses.findIndex((item) => item.id === payload.id);
    addresses[index] = payload;
    commit('updateAddresses', addresses);
  },
  // 从地址簿删除
  deleteFromAddresses({ state, commit }, payload) {
    let addresses = _.cloneDeep(state.info.addresses);
    addresses = addresses.filter((item) => item.id !== payload.id);
    commit('updateAddresses', addresses);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
