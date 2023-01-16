<template>
  <main>
    <div class="tabla-container">
      <FiltroNotificaciones />
      <Tabla />
    </div>
  </main>
</template>

<script>
import Tabla from "@/components/Notificaciones/TablaComponent.vue";
import FiltroNotificaciones from "@/components/Busqueda/Filtrado/FiltroNotificaciones.vue";

export default {
  components: {
    Tabla,
    FiltroNotificaciones,
  },
};
</script>

<style scoped>
main {
  width: 100%;
  display: flex;
  background: rgb(235, 235, 235);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  padding: 30px;
  justify-content: center;
  align-items: center;
}
</style>
