import axios from "axios";

const apiClient = axios.create({
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
    return apiClient.get("/oficina/categories/getCategories");
  },
  getCategorieById(id) {
    return apiClient.get("/oficina/categories/getCategories/" + id);
  },
};
