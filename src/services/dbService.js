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

export default {
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

  getCategorieById(id) {
    return apiClient.get("/oficina/categories/categories/" + id);
  },
  getQuestions(id) {
    return apiClient.get("/oficina/categories/getQuestions/" + id);
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
