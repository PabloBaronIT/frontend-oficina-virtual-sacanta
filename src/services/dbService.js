import axios from "axios";

const apiClient = axios.create({
  baseURL: "//localhost:3000/oficina",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
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
    return apiClient.post("/signin", {
      cuil: login.cuil,
      password: login.password,
    });
  },
};
