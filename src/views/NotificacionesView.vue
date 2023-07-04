<template>
  <div class="sector-container">
    <div class="top">
      <h1>Mis notificaciones</h1>
    </div>

    <CardNotificacionComponentVue
      :dato="communication"
      v-for="(communication, index) in communications"
      :key="index"
      :v-if="communications.length && this.loading === false"
    />
    <div class="loading">
      <div v-if="this.loading" class="spinner-border loading" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
  </div>
</template>

<script>
import CardNotificacionComponentVue from "../components/Notificaciones/CardNotificacionComponent.vue";
//import Tabla from "@/components/Notificaciones/TablaComponent.vue";
import axios from "axios";
export default {
  components: {
    //Tabla,
    CardNotificacionComponentVue,
  },

  data() {
    return {
      communications: [],
      cidiCookie: "",
      loading: false,
      selectCommunication: null,
    };
  },
  created() {
    this.cidiCookie = this.$store.state.CidiCookie;
    this.getCommunication();
  },
  methods: {
    getCommunication() {
      this.loading = true;
      //console.log(this.cidiCookie);

      const apiClient = axios.create({
        //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
        baseURL: process.env.VUE_APP_BASEURL,
        withCredentials: false,
        headers: {
          "auth-header": localStorage.getItem("token"),
        },
      });
      apiClient
        .post("/auth/cidi-communications/" + this.cidiCookie)
        .then((response) => {
          this.loading = false;
          console.log(response.data);
          let comunicaciones = response.data.CommunicationsHistory;

          for (let i = 0; i < comunicaciones.length; i++) {
            const element = comunicaciones[i];

            this.communications.push(element);
          }
        });
    },
    // log(index) {
    //   this.selectCommunication = this.communications[index];
    //   //console.log(this.selectCommunication);
    // },
  },
};
</script>

<style scoped>
.top {
  text-align: left;
  margin-left: 3rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.top h1 {
  text-align: left;
}
.sector-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--grey-bk);
  align-items: center;
}
.loading {
  margin-top: 5rem;
}
</style>
