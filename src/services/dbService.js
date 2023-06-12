import axios from "axios";
import jwt_decode from "jwt-decode";
const apiClient = axios.create({
  //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
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
  //CREAR UN USUARIO
  postCreateUser(registro) {
    return apiClient.post("/auth/signUp", registro);
  },
  //LOGUIN DE USUARIO COMUN
  postLoginUser(login) {
    return apiClient.post("/auth/signin", login);
  },
  //OOBTENER DATOS DEL PERFIL DEL USUARIO
  getMyProfileUser() {
    return apiClient.get("/oficina/user/profile");
  },
  //OBTENER DATOS DEL MUNICIPAL
  getProfileMunicipal() {
    return apiClient.get("/municipales/muni-profile");
  },
  //LOGIN MUNICIPAL
  postLoginMunicipal(login) {
    return apiClient.post("/auth/signinMunicipales", {
      cuil: login.cuil,
      password: login.password,
    });
  },
  //OBTENER TODAS LAS CATEGORIAS O SECTORES
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
  //FUINCION PARA DEVOLVER EL PAYLOAD DEL TOKEN
  getToken(token) {
    let asd = jwt_decode(token);
    return asd;
  },
};
