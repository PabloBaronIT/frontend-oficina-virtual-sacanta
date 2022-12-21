<template>
  <div class="sector-container">
    <Sector />
  </div>
</template>

<script>
import Sector from "../components/MuniEnLinea/SectorComponent.vue";

export default {
  name: "SectorView",
  components: {
    Sector,
  },
};
</script>

<style scoped>
.sector-container {
  display: flex;
  flex-flow: row nowrap;
}
</style>
