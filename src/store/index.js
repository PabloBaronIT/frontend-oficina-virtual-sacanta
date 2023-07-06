import { createStore } from "vuex";

export default createStore({
  state: {
    loggedIn: false,
    token: localStorage.getItem("token"),
    procedure: [],
    user: {},
    CidiCookie: null,
    representante: null,
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
    setCidi(state, asd) {
      state.CidiCookie = asd;
    },
    saveProcedure(state, p) {
      let obj = JSON.parse(p);
      state.procedure.push(obj);
    },
    cleanStore(state) {
      state.procedure = [];
    },

    representante(state, asd) {
      state.representante = asd;
    },
  },
  actions: {
    mockLoginAction(context, asd) {
      context.commit("loggedIn", asd);
    },
    mockCidiAction(context, asd) {
      context.commit("setCidi", asd);
    },
    mockRepresentanteAction(context, asd) {
      context.commit("representante", asd);
    },
    saveP(context) {
      context.commit("saveProcedure");
    },

    cleanAction(context) {
      context.commit("cleanStore");
    },
  },
  modules: {},
});
