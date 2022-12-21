<template>
  <div class="main-container">
    <MainContainerComponent />
  </div>
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

<style>
.main-container {
  margin-left: 20vw;
  display: flex;
  justify-content: left;
}
</style>
