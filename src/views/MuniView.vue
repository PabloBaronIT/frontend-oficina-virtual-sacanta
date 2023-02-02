<template>
  <article>
    <ModalGraficoComponent />
    <div class="options">
      <input
        @click="logOf"
        class="btn btn-outline-success"
        type="button"
        value="Cerrar Sesion"
      />
      <button class="btn btn-outline-success ms-2">Estadisticas</button>
      <input
        @click="refresh"
        class="btn btn-outline-dark ms-2"
        type="button"
        value="Refrescar"
      />
    </div>
    <Filtro />
    <Tabla />
    <hr />
    <div class="article-container">
      <RegisterComponent />
      <BarComponent class="ms-5" />
    </div>
  </article>
</template>

<script>
import Tabla from "@/components/Municipal/TablaComponent.vue";
import RegisterComponent from "@/components/Login&Register/RegisterComponent.vue";
import ModalGraficoComponent from "@/components/Municipal/ModalGraficoComponent.vue";
// import GraficoComponent from "@/components/Municipal/GraficoComponent.vue";
import BarComponent from "@/components/Municipal/BarComponent.vue";
import Filtro from "@/components/Busqueda/Filtrado/FiltroTabla.vue";

export default {
  name: "MuniView",
  components: {
    Filtro,
    ModalGraficoComponent,
    RegisterComponent,
    Tabla,
    // GraficoComponent,
    BarComponent,
  },
  methods: {
    refresh() {
      location.reload();
    },
    logOf() {
      localStorage.clear();
      location.reload();
      this.$router.push("login");
      window.dispatchEvent(
        new CustomEvent("token-localstorage-changed", {
          detail: {
            storage: localStorage.getItem("token"),
          },
        })
      );
    },
  },
};
</script>

<style scoped>
.options {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

article {
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  background: rgb(235, 235, 235);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  padding: 30px;
  justify-content: center;
  align-items: center;
}

.article-container {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
}
</style>
