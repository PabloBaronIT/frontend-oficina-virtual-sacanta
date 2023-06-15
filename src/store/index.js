import { createStore } from "vuex";

export default createStore({
  state: {
    loggedIn: false,
    token: localStorage.getItem("token"),
    procedure: [],
    user: {},
    representative: false,
    RepresentativeUser: null,
    Representante: null,
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
    cleanStore(state) {
      state.procedure = [];
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
    representante(state, asd) {
      state.Representante = asd;
    },
  },
  actions: {
    mockLoginAction(context, asd) {
      context.commit("loggedIn", asd);
    },
    mockRepresentanteAction(context, asd) {
      context.commit("representante", asd);
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
    cleanAction(context) {
      context.commit("cleanStore");
    },
  },
  modules: {},
});
