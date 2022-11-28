import { phoneCaseAndroid } from '@/config/phone-case';
import { earphoneBlack, earphoneRed, earphoneBlue } from '@/config/earphone';
import { jianguo3Black464, jianguo3Red464, jianguo3Gold464 } from '@/config/jianguo3';

const state = {
  info: {
    username: 'ali-pay',
    nickname: '支付宝',
    mobile: '18888888888',
    // avatar: 'https://static.smartisanos.cn/cloud/index/img/default-user-avatar_d6c83a2e26.png',
  },
  cart: [
    {
      sku: jianguo3Black464,
      quantity: 1,
    },
    {
      sku: jianguo3Red464,
      quantity: 2,
    },
    {
      sku: jianguo3Gold464,
      quantity: 3,
    },
    {
      sku: earphoneBlack,
      quantity: 4,
    },
    {
      sku: earphoneRed,
      quantity: 5,
    },
    {
      sku: earphoneBlue,
      quantity: 6,
    },
    {
      sku: phoneCaseAndroid,
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
