import _ from 'lodash';
import { android } from '@/config/phone-case';
import { black, red, blue } from '@/config/earphone';
import { black464, red464, gold464 } from '@/config/jianguo3';

const state = {
  orders: [
    {
      id: '1234567890',
      datetime: '2023-01-08',
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
      ],
      cost: 1299,
      price: 1311,
      fedex: 12,
      status: '已完成',
      address: {
        name: '支付宝',
        mobile: '18888888888',
        path: ['广东省', '广州市', '越秀区', '黄花岗街道'],
        address: '先烈中路100号大院1号楼',
      },
      invoice: {
        title: '个人',
      },
    },
    {
      id: '1234567891',
      datetime: '2023-01-08',
      products: [
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
      ],
      cost: 89,
      price: 89,
      fedex: 0,
      status: '已关闭',
      address: {
        name: '支付宝',
        mobile: '18888888888',
        path: ['广东省', '广州市', '越秀区', '黄花岗街道'],
        address: '先烈中路100号大院1号楼',
      },
      invoice: {
        title: '单位',
        name: '广东省科学院智能制造研究所',
        code: '124400004558580039',
      },
    },
    {
      id: '1234567892',
      datetime: '2023-01-08',
      products: [
        {
          sku: android,
          quantity: 7,
        },
      ],
      cost: 59,
      price: 71,
      fedex: 12,
      status: '未付款',
      address: {
        name: '支付宝',
        mobile: '18888888888',
        path: ['广东省', '广州市', '越秀区', '黄花岗街道'],
        address: '先烈中路100号大院1号楼',
      },
      invoice: {
        title: '个人',
      },
    },
  ],
};

const getters = {};

const mutations = {
  updateOrders(state, payload) {
    state.orders = payload;
  },
};

const actions = {
  // 创建订单
  createOrder({ state, commit }, payload) {
    const orders = _.cloneDeep(state.orders);
    orders.unshift(payload);
    commit('updateOrders', orders);
  },
  // 删除订单
  deleteOrder({ state, commit }, payload) {
    let orders = _.cloneDeep(state.orders);
    orders = orders.filter((item) => !payload.includes(item.id));
    commit('updateOrders', orders);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
