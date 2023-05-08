<template>
  <div class="main-container">
    <div class="menu">
      <SideBar />
    </div>
    <div class="top">
      <h1 class="tituloPrincipal">Mis trámites</h1>
    </div>
    <Tabla color="var(--green)" />
  </div>
</template>

<script>
import Tabla from "@/components/Tramites/TablaComponent.vue";
import SideBar from "@/components/MuniEnLinea/SideBar.vue";
export default {
  name: "TramitesView",
  components: {
    Tabla,
    SideBar,
  },
};
</script>

<style scoped>
.top {
  text-align: left;
}
.menu {
  width: 100%;
  display: flex;
  justify-content: left;
  text-align: left;
}
h4 {
  width: 100%;
  text-align: left;
  color: var(--blue);
}

.main-container {
  height: 100vh;
  width: 80%;
  display: flex;
  padding: 3%;
  flex-flow: column wrap;
  background: rgb(235, 235, 235);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  justify-content: flex-start;
}

@media (max-width: 800px) {
  .main-container {
    width: 100%;
    height: auto;
  }
}
</style>
