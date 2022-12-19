<template>
  <div class="sector-container">
    <NavComponent />

    <Sector />
  </div>
</template>

<script>
import Sector from "../components/MuniEnLinea/SectorComponent.vue";
import NavComponent from "../components/MuniEnLinea/NavComponent.vue";

export default {
  name: "SectorView",
  components: {
    Sector,
    NavComponent,
  },
};
</script>

<style scoped>
.sector-container {
  height: 100vh;
  display: flex;
  flex-flow: row nowrap;
}
</style>
