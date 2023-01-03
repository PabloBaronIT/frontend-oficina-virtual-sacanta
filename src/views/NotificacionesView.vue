<template>
  <main>
    <div class="tabla-container">
      <FiltroTabla />
      <Tabla />
    </div>
  </main>
</template>

<script>
import Tabla from "@/components/Notificaciones/TablaComponent.vue";
import FiltroTabla from "@/components/Busqueda/Filtrado/FiltroTabla.vue";

export default {
  components: {
    Tabla,
    FiltroTabla,
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
}
</style>
