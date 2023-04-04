import axios from "axios";

const apiClient = axios.create({
  // baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
  baseURL: process.env.VUE_APP_BASEURL,
  withCredentials: false,
  headers: {
    "auth-header": localStorage.getItem("token"),
  },
});

const apiClientAuth = axios.create({
  baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
  withCredentials: false,
  headers: {
    "auth-header": localStorage.getItem("token"),
  },
});

export default {
  postCreateUser(registro) {
    return apiClient.post("/auth/signUp", {
      firstname: registro.name,
      lastname: registro.lastname,
      password: registro.password,
      email: registro.email,
      cuil: registro.cuil,
      adress: registro.adress,
    });
  },
  postLoginUser(login) {
    return apiClient.post("/auth/signin", {
      cuil: login.cuil,
      password: login.password,
    });
  },
  postLoginMunicipal(login) {
    return apiClient.post("/auth/signinMunicipales", {
      cuil: login.cuil,
      password: login.password,
    });
  },
  getAllCategories() {
    return apiClientAuth.get("/oficina/categories/categories");
  },
  getCategorieById(id) {
    return apiClient.get("/oficina/categories/categories/" + id);
  },
  getQuestions(id) {
    return apiClient.get("/oficina/categories/getQuestions/" + id);
  },
  getTramites(categoryId) {
    return apiClient.get(
      "/oficina/categories/category/procedure/" + categoryId
    );
  },
  getHistorialTramites() {
    return apiClient.get("/oficina/procedures/history");
  },
  getMunicipal() {
    return apiClient.get("/municipales/muni-profile");
  },
  getUser(id) {
    return apiClient.get("/oficina/users/" + id);
  },
  postProcedure(p) {
    return apiClient.post("/oficina/procedures/submit-procedure", {
      userId: p.userId,
      categoryId: p.categoryId,
      statusId: p.statusId,
      questions: p.questions,
    });
  },
};
