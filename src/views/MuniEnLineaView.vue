<template>
  <main>
    <MainContainerComponent />
  </main>
</template>

<script>
import MainContainerComponent from "@/components/MuniEnLinea/MainContainerComponent.vue";

export default {
  name: "MuniEnLineaView",
  components: {
    MainContainerComponent,
  },
};
</script>

<style scoped>
main {
  width: 100%;
}
</style>
