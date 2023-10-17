<template>
  <div class="sector-container">
    <IntroFormularioComponent />
  </div>
</template>
<script>
import IntroFormularioComponent from "@/components/Tramites/Proceso/IntroFormularioComponent.vue";
export default {
  name: "IntroFormulario",
  computed: {
    setPermission() {
      if (this.$store.state.loggedIn === true) {
        return true;
      } else {
        return false;
      }
    },
  },
  components: {
    IntroFormularioComponent,
  },
};
</script>
<style scoped>
.sector-container {
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #f5f5f5;
}
</style>
