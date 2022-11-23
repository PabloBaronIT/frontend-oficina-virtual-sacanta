import { createStore } from "vuex";

export default createStore({
  state: {
    loggedIn: false,
  },
  getters: {},
  mutations: {
    loggedIn(state) {
      state.loggedIn = true;
      console.log("Estado de ingreso: ", state.loggedIn);
    },
  },
  actions: {
    mockLogin(context) {
      context.commit("loggedIn");
      console.log("ok 2");
    },
  },
  modules: {},
});
