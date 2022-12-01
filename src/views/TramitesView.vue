<template>
  <main class="main-container">
    <ListaTramites />
    <TramitesNavComponent />
  </main>
</template>

<script>
import ListaTramites from "@/components/Tramites/ListaTramitesComponent.vue";
import TramitesNavComponent from "@/components/Tramites/TramitesNavComponent.vue";

export default {
  name: "TramitesView",
  components: {
    ListaTramites,
    TramitesNavComponent,
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: left;
}
</style>
