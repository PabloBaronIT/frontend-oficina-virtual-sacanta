<template>
  <main class="flex-container">
    <h1>Servicios</h1>
    <div class="card-container">
      <div v-for="opcion in opciones" :key="opcion.Id">
        <router-link
          :to="`/munienlinea/${opcion.name}`"
          class="card"
          style="text-decoration: none; color: #222"
        >
          <img :src="opcion.src" :alt="opcion.name" />
          {{ opcion.name }}
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "MainCointainerComponent",
  data() {
    return {
      opciones: [
        {
          id: 1,
          name: "Turnero Digital",
          src: "https://github.com/OficinaVirtualBaron/oficina-vue/blob/main/public/img/Turnero%20Digital.png?raw=true",
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
};
</script>

<style scoped>
img {
  width: 10px;
}

.flex-container {
  width: 100%;
  height: 100vh;
  background: rgb(235, 235, 235);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  display: flex;
  padding: 10px 0;
  flex-flow: row wrap;
  justify-content: center;
}

.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  padding: 0;
}

.card img {
  margin-bottom: 20px;
  border-radius: 50%;
  object-fit: cover;
  width: 100px;
}

.card {
  border-top-left-radius: 200px;
  border-top-right-radius: 200px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  font-weight: bold;
  padding: 15px;
  border: none;
  box-shadow: 5px 5px 12px #444;
  width: 120px;
  height: 210px;
  margin: 30px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.card:hover {
  box-shadow: 5px 5px 20px #444;
}

h1 {
  margin-left: 30px;
  color: var(--red);
  width: 100%;
  text-align: left;
  font-weight: bold;
  padding-top: 20px;
}
</style>
