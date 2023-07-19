import axios from "axios";

export default function setTokenMuni() {
  let refresh = localStorage.getItem("refreshToken"); ///se toma el token refresh
  const apiClient = axios.create({
    //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
    baseURL: process.env.VUE_APP_BASEURL,
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
