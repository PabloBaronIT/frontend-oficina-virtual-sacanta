<template>
  <div class="sector-container">
    <!--se muestra si tiene representaciones-->

    <div v-if="listaReprentaciones.length" class="containerRepresented">
      <h2>BIENVENIDO! Seleccione a quien va a representar:</h2>

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

      <div v-if="nullRepresented">
        <h2>BIENVENIDO!</h2>
        <p>en breve usted será redirigido a la pantalla principal</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {},
      listaReprentaciones: [],
      representativeId: null,
      nullRepresented: false,
      message: "",
      firstname: "",
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

          setTimeout(() => this.$router.push("munienlinea"), 3000);
          this.dispatchRepresentative();
        });
    },

    //acciones del store

    dispatchProfile() {
      this.$store.dispatch("getProfileAction", this.user);
    },
    dispatchRepresentative() {
      this.$store.dispatch("setRepresentativeAction");
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
        this.user.firstname = response.data.UserProfile.user.firstname;
        this.user.lastname = response.data.UserProfile.user.lastname;
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
        setTimeout(() => this.$router.push("munienlinea"), 3000);
      });
  },
};
</script>
<style scoped>
.sector-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--grey-bk);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  padding: 3rem;
  text-align: center;
  justify-content: center;
  align-items: center;
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
  background: var(--blue);
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
  width: 10rem;
}
.bn3:hover {
  background-color: rgb(63, 119, 192);
  color: white;
}
</style>
