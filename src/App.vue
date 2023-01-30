<template>
  <div class="main-container">
    <NavComponent v-if="this.role != 'MUNI_ROLE' && this.role != undefined" />
    <router-view />
  </div>
</template>

<script>
import NavComponent from "@/components/MuniEnLinea/NavComponent.vue";

export default {
  data() {
    return {
      ruta: this.$router.currentRoute.value.name,
      role: "",
    };
  },
  created() {
    this.role = undefined;
  },
  watch: {
    $route() {
      this.role = localStorage.getItem("role");
    },
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
  --green: #68b984;
  --blue: #415f77;
  --yellow: #fff7e9;
  --red: #e14d2a;
  --text-color: #2c3e50;
  --grey-bk: #ebebeb;
  --grey: rgba(70, 70, 70, 0.459);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
  margin: 0;
  width: 100%;
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
