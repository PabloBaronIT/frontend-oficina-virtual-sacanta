<template>
  <div class="main-container">
    <NavComponent />
    <router-view />
  </div>
</template>

<script>
import NavComponent from "@/components/MuniEnLinea/NavComponent.vue";

export default {
  data() {
    return {};
  },
  components: {
    NavComponent,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  --green: #d1e9ea;
  --blue: #415f77;
  --yellow: #fff7e9;
  --red: #e14d2a;
  --text-color: #2c3e50;
  --grey-bk: #ebebeb;
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
  margin: 0;
  width: 100vw;
}
</style>

<style scoped>
.main-container {
  display: flex;
}

@media (max-width: 800px) {
  #app {
    width: 100vw;
  }
}
</style>
