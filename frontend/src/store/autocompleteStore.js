import { createStore } from 'vuex'
const axios = require('axios');

export default createStore({
  state: {
    kits: [] // empty list of kits to start
  },
  getters: {
    getKits: (state) => () => {
      return state.kits;
    }
  },
  mutations: {
    changeKits(state, kits) {
      state.kits = kits;
    }
  },
  actions: {
    searchKits: async ( { commit }, label_id ) => {
      const lookupURL = `http://localhost:8000/kit/autocomplete/${label_id}`;
      const kits = await axios.get(lookupURL);
      commit('changeKits', kits);
    }
  },
})
