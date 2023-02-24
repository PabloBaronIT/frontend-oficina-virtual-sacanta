<template>
  <div class="main-container">
    <div class="menu"><SideBar /></div>
    <h4>Tus tramites</h4>
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
.menu {
  width: 100%;
  display: flex;
  justify-content: left;
}
h4 {
  width: 100%;
  text-align: left;

  color: var(--blue);
}

.main-container {
  width: 100%;
  display: flex;
  padding: 0 20px;
  flex-flow: column wrap;
  background: rgb(235, 235, 235);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  justify-content: center;
  align-items: center;
}
</style>
