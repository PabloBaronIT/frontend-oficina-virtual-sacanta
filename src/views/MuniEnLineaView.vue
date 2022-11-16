<template>
  <div class="main-container">
    <NavComponent />
    <MainContainerComponent />
  </div>
</template>

<script>
import NavComponent from "@/components/MuniEnLinea/NavComponent.vue";
import MainContainerComponent from "@/components/MuniEnLinea/MainContainerComponent.vue";

export default {
  name: "MuniEnLineaView",
  components: {
    NavComponent,
    MainContainerComponent,
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: left;
}
</style>
