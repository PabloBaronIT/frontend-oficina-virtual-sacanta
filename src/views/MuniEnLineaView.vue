<template>
  <main>
    <MainContainerComponent />
    <GraficoComponent />
  </main>
</template>

<script>
import MainContainerComponent from "@/components/MuniEnLinea/MainContainerComponent.vue";
import GraficoComponent from "@/components/Municipal/GraficoComponent.vue";

export default {
  name: "MuniEnLineaView",
  components: {
    MainContainerComponent,
    GraficoComponent,
  },
};
</script>

<style scoped>
main {
  width: 100%;
}
</style>
