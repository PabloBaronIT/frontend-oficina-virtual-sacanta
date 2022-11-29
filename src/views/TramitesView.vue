<template>
  <main>
    <TopNavTramites />
    <ListaTramites />
  </main>
</template>

<script>
import ListaTramites from "@/components/Tramites/ListaTramitesComponent.vue";
import TopNavTramites from "@/components/Tramites/TopNavTramites.vue";

export default {
  name: "TramitesView",
  components: {
    ListaTramites,
    TopNavTramites,
  },
};
</script>

<style scoped></style>
