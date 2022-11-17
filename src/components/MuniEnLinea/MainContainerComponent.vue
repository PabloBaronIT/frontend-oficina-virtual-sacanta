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
          <img src="@/assets/logo.png" alt="" />
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
        { id: 1, name: "Turnero Digital", src: "" },
        { id: 2, name: "App Ciudadana" },
        { id: 3, name: "Boletín Electronico" },
        { id: 4, name: "Ciudad Transparente" },
        { id: 5, name: "Consulta de Expedientes" },
        { id: 5, name: "Obras Publicas" },
        { id: 5, name: "Salud" },
        { id: 5, name: "Registro Civil" },
        { id: 5, name: "Guía de Tramites" },
        { id: 5, name: "Habilitación de Negocios Online" },
      ],
    };
  },
};
</script>

<style scoped>
h1 {
  color: rgb(56, 101, 224);
  width: 80%;
  text-align: left;
  font-weight: bold;
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
  border: 1px solid #000;
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
  width: 130px;
  height: 220px;
  margin: 30px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.card:hover {
  box-shadow: 5px 5px 20px #444;
}
</style>
