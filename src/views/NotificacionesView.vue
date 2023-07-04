<template>
  <div class="sector-container">
    <div class="top">
      <h1>Mis notificaciones</h1>
    </div>
    <CardNotificacionComponentVue
      :dato="notificacion"
      v-for="notificacion in notificaciones"
      :key="notificacion.id"
    />
  </div>
</template>

<script>
import CardNotificacionComponentVue from "../components/Notificaciones/CardNotificacionComponent.vue";
//import Tabla from "@/components/Notificaciones/TablaComponent.vue";

export default {
  components: {
    //Tabla,
    CardNotificacionComponentVue,
  },
  data() {
    return {
      notificaciones: [
        {
          id: 1,
          description:
            "Informamos que el pago de el trámite que iniciaste está impago. Podés imprimirlo y abonarlo directamente ennuestras oficinas ó desde la comodidad de tu casa en los diferentes medios de pago.",
        },
        {
          id: 2,
          description:
            "Informamos que el pago de el trámite que iniciaste está impago. Podés imprimirlo y abonarlo directamente ennuestras oficinas ó desde la comodidad de tu casa en los diferentes medios de pago.",
        },
      ],
    };
  },
  methods: {
    getCommunication() {
      // const apiClient = axios.create({
      //   //baseURL: "https://oficina-virtual-pablo-baron.up.railway.app/",
      //   baseURL: process.env.VUE_APP_BASEURL,
      //   withCredentials: false,
      //   headers: {
      //     "auth-header": localStorage.getItem("token"),
      //   },
      // });
      // apiClient.post("/auth/cidi-communications/");
    },
  },
};
</script>

<style scoped>
.top {
  text-align: left;
  margin-left: 3rem;
  margin-top: 2rem;
}
.sector-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--grey-bk);
}
</style>
