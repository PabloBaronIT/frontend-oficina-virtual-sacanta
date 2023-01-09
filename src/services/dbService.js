import axios from "axios";

const apiClient = axios.create({
  baseURL: "//localhost:3000/",
  withCredentials: false,
  headers: {
    "auth-header": localStorage.getItem("token"),
  },
});

const apiClientAuth = axios.create({
  baseURL: "//localhost:3000/",
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
  getAllCategories() {
    return apiClientAuth.get("/oficina/categories/categories");
  },
  getCategorieById(id) {
    return apiClient.get("/oficina/categories/categories/" + id);
  },
  getQuestions(id) {
    return apiClient.get("/oficina/categories/getQuestions/" + id);
  },
};
