import axios from "axios";

const apiClient = axios.create({
  baseURL: "//localhost:3000/",
  withCredentials: false,
  headers: {},
});

export default {
  postCreateUser(registro) {
    return apiClient.post("/createUser", {
      firstname: registro.name,
      lastname: registro.lastname,
      password: registro.password,
      email: registro.email,
      cuil: registro.cuil,
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
