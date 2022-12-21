<template>
  <main>
    <NavComponent />

    <router-view />
  </main>
</template>

<script>
import NavComponent from "@/components/MuniEnLinea/NavComponent.vue";

export default {
  components: {
    NavComponent,
  },
};
</script>

<style>
main {
  display: flex;
  flex-flow: row nowrap;
  width: 100vw;
}

#app {
  overflow-x: hidden;
  --green: #d1e9ea;
  --blue: #415f77;
  --yellow: #fff7e9;
  --red: #e14d2a;
  --text-color: #2c3e50;
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
}
</style>
