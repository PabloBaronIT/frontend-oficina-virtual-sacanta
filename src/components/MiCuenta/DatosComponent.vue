<template>
  <div v-if="!this.loading">
    <h1 class="tituloPrincipal">Tus datos</h1>
    <div class="Box-contenedor">
      <div class="boxIzquierdo">
        <div class="cuadro"></div>
        <h5>{{ this.name }} {{ this.lastname }}</h5>
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
          <span>
            <i class="bi bi-person-vcard-fill" style="margin-right: 8px"></i
            >{{ this.cuil }}</span
          >
          <span>
            <i class="bi bi-phone" style="margin-right: 8px"></i
            >{{ this.phoneNumber }}</span
          >
        </div>
      </div>
      <div class="boxDerecho">
        <h5>
          Informacion personal
          <i
            class="bi bi-pencil-fill"
            @click="this.setModal"
            style="font-size: 12px; color: #019939; margin-left: 1rem"
          ></i>
        </h5>
        <div class="datos-container">
          <div class="titulos">
            <label for="">Email</label>
            <input type="text" name="" id="" :value="this.email" disabled />
          </div>
          <div class="titulos">
            <label for="">Calle</label>
            <input type="text" name="" id="" :value="this.adress" disabled />
          </div>
          <div class="titulos">
            <label for="">CP</label>
            <input type="text" name="" id="" :value="this.postCode" disabled />
          </div>
          <div class="titulos">
            <label for="">Ciudad</label>
            <input type="text" name="" id="" :value="this.city" disabled />
          </div>
        </div>
      </div>
    </div>
    <div class="volver">
      <router-link to="/munienlinea">
        <img src="./../../assets/images/FlechaIzquierda.svg" alt="imagen" />
      </router-link>

      <h4>Volver al Incio</h4>
    </div>
    <div class="modalEditar" v-if="this.modal">
      <div>
        <i class="bi bi-x-square-fill close" @click="this.setModal"></i>
      </div>
      <h4>Edita tus datos:</h4>
      <div class="datos-container">
        <div class="titulos">
          <label for="">Calle</label>
          <input type="text" name="" id="" :value="this.adress" />
        </div>

        <div class="titulos">
          <label for="">CP</label>
          <input type="text" name="" id="" :value="this.postCode" />
        </div>
        <div class="titulos">
          <label for="">Ciudad</label>
          <input type="text" name="" id="" :value="this.city" />
        </div>
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
  <div class="prueba-container l" v-else>
    <div class="spinner-grow text-success" role="status">
      <span class="sr-only"></span>
    </div>
    <div class="spinner-grow text-success" role="status">
      <span class="sr-only"></span>
    </div>
    <div class="spinner-grow text-success" role="status">
      <span class="sr-only"></span>
    </div>
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
      postCode: "",
      loading: true,
      modal: false,
    };
  },
  created() {
    // this.getMyProfile();
    setTimeout(() => {
      this.getMyProfile();
    }, 1000);
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
          this.postCode = res.user.postCode;
          this.loading = false;
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
    setModal() {
      this.modal = !this.modal;
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
  height: 30vh;
  box-shadow: 4px 4px 7px 0px rgba(0, 0, 0, 0.25);
  background: #fff;
  padding: 16px 20px 18px 18px;
  border-radius: 0px 20px 0px 0px;
  position: relative;
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
.volver {
  position: absolute;
  bottom: 20vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  left: 4vw;
}
.volver h4 {
  margin-left: 14px;
  color: #808081;
  font-weight: 100;
  margin-top: 1.5vh;
}
.datos-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 80%;
  position: relative;
  margin: auto;
  margin-top: 2vh;
}
input {
  border: none;
  border-bottom: 1px solid black;
  width: 70%;
  font-size: 16px;
}
label {
  font-size: 13px;
}
.titulos {
  display: flex;
  flex-direction: column;
  justify-content: left;
}
/*  */
/* .container {
  display: flex;
  flex-direction: row;
  width: 100vw;
  align-items: center;
  justify-content: center;
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
.prueba-container {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 84vw;
}

.l {
  flex-direction: row;
}
.modalEditar {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  z-index: 15;
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  margin: auto;
  width: 500px; /* Need a specific value to work */
  height: auto;
  padding: 1rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.close {
  position: absolute;
  right: 2rem;
  top: 0.5rem;
}
.internoEditar {
}
</style>
