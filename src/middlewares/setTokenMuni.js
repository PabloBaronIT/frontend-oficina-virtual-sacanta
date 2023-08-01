import axios from "axios";
import { BASE_URL } from "@/env";
export default function setTokenMuni() {
  let refresh = localStorage.getItem("refreshToken"); ///se toma el token refresh
  const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
  });
  apiClient
    .post("/refresh-token-muni", {
      refreshToken: refresh,
    })
    .then((response) => {
      localStorage.setItem("token", response.data.Token);
    })
    .catch((error) => {
      console.log(error.response, "soy el error del refreshToken");
    });
}