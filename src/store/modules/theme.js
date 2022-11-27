const state = {
  mode: 'auto',
  modes: ['auto', 'light', 'dark'],
  color: 'default',
  colors: [
    'default',
    'carbonblack',
    'chocolate',
    'white',
    'lightgold',
    'winered',
    'shinyred',
    'shinyblue',
    'peacockblue',
    'stripe',
  ],
};

const getters = {
  mode: (state) => {
    if (state.mode !== 'auto') return state.mode;
    const media = window.matchMedia('(prefers-color-scheme:dark)');
    if (media.matches) return 'dark';
    return 'light';
  },
};

const mutations = {
  updateMode(state, payload) {
    state.mode = payload.mode;
  },
  updateColor(state, payload) {
    state.color = payload.color;
  },
};

const actions = {
  changeMode({ commit }, payload) {
    let { mode } = payload;
    if (mode === 'auto') {
      const media = window.matchMedia('(prefers-color-scheme:dark)');
      if (media.matches) mode = 'dark';
      else mode = 'light';
    }
    commit('updateMode', payload);
    document.documentElement.setAttribute('theme-mode', mode);
  },
  changeColor({ commit }, payload) {
    const { color } = payload;
    commit('updateColor', payload);
    document.documentElement.setAttribute('theme-color', color);
  },
  initTheme({ dispatch }, payload) {
    dispatch('changeMode', payload);
    dispatch('changeColor', payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
