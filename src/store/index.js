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
      state.name = n;
      state.lastname = l;
    },
    saveProcedure(state, p) {
      let obj = JSON.parse(p);
      state.procedure.push(obj);
    },
    cleanStore(state, p) {
      state.procedure = [];
      console.log(p);
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
