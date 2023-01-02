<template>
  <main class="flex-container">
    <div class="header">
      <h1>Tramites mas frecuentes</h1>
      <Busqueda />
    </div>
    <TramitesFrecuentes />

    <div class="header">
      <h1>Servicios</h1>
    </div>

    <div class="card-container">
      <div v-for="sector in sectores" :key="sector.Id">
        <router-link
          :to="`/sector/${sector.name}`"
          class="card"
          style="text-decoration: none; color: #222"
        >
          <img :src="sector.src" :alt="sector.name" />
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import TramitesFrecuentes from "@/components/MuniEnLinea/TramitesFrecuentesComponent.vue";
import Busqueda from "../Busqueda/Filtrado/BusquedaComponent.vue";
import dbService from "@/services/dbService.js";

export default {
  name: "MainCointainerComponent",
  data() {
    return {
      sectores: [
        {
          id: 1,
          name: "Turnero Digital",
          src: "https://github.com/OficinaVirtualBaron/oficina-vue/blob/main/src/assets/tramites/accion-social.png?raw=true",
        },
        {
          id: 2,
          name: "App Ciudadana",
          src: "https://github.com/OficinaVirtualBaron/oficina-vue/blob/main/src/assets/tramites/cultura-y-recreacion.png?raw=true",
        },
        {
          id: 3,
          name: "Boletín Electronico",
          src: "https://github.com/OficinaVirtualBaron/oficina-vue/blob/main/src/assets/tramites/deportes.png?raw=true",
        },
        {
          id: 4,
          name: "Ciudad Transparente",
          src: "https://github.com/OficinaVirtualBaron/oficina-vue/blob/main/src/assets/tramites/gobierno-y-desarrollo.png?raw=true",
        },
        {
          id: 5,
          name: "Consulta de Expedientes",
          src: "https://github.com/OficinaVirtualBaron/oficina-vue/blob/main/src/assets/tramites/infraestructura-y-servicios-publicos.png?raw=true",
        },
        {
          id: 5,
          name: "Obras Publicas",
          src: "https://github.com/OficinaVirtualBaron/oficina-vue/blob/main/src/assets/tramites/transito-y-seguridad-vial.png?raw=true",
        },
        {
          id: 5,
          name: "Salud",
          src: "https://github.com/OficinaVirtualBaron/oficina-vue/blob/main/src/assets/tramites/medio-ambiente.png?raw=true",
        },
        {
          id: 5,
          name: "Registro Civil",
          src: "https://github.com/OficinaVirtualBaron/oficina-vue/blob/main/src/assets/tramites/prensa-y-difusion.png?raw=true",
        },
      ],
      categorias: [],
    };
  },
  mounted() {
    dbService
      .getAllCategories()
      .then((response) => {
        console.log(response.data);
        this.categorias = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  components: {
    TramitesFrecuentes,
    Busqueda,
  },
};
</script>

<style scoped>
img {
  width: 10px;
}

.header {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 50px;
}

.flex-container {
  width: 78vw;
  height: auto;
  background: var(--grey-bk);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
}

.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
}

.card img {
  border-radius: 50%;
  object-fit: cover;
  width: 100%;
}

.card {
  background: var(--grey-bk);
  font-weight: bold;
  border: none;
  box-shadow: 5px 5px 15px rgb(137, 137, 137);
  width: 320px;
  height: 100px;
  margin: 15px 15px;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  align-items: center;
}

.card:hover {
  box-shadow: 5px 5px 20px #444;
}

h1 {
  color: var(--red);

  font-weight: bold;
}
@media (max-width: 800px) {
  .flex-container {
    width: 100vw;
  }
}
</style>
