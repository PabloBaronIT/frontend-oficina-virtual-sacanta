<template>
  <div class="main-container">
    <NavComponent
      v-if="
        this.role != '' && this.role != undefined && this.role != 'MUNI_ROLE'
      "
    />

    <SideBar
      v-if="
        this.role != '' && this.role != undefined && this.role != 'MUNI_ROLE'
      "
    />
    <router-view />
  </div>
</template>

<script>
import NavComponent from "@/components/MuniEnLinea/NavComponent.vue";
import SideBar from "@/components/MuniEnLinea/SideBar.vue";

export default {
  data() {
    return {
      role: "",
    };
  },
  mounted() {
    window.addEventListener("token-localstorage-changed", (event) => {
      this.role = event.detail.storage;
    });
  },
  watch: {
    $route() {
      this.role = localStorage.getItem("role");
    },
  },
  components: {
    NavComponent,
    SideBar,
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
  font-family: "Roboto Slab", serif;
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

@media (max-width: 1000px) {
  #app {
    width: 100vw;
  }
}
</style>
