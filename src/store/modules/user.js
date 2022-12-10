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

const mutations = {};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
