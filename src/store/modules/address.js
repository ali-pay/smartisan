import _ from 'lodash';

const state = {
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
};

const getters = {};

const mutations = {
  updateAddresses(state, payload) {
    state.addresses = payload;
  },
};

const actions = {
  // 创建地址
  createAddress({ state, commit }, payload) {
    const addresses = _.cloneDeep(state.addresses);
    if (payload.default) {
      addresses.forEach((item) => {
        item.default = false;
      });
    }
    addresses.unshift(payload);
    commit('updateAddresses', addresses);
  },
  // 更新地址
  updateAddress({ state, commit }, payload) {
    const addresses = _.cloneDeep(state.addresses);
    const index = addresses.findIndex((item) => item.id === payload.id);
    addresses[index] = payload;
    commit('updateAddresses', addresses);
  },
  // 删除地址
  deleteAddress({ state, commit }, payload) {
    let addresses = _.cloneDeep(state.addresses);
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
