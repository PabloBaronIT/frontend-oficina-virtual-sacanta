<template>
  <div class="sector-container">
    <h1>Mis notificaciones</h1>
    <CardNotificacionComponentVue
      :dato="notificacion"
      v-for="notificacion in notificaciones"
      :key="notificacion.id"
    />
    <!-- <Tabla />-->
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
</style>
