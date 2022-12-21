import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://reqres.in/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getList() {
    return apiClient.get("/unknown");
  },
};
