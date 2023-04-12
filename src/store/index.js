import { createStore } from "vuex";

export default createStore({
  state: {
    loggedIn: false,
    token: localStorage.getItem("token"),
    procedure: [],
    user: { firstname: "hols", lastname: "chau" },
    representative: false,
  },
  getters: {
    getProfile(state) {
      return state.firstname;
    },
  },
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
    getProfile(state, asd) {
      state.user = asd;
    },
    setRepresentative(state) {
      state.representative = !state.representative;
    },
  },
  actions: {
    mockLogin(context) {
      context.commit("loggedIn");
    },
    saveP(context) {
      context.commit("saveProcedure");
    },
    getProfile(context, asd) {
      context.commit("getProfile", asd);
    },
    setRepresentative(context) {
      context.commit("setRepresentative");
    },
  },
  modules: {},
});
