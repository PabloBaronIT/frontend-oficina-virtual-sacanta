<template>
  <div class="container">
    <h1 class="tituloPrincipal">Tus datos</h1>
    <div class="Box-contenedor">
      <div class="boxIzquierdo">
        <div class="cuadro"></div>
        <h5>PABLO BARON</h5>
        <div
          style="
            height: 30%;
            display: flex;
            flex-direction: column;
            text-align: left;
          "
        >
          <span>
            <i class="bi bi-calendar4-week" style="margin-right: 8px"></i
            >11/10/1980</span
          >
          <span>123456</span>
          <span>3564306657</span>
        </div>
      </div>
      <div class="boxDerecho">
        <h5>Informacion personal</h5>
      </div>
    </div>

    <!-- <div class="datos-container">
      <p>
        Nombre completo:
        <b> {{ this.name }} {{ this.lastname }} </b>
      </p>
      <p>
        CUIL: <b>{{ this.cuil }}</b>
      </p>
      <p>Contraseña: ********* <img src="@/assets/edit.svg" alt="edit" /></p>

      <p>
        Email: <b>{{ this.email }}</b>
      </p>
      <p>
        Dirección: <b>{{ this.adress }}</b>
      </p>
      <p>
        Cuenta creada el <b>{{ fecha }}</b>
      </p>
      <p>
        Ciudad: <b>{{ this.city }}</b>
      </p>
      <p>
        Teléfono: <b>{{ this.phoneNumber }}</b>
      </p>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import setToken from "@/middlewares/setToken";
import setTokenRelations from "@/middlewares/setTokenRelations";
import { BASE_URL } from "@/env";
export default {
  name: "DatosCompnent",
  data() {
    return {
      name: "",
      lastname: "",
      cuil: "",
      email: "",
      adress: "",
      fecha_creacion: "",
      city: "",
      phoneNumber: "",
    };
  },
  created() {
    this.getMyProfile();
  },
  computed: {
    fecha() {
      let iso = this.fecha_creacion;
      let date = new Date(iso);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
  },
  methods: {
    getMyProfile() {
      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/oficina/user/profile")
        .then((response) => {
          console.log(response.data);
          let res = response.data.UserProfile;
          this.name = res.user.firstname;
          this.lastname = res.user.lastname;
          this.cuil = res.user.cuil;
          this.email = res.user.email;
          this.adress = res.user.adress;
          this.city = res.user.city;
          this.phoneNumber = res.user.phoneNumber;
          this.nivel = res.user.level.level;
          this.fecha_creacion = res.user.created_at;
        })
        .catch((error) => {
          if (error.response.status === 500) {
            if (error.response.data.message === "Token de usuario expirado") {
              setToken();
              this.getMyProfile();
            }
            if (
              error.response.data.message === "Token de representante expirado"
            ) {
              setTokenRelations();
              this.getMyProfile();
            }
          }
          if (error.response.status === 401) {
            this.$router.push("micuenta-update");
          }
        });
    },
  },
};
</script>

<style scoped>
/* CSS NUEVO */
.tituloPrincipal {
  color: #4b4a49;
  font-weight: 900;
  font-size: 50px;
  margin-top: 7vh;
  margin-left: 4vw;
}
.boxIzquierdo {
  height: 47vh;
  width: 17vw;
  padding: 16px 20px 18px 18px;
  box-shadow: 4px 4px 7px 0px rgba(0, 0, 0, 0.25);
  background: #fff;
  border-radius: 0px 20px 0px 0px;
  text-align: center;
}
.boxDerecho {
  width: 54vw;
  height: 25vh;
  box-shadow: 4px 4px 7px 0px rgba(0, 0, 0, 0.25);
  background: #fff;
  padding: 16px 20px 18px 18px;
  border-radius: 0px 20px 0px 0px;
}
.Box-contenedor {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1.5vw;
}
h5 {
  font-weight: 900;
  color: #4b4a49;
}
.cuadro {
  height: 19vh;
  background: #d9d9d9;
  margin-bottom: 2vh;
}

/*  */
/* .container {
  display: flex;
  flex-direction: row;
  width: 100vw;
  align-items: center;
  justify-content: center;
} */

/* .datos-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  text-align: center;
  width: 100%;
  border: 1px solid var(--grey);
  border-radius: 10px;
} */

p {
  margin: 20px;
  padding: 10px;

  height: auto;
}

.datos-container img {
  max-width: 20px;
  margin: 0 10px;
  cursor: pointer;
}
.datos-container img:hover {
  max-width: 22px;
  fill: var(--red);
}
</style>
