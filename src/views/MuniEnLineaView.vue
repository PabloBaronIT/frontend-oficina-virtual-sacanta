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
  mounted() {
    // if(!localStorage.getItem('acces_token')){
    // }
  },
};
</script>

<style scoped>
main {
  width: 100%;
  border: 1px solid red;
}
</style>
