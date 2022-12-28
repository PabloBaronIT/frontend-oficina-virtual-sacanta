<template>
  <div class="carousel-container">
    <Carousel :autoplay="1700" :items-to-show="4" :wrap-around="true">
      <Slide class="tramite" v-for="tramite in sectores" :key="tramite.id">
        <router-link :to="`/sector/${tramite.name}`" class="carousel__item">
          {{ tramite.name }}

          <img :src="tramite.src" alt="tramite.name" />
        </router-link>
      </Slide>

      <div v-for="sector in sectores" :key="sector.Id">
        <router-link
          :to="`/sector/${sector.name}`"
          class="card"
          style="text-decoration: none; color: #222"
        >
          <img :src="sector.src" :alt="sector.name" />
          {{ sector.name }}
        </router-link>
      </div>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "TramitesFrecuentes",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
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
    };
  },
});
</script>

<style scoped>
.carousel__item {
  color: var(--text-color);
  text-decoration: none;
  user-select: none;
}

.carousel-container {
  width: 100%;
  cursor: pointer;
  user-select: none;
}

.tramite img {
  margin: 5px;
  border-radius: 50%;
  object-fit: cover;
  width: 60px;
}

.tramite {
  background: rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(6.5px);
  -webkit-backdrop-filter: blur(6.5px);
  border-radius: 10px;
  border: 1px solid var(--red);
  font-weight: bold;
  padding: 15px;
  box-shadow: 0px 2px 5px rgb(97, 97, 97);
  width: 10px;
  height: 110px;
  margin: 30px 20px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}
</style>
