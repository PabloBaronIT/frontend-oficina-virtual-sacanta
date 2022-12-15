<template>
  <main class="main-container">
    <ul>
      <li v-for="tramite in tramites" :key="tramite.id">
        <router-link :to="`/tramites/${tramite.nombre}`">
          {{ tramite.nombre }}
        </router-link>
      </li>
    </ul>
    <article>
      <router-view />
    </article>

    <h2 style="color: red">{{ this.$route.params.tramiteId }}</h2>
  </main>
</template>

<script>
export default {
  name: "TramitesView",
  data() {
    return {
      tramites: [
        {
          id: 1,
          nombre: "Alta AFIP",
          preguntas: ["Nombre", "Apellido", "Email"],
        },
        {
          id: 2,
          nombre: "Baja AFIP",
          preguntas: ["Nombre", "Apellido", "Email"],
        },
        {
          id: 3,
          nombre: "Alta vehiculo",
          preguntas: ["Nombre", "Apellido", "Email"],
        },
        {
          id: 4,
          nombre: "Alta AFIP",
          preguntas: ["Nombre", "Apellido", "Email"],
        },
        {
          id: 5,
          nombre: "Baja AFIP",
          preguntas: ["Nombre", "Apellido", "Email"],
        },
        {
          id: 6,
          nombre: "Alta vehiculo",
          preguntas: ["Nombre", "Apellido", "Email"],
        },
      ],
    };
  },
  components: {},
};
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: left;
}
</style>
