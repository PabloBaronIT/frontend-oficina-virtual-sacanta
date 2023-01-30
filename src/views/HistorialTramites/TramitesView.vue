<template>
  <div class="main-container">
    <h4>Tus tramites</h4>
    <FiltroTabla />
    <Tabla color="var(--green)" />
  </div>
</template>

<script>
import Tabla from "@/components/Tramites/TablaComponent.vue";
import FiltroTabla from "@/components/Busqueda/Filtrado/FiltroTabla.vue";

export default {
  name: "TramitesView",
  components: {
    Tabla,
    FiltroTabla,
  },
};
</script>

<style scoped>
h4 {
  width: 100%;
  text-align: left;
  margin-top: 20px;
  color: var(--blue);
}

.main-container {
  width: 100%;
  display: flex;
  padding: 20px;
  flex-flow: column wrap;
  background: rgb(235, 235, 235);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  justify-content: center;
  align-items: center;
}
</style>
