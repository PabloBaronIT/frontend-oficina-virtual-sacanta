import { createStore } from "vuex";

export default createStore({
  state: {
    loggedIn: false,
    token: localStorage.getItem("token"),
    procedure: [],
    user: {},
    representative: false,
    RepresentativeUser: null,
  },
  getters: {
    getProfile(state) {
      return state.firstname;
    },
  },
  mutations: {
    loggedIn(state, asd) {
      state.user = asd;
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
    saveRepresentativeUser(state, asd) {
      state.RepresentativeUser = asd;
    },
    clearRepresentativeUser(state) {
      state.RepresentativeUser = null;
    },
  },
  actions: {
    mockLoginAction(context, asd) {
      context.commit("loggedIn", asd);
    },
    saveP(context) {
      context.commit("saveProcedure");
    },
    getProfileAction(context, asd) {
      context.commit("getProfile", asd);
    },
    setRepresentativeAction(context) {
      context.commit("setRepresentative");
    },
    saveRepresentativeUserAcition(context, asd) {
      context.commit("saveRepresentativeUser", asd);
    },
    clearRepresentativeUserAction(context) {
      context.commit("clearRepresentativeUser");
    },
  },
  modules: {},
});
