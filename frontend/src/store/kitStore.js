import { createStore } from 'vuex'
const axios = require('axios');

export default createStore({
  state: {
    kit: {}  // empty kit to start
  },
  getters: {
    getKit: (state) => () => {
      return state.kit;
    }
  },
  mutations: {
    changeKit(state, kit) {
      state.kit = kit;
    }
  },
  actions: {
    searchKit: async ( { commit }, label_id ) => {
      const lookupURL = `http://localhost:8000/kit/${label_id}`;
      const kit = await axios.get(lookupURL);
      commit('changeKit', kit);
    }
  },
})
