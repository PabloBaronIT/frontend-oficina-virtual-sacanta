import { createStore } from "vuex";

export default createStore({
  state: {
    loggedIn: false,
    name: "joa",
    lastname: "",
    cuil: 11,
    token: localStorage.getItem("token"),
  },
  getters: {},
  mutations: {
    loggedIn(state, n, l) {
      state.loggedIn = true;
      console.log("Estado de ingreso: ", state.loggedIn);
      state.name = n;
      state.lastname = l;
    },
  },
  actions: {
    mockLogin(context) {
      context.commit("loggedIn");
    },
  },
  modules: {},
});
