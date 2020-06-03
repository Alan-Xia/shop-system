import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || ''
  },
  mutations: {
    TOKEN (state,token) {
      state.token = token
    }
  },
  actions: {
    
  },
  modules: {
  },
  getters: {
    token: state => state.token
  }
})
