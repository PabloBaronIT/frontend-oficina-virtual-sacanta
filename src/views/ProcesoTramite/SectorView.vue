<template>
  <div class="sector-container">
    <Sector />
  </div>
</template>

<script>
import Sector from "../../components/MuniEnLinea/SectorComponent.vue";

export default {
  name: "SectorView",
  components: {
    Sector,
  },
};
</script>

<style scoped>
.sector-container {
  width: 100%;
  display: flex;
  background: var(--grey-bk);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  padding: 30px;
}
</style>
