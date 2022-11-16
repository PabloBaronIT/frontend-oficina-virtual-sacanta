<template>
  <main class="flex-container">
    <h2>Servicios</h2>
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
        { id: 1, name: "Turnos" },
        { id: 2, name: "Tramites" },
        { id: 3, name: "App Ciudadana" },
        { id: 4, name: "Notificar" },
        { id: 5, name: "Soliciudes" },
      ],
    };
  },
};
</script>

<style scoped>
h2 {
}

.flex-container {
  width: 100%;
  height: 100vh;
  background: rgb(235, 235, 235);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  display: flex;
  padding: 30px;
  flex-flow: column wrap;
}

.card-container {
  display: flex;
  justify-content: left;
  align-items: center;
  flex-flow: row wrap;
}

.card img {
  border-radius: 50%;
  object-fit: cover;
  width: 60px;
  border: 1px solid #000;
}

.card {
  border-radius: 40% 10px;
  padding: 50px;
  border: none;
  box-shadow: 5px 5px 12px #444;
  width: 15%;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card:hover {
  box-shadow: 5px 5px 20px #444;
}
</style>
