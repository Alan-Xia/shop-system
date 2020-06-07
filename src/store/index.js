import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('access_token') || '',
    uinfo: JSON.parse(sessionStorage.getItem('uinfo')) || ''
  },
  mutations: {
    TOKEN (state,token) {
      state.token = token
    },
    UINFO (state,uinfo) {
      state.uinfo = uinfo
    }
  },
  actions: {
    
  },
  modules: {
  },
  getters: {
    token: state => state.token,
    uinfo: state => state.uinfo
  }
})
