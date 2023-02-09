import { createStore } from "vuex";

export default createStore({
  state: {
    loggedIn: false,
    name: "joa",
    lastname: "",
    cuil: 11,
    token: localStorage.getItem("token"),
    procedure: [],
  },
  getters: {},
  mutations: {
    loggedIn(state, n, l) {
      state.loggedIn = true;
      console.log("Estado de ingreso: ", state.loggedIn);
      state.name = n;
      state.lastname = l;
    },
    saveProcedure(p, state) {
      console.log("Vuex: " + state);
      state.procedure = state;
    },
  },
  actions: {
    mockLogin(context) {
      context.commit("loggedIn");
    },
    saveP(context) {
      context.commit("saveProcedure");
    },
  },
  modules: {},
});
