<template>
  <div class="sector-container">
    <div>
      <h2>BIENVENIDO! Seleccione a quien va a representar:</h2>
    </div>
    <div
      v-for="representado in listaReprentaciones"
      :key="representado.id"
      class="list"
    >
      <label>{{ representado.firstname }} {{ representado.lastname }}</label>
      <input
        type="radio"
        key="representado.id"
        :value="representado.id"
        @click="selectRpresentado($event)"
      />
    </div>
    <button
      type="submit"
      @click="postSeleccionado"
      :disabled="representativeId ? false : true"
    >
      Elegir
    </button>
    <div>
      <div v-if="message">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      listaReprentaciones: [],
      representativeId: null,
      message: "",
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
        console.log(response.data);
        if (response.status == 200) {
          for (let i = 0; i < response.data.Representations.length; i++) {
            this.listaReprentaciones.push(
              response.data.Representations[i].represented
            );
          }
        }
      })
      .catch((err) => {
        console.log(err);
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
.list {
  display: flex;
  flex-direction: flex;
  justify-content: space-around;
  align-items: center;
  height: 4rem;
  width: 40%;
  border: 1px solid grey;
  border-radius: 10px;
}
</style>
