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
  getTramites(categoryId) {
    return apiClient.get(
      "/oficina/categories/category/procedure/" + categoryId
    );
  },
  getMunicipal(id) {
    return apiClient.get("/municipales/munis/" + id);
  },
  getUser(id) {
    return apiClient.get("/oficina/users/" + id);
  },
  postProcedure(procedure) {
    return apiClient.post("/oficina/procedures/submit-procedure", {
      user_id: procedure.user_id,
      procedureTitle: procedure.procedureTitle,
      procedureDescription: procedure.procedureDescription,
      categoryId: procedure.categoryId,
      questions: [
        {
          title: procedure.questions[0].title,
          options: [
            {
              title: procedure.questions[0].options[0].title,
              enabled: false,
            },
          ],
        },
      ],
    });
  },
};
