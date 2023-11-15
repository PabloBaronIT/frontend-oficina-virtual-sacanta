import jwt_decode from "jwt-decode";

export default {
  //FUINCION PARA DEVOLVER EL PAYLOAD DEL TOKEN
  getToken(token) {
    let asd = jwt_decode(token);
    return asd;
  },
};
