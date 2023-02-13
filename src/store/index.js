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
    saveProcedure(state, p) {
      console.log("Vuex: " + p);
      console.log(p);

      let obj = JSON.parse(p);
      console.log(obj);
      state.procedure.push(obj);
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
