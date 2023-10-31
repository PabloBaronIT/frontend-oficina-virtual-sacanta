<template>
  <div class="sector-container" v-if="setPermission">
    <h1 class="tituloPrincipal">
      Notificaciones
      <h4 style="color: #4b4a49; font-weight: 100">
        Échale un vistazo a tus notifiaciones hasta la fecha.
      </h4>
    </h1>
    <!-- LISTADO DE COMUNICACIONES -->

    <CardNotificacionComponentVue
      :dato="communication"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      :v-if="communications.length && this.loading === false"
      v-for="(communication, index) in communications"
      :key="index"
      @click="setComunicacion(index)"
    />
    <div
      :v-if="this.message && this.loading === false"
      style="text-align: center"
    >
      <h3>{{ this.message }}</h3>
    </div>
    <h1></h1>
    <!-- MODAL VISTA DE LA COMUNICACION-->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      v-if="this.selectCommunication"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fs-5" id="exampleModalLabel">
              Comunicado: {{ this.selectCommunication.subject || "" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              {{ this.selectCommunication.message || "" }}
            </p>

            <!-- <div style="display: flex; justify-content: space-around">
              <p>
                Firmado por:
                <strong>{{ this.selectCommunication.Firma }}</strong>
              </p>
              <p>
                {{ this.selectCommunication.Fecha }}
              </p>
            </div> -->
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="loading">
      <div v-if="this.loading" class="spinner-border loading" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
  </div>
</template>

<script>
import CardNotificacionComponentVue from "../../components/Notificaciones/CardNotificacionComponent.vue";
import axios from "axios";
import setToken from "@/middlewares/setToken";
import { BASE_URL } from "@/env";

export default {
  components: {
    CardNotificacionComponentVue,
  },

  data() {
    return {
      communications: [],
      //cidiCookie: "",
      loading: false,
      selectCommunication: null,
      message: null,
    };
  },
  created() {
    //this.cidiCookie = this.$store.state.CidiCookie;
    this.getCommunication();
  },
  computed: {
    setPermission() {
      if (this.$store.state.loggedIn === true) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    getCommunication() {
      this.loading = true;
      //console.log(this.cidiCookie);

      const apiClient = axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .get("/communications/my-communications")
        .then((response) => {
          this.loading = false;
          console.log(response.data);
          let comunicaciones = response.data.Communications;

          for (let i = 0; i < comunicaciones.length; i++) {
            const element = comunicaciones[i];

            this.communications.push(element);
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.message = error.response.data.message;
            this.loading = false;
          }
          if (error.response.status === 500) {
            if (error.response.data.message === "Token vencido") {
              setToken();
              this.getCommunication();
            }
          }
          if (error.response.status === 401) {
            this.$router.push("micuenta-update");
          }
        });
    },
    setComunicacion(index) {
      this.selectCommunication = this.communications[index];
      console.log(this.selectCommunication, "soy la comunicacionw");
    },
  },
};
</script>

<style scoped>
.tituloPrincipal {
  color: #4b4a49;
  font-weight: 900;
  font-size: 50px;
  margin-top: 7vh;
  margin-left: 4vw;
}

.sector-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;

  /* background: var(--grey-bk); */
}
.loading {
  margin: auto;
}
h5 {
  color: var(--green);
}
</style>
