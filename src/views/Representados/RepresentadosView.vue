<template>
  <div class="sector-container">
    <!--se muestra si tiene representaciones-->

    <!--<div>
        <h1>Seleccione a quien va a representar:</h1>
      </div>-->
    <div class="top">
      <h1 class="tituloPrincipal">Mis Representaciones</h1>
    </div>
    <div v-if="listaReprentaciones.length" class="containerRepresented">
      <h3>Seleccione a quien va a representar</h3>
      <div class="list">
        <label for="">A mi mismo</label>
        <input
          type="radio"
          :key="user.id"
          @click="selectRpresentado($event)"
          :value="user.id"
          name="representado"
        />
      </div>

      <div
        v-for="representado in listaReprentaciones"
        :key="representado.id"
        class="list"
      >
        <label
          >{{ representado.firstname }} {{ representado.lastname }} - Cuil:
          {{ representado.cuil }}
        </label>
        <input
          type="radio"
          key="representado.id"
          :value="representado.id"
          @click="selectRpresentado($event)"
          name="representado"
        />
      </div>
      <button
        class="bn3"
        type="submit"
        @click="postSeleccionado"
        :disabled="representativeId ? false : true"
      >
        Elegir
      </button>
    </div>

    <div>
      <div v-if="message">
        {{ message }}
      </div>
      <!--se muestra si NO tiene representaciones  y redirige a pagina principal-->

      <div v-if="nullRepresented" class="nullRepresented">
        <h5>En breve usted será redirigido a la pantalla principal</h5>
        <p>No tiene representaciones registradas</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: null,
      listaReprentaciones: [],
      representativeId: null,
      nullRepresented: false,
      message: "",
      RepresentativeUser: null,
    };
  },
  methods: {
    //setea el ide del respresentado

    selectRpresentado(event) {
      this.representativeId = event.target.value;

      console.log(this.representativeId + "id seleccionado");
    },
    //manda el id para obtener el toquen

    postSeleccionado() {
      if (this.user.id != this.representativeId) {
        const apiClient = axios.create({
          //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
          baseURL: process.env.VUE_APP_BASEURL,
          withCredentials: false,
          headers: {
            "auth-header": localStorage.getItem("token"),
          },
        });
        apiClient
          .post("/representations/choose-representation", {
            representativeId: this.representativeId,
          })
          .then((response) => {
            console.log(response.data.message);
            this.message = response.data.message;
            window.localStorage.removeItem("token");
            window.localStorage.setItem("token", response.data.token);
            this.getProfile();

            setTimeout(() => this.$router.push("munienlinea"), 2000);
            this.dispatchRepresentative();
            this.dispachSaveRepresentativeUser();
          });
      } else {
        this.dispatchRepresentative();

        this.$router.push("munienlinea");
      }
    },

    //acciones del store

    dispatchProfile() {
      this.$store.dispatch("getProfileAction", this.user);
    },
    dispatchRepresentative() {
      this.$store.dispatch("setRepresentativeAction");
    },
    dispachSaveRepresentativeUser() {
      this.$store.dispatch(
        "saveRepresentativeUserAcition",
        this.RepresentativeUser
      );
    },
    //para obtener el perfil del representado

    getProfile() {
      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient.get("/oficina/user/profile").then((response) => {
        this.user = response.data.UserProfile.user;
        console.log(this.user);
        this.dispatchProfile();
      });
    },
  },
  created() {
    const apiClient = axios.create({
      //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
      baseURL: process.env.VUE_APP_BASEURL,
      withCredentials: false,
      headers: {
        "auth-header": localStorage.getItem("token"),
      },
    });
    apiClient
      .get("/representations/my-representations")
      .then((response) => {
        console.log(response.data, "mis representaciones");
        if (response.status == 200) {
          this.user = response.data.Representations[0].user;
          this.RepresentativeUser = response.data.Representations[0].user;
          for (let i = 0; i < response.data.Representations.length; i++) {
            this.listaReprentaciones.push(
              response.data.Representations[i].represented
            );
          }
          //no mostrar boton de inicio para que no acceda a los servicios
          this.dispatchRepresentative();
        }
      })
      .catch((err) => {
        console.log(err);

        this.nullRepresented = true;
        setTimeout(() => this.$router.push("munienlinea"), 2000);
      });
  },
};
</script>
<style scoped>
.top {
  text-align: left;
}
.sector-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--grey-bk);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  padding: 3rem;
  /*text-align: center;*/
  /*justify-content: center;
  align-items: center;*/
}
.containerRepresented {
  width: 80%;
  margin: auto;
  height: 60vh;
  display: flex;
  flex-direction: column;
}
.list {
  display: flex;
  flex-direction: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  width: 60%;
  border: 1px solid grey;
  border-radius: 10px;
  margin-bottom: 1rem;
  padding: 0px 1rem;
  margin: auto;
}
.bn3 {
  /* background: var(--blue);
  display: inline-block;
  padding: 5px;
  margin: auto;
  border: 0.16em solid rgb(255, 255, 255);
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: #2d2d2d;
  text-align: center;
  transition: all 0.2s;
  width: 10rem; */

  height: 3rem;
  width: 11rem;
  border: 0.16em solid rgb(255, 255, 255);
  text-align: center;
  background-image: linear-gradient(
    to right,
    #399943,
    #4ea242,
    #62aa40,
    #75b23f,
    #88ba3e
  );
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-top: 0.8rem;
  margin-top: 1rem;
  transition: all 0.2s;
  margin: auto;
  color: white;
  cursor: pointer;
  border-style: none;
}
.bn3:hover {
  color: black;
}
.nullRepresented {
  height: 10rem;
  width: 35rem;
  padding-top: 2rem;
  background-color: rgba(128, 128, 128, 0.233);
}
</style>
