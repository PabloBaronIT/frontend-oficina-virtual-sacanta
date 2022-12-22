<template>
  <main class="flex-container">
    <TramitesFrecuentes />

    <div class="header">
      <h1>Servicios</h1>
      <Busqueda />
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

export default {
  name: "MainCointainerComponent",
  data() {
    return {
      sectores: [
        {
          id: 1,

          src: "https://github.com/OficinaVirtualBaron/oficina-vue/blob/main/src/assets/tramites/accion-social.png?raw=true",
        },
        {
          id: 2,
          name: "App Ciudadana",
          src: "https://github.com/OficinaVirtualBaron/oficina-vue/blob/main/public/img/App%20Ciudadana.png?raw=true",
        },
        {
          id: 3,
          name: "Boletín Electronico",
          src: "https://github.com/OficinaVirtualBaron/oficina-vue/blob/main/public/img/Bolet%C3%ADn%20Electronico.png?raw=true",
        },
        {
          id: 4,
          name: "Ciudad Transparente",
          src: "https://github.com/OficinaVirtualBaron/oficina-vue/blob/main/public/img/Ciudad%20Transparente.png?raw=true",
        },
        {
          id: 5,
          name: "Consulta de Expedientes",
          src: "https://github.com/OficinaVirtualBaron/oficina-vue/blob/main/public/img/Consulta%20de%20Expedientes.png?raw=true",
        },
        {
          id: 5,
          name: "Obras Publicas",
          src: "https://github.com/OficinaVirtualBaron/oficina-vue/blob/main/public/img/Obras%20Publicas.png?raw=true",
        },
        {
          id: 5,
          name: "Salud",
          src: "https://github.com/OficinaVirtualBaron/oficina-vue/blob/main/public/img/Salud.png?raw=true",
        },
        {
          id: 5,
          name: "Registro Civil",
          src: "https://github.com/OficinaVirtualBaron/oficina-vue/blob/main/public/img/Registro%20Civil.png?raw=true",
        },
        {
          id: 5,
          name: "GuíadeTrámites",
          src: "https://github.com/OficinaVirtualBaron/oficina-vue/blob/main/public/img/Gu%C3%ADa%20de%20Tr%C3%A1mites.png?raw=true",
        },
        {
          id: 5,
          name: "Habilitación de Negocios Online",
          src: "https://github.com/OficinaVirtualBaron/oficina-vue/blob/main/public/img/Habilitaci%C3%B3n%20de%20Negocios%20Online.png?raw=true",
        },
      ],
    };
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
  width: 100%;
  border: 1px solid red;
  margin: 0;
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: left;
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
  padding: 0;
}

.card img {
  border-radius: 50%;
  object-fit: cover;
  width: 100%;
}

.card {
  background: var(--grey-bk);
  font-weight: bold;
  padding: 15px;
  border: none;
  box-shadow: 5px 5px 12px #444;
  width: 320px;
  height: 110px;
  margin: 20px 20px;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  align-items: center;
}

.card:hover {
  box-shadow: 5px 5px 20px #444;
}

h1 {
  margin-left: 30px;
  color: var(--red);
  width: 100%;
  text-align: center;
  font-weight: bold;
  padding-top: 20px;
}
@media (max-width: 800px) {
  .flex-container {
    width: 100vw;
  }
}
</style>
