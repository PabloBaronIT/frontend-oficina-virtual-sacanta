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
    return {};
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
